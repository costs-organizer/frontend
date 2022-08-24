import { gql } from '@apollo/client'

export const removeCostMutation = gql`
  mutation RemoveCost($inp: Int!) {
    removeCost(costId: $inp)
  }
`
