import { gql } from '@apollo/client'

export const getUserNotificationsQuery = gql`
  query GetUserNotifications {
    notifications {
      id
      type
      group {
        id
        name
      }
      readBy
      receivers {
        id
        username
      }
      createdBy {
        id
        username
      }
    }
  }
`
