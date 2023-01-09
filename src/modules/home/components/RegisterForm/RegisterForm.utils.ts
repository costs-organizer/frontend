import { useCallback } from 'react'
import { useForm, UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApolloError, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterMutation, RegisterMutationVariables } from 'generated/graphql'
import { registerMutation } from 'graphql/auth'
import { validateIBAN } from 'ibantools'
import { object, SchemaOf, string } from 'yup'
import { paths } from 'config'

const DEFAULT_LENGTH = 8

export enum RegisterFormFields {
  Username = 'username',
  Email = 'email',
  Password = 'password',
  Phone = 'phone',
  IBAN = 'iban',
}

export interface RegisterFormValues {
  [RegisterFormFields.Email]: string
  [RegisterFormFields.Username]: string
  [RegisterFormFields.Password]: string
  [RegisterFormFields.IBAN]: string
  [RegisterFormFields.Phone]: string
}

export const defaultValues: RegisterFormValues = {
  [RegisterFormFields.Email]: '',
  [RegisterFormFields.Username]: '',
  [RegisterFormFields.Password]: '',
  [RegisterFormFields.IBAN]: '',
  [RegisterFormFields.Phone]: '',
}

export const formSchema: SchemaOf<RegisterFormValues> = object()
  .shape({
    [RegisterFormFields.Email]: string().email().required(),
    [RegisterFormFields.Username]: string().required(),
    [RegisterFormFields.Password]: string().min(DEFAULT_LENGTH).required(),
    [RegisterFormFields.IBAN]: string()
      .test(value => (!value ? true : validateIBAN(value).valid))
      .nullable(),
    [RegisterFormFields.Phone]: string()
      .matches(/^\+\d{11,14}$/, { excludeEmptyString: true })
      .nullable(),
  })
  .required()

export const useRegisterForm = () => {
  const formProps = useForm<RegisterFormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit(formProps.setError)

  return { ...formProps, ...submitProps }
}

const getErrorField = (message: string) => {
  switch (message) {
    case 'email':
      return RegisterFormFields.Email
    case 'username':
      return RegisterFormFields.Username
    case 'phone':
      return RegisterFormFields.Phone
    default:
      return RegisterFormFields.Phone
  }
}

export const useOnSubmit = (setError: UseFormSetError<RegisterFormValues>) => {
  const navigate = useNavigate()
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
      const fieldToSet = getErrorField(error.message)
      setError(fieldToSet, { message: `Such ${fieldToSet} already exists` })
    },
    [setError]
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
            IBAN: values.iban || null,
            phone: values.phone || null,
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
