import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import { useLoginMutation } from 'shared/store/auth'

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
  const [login, data] = useLoginMutation()

  const { isLoading, error } = data
  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      login({
        inp: {
          name: values[LoginFormFields.Username],
          password: values[LoginFormFields.Password],
        },
      })
    },
    [login]
  )

  return {
    onSubmit,
    isLoading,
    error,
  }
}
