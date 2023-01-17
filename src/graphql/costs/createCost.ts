import { gql } from '@apollo/client'

export const createCostMutation = gql`
  mutation CreateCost($inp: CreateCostInput!) {
    createCost(createCostInput: $inp)
  }
`
