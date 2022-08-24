import { gql } from '@apollo/client'

export const getTranstactionsQuery = gql`
  query GetTransactions($inp: FindAllTransactionsInput!) {
    transactions(findAllInput: $inp) {
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
