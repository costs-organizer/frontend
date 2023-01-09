import { useState } from 'react'
import { TransactionType } from '../TransactionsTab.utils'

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
