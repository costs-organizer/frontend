import { NotificationType } from 'generated/graphql'
import GroupSettledNotification from './GroupSettledNotification'
import ReminderSentNotification from './ReminderSentNotification'
import { NotificationEntryProps } from './types'

const NotificationEntry = (props: NotificationEntryProps) => {
  switch (props.notification.type) {
    case NotificationType.GroupSettled:
      return <GroupSettledNotification {...props} />
    case NotificationType.Reminder:
      return <ReminderSentNotification {...props} />
    case NotificationType.TransactionReceived:
      return <ReminderSentNotification {...props} />

    default:
      return <></>
  }
}

export default NotificationEntry
