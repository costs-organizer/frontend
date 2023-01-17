import { useWatch } from 'react-hook-form'
import { Grid } from '@mui/material'
import { Form, LoadingButton, TextField } from 'shared/components'
import CheckboxField from 'shared/components/CheckboxfField'
import { FormWrapper } from '../../components'
import {
  UserInfoFields,
  UserInfoValues,
  useUserInfoForm,
} from './UserInfo.utils'

const UserInfo = () => {
  const { loading, ...formProps } = useUserInfoForm()

  const { 'change-password': changePassword } = useWatch<UserInfoValues>({
    control: formProps.control,
  })

  return (
    <Form {...formProps}>
      <Grid container justifyContent="center">
        <FormWrapper item container xs={4} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              name={UserInfoFields.Username}
              placeholder="username"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={UserInfoFields.Email}
              placeholder="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={UserInfoFields.Phone}
              placeholder="phone"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={UserInfoFields.IBAN}
              placeholder="IBAN"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxField
              name={UserInfoFields.ChangePassword}
              label="Change password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={UserInfoFields.OldPassword}
              placeholder="old password"
              fullWidth
              type="password"
              disabled={!changePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={UserInfoFields.NewPassword}
              placeholder="new password"
              fullWidth
              type="password"
              disabled={!changePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              fullWidth
            >
              SAVE
            </LoadingButton>
          </Grid>
        </FormWrapper>
      </Grid>
    </Form>
  )
}

export default UserInfo
