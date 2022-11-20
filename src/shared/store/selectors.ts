import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app'
import { GetUserNotificationsQuery } from 'generated/graphql'

export const getReceivedNotifications = (state: RootState) =>
  state.notifications.receivedNotifications

export const getCombinedNotifications = (
  notifications: GetUserNotificationsQuery['notifications']
) =>
  createSelector(getReceivedNotifications, receivedNotifications => {
    const filteredReceivedNotifications = receivedNotifications.filter(
      ({ id }) => !notifications.some(notification => notification.id === id)
    )
    return [...filteredReceivedNotifications, ...notifications]
  })
