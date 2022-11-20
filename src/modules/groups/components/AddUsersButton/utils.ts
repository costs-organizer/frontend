import { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AddUserToGroupMutation,
  AddUserToGroupMutationVariables,
} from 'generated/graphql'
import { addUserToGroupMutation } from 'graphql/groups'
import { array, mixed, object, SchemaOf } from 'yup'
import { Entity } from 'shared/types'

export enum AddMembersFormFields {
  Users = 'users',
}

export interface AddMembersFormValues {
  [AddMembersFormFields.Users]: Entity[]
}

export const defaultValues: AddMembersFormValues = {
  [AddMembersFormFields.Users]: [],
}

export const formSchema: SchemaOf<AddMembersFormValues> = object()
  .shape({
    [AddMembersFormFields.Users]: array().of(mixed<Entity>()),
  })
  .required()

export const useAddMembersForm = (handleClose: () => void) => {
  const formProps = useForm<AddMembersFormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit(handleClose)

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = (handleClose: () => void) => {
  const { groupId } = useParams()
  const [addMembersToGroup, { loading, error }] = useMutation<
    AddUserToGroupMutation,
    AddUserToGroupMutationVariables
  >(addUserToGroupMutation, {
    onCompleted: handleClose,
  })

  const onSubmit = useCallback(
    (values: AddMembersFormValues) => {
      addMembersToGroup({
        variables: {
          inp: {
            groupId: Number(groupId),
            userIds: values[AddMembersFormFields.Users].map(({ id }) => id),
          },
        },
      })
    },
    [addMembersToGroup, groupId]
  )

  return { onSubmit, loading, error }
}
