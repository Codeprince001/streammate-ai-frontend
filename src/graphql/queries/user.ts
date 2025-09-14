import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      firstName
      lastName
      role
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
      createdAt
      lastLoginAt
    }
  }
`;

export const GET_USER_RECOMMENDATIONS = gql`
  query GetUserRecommendations($limit: Int, $offset: Int) {
    recommendations(limit: $limit, offset: $offset) {
      id
      title
      overview
      genre
      rating
      platform
      poster
      backdrop
      trailer
      reason
      confidence
      createdAt
    }
  }
`;

export const GET_USER_WATCH_HISTORY = gql`
  query GetUserWatchHistory($limit: Int, $offset: Int) {
    watchHistory(limit: $limit, offset: $offset) {
      id
      contentId
      title
      poster
      watchedAt
      progress
      completed
      rating
    }
  }
`;