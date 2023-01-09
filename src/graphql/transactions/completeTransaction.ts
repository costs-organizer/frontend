import { gql } from '@apollo/client'

export const completeTransactionMutation = gql`
  mutation CompleteTransaction($transactionId: Int!, $fileURL: String) {
    completeTransaction(transactionId: $transactionId, fileURL: $fileURL)
  }
`
