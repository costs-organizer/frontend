import { useQuery } from '@apollo/client'
import { HandshakeOutlined } from '@mui/icons-material'
import { AppBar, Typography } from '@mui/material'
import { MeQuery, MeQueryVariables } from 'generated/graphql'
import { meQuery } from 'graphql/auth'
import { paths } from 'config'
import NotificationsDropdown from './NotificationsDropdown'
import UserMenu from './UserMenu'
import { LogoLink, Toolbar, UserMenuContainer } from './TopBar.styles'
import './TopBar.utils'

const TopBar = () => {
  const { data, loading } = useQuery<MeQuery, MeQueryVariables>(meQuery)
  return (
    <AppBar>
      <Toolbar>
        <LogoLink to={paths.root}>
          <HandshakeOutlined fontSize="large" />
          <Typography variant="h6">Debts Setler</Typography>
        </LogoLink>
        {!!data && (
          <UserMenuContainer>
            <NotificationsDropdown />
            <UserMenu name={data?.me.username} isLoading={loading} />
          </UserMenuContainer>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
