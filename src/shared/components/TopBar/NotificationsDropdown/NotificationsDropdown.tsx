import { MouseEvent, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { Notifications } from '@mui/icons-material'
import { Badge, Grid, IconButton, Popover } from '@mui/material'
import { MeQuery } from 'generated/graphql'
import { meQuery } from 'graphql/auth'
import { resetReceivedNotifications } from 'shared/store'
import { useModal } from 'shared/utils'
import NotificationEntry from './NotificationEntry'
import { useNotifications } from './utils'

const NotificationsDropdown = () => {
  const { handleClose, handleOpen, isOpen, anchorEl } = useModal()
  const { data: userData } = useQuery<MeQuery>(meQuery)
  const {
    combinedNotifications,
    getNotifications,
    unreadCount,
    readNotifications,
  } = useNotifications()

  const handlePopoverOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      resetReceivedNotifications()
      handleOpen(event)
      getNotifications()
    },
    [getNotifications, handleOpen]
  )

  const handleNotficationClick = (notificationId: number) => {
    readNotifications({ variables: { notificationsIds: [notificationId] } })
    handleClose()
  }

  if (!userData?.me.id) return null

  return (
    <>
      <IconButton onClick={handlePopoverOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <Notifications style={{ color: 'white' }} />
        </Badge>
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container width={500}>
          {combinedNotifications.map((notification, index) => (
            <NotificationEntry
              key={`notification-${index}`}
              notification={notification}
              userId={userData?.me.id}
              onNotificationClick={handleNotficationClick}
            />
          ))}
        </Grid>
      </Popover>
    </>
  )
}

export default NotificationsDropdown
