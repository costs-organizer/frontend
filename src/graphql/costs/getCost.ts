import { gql } from '@apollo/client'

export const getCostQuery = gql`
  query GetCost($inp: Int!) {
    cost(id: $inp) {
      id
      name
      description
      moneyAmount
      participants {
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
