import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Grid,
} from '@mui/material'
import { GetGroupQuery, GetGroupQueryVariables } from 'generated/graphql'
import { getSingleGroupQuery } from 'graphql/groups'
import {
  DialogContent,
  Form,
  LoadingButton,
  TextField,
} from 'shared/components'
import { Entity } from 'shared/types'
import { useHandleCloseModal } from 'shared/utils'
import UsersSelectChips from '../UsersSelectChips'
import { NewCostFormFields, useNewCostForm } from './NewCostModal.utils'

interface NewCostModalProps extends DialogProps {}

const NewCostModal = (dialogProps: NewCostModalProps) => {
  const { groupId } = useParams()
  const { data: groupData } = useQuery<GetGroupQuery, GetGroupQueryVariables>(
    getSingleGroupQuery,
    { variables: { inp: Number(groupId) } }
  )
  const handleClose = useHandleCloseModal(dialogProps.onClose)
  const { loading, error, resetSubmit, ...formProps } =
    useNewCostForm(handleClose)
  const membersOptions: Entity[] = useMemo(
    () =>
      groupData?.group.members.map(({ id, username }) => ({
        id,
        name: username,
      })) || [],
    [groupData?.group.members]
  )

  return (
    <Dialog {...dialogProps}>
      <Form {...formProps}>
        <DialogTitle>Add new cost</DialogTitle>
        <DialogContent container>
          <Grid item xs={12}>
            <TextField label="Name" name={NewCostFormFields.Name} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name={NewCostFormFields.Description}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Money Amount"
              name={NewCostFormFields.MoneyAmount}
              type="number"
            />
          </Grid>
          <UsersSelectChips
            fieldName={NewCostFormFields.Participants}
            defaultOptions={membersOptions}
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

export default NewCostModal
