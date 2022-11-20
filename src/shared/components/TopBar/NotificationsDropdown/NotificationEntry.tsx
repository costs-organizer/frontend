import { NotificationType } from 'generated/graphql'
import GroupSettledNotification from './GroupSettledNotification'
import ReminderSentNotification from './ReminderSentNotification'
import { NotificationEntryProps } from './types'

const NotificationEntry = ({
  notification,
  userId,
}: NotificationEntryProps) => {
  switch (notification.type) {
    case NotificationType.GroupSettled:
      return (
        <GroupSettledNotification notification={notification} userId={userId} />
      )
    case NotificationType.Reminder:
      return (
        <ReminderSentNotification notification={notification} userId={userId} />
      )
    case NotificationType.TransactionReceived:
      return (
        <ReminderSentNotification notification={notification} userId={userId} />
      )

    default:
      return <></>
  }
}

export default NotificationEntry
