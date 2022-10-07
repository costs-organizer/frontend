import { FunctionComponent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import { paths } from 'config'
import { Form, LoadingButton, TextField } from 'shared/components'
import { LoginFormFields, useLoginForm } from './LoginForm.utils'

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const { isSuccess, isLoading, error, ...formProps } = useLoginForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate(paths.groups)
  }, [isSuccess, navigate])

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
