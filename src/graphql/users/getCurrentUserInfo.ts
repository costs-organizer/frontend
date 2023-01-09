import { gql } from '@apollo/client'

export const getCurrentUserInfoQuery = gql`
  query GetCurrentUserInfo {
    me {
      id
      username
      phone
      IBAN
      email
    }
  }
`
