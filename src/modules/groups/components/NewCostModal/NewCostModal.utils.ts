import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  CreateCostMutation,
  CreateCostMutationVariables,
  EditCostMutation,
  EditCostMutationVariables,
  GetCostsQuery,
} from 'generated/graphql'
import {
  createCostMutation,
  editCostMutation,
  getCostsQuery,
} from 'graphql/costs'
import { useSnackbar } from 'notistack'
import { array, boolean, mixed, number, object, SchemaOf, string } from 'yup'
import { Entity } from 'shared/types'
import { ArrayElement } from 'shared/utils'
import { useCostsTabContext } from '../../utils'

export type CostType = ArrayElement<GetCostsQuery['costs']>

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

export const getDefaultValues = (cost?: CostType | null): NewCostFormValues => {
  return {
    description: cost?.description || '',
    name: cost?.name || '',
    participants:
      cost?.participants.map(({ id, username }) => ({
        id: id,
        name: username,
      })) || [],
    moneyAmount: cost?.moneyAmount || undefined,
    includeMe: false,
  }
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

export const useNewCostForm = (onClose: () => void, cost?: CostType | null) => {
  const formProps = useForm<NewCostFormValues>({
    defaultValues: getDefaultValues(cost),
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
  })

  const submitProps = useOnSubmit(onClose, cost)

  return { ...formProps, ...submitProps }
}

export const useOnSubmit = (onClose: () => void, cost?: CostType | null) => {
  const { groupId } = useParams()
  const { showOnlyMy } = useCostsTabContext()

  const { enqueueSnackbar } = useSnackbar()

  const [createCost, { loading: creating }] = useMutation<
    CreateCostMutation,
    CreateCostMutationVariables
  >(createCostMutation, {
    onCompleted: () => onClose(),
    onError: error => enqueueSnackbar(error.message),
    refetchQueries: [
      {
        query: getCostsQuery,
        variables: {
          inp: { groupId: Number(groupId), filterByName: showOnlyMy },
        },
      },
    ],
  })

  const [editCost, { loading: editing }] = useMutation<
    EditCostMutation,
    EditCostMutationVariables
  >(editCostMutation, {
    onCompleted: () => onClose(),
    onError: error => enqueueSnackbar(error.message),
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

      if (cost?.id) {
        return editCost({
          variables: {
            inp: {
              costId: cost.id,
              description: values[NewCostFormFields.Description],
              moneyAmount: values.moneyAmount,
              name: values[NewCostFormFields.Name],
              participantsIds: values.participants.map(({ id }) => id),
            },
          },
        })
      }

      return createCost({
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
    [cost, createCost, editCost, groupId]
  )

  return {
    loading: creating || editing,
    onSubmit,
  }
}
