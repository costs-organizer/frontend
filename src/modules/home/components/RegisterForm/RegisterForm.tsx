import { Grid } from '@mui/material'
import {
  Form,
  LoadingButton,
  PasswordField,
  TextField,
} from 'shared/components'
import { FormWrapper } from '../FormWrapper'
import { RegisterFormFields, useRegisterForm } from './RegisterForm.utils'

const RegisterForm = () => {
  const { loading, ...formProps } = useRegisterForm()

  return (
    <Form {...formProps}>
      <Grid container justifyContent="center">
        <FormWrapper item container xs={4} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              name={RegisterFormFields.Username}
              placeholder="username"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={RegisterFormFields.Email}
              placeholder="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              name={RegisterFormFields.Password}
              placeholder="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={RegisterFormFields.Phone}
              placeholder="phone"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={RegisterFormFields.IBAN}
              placeholder="IBAN"
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
              Register!
            </LoadingButton>
          </Grid>
        </FormWrapper>
      </Grid>
    </Form>
  )
}

export default RegisterForm
