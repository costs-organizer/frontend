import { FunctionComponent } from 'react'
import { Grid } from '@mui/material'
import { Form, LoadingButton, TextField } from 'shared/components'
import { RegisterFormFields, useRegisterForm } from './RegisterForm.utils'

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
  const { isLoading, error, ...formProps } = useRegisterForm()
  console.log(isLoading, error)
  return (
    <Form {...formProps}>
      <Grid container>
        <Grid item xs={7}>
          <TextField
            name={RegisterFormFields.Username}
            placeholder="username"
          />
        </Grid>
        <Grid item xs={7}>
          <TextField name={RegisterFormFields.Email} placeholder="email" />
        </Grid>
        <Grid item xs={7}>
          <TextField
            name={RegisterFormFields.Password}
            placeholder="password"
          />
        </Grid>
        <Grid item xs={7}>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Register!
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  )
}

export default RegisterForm
