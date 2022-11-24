import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  const { data, loading, error, refetch } = useQuery<MeQuery, MeQueryVariables>(
    meQuery
  )
  const { pathname } = useLocation()
  useEffect(() => {
    refetch()
  }, [pathname, refetch])

  console.log(data, error)
  return (
    <AppBar>
      <Toolbar>
        <LogoLink to={!error ? paths.groups : paths.login}>
          <HandshakeOutlined fontSize="large" />
          <Typography variant="h6">Debts Setler</Typography>
        </LogoLink>
        {!error && (
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
