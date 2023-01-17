import { gql } from '@apollo/client'

export const createGroupMutation = gql`
  mutation CreateGroup($inp: CreateGroupInput!) {
    createGroup(createGroupInput: $inp)
  }
`
