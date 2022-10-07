import { useState, SyntheticEvent } from 'react'

export const useCurrentTab = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    console.log(value)
    setCurrentTab(value)
  }

  return { currentTab, handleTabChange }
}
