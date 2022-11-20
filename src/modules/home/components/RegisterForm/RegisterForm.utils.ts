import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApolloError, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterMutation, RegisterMutationVariables } from 'generated/graphql'
import { registerMutation } from 'graphql/auth'
import { useSnackbar } from 'notistack'
import { object, SchemaOf, string } from 'yup'
import { paths } from 'config'

const DEFAULT_LENGTH = 8

export enum RegisterFormFields {
  Username = 'username',
  Email = 'email',
  Password = 'password',
}

export interface RegisterFormValues {
  [RegisterFormFields.Email]: string
  [RegisterFormFields.Username]: string
  [RegisterFormFields.Password]: string
}

export const defaultValues: RegisterFormValues = {
  [RegisterFormFields.Email]: '',
  [RegisterFormFields.Username]: '',
  [RegisterFormFields.Password]: '',
}

export const formSchema: SchemaOf<RegisterFormValues> = object()
  .shape({
    [RegisterFormFields.Email]: string().email().required(),
    [RegisterFormFields.Username]: string().required(),
    [RegisterFormFields.Password]: string().min(DEFAULT_LENGTH).required(),
  })
  .required()

export const useRegisterForm = () => {
  const formProps = useForm<RegisterFormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit()

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [register, data] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(registerMutation)

  const { loading } = data

  const onCompleted = useCallback(() => {
    navigate(paths.login)
  }, [navigate])
  const onError = useCallback(
    (error: ApolloError) => {
      enqueueSnackbar(error.message)
    },
    [enqueueSnackbar]
  )

  const onSubmit = useCallback(
    (values: RegisterFormValues) => {
      register({
        onError,
        onCompleted,
        variables: {
          inp: {
            email: values.email,
            name: values.username,
            password: values.password,
          },
        },
      })
    },
    [onCompleted, onError, register]
  )

  return {
    onSubmit,
    loading,
  }
}
