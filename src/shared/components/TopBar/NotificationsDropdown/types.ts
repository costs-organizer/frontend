import { GetUserNotificationsQuery } from 'generated/graphql'
import { ArrayElement } from 'shared/utils'

export type QueryNotification = ArrayElement<
  GetUserNotificationsQuery['notifications']
>

export interface NotificationEntryProps {
  notification: QueryNotification
  userId: number
  onNotificationClick: (notificationId: number) => void
}
