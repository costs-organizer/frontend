import { useCallback } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import { paths } from 'config'
import { NotificationWrapper, RedBadge } from './styles'
import { NotificationEntryProps } from './types'

const GroupSettledNotification = ({
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
