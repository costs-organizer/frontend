import { GetTransactionsQuery } from 'generated/graphql'
import { ArrayElement } from 'shared/utils'
import { CompleteTransactionButton } from './CompleteTransactionButton'
import CompletedTransactionActions from './CompletedTransactionActions'
import SendReminderButton from './SendReminderButton'

interface ActionsColumnProps {
  transaction: ArrayElement<GetTransactionsQuery['transactions']>
  userId: number
  onConfirm: (
    transaction: ArrayElement<GetTransactionsQuery['transactions']>
  ) => void
}

const ActionsColumn = ({
  transaction,
  userId,
  onConfirm,
}: ActionsColumnProps) => {
  if (transaction.isCompleted)
    return (
      <CompletedTransactionActions
        onUpload={onConfirm}
        transaction={transaction}
      />
    )

  if (transaction.payer.id === userId)
    return <CompleteTransactionButton onClick={() => onConfirm(transaction)} />

  if (transaction.receiver.id === userId)
    return <SendReminderButton transactionId={transaction.id} />

  return null
}

export default ActionsColumn
