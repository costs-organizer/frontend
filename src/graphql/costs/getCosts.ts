import { gql } from '@apollo/client'

export const getCostsQuery = gql`
  query GetCosts($inp: FindAllCostsInput!) {
    costs(findAllInput: $inp) {
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
