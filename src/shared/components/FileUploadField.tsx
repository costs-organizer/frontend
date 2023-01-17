import { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { useController, useFormContext } from 'react-hook-form'

interface FileUploadFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (file: File | null) => void
}

const FileUploadField = ({
  name = '',
  onChange,
  ...props
}: FileUploadFieldProps) => {
  const { control } = useFormContext()
  const {
    field: { onChange: onFieldChange, ...inputProps },
  } = useController({ control, name })

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { files },
    } = event
    onFieldChange(event)
    if (files) {
      console.log(files[0])
      return onChange(files[0])
    }
  }

  return <input {...inputProps} {...props} onChange={handleChange} />
}

export default FileUploadField
