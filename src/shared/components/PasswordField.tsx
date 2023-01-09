import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, IconButton } from '@mui/material'
import TextField, { TextFieldProps } from './TextField'

type PasswordFieldProps = TextFieldProps & {}

const PasswordField = (props: PasswordFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const toggleIsPasswordVisible = () =>
    setIsPasswordVisible(isVisible => !isVisible)

  return (
    <TextField
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={toggleIsPasswordVisible}
              edge="end"
              data-test-id="peek-password-button"
              size="large"
            >
              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default PasswordField
