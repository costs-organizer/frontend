import { FunctionComponent } from 'react'
import { Grid, Typography } from '@mui/material'
import { paths } from 'config'
import {
  Form,
  LoadingButton,
  PasswordField,
  TextField,
} from 'shared/components'
import { FormWrapper } from '../FormWrapper'
import { SignUpLink } from './LoginForm.styles'
import { LoginFormFields, useLoginForm } from './LoginForm.utils'

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const { loading, ...formProps } = useLoginForm()

  return (
    <Form {...formProps}>
      <Grid container justifyContent="center">
        <FormWrapper item container xs={4} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              name={LoginFormFields.Username}
              placeholder="username"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              name={LoginFormFields.Password}
              placeholder="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              fullWidth
            >
              Login!
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              Not registered yet?&nbsp;
              <SignUpLink to={paths.register}>Sign In</SignUpLink>
            </Typography>
          </Grid>
        </FormWrapper>
      </Grid>
    </Form>
  )
}

export default LoginForm
