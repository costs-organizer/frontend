import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JoinCostMutation, JoinCostMutationVariables } from 'generated/graphql'
import { getCostsQuery, joinCostMutation } from 'graphql/costs'
import { Loader } from 'shared/components'

interface JoinCostButtonProps {
  costId: number
}

const JoinCostButton = ({ costId }: JoinCostButtonProps) => {
  const { groupId } = useParams()
  const [joinCost, { loading }] = useMutation<
    JoinCostMutation,
    JoinCostMutationVariables
  >(joinCostMutation, {
    refetchQueries: [
      {
        query: getCostsQuery,
        fetchPolicy: 'network-only',
        variables: {
          inp: {
            groupId: Number(groupId),
          },
        },
      },
    ],
  })

  const handleClick = useCallback(() => {
    joinCost({ variables: { inp: costId } })
  }, [costId, joinCost])

  if (loading) return <Loader size={10} />

  return (
    <IconButton onClick={handleClick}>
      <AddOutlined />
    </IconButton>
  )
}

export default JoinCostButton
