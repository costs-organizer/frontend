import { ReactNode, SyntheticEvent, useState } from 'react'
import { Tabs as BaseTabs, Tab } from '@mui/material'
import { useCurrentTab } from './Tabs.utils'

interface TabsProps {
  panels: ReactNode[]
  labels: string[]
}

const Tabs = ({ labels, panels }: TabsProps) => {
  const { currentTab, handleTabChange } = useCurrentTab()
  return (
    <>
      <BaseTabs value={currentTab} onChange={handleTabChange}>
        {labels.map((label, index) => (
          <Tab value={index} label={label} key={`tab-label-${index}`} />
        ))}
      </BaseTabs>
      {panels[currentTab]}
    </>
  )
}

export default Tabs
