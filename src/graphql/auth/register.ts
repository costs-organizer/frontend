import { gql } from '@apollo/client'

export const registerMutation = gql`
  mutation Register($inp: RegisterInput!) {
    register(registerInput: $inp) {
      id
    }
  }
`
