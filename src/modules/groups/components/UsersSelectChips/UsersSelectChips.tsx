import { useFormContext, useWatch } from 'react-hook-form'
import { Grid, Chip } from '@mui/material'
import { AutocompleteField } from 'shared/components'
import { Entity } from 'shared/types'
import { useUsersOptions } from './UsersSelectChips.utils'

interface UsersSelectChipsProps {
  fieldName: string
}

const UsersSelectChips = ({ fieldName }: UsersSelectChipsProps) => {
  const { setValue } = useFormContext()
  const users = useWatch({ name: fieldName }) as Entity[] | null | undefined

  const { areUserOptionsLoading, handleInputChange, options } =
    useUsersOptions()

  return (
    <>
      <Grid item xs={12}>
        <AutocompleteField
          optionsLoading={areUserOptionsLoading}
          name={fieldName}
          label="Members"
          options={options}
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
