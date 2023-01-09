import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  EditUserMutation,
  EditUserMutationVariables,
  GetCurrentUserInfoQuery,
  GetCurrentUserInfoQueryVariables,
} from 'generated/graphql'
import { editUserMutation, getCurrentUserInfoQuery } from 'graphql/users'
import { validateIBAN } from 'ibantools'
import { useSnackbar } from 'notistack'
import { boolean, object, SchemaOf, string } from 'yup'

const DEFAULT_LENGTH = 8

export enum UserInfoFields {
  Username = 'username',
  Email = 'email',
  OldPassword = 'old-password',
  NewPassword = 'new-password',
  Phone = 'phone',
  IBAN = 'iban',
  ChangePassword = 'change-password',
}

export interface UserInfoValues {
  [UserInfoFields.Email]: string
  [UserInfoFields.Username]: string
  [UserInfoFields.ChangePassword]: boolean
  [UserInfoFields.OldPassword]: string
  [UserInfoFields.NewPassword]: string
  [UserInfoFields.IBAN]: string
  [UserInfoFields.Phone]: string
}

export const getDefaultValues = (
  data?: GetCurrentUserInfoQuery['me']
): UserInfoValues => {
  return {
    [UserInfoFields.Email]: data?.email || '',
    [UserInfoFields.Username]: data?.username || '',
    [UserInfoFields.OldPassword]: '',
    [UserInfoFields.NewPassword]: '',
    [UserInfoFields.ChangePassword]: false,
    [UserInfoFields.Phone]: data?.phone || '',
    [UserInfoFields.IBAN]: data?.IBAN || '',
  }
}

export const formSchema: SchemaOf<UserInfoValues> = object()
  .shape({
    [UserInfoFields.Email]: string().email().required(),
    [UserInfoFields.Username]: string().required(),
    [UserInfoFields.ChangePassword]: boolean(),
    [UserInfoFields.OldPassword]: string().when(
      [UserInfoFields.ChangePassword],
      shouldChangePassword => {
        if (!shouldChangePassword) return string().nullable()

        return string().min(DEFAULT_LENGTH).required('required')
      }
    ),
    [UserInfoFields.NewPassword]: string().when(
      [UserInfoFields.ChangePassword, UserInfoFields.OldPassword],
      (shouldChangePassword, oldPassword) => {
        if (!shouldChangePassword) return string().nullable()

        return string()
          .min(DEFAULT_LENGTH)
          .test((value?: string) => oldPassword !== value)
      }
    ),
    [UserInfoFields.IBAN]: string().test(value =>
      !value ? true : validateIBAN(value).valid
    ),
    [UserInfoFields.Phone]: string().matches(/^\+\d{11,14}$/, {
      excludeEmptyString: true,
      message:
        'Phone number must start with + and have between 11 and 14 digits',
    }),
  })
  .required()

export const useUserInfoForm = () => {
  const formProps = useForm<UserInfoValues>({
    defaultValues: getDefaultValues(),
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const { loading: userInfoLoading } = useQuery<
    GetCurrentUserInfoQuery,
    GetCurrentUserInfoQueryVariables
  >(getCurrentUserInfoQuery, {
    onCompleted: data => {
      formProps.reset(getDefaultValues(data.me))
    },
  })

  const submitProps = useOnSubmit()
  const loading = userInfoLoading || submitProps.loading

  return { ...formProps, ...submitProps, loading }
}

export const useOnSubmit = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [editUser, { loading }] = useMutation<
    EditUserMutation,
    EditUserMutationVariables
  >(editUserMutation)

  const { data } = useQuery<
    GetCurrentUserInfoQuery,
    GetCurrentUserInfoQueryVariables
  >(getCurrentUserInfoQuery)

  const onCompleted = useCallback(() => {
    enqueueSnackbar('Changes saved successfully')
  }, [enqueueSnackbar])
  const onError = useCallback(
    (error: ApolloError) => {
      enqueueSnackbar(error.message)
    },
    [enqueueSnackbar]
  )

  const onSubmit = useCallback(
    (values: UserInfoValues) => {
      if (!data?.me.id) return

      editUser({
        onError,
        onCompleted,
        variables: {
          inp: {
            email: values[UserInfoFields.Email],
            id: data?.me.id,
            username: values[UserInfoFields.Username],
            IBAN: values[UserInfoFields.IBAN] || null,
            phone: values[UserInfoFields.Phone] || null,
            ...(values[UserInfoFields.ChangePassword] && {
              oldPassword: values[UserInfoFields.OldPassword],
              newPassword: values[UserInfoFields.NewPassword],
            }),
          },
        },
      })
    },
    [data?.me, editUser, onError, onCompleted]
  )

  return {
    onSubmit,
    loading,
  }
}
