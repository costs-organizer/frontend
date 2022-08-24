import { gql } from '@apollo/client'

export const addUserToGroupMutation = gql`
  mutation AddUserToGroup($inp: AddNewUsersInput!) {
    addNewUsers(addNewUsersInput: $inp)
  }
`
