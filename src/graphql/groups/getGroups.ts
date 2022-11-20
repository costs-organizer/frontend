import { gql } from '@apollo/client'

export const getGroups = gql`
  query GetGroups($inp: FindAllGroupsInput!) {
    groups(findAllInput: $inp) {
      id
      createdAt
      createdBy {
        id
        username
      }
      name
      members {
        id
      }
      notifications {
        id
        description
        type
      }
    }
  }
`
