import { styled } from '@mui/material'

export const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}))

export const Container = styled('div')({
  display: 'flex',
})
