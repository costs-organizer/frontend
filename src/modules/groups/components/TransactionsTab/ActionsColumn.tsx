import { Done } from '@mui/icons-material'
import { GetTransactionsQuery } from 'generated/graphql'
import { ArrayElement } from 'shared/utils'
import { CompleteTransactionButton } from './CompleteTransactionButton'
import SendReminderButton from './SendReminderButton'

interface ActionsColumnProps {
  transaction: ArrayElement<GetTransactionsQuery['transactions']>
  userId: number
}

const ActionsColumn = ({ transaction, userId }: ActionsColumnProps) => {
  if (transaction.isCompleted) return <Done color="primary" />

  if (transaction.payer.id === userId)
    return <CompleteTransactionButton transactionId={transaction.id} />

  return <SendReminderButton transactionId={transaction.id} />
}

export default ActionsColumn
