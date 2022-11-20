import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { MutationSendReminderArgs } from 'generated/graphql'
import { sendReminderMutation } from 'graphql/notifications'

export const useReminderSending = (transactionId: number) => {
  const [sendReminder, { loading, data }] =
    useMutation<MutationSendReminderArgs>(sendReminderMutation)

  const handleReminderSending = useCallback(() => {
    sendReminder({ variables: { transactionId } })
  }, [sendReminder, transactionId])

  return { handleReminderSending, loading, isCompleted: !!data }
}
