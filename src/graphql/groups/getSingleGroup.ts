import { gql } from '@apollo/client'

export const getSingleGroupQuery = gql`
  query GetGroup($inp: Int!) {
    group(id: $inp) {
      id
      createdAt
      name
      createdBy {
        id
        username
      }
      members {
        id
        username
        participatedCosts {
          id
        }
      }
      costs {
        id
        createdAt
        updatedAt
        name
        moneyAmount
        description
        createdBy {
          id
          username
        }
        participants {
          id
          username
        }
      }
    }
  }
`
