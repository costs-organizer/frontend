import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegisterMutation } from 'generated/graphql'
import { object, SchemaOf, string } from 'yup'

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
  const [register, data] = useRegisterMutation()

  const { error, isLoading } = data

  const onSubmit = useCallback(
    (values: RegisterFormValues) => {
      register({
        inp: {
          email: values.email,
          name: values.username,
          password: values.password,
        },
      })
    },
    [register]
  )

  return {
    onSubmit,
    error,
    isLoading,
  }
}
