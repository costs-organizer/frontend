import { gql } from '@apollo/client'

export const completeTransactionMutation = gql`
  mutation CompleteTransaction($inp: Int!) {
    completeTransaction(transactionId: $inp)
  }
`
