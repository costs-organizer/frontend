import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  CreateCostMutation,
  CreateCostMutationVariables,
} from 'generated/graphql'
import { createCostMutation, getCostsQuery } from 'graphql/costs'
import { array, boolean, mixed, number, object, SchemaOf, string } from 'yup'
import { Entity } from 'shared/types'
import { useCostsTabContext } from '../../utils'

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

export const useNewCostForm = (onClose: () => void) => {
  const formProps = useForm<NewCostFormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit(onClose)

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = (onClose: () => void) => {
  const { groupId } = useParams()
  const { showOnlyMy } = useCostsTabContext()

  const [createCost, { loading, error, reset }] = useMutation<
    CreateCostMutation,
    CreateCostMutationVariables
  >(createCostMutation, {
    onCompleted: () => onClose(),
    refetchQueries: [
      {
        query: getCostsQuery,
        variables: {
          inp: { groupId: Number(groupId), filterByName: showOnlyMy },
        },
      },
    ],
  })

  const onSubmit = useCallback(
    (values: NewCostFormValues) => {
      if (!groupId || !values.moneyAmount) return
      createCost({
        variables: {
          inp: {
            groupId: parseInt(groupId),
            description: values[NewCostFormFields.Description],
            moneyAmount: values.moneyAmount,
            name: values[NewCostFormFields.Name],
            participantsIds: values.participants.map(({ id }) => id),
          },
        },
      })
    },
    [createCost, groupId]
  )

  return {
    loading,
    error,
    resetSubmit: reset,
    onSubmit,
  }
}
