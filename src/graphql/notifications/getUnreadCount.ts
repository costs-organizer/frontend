import { gql } from '@apollo/client'

export const getUnreadCountQuery = gql`
  query GetUnreadCount {
    getUnreadCount
  }
`
