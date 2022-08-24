import { HandshakeOutlined } from '@mui/icons-material'
import { AppBar, Typography } from '@mui/material'
import { paths } from 'config'
import UserMenu from './UserMenu'
import { LogoLink, Toolbar, UserMenuContainer } from './TopBar.styles'
import './TopBar.utils'

const TopBar = () => {
  const userFullName = 'Rona Smith'
  const isLoadingUser = false
  return (
    <AppBar>
      <Toolbar>
        <LogoLink to={paths.root}>
          <HandshakeOutlined fontSize="large" />
          <Typography variant="h6">Debts Setler</Typography>
        </LogoLink>
        <UserMenuContainer>
          <UserMenu name={userFullName} isLoading={isLoadingUser} />
        </UserMenuContainer>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
