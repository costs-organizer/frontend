import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import { paths } from 'config'
import { generatePathWithQuery } from 'shared/utils'
import { NotificationWrapper, RedBadge } from './styles'
import { NotificationEntryProps } from './types'

const GroupSettledNotification = ({
  notification,
  userId,
  onNotificationClick,
}: NotificationEntryProps) => {
  const navigate = useNavigate()
  const redirectionPath = generatePathWithQuery({
    path: paths.group,
    params: {
      groupId: notification.group.id.toString(),
    },
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
        {notification.group.name}
      </Grid>
      <Grid item xs={7}>
        Has all debts resolved
      </Grid>
    </NotificationWrapper>
  )
}

export default GroupSettledNotification
