import { Grid, styled } from '@mui/material'

export const FormWrapper = styled(Grid)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  '&>div': {
    paddingTop: theme.spacing(1),
  },
}))
