import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DeleteOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  RemoveCostMutation,
  RemoveCostMutationVariables,
} from 'generated/graphql'
import { getCostsQuery, removeCostMutation } from 'graphql/costs'
import { useCostsTabContext } from '../../utils'

interface RemoveCostButtonProps {
  costId: number
}

const RemoveCostButton = ({ costId }: RemoveCostButtonProps) => {
  const { groupId } = useParams()
  const { showOnlyMy } = useCostsTabContext()

  const [removeCost, { loading }] = useMutation<
    RemoveCostMutation,
    RemoveCostMutationVariables
  >(removeCostMutation, {
    refetchQueries: [
      {
        query: getCostsQuery,
        variables: {
          inp: {
            groupId: Number(groupId),
            filterByName: showOnlyMy,
          },
        },
      },
    ],
  })
  return (
    <IconButton
      onClick={() => removeCost({ variables: { inp: costId } })}
      disabled={loading}
    >
      <DeleteOutline />
    </IconButton>
  )
}

export default RemoveCostButton
