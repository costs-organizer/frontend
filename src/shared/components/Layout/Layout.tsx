import { Outlet } from 'react-router-dom'
import { Toolbar } from '@mui/material'
import TopBar from '../TopBar'
import { Container, Main } from './Layout.styles'

export interface LayoutProps {}

const Layout = (props: LayoutProps) => {
  return (
    <Container {...props}>
      <TopBar />
      <Main>
        <Toolbar />
        <Outlet />
      </Main>
    </Container>
  )
}

export default Layout
