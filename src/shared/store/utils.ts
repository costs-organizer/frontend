import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { apiUrl } from 'shared/utils'
import { StorageManager } from '../services'

const storageManager = new StorageManager()

export const createBaseQuery = (url: string, args: FetchBaseQueryArgs = {}) =>
  fetchBaseQuery({
    baseUrl: apiUrl(url),
    prepareHeaders: headers => {
      const token = storageManager.getAuthToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
    ...args,
  })
