import { useState, useCallback, SyntheticEvent } from 'react'
import { useGetUsersQuery } from 'generated/graphql'

export const useUsersOptions = () => {
  const [inputValue, setInputValue] = useState<string>()
  const { data, isLoading } = useGetUsersQuery({
    inp: {
      search: inputValue || '',
    },
  })
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

  return { options, handleInputChange, areUserOptionsLoading: isLoading }
}
