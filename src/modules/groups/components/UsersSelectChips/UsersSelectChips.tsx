import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Grid, Chip } from '@mui/material'
import { AutocompleteField } from 'shared/components'
import { Entity } from 'shared/types'
import { useUsersOptions } from './UsersSelectChips.utils'

interface UsersSelectChipsProps {
  fieldName: string
  defaultOptions?: Entity[]
  excludeMe?: boolean
}

const UsersSelectChips = ({
  fieldName,
  defaultOptions,
}: UsersSelectChipsProps) => {
  const { setValue } = useFormContext()
  const users = useWatch({ name: fieldName }) as Entity[] | null | undefined

  const { areUserOptionsLoading, handleInputChange, options } =
    useUsersOptions()

  const inputOptions = useMemo(
    () => defaultOptions || options,
    [options, defaultOptions]
  )

  return (
    <>
      <Grid item xs={12}>
        <AutocompleteField
          optionsLoading={areUserOptionsLoading}
          name={fieldName}
          label="Members"
          options={inputOptions}
          onInputChange={handleInputChange}
          multiple
        />
      </Grid>
      <Grid container item xs={12}>
        {users?.map((user, index) => (
          <Grid key={`user-${index}`} item>
            <Chip
              label={user.name}
              color="primary"
              onDelete={() =>
                setValue(
                  fieldName,
                  (users || []).filter(
                    selectedUser => selectedUser?.id !== user?.id
                  ) as Entity[]
                )
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UsersSelectChips
