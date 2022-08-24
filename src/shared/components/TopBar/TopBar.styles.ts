import { Link } from 'react-router-dom'
import { styled, Toolbar as BaseToolbar } from '@mui/material'

export const LogoLink = styled(Link)(({ theme }) => ({
  '& , &:visited': {
    display: 'flex',
    marginRight: theme.spacing(19),
    color: 'white',
  },
  textDecoration: 'none',

  '& :first-child': {
    marginRight: theme.spacing(1),
  },
}))

export const UserMenuContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 5.5),
}))

export const Toolbar = styled(BaseToolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})
