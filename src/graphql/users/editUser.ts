import { gql } from '@apollo/client'

export const editUserMutation = gql`
  mutation EditUser($inp: EditMeInput!) {
    editMe(editMeInput: $inp)
  }
`
