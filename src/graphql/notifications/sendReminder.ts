import { gql } from '@apollo/client'

export const sendReminderMutation = gql`
  mutation SendReminder($transactionId: Int!) {
    sendReminder(transactionId: $transactionId)
  }
`
