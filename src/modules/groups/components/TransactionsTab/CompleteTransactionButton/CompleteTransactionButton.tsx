import { DoneOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Loader } from 'shared/components'
import { useCompleteTransaction } from './CompleteTransactionButton.utils'

interface CompleteTransactionButtonProps {
  transactionId: number
}

const CompleteTransactionButton = ({
  transactionId,
}: CompleteTransactionButtonProps) => {
  const { handleClick, loading } = useCompleteTransaction(transactionId)

  if (loading) return <Loader size={10} />

  return (
    <IconButton onClick={handleClick}>
      <DoneOutline />
    </IconButton>
  )
}

export default CompleteTransactionButton
