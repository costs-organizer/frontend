import { gql } from '@apollo/client'

export const notificationSentSubscription = gql`
  subscription NotificationSent {
    notificationSent {
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
