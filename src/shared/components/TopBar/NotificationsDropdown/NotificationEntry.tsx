import { NotificationType } from 'generated/graphql'
import GroupSettledNotification from './GroupSettledNotification'
import ReminderSentNotification from './ReminderSentNotification'
import TransactionReceivedNotification from './TransactionReceivedNotification'
import { NotificationEntryProps } from './types'

const NotificationEntry = (props: NotificationEntryProps) => {
  switch (props.notification.type) {
    case NotificationType.GroupSettled:
      return <GroupSettledNotification {...props} />
    case NotificationType.Reminder:
      return <ReminderSentNotification {...props} />
    case NotificationType.TransactionReceived:
      return <TransactionReceivedNotification {...props} />

    default:
      return <></>
  }
}

export default NotificationEntry
