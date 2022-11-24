import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApolloError, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginMutation, LoginMutationVariables } from 'generated/graphql'
import { loginMutation, meQuery } from 'graphql/auth'
import { useSnackbar } from 'notistack'
import { object, SchemaOf, string } from 'yup'
import { paths } from 'config'

export enum LoginFormFields {
  Username = 'username',
  Password = 'password',
}

export interface LoginFormValues {
  [LoginFormFields.Username]: string
  [LoginFormFields.Password]: string
}

export const defaultValues: LoginFormValues = {
  password: '',
  username: '',
}

export const formSchema: SchemaOf<LoginFormValues> = object()
  .shape({
    [LoginFormFields.Password]: string().required(),
    [LoginFormFields.Username]: string().required(),
  })
  .required()

export const useLoginForm = () => {
  const formProps = useForm<LoginFormValues>({
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
  const [login, data] = useMutation<LoginMutation, LoginMutationVariables>(
    loginMutation,
    { refetchQueries: [{ query: meQuery }] }
  )

  const { loading } = data
  const onCompleted = useCallback(() => {
    navigate(paths.groups, { replace: true })
  }, [navigate])
  const onError = useCallback(
    (error: ApolloError) => {
      enqueueSnackbar(error.message)
    },
    [enqueueSnackbar]
  )
  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      login({
        refetchQueries: [{ query: meQuery }],
        onCompleted,
        onError,
        variables: {
          inp: {
            name: values[LoginFormFields.Username],
            password: values[LoginFormFields.Password],
          },
        },
      })
    },
    [login, onCompleted, onError]
  )

  return {
    onSubmit,
    loading,
  }
}
