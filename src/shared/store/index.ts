import auth from './auth'

export const reducers = {
  [auth.reducerPath]: auth.reducer,
  // <-- reducers-end -->
}

export const middleware = [
  auth.middleware,
  // <-- middleware-end -->
]

export {
  auth,
  // <-- exports-end -->
}
