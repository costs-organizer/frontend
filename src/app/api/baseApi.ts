import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from 'graphql-request'
import config from 'config'

export const client = new GraphQLClient(config.apiUrl, {
  credentials: 'include',
  mode: 'cors',
})

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: () => ({}),
})
