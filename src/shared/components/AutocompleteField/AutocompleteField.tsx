import { useFormContext, useController } from 'react-hook-form'
import {
  Autocomplete,
  AutocompleteProps as BaseAutocompleteProps,
  TextField,
} from '@mui/material'
import { Entity } from 'shared/types/data'

type AutocompleteProps = BaseAutocompleteProps<
  Entity,
  boolean,
  boolean,
  boolean
>

interface AutocompleteFieldProps
  extends Omit<AutocompleteProps, 'options' | 'renderInput'> {
  name: string
  label: string
  options?: AutocompleteProps['options']
  optionsLoading: boolean
}

const AutocompleteField = (props: AutocompleteFieldProps) => {
  const { name, options, optionsLoading, ...autocompleteProps } = props
  const { control } = useFormContext()
  const {
    field: { value, onChange, ...inputProps },
    fieldState: { error },
  } = useController({ control, name })
  const noOptionsError =
    optionsLoading && options ? 'Failed to fetch options' : ''

  const getOptionSelected = (option: Entity, value: Entity) =>
    String(option.id) === String(value.id)

  return (
    <Autocomplete
      multiple={props.multiple}
      {...autocompleteProps}
      value={value}
      getOptionLabel={option =>
        typeof option === 'string' ? option : option.name
      }
      isOptionEqualToValue={getOptionSelected}
      onChange={(e, v) => onChange(v)}
      filterOptions={x => x}
      renderTags={() => null}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          error={!!error}
          helperText={error?.message || noOptionsError}
        />
      )}
      options={options || []}
      {...inputProps}
    />
  )
}

export default AutocompleteField
