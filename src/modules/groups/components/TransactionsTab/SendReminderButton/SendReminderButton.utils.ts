import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { MutationSendReminderArgs } from 'generated/graphql'
import { sendReminderMutation } from 'graphql/notifications'
import { useSnackbar } from 'notistack'

export const useReminderSending = (transactionId: number) => {
  const { enqueueSnackbar } = useSnackbar()
  const [sendReminder, { loading, data }] =
    useMutation<MutationSendReminderArgs>(sendReminderMutation, {
      onCompleted: () => enqueueSnackbar('Reminder Sent', { variant: 'info' }),
    })

  const handleReminderSending = useCallback(() => {
    sendReminder({ variables: { transactionId } })
  }, [sendReminder, transactionId])

  return { handleReminderSending, loading, isCompleted: !!data }
}
