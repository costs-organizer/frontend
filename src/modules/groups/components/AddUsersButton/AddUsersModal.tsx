import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import { GetGroupQuery, GetGroupQueryVariables } from 'generated/graphql'
import { getSingleGroupQuery } from 'graphql/groups'
import { DialogContent, Form, LoadingButton } from 'shared/components'
import { useHandleCloseModal } from 'shared/utils'
import UsersSelectChips from '../UsersSelectChips'
import { AddMembersFormFields, useAddMembersForm } from './utils'

interface AddUsersModalProps extends DialogProps {}

const AddUsersModal = (dialogProps: AddUsersModalProps) => {
  const { groupId } = useParams()
  const { data } = useQuery<GetGroupQuery, GetGroupQueryVariables>(
    getSingleGroupQuery,
    { variables: { inp: Number(groupId) } }
  )
  const handleClose = useHandleCloseModal(dialogProps.onClose)
  const excludedUserIds = useMemo(
    () => data?.group.members.map(({ id }) => id),
    [data?.group.members]
  )

  const { loading, ...formProps } = useAddMembersForm(handleClose)

  return (
    <Dialog {...dialogProps}>
      <Form {...formProps}>
        <DialogTitle>Add new members</DialogTitle>
        <DialogContent container>
          <UsersSelectChips
            excludedUserIds={excludedUserIds}
            fieldName={AddMembersFormFields.Users}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={loading} type="submit" variant="contained">
            Submit
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default AddUsersModal
