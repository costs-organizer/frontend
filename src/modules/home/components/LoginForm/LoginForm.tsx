import { FunctionComponent } from 'react'
import { Grid } from '@mui/material'
import { Form, LoadingButton, TextField } from 'shared/components'
import { LoginFormFields, useLoginForm } from './LoginForm.utils'

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const { isLoading, error, ...formProps } = useLoginForm()

  return (
    <Form {...formProps}>
      <Grid container>
        <Grid item xs={7}>
          <TextField name={LoginFormFields.Username} placeholder="username" />
        </Grid>
        <Grid item xs={7}>
          <TextField name={LoginFormFields.Password} placeholder="password" />
        </Grid>
        <Grid item xs={7}>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Login!
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  )
}

export default LoginForm
