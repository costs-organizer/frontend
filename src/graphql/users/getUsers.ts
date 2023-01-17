import { gql } from '@apollo/client'

export const getUsersQuery = gql`
  query GetUsers($inp: FindAllUsersInput!) {
    users(findAllInput: $inp) {
      id
      username
      email
    }
  }
`
