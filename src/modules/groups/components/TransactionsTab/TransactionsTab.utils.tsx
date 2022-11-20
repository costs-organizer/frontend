import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ro } from 'date-fns/locale'
import {
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  MeQuery,
} from 'generated/graphql'
import { meQuery } from 'graphql/auth'
import { getTranstactionsQuery } from 'graphql/transactions'
import { Column } from 'shared/components'
import { ArrayElement } from 'shared/utils'
import ActionsColumn from './ActionsColumn'
import { CompleteTransactionButton } from './CompleteTransactionButton'
import SendReminderButton from './SendReminderButton'

export type TransactionType = ArrayElement<GetTransactionsQuery['transactions']>

export const useTransactionsTable = () => {
  const { data: userData } = useQuery<MeQuery>(meQuery)
  const [showOnlyMy, setShowOnlyMy] = useState(true)
  const { groupId } = useParams()
  const { data, loading, refetch } = useQuery<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >(getTranstactionsQuery, {
    variables: { inp: { groupId: Number(groupId), filterByUser: showOnlyMy } },
  })

  const columns: Column<TransactionType>[] = useMemo(
    () => [
      {
        label: 'receiver',
        renderValue: row => row.receiver.username,
      },
      {
        label: 'payer',
        renderValue: row => row.payer.username,
      },
      {
        label: 'amount',
        renderValue: row => `${row.moneyAmount} PLN`,
      },
      {
        label: 'actions',
        renderValue: row =>
          userData?.me.id ? (
            <ActionsColumn transaction={row} userId={userData?.me.id} />
          ) : null,
      },
    ],
    [userData?.me.id]
  )

  return {
    columns,
    loading,
    setShowOnlyMy,
    refetch,
    showOnlyMy,
    transactions: data?.transactions,
  }
}
