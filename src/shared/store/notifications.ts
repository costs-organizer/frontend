import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetUserNotificationsQuery,
  NotificationSentSubscription,
} from 'generated/graphql'

interface NotificationsState {
  notifications: GetUserNotificationsQuery['notifications']
  receivedNotifications: NotificationSentSubscription['notificationSent'][]
}

const initialState: NotificationsState = {
  notifications: [],
  receivedNotifications: [],
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addReceivedNotification(
      state,
      action: PayloadAction<NotificationSentSubscription['notificationSent']>
    ) {
      state.receivedNotifications.push(action.payload)
    },
    resetReceivedNotifications(state) {
      state.receivedNotifications = []
    },
  },
})

export const { addReceivedNotification, resetReceivedNotifications } =
  counterSlice.actions
export default counterSlice.reducer
