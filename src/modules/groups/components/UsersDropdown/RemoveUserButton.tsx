import { PersonRemove } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { UserType } from './UsersDropdown.types'

interface RemoveUserButtonProps {
  user: UserType
  onClick: (user: UserType) => void
}

const RemoveUserButton = ({ user, onClick }: RemoveUserButtonProps) => {
  return (
    <IconButton onClick={() => onClick(user)}>
      <PersonRemove />
    </IconButton>
  )
}

export default RemoveUserButton
