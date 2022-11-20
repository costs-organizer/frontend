import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AccountCircle } from '@mui/icons-material'
import { Button, Skeleton } from '@mui/material'
import { LogoutMutation, LogoutMutationVariables } from 'generated/graphql'
import { logoutMutation } from 'graphql/auth'
import { paths } from 'config'

const LOADER_WIDTH = 80

export interface UserMenuProps {
  name?: string
  isLoading?: boolean
}

const UserMenu = ({ name, isLoading }: UserMenuProps) => {
  const navigate = useNavigate()
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(
    logoutMutation,
    {
      onCompleted: () => navigate(paths.login),
    }
  )

  return (
    <Button
      onClick={() => logout()}
      color="inherit"
      startIcon={<AccountCircle />}
    >
      {isLoading ? <Skeleton width={LOADER_WIDTH} /> : name}
    </Button>
  )
}

export default UserMenu
