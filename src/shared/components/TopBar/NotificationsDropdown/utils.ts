import { useLazyQuery, useSubscription } from '@apollo/client'
import {
  GetUserNotificationsQuery,
  GetUserNotificationsQueryVariables,
  ReminderNotificationSubscription,
  ReminderNotificationSubscriptionVariables,
} from 'generated/graphql'
import { reminderNotification } from 'graphql/notifications'
import { getUserNotificationsQuery } from 'graphql/notifications/getUserNotifications'
import { useSnackbar } from 'notistack'
import { addReceivedNotification, getCombinedNotifications } from 'shared/store'
import { useDispatch, useSelector } from 'shared/utils'

export const useShowBadge = () => {}

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const a = useSubscription<
    ReminderNotificationSubscription,
    ReminderNotificationSubscriptionVariables
  >(reminderNotification, {
    onSubscriptionComplete: () => console.log('complete'),
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data?.reminderSent) return
      dispatch(addReceivedNotification(subscriptionData.data?.reminderSent))
    },
  })

  // console.log(a.error, a.data)

  const [getNotifications, { data, loading: notificationsLoading }] =
    useLazyQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(
      getUserNotificationsQuery,
      {
        onError: () => enqueueSnackbar('Failed to fetch notifications'),
        fetchPolicy: 'network-only',
      }
    )

  const combinedNotifications = useSelector(
    getCombinedNotifications(data?.notifications || [])
  )

  return {
    combinedNotifications,
    getNotifications,
    notificationsLoading,
  }
}
