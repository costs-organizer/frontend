import { useCallback } from 'react'
import { useForm, UseFormSetValue } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ApolloError, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  CompleteTransactionMutation,
  CompleteTransactionMutationVariables,
  UploadTransactionConfirmationMutation,
  UploadTransactionConfirmationMutationVariables,
} from 'generated/graphql'
import {
  completeTransactionMutation,
  getTranstactionsQuery,
  uploadTransactionConfirmationMutation,
} from 'graphql/transactions'
import { useSnackbar } from 'notistack'
import { object, SchemaOf } from 'yup'

export enum TransactionConfirmationFields {
  ConfirmationFile = 'confirmationFile',
  OriginalFilename = 'originalFilename',
}

export interface TransactionConfirmationValues {
  [TransactionConfirmationFields.ConfirmationFile]: string | null
  [TransactionConfirmationFields.OriginalFilename]: string | null
}

export const defaultValues: TransactionConfirmationValues = {
  [TransactionConfirmationFields.ConfirmationFile]: null,
  [TransactionConfirmationFields.OriginalFilename]: null,
}

export const formSchema: SchemaOf<TransactionConfirmationValues> = object()
  .shape({})
  .required()

export const useTransactionConfirmationForm = (
  closeModal: () => void,
  transactionId?: number
) => {
  const formProps = useForm<TransactionConfirmationValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit(formProps.setValue, closeModal, transactionId)

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = (
  setValue: UseFormSetValue<TransactionConfirmationValues>,
  closeModal: () => void,
  transactionId?: number
) => {
  const { enqueueSnackbar } = useSnackbar()

  const onError = useCallback(
    (error: ApolloError) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    [enqueueSnackbar]
  )
  const { groupId } = useParams()

  const [completeTransaction, { loading }] = useMutation<
    CompleteTransactionMutation,
    CompleteTransactionMutationVariables
  >(completeTransactionMutation, {
    onError,
    onCompleted: () => {
      enqueueSnackbar('Confirmation succesful', { variant: 'success' })
      closeModal()
    },
    refetchQueries: [
      {
        query: getTranstactionsQuery,
        variables: { inp: { groupId: Number(groupId) } },
      },
    ],
  })

  const [uploadTransactionConfirmation] = useMutation<
    UploadTransactionConfirmationMutation,
    UploadTransactionConfirmationMutationVariables
  >(uploadTransactionConfirmationMutation, {
    onError,
    onCompleted: data =>
      setValue(
        TransactionConfirmationFields.ConfirmationFile,
        data.uploadConmfirmationFile
      ),
  })
  const onSubmit = useCallback(
    (values: TransactionConfirmationValues) => {
      console.log(values)
      if (!transactionId)
        return enqueueSnackbar('Wrong transaction', { variant: 'error' })
      completeTransaction({
        variables: {
          transactionId,
          fileURL: values[TransactionConfirmationFields.ConfirmationFile],
        },
      })
    },
    [enqueueSnackbar, transactionId, completeTransaction]
  )

  const handleFileChange = (file: File | null) => {
    if (!file) return enqueueSnackbar('Wrong file input', { variant: 'error' })
    console.log(file)
    setValue(TransactionConfirmationFields.OriginalFilename, file.name)
    uploadTransactionConfirmation({ variables: { file } })
  }

  return {
    onSubmit,
    loading,
    handleFileChange,
  }
}
