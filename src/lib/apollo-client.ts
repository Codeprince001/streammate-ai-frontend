import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';
import { getAuthToken, refreshAuthToken, logout } from './auth';
import {RetryLink} from '@apollo/client/link/retry';

// 🌐 HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql',
  credentials: 'include',
});

// 🔐 Auth link to attach JWT token
const authLink = new SetContextLink(async (prevContext) => {
  const token = await getAuthToken();

  return {
    headers: {
      ...prevContext.headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

// ⚠️ Error link using new Apollo error structure
const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      console.error(`[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`);

      if (err.message.includes('Unauthorized') || err.message.includes('jwt')) {
        return new Observable(observer => {
          refreshAuthToken()
            .then(() => getAuthToken())
            .then(newToken => {
              if (!newToken) {
                logout();
                window.location.href = '/login';
                observer.complete();
                return;
              }

              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}`,
                },
              }));

              forward(operation).subscribe({
                next: result => observer.next(result),
                error: err => observer.error(err),
                complete: () => observer.complete(),
              });
            })
            .catch(() => {
              logout();
              window.location.href = '/login';
              observer.complete();
            });
        });
      }
    }
  } else if (CombinedProtocolErrors.is(error)) {
    for (const err of error.errors) {
      console.error(`[Protocol error]: Message: ${err.message}, Extensions: ${JSON.stringify(err.extensions)}`);
    }
  } else {
    console.error(`[Network error]: ${error}`);
    if ((error as any)?.statusCode === 401) {
      logout();
      window.location.href = '/login';
    }
  }
});

// 🚀 Apollo Client instance errorLink, authLink, httpLink
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    new RetryLink(),
    new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql' }),
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          preferences: { merge: true },
          watchHistory: { merge: true },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
  },
});
