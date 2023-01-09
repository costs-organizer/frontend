import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
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

export type TransactionType = ArrayElement<GetTransactionsQuery['transactions']>

export const useCompleteTransactionModal = () => {
  const [transactionToComplete, setTransactionToComplete] =
    useState<TransactionType | null>(null)

  const handleModalOpen = (transaction: TransactionType) =>
    setTransactionToComplete(transaction)
  const handleModalClose = () => setTransactionToComplete(null)

  return {
    transactionToComplete,
    handleModalClose,
    handleModalOpen,
  }
}

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
  const { handleModalClose, handleModalOpen, transactionToComplete } =
    useCompleteTransactionModal()

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
            <ActionsColumn
              transaction={row}
              userId={userData?.me.id}
              onConfirm={handleModalOpen}
            />
          ) : null,
      },
    ],
    [handleModalOpen, userData?.me.id]
  )

  return {
    columns,
    loading,
    setShowOnlyMy,
    refetch,
    showOnlyMy,
    transactions: data?.transactions,
    transactionToComplete,
    handleModalClose,
  }
}
