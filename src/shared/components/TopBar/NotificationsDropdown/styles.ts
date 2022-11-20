import { Grid, styled } from '@mui/material'

interface RedBadgeProps {
  showBadge: boolean
}

export const RedBadge = styled('div')<RedBadgeProps>(({ showBadge }) => ({
  display: showBadge ? 'block' : 'none',
  height: 10,
  width: 10,
  borderRadius: '50%',
  border: '1px solid black',
  background: 'red',
  marginTop: '0.4em',
  marginLeft: '0.7em',
}))

export const NotificationWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
}))
