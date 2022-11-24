import { useCallback } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import { Grid } from '@mui/material'
import { paths } from 'config'
import { NotificationWrapper, RedBadge } from './styles'
import { NotificationEntryProps } from './types'

const TransactionReceivedNotification = ({
  notification,
  userId,
  onNotificationClick,
}: NotificationEntryProps) => {
  const navigate = useNavigate()
  const redirectionPath = generatePath(paths.group, {
    groupId: notification.group.id.toString(),
  })
  const handleClick = useCallback(() => {
    onNotificationClick(notification.id)
    navigate(redirectionPath)
  }, [navigate, notification.id, onNotificationClick, redirectionPath])

  return (
    <NotificationWrapper item container onClick={handleClick}>
      <Grid item xs={1}>
        <RedBadge showBadge={!notification.readBy.includes(userId)} />
      </Grid>
      <Grid item xs={4}>
        {notification.createdBy.username}
      </Grid>
      <Grid item xs={7}>
        Has paid you back in <strong>{notification.group.name}</strong>
      </Grid>
    </NotificationWrapper>
  )
}

export default TransactionReceivedNotification
