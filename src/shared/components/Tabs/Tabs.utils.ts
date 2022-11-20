import { useState, SyntheticEvent } from 'react'

export const useCurrentTab = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setCurrentTab(value)
  }

  return { currentTab, handleTabChange }
}
