import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateCostMutation } from 'generated/graphql'
import { array, boolean, mixed, number, object, SchemaOf, string } from 'yup'
import { Entity } from 'shared/types'

export enum NewCostFormFields {
  Name = 'name',
  Description = 'description',
  Participants = 'participants',
  MoneyAmount = 'moneyAmount',
  IncludeMe = 'includeMe',
}

export interface NewCostFormValues {
  [NewCostFormFields.Description]: string
  [NewCostFormFields.Name]: string
  [NewCostFormFields.Participants]: Entity[]
  [NewCostFormFields.IncludeMe]: boolean
  [NewCostFormFields.MoneyAmount]?: number
}

export const defaultValues: NewCostFormValues = {
  description: '',
  name: '',
  participants: [],
  includeMe: false,
}

export const formSchema: SchemaOf<NewCostFormValues> = object()
  .shape({
    [NewCostFormFields.Description]: string(),
    [NewCostFormFields.Name]: string().required(),
    [NewCostFormFields.Participants]: array().of(mixed<Entity>()).min(1),
    [NewCostFormFields.IncludeMe]: boolean(),
    [NewCostFormFields.MoneyAmount]: number().required(),
  })
  .required()

export const useNewCostForm = () => {
  const formProps = useForm<NewCostFormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit()

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = () => {
  const { groupId } = useParams()
  const [createCost, { isLoading, isSuccess, error, reset }] =
    useCreateCostMutation()

  const onSubmit = useCallback(
    (values: NewCostFormValues) => {
      if (!groupId || !values.moneyAmount) return
      createCost({
        inp: {
          groupId: parseInt(groupId),
          description: values[NewCostFormFields.Description],
          moneyAmount: values.moneyAmount,
          name: values[NewCostFormFields.Name],
          participantsIds: values.participants.map(({ id }) => id),
        },
      })
    },
    [createCost, groupId]
  )

  return {
    isLoading,
    isSuccess,
    error,
    resetSubmit: reset,
    onSubmit,
  }
}
