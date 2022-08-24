import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { Loader } from 'shared/components'
import theme from 'shared/theme'
import AppRoutes from './App.routes'
import { store, history } from './App.store'

const App = () => (
  <Provider store={store}>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <HistoryRouter history={history}>
            <AppRoutes />
          </HistoryRouter>
        </Suspense>
      </ThemeProvider>
    </SnackbarProvider>
  </Provider>
)

export default App
