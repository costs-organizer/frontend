import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import { DialogContent, Form, LoadingButton } from 'shared/components'
import { useHandleCloseModal } from 'shared/utils'
import UsersSelectChips from '../UsersSelectChips'
import { AddMembersFormFields, useAddMembersForm } from './utils'

interface AddUsersModalProps extends DialogProps {}

const AddUsersModal = (dialogProps: AddUsersModalProps) => {
  const handleClose = useHandleCloseModal(dialogProps.onClose)

  const { isLoading, ...formProps } = useAddMembersForm(handleClose)

  return (
    <Dialog {...dialogProps}>
      <Form {...formProps}>
        <DialogTitle>Add new members</DialogTitle>
        <DialogContent container>
          <UsersSelectChips fieldName={AddMembersFormFields.Users} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            Submit
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default AddUsersModal
