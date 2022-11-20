import { gql } from '@apollo/client'

export const readNotificationsMutation = gql`
  mutation ReadNotifications($notificationsIds: [Int!]!) {
    markAsRead(notificationIds: $notificationsIds)
  }
`
