import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client'
import {
  GetUnreadCountQuery,
  GetUnreadCountQueryVariables,
  GetUserNotificationsQuery,
  GetUserNotificationsQueryVariables,
  NotificationSentSubscription,
  NotificationSentSubscriptionVariables,
  ReadNotificationsMutation,
  ReadNotificationsMutationVariables,
} from 'generated/graphql'
import {
  getUnreadCountQuery,
  readNotificationsMutation,
} from 'graphql/notifications'
import { getUserNotificationsQuery } from 'graphql/notifications/getUserNotifications'
import { notificationSentSubscription } from 'graphql/notifications/notificationSent'
import { useSnackbar } from 'notistack'
import {
  addReceivedNotification,
  getCombinedNotifications,
  getUnreadCount,
} from 'shared/store'
import { useDispatch, useSelector } from 'shared/utils'

export const useShowBadge = () => {}

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const a = useSubscription<
    NotificationSentSubscription,
    NotificationSentSubscriptionVariables
  >(notificationSentSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data?.notificationSent) return
      dispatch(addReceivedNotification(subscriptionData.data?.notificationSent))
    },
  })

  const [getNotifications, { data, loading: notificationsLoading }] =
    useLazyQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(
      getUserNotificationsQuery,
      {
        onError: () => enqueueSnackbar('Failed to fetch notifications'),
        fetchPolicy: 'network-only',
      }
    )

  const { data: initialUnreadCount, refetch: refetchUnreadCount } = useQuery<
    GetUnreadCountQuery,
    GetUnreadCountQueryVariables
  >(getUnreadCountQuery)
  const combinedNotifications = useSelector(
    getCombinedNotifications(data?.notifications || [])
  )

  const unreadCount = useSelector(
    getUnreadCount(initialUnreadCount?.getUnreadCount)
  )

  const [readNotifications] = useMutation<
    ReadNotificationsMutation,
    ReadNotificationsMutationVariables
  >(readNotificationsMutation, {
    refetchQueries: [{ query: getUnreadCountQuery }],
  })

  return {
    combinedNotifications,
    getNotifications,
    refetchUnreadCount,
    notificationsLoading,
    unreadCount,
    readNotifications,
  }
}
