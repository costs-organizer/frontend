import { gql } from '@apollo/client'

export const loginMutation = gql`
  mutation Login($inp: LoginInput!) {
    login(loginInput: $inp)
  }
`
