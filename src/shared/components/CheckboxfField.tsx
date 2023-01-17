import { ReactNode } from 'react'
import { useFormContext, useController } from 'react-hook-form'
import {
  Checkbox,
  FormControlLabelProps,
  FormControlLabel,
} from '@mui/material'

export type CheckBoxFieldProps = Partial<FormControlLabelProps> & {
  name: string
  label?: ReactNode
  multiple?: boolean
  value?: string | number | boolean
}

const CheckboxField = ({
  name,
  value,
  label = '',
  multiple = false,
  ...props
}: CheckBoxFieldProps) => {
  const { control, setValue } = useFormContext()
  const {
    field: { ref },
    field,
  } = useController({ control, name })

  const isChecked = multiple ? field.value.includes(value) : !!field.value

  const handleChange = () => {
    if (!multiple) return setValue(name, !field.value, { shouldDirty: true })

    return setValue(
      name,
      isChecked
        ? field.value.filter((v: string) => v !== value)
        : [...field.value, value],
      { shouldDirty: true }
    )
  }

  return (
    <FormControlLabel
      inputRef={ref}
      label={label}
      onChange={handleChange}
      checked={isChecked}
      control={<Checkbox name={name} color="primary" size="small" />}
      {...props}
    />
  )
}

export default CheckboxField
