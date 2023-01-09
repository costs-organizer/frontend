import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { SnackbarProvider } from 'notistack'
import { Loader } from 'shared/components'
import theme from 'shared/theme'
import AppRoutes from './App.routes'
import { store, history } from './App.store'

const httpLink = createUploadLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: 'include',
}) as unknown as ApolloLink

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_WS_URL || '',
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'network-only' },
  },
})

const App = () => (
  <ApolloProvider client={client}>
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
  </ApolloProvider>
)

export default App
