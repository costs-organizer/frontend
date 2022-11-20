import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetUserNotificationsQuery,
  ReminderNotificationSubscription,
} from 'generated/graphql'

interface NotificationsState {
  notifications: GetUserNotificationsQuery['notifications']
  receivedNotifications: ReminderNotificationSubscription['reminderSent'][]
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
      action: PayloadAction<ReminderNotificationSubscription['reminderSent']>
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
