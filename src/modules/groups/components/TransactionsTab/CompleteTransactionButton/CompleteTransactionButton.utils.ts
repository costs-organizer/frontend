import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ApolloError, useMutation } from '@apollo/client'
import {
  CompleteTransactionMutation,
  CompleteTransactionMutationVariables,
} from 'generated/graphql'
import {
  completeTransactionMutation,
  getTranstactionsQuery,
} from 'graphql/transactions'
import { useSnackbar } from 'notistack'

export const useCompleteTransaction = (transactionId: number) => {
  const { enqueueSnackbar } = useSnackbar()
  const onError = useCallback(
    (error: ApolloError) => {
      enqueueSnackbar(error.message)
    },
    [enqueueSnackbar]
  )
  const { groupId } = useParams()

  const [completeTransaction, { loading }] = useMutation<
    CompleteTransactionMutation,
    CompleteTransactionMutationVariables
  >(completeTransactionMutation, {
    onError,
    refetchQueries: [
      {
        query: getTranstactionsQuery,
        variables: { inp: { groupId: Number(groupId) } },
      },
    ],
  })
  const handleClick = useCallback(() => {
    completeTransaction({ variables: { inp: transactionId } })
  }, [completeTransaction, transactionId])

  return { handleClick, loading }
}
