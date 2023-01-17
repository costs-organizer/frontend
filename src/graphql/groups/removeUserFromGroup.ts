import { gql } from '@apollo/client'

export const removeUserFromGroupMutation = gql`
  mutation RemoveUserFromGroup($inp: RemoveUserFromGroupInput!) {
    removeUserFromGroup(removeUserFromGroupInput: $inp)
  }
`
