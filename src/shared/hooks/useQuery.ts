import { useMemo, useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import qs from 'qs'

const parseSearch = (search: string) =>
  qs.parse(search, {
    ignoreQueryPrefix: true,
    allowDots: true,
  })

export const useQuery = <T = qs.ParsedQs>(): T => {
  const { search } = useLocation()
  return useMemo(() => parseSearch(search) as any, [search])
}

export const useUpdateQuery = () => {
  const [, setSearchParams] = useSearchParams()
  const { state, search } = useLocation()

  const updateQuery = useCallback(
    (newParams: Record<string, any>) => {
      const oldParams = parseSearch(search)
      const newSearch = qs.stringify(
        { ...oldParams, ...newParams },
        { addQueryPrefix: true, allowDots: true }
      )
      return setSearchParams(newSearch, {
        state,
        replace: true,
      })
    },
    [search, setSearchParams, state]
  )

  return updateQuery
}
