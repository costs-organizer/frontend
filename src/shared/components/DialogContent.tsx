import { Grid, styled } from '@mui/material'

export const DialogContent = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 3.5),

  '&>div': {
    paddingBottom: theme.spacing(2),
  },
}))
