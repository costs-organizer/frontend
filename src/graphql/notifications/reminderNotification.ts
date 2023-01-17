import { gql } from '@apollo/client'

export const reminderNotification = gql`
  subscription ReminderNotification {
    reminderSent {
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
