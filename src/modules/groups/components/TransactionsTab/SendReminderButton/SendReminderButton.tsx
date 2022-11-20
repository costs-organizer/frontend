import { NotificationAdd } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useReminderSending } from './SendReminderButton.utils'

interface SendReminderButtonProps {
  transactionId: number
}

const SendReminderButton = ({ transactionId }: SendReminderButtonProps) => {
  const { handleReminderSending, isCompleted, loading } =
    useReminderSending(transactionId)
  return (
    <IconButton onClick={handleReminderSending}>
      <NotificationAdd />
    </IconButton>
  )
}

export default SendReminderButton
