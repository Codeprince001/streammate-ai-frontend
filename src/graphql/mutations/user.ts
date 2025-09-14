import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserInput!) {
    updateProfile(input: $input) {
      id
      email
      firstName
      lastName
      avatar
      preferences {
        genres
        moods
        preferredLanguages
      }
      streamingServices {
        netflix
        prime
        disney
        hulu
      }
    }
  }
`;

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($preferences: PreferencesInput!) {
    updatePreferences(preferences: $preferences) {
      id
      preferences {
        genres
        moods
        preferredLanguages
      }
    }
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($contentId: String!) {
    addToWatchlist(contentId: $contentId) {
      success
      message
    }
  }
`;

export const RATE_CONTENT = gql`
  mutation RateContent($contentId: String!, $rating: Float!) {
    rateContent(contentId: $contentId, rating: $rating) {
      success
      message
      averageRating
    }
  }
`;