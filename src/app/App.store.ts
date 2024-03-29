import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'
import notificationsReducer from 'shared/store/notifications'
import { api } from '../app/api/baseApi'

const { createReduxHistory, routerReducer, routerMiddleware } =
  createReduxHistoryContext({ history: createBrowserHistory() })

const rootReducer = combineReducers({
  api: api.reducer,
  router: routerReducer,
  notifications: notificationsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      routerMiddleware,
      api.middleware
    ) as Middleware[],
})

setupListeners(store.dispatch)

// const useDispatch =

export const history = createReduxHistory(store)

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
