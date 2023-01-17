import { SyntheticEvent } from 'react'
import { useQuery, useUpdateQuery } from 'shared/hooks'

export const useCurrentTab = () => {
  const { currentTab } = useQuery<{ currentTab?: number }>()
  const updateQuery = useUpdateQuery()
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    updateQuery({ currentTab: value })
  }

  return { currentTab: Number(currentTab), handleTabChange }
}
