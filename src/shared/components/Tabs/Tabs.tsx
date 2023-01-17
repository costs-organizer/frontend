import { ReactNode } from 'react'
import { Tabs as BaseTabs, Tab, styled } from '@mui/material'
import { useCurrentTab } from './Tabs.utils'

const DEFAULT_TAB = 0

const PanelsContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
}))

interface TabsProps {
  panels: ReactNode[]
  labels: string[]
}

const Tabs = ({ labels, panels }: TabsProps) => {
  const { currentTab, handleTabChange } = useCurrentTab()

  return (
    <>
      <BaseTabs value={currentTab || 0} onChange={handleTabChange}>
        {labels.map((label, index) => (
          <Tab value={index} label={label} key={`tab-label-${index}`} />
        ))}
      </BaseTabs>
      <PanelsContainer>{panels[currentTab || DEFAULT_TAB]}</PanelsContainer>
    </>
  )
}

export default Tabs
