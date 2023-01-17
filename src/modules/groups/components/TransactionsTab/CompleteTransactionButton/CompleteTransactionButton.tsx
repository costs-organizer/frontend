import { DoneOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'

interface CompleteTransactionButtonProps {
  onClick: () => void
}

const CompleteTransactionButton = ({
  onClick,
}: CompleteTransactionButtonProps) => {
  return (
    <IconButton onClick={onClick}>
      <DoneOutline />
    </IconButton>
  )
}

export default CompleteTransactionButton
