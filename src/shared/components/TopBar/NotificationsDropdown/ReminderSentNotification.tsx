import { useCallback } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import { paths } from 'config'
import { NotificationWrapper, RedBadge } from './styles'
import { NotificationEntryProps } from './types'

const ReminderSentNotification = ({
  notification,
  userId,
}: NotificationEntryProps) => {
  const navigate = useNavigate()
  const redirectionPath = generatePath(paths.group, {
    groupId: notification.group.id.toString(),
  })
  const handleClick = useCallback(() => {
    navigate(redirectionPath)
  }, [navigate, redirectionPath])

  return (
    <NotificationWrapper item container onClick={handleClick}>
      <Grid item xs={1}>
        <RedBadge
          showBadge={notification.receivers
            .map(({ id }) => id)
            .includes(userId)}
        />
      </Grid>
      <Grid item xs={11}>
        {notification.createdBy.username} has sent you reminder in{' '}
        <strong>{notification.group.name}</strong>
      </Grid>
    </NotificationWrapper>
  )
}

export default ReminderSentNotification