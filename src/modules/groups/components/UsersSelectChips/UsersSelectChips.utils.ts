import { useState, useCallback, SyntheticEvent } from 'react'
import { useQuery } from '@apollo/client'
import { GetUsersQuery, GetUsersQueryVariables } from 'generated/graphql'
import { getUsersQuery } from 'graphql/users'

export const useUsersOptions = () => {
  const [inputValue, setInputValue] = useState<string>()
  const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(
    getUsersQuery,
    {
      variables: {
        inp: {
          search: inputValue || '',
        },
      },
    }
  )
  const handleInputChange = useCallback(
    (event: SyntheticEvent, newInputValue: string) => {
      setInputValue(newInputValue)
    },
    []
  )

  const options = data?.users.map(({ id, username }) => ({
    id,
    name: username,
  }))

  return { options, handleInputChange, areUserOptionsLoading: loading }
}
