import { PropsWithChildren, ReactElement } from 'react'
import { render as baseRender, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from 'shared/theme'

const App = ({ children }: PropsWithChildren<{}>) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
)

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => baseRender(ui, { wrapper: App, ...options })

export * from '@testing-library/react'
