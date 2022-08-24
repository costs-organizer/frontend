import { styled } from '@mui/material'

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  '& > .MuiCircularProgress-root': {
    marginBottom: theme.spacing(2),
  },
}))
