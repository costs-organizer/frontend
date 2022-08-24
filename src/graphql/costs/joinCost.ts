import { gql } from '@apollo/client'

export const joinCostMutation = gql`
  mutation JoinCost($inp: Int!) {
    joinCost(costId: $inp)
  }
`
