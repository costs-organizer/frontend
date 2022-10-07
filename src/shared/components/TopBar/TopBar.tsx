import { HandshakeOutlined } from '@mui/icons-material'
import { AppBar, Typography } from '@mui/material'
import { useMeQuery } from 'generated/graphql'
import { paths } from 'config'
import UserMenu from './UserMenu'
import { LogoLink, Toolbar, UserMenuContainer } from './TopBar.styles'
import './TopBar.utils'

const TopBar = () => {
  const { data, isLoading, isSuccess } = useMeQuery()
  return (
    <AppBar>
      <Toolbar>
        <LogoLink to={paths.root}>
          <HandshakeOutlined fontSize="large" />
          <Typography variant="h6">Debts Setler</Typography>
        </LogoLink>
        {isSuccess && (
          <UserMenuContainer>
            <UserMenu name={data?.me.username} isLoading={isLoading} />
          </UserMenuContainer>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
