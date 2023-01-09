import { gql } from '@apollo/client'

export const editCostMutation = gql`
  mutation EditCost($inp: EditCostInput!) {
    editCost(editCostInput: $inp)
  }
`
