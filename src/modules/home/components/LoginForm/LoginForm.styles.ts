import { Link } from 'react-router-dom'
import { styled } from '@mui/material'

export const SignUpLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.light,
  textDecoration: 'none',
}))
