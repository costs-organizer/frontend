import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AccountCircle, Logout, Person } from '@mui/icons-material'
import { Button, Menu, MenuItem, Skeleton } from '@mui/material'
import { LogoutMutation, LogoutMutationVariables } from 'generated/graphql'
import { logoutMutation, meQuery } from 'graphql/auth'
import { paths } from 'config'
import { useUsersMenuDropdown } from './UserMenu.utils'

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
      refetchQueries: [{ query: meQuery }],
    }
  )

  const {
    dropDownAnchorEl,
    handleDropdownClose,
    handleDropdownOpen,
    isDropdownOpen,
  } = useUsersMenuDropdown()

  return (
    <>
      <Button
        onClick={anchorEl => handleDropdownOpen(anchorEl)}
        color="inherit"
        startIcon={<AccountCircle />}
      >
        {isLoading ? <Skeleton width={LOADER_WIDTH} /> : name}
      </Button>
      <Menu
        open={isDropdownOpen}
        anchorEl={dropDownAnchorEl}
        onClose={handleDropdownClose}
      >
        <MenuItem onClick={() => logout()}>
          <Logout />
          &nbsp;&nbsp;Logout
        </MenuItem>
        <MenuItem onClick={() => navigate(paths.userInfo)}>
          <Person />
          &nbsp;&nbsp;My Profile
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
