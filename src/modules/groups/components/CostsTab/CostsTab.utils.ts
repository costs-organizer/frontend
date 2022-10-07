import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetCostsQuery, useGetCostsQuery } from 'generated/graphql'
import { Column } from 'shared/components'
import { ArrayElement } from 'shared/utils'

export type CostType = ArrayElement<GetCostsQuery['costs']>

export const useCostsTable = () => {
  const [showOnlyMy, setShowOnlyMy] = useState(true)
  const { groupId } = useParams()
  const { data, isLoading, refetch } = useGetCostsQuery(
    {
      inp: { groupId: Number(groupId), filterByName: showOnlyMy },
    },
    { refetchOnMountOrArgChange: true }
  )

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
        label: 'debtor',
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
    ],
    []
  )

  return {
    columns,
    isLoading,
    setShowOnlyMy,
    refetch,
    showOnlyMy,
    costs: data?.costs,
  }
}
