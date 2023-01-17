import { styled, Typography } from '@mui/material'

export const ModalWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}))

export const Title = styled(Typography)({
  fontWeight: 700,
})
