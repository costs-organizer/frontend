import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  GetCostsQuery,
  GetCostsQueryVariables,
  MeQuery,
} from 'generated/graphql'
import { meQuery } from 'graphql/auth'
import { getCostsQuery } from 'graphql/costs'
import { Column } from 'shared/components'
import { ArrayElement } from 'shared/utils'
import ActionsColumn from './ActionsColumn'

export type CostType = ArrayElement<GetCostsQuery['costs']>

export const useCostsTable = () => {
  const { data: userData } = useQuery<MeQuery>(meQuery)
  const [showOnlyMy, setShowOnlyMy] = useState(true)
  const { groupId } = useParams()
  const { data, loading } = useQuery<GetCostsQuery, GetCostsQueryVariables>(
    getCostsQuery,
    {
      variables: {
        inp: { groupId: Number(groupId), filterByName: showOnlyMy },
      },
    }
  )

  const [editedCost, setEditedCost] = useState<CostType | null>(null)

  const handleEditModalOpen = (cost: CostType) => {
    setEditedCost(cost)
  }

  const handleEditModalClose = () => {
    setEditedCost(null)
  }

  const columns: Column<CostType>[] = useMemo(
    () => [
      {
        label: 'name',
        renderValue: (row: CostType) => row.name,
      },
      {
        label: 'description',
        renderValue: (row: CostType) => row.description,
      },
      {
        label: 'amount',
        renderValue: (row: CostType) => `${row.moneyAmount} PLN`,
      },
      {
        label: 'debtor',
        renderValue: (row: CostType) => row.createdBy.username,
      },
      {
        label: 'participants',
        renderValue: (row: CostType) =>
          row.participants.map(({ username }) => username).join(', '),
      },
      {
        label: 'actions',
        renderValue: (row: CostType) => {
          if (!userData?.me.id) return null

          return (
            <ActionsColumn
              cost={row}
              userId={userData?.me.id}
              openEditModal={handleEditModalOpen}
            />
          )
        },
      },
    ],
    [userData?.me.id]
  )

  return {
    columns,
    loading,
    setShowOnlyMy,
    showOnlyMy,
    costs: data?.costs,
    editedCost,
    handleEditModalClose,
  }
}
