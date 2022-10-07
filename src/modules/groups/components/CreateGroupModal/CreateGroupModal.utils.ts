import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateGroupMutation } from 'generated/graphql'
import { array, mixed, object, SchemaOf, string } from 'yup'
import { Entity } from 'shared/types/data'

export enum NewGroupFields {
  Name = 'name',
  Members = 'members',
}

export interface NewGroupValues {
  [NewGroupFields.Members]: Entity[]
  [NewGroupFields.Name]: string
}

export const defaultValues: NewGroupValues = {
  [NewGroupFields.Members]: [],
  [NewGroupFields.Name]: '',
}

export const formSchema: SchemaOf<NewGroupValues> = object()
  .shape({
    [NewGroupFields.Members]: array().of(mixed<Entity>()).required(),
    [NewGroupFields.Name]: string().required(),
  })
  .required()

export const useNewGroupForm = () => {
  const formProps = useForm<NewGroupValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit()

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = () => {
  const [createGroup, { isLoading, isSuccess, error, data }] =
    useCreateGroupMutation()

  const onSubmit = useCallback(
    ({ members, name }: NewGroupValues) => {
      createGroup({ inp: { name, userIds: members.map(({ id }) => id) } })
    },
    [createGroup]
  )

  return {
    onSubmit,
    isLoading,
    isSuccess,
    error,
    newGroupId: data?.createGroup,
  }
}
