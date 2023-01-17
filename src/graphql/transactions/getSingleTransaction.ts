import { gql } from '@apollo/client'

export const getSingleTransactionQuery = gql`
  query GetSingleTransaction($inp: Int!) {
    transaction(transactionId: $inp) {
      id
      moneyAmount
      receiver {
        id
        username
      }
      payer {
        id
        username
      }
    }
  }
`
