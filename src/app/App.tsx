import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createClient } from 'graphql-ws'
import { SnackbarProvider } from 'notistack'
import { Loader } from 'shared/components'
import theme from 'shared/theme'
import AppRoutes from './App.routes'
import { store, history } from './App.store'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
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
