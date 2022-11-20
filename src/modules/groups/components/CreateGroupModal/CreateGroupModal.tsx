import { useEffect } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Grid,
} from '@mui/material'
import { paths } from 'config'
import {
  DialogContent,
  Form,
  LoadingButton,
  TextField,
} from 'shared/components'
import UsersSelectChips from '../UsersSelectChips'
import { NewGroupFields, useNewGroupForm } from './CreateGroupModal.utils'

const CreateGroupModal = (props: DialogProps) => {
  const { loading, isSuccess, newGroupId, ...formProps } = useNewGroupForm()

  const handleClose = () => {
    if (!props.onClose) return
    props.onClose({}, 'backdropClick')
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSuccess || !newGroupId) return
    const newGroupPath = generatePath(paths.group, {
      groupId: newGroupId.toString(),
    })
    navigate(newGroupPath)
  }, [isSuccess, navigate, newGroupId])

  return (
    <Dialog {...props}>
      <Form {...formProps}>
        <DialogTitle>Create new group</DialogTitle>
        <DialogContent container>
          <Grid item xs={12}>
            <TextField name={NewGroupFields.Name} label="Name" />
          </Grid>
          <UsersSelectChips fieldName={NewGroupFields.Members} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton type="submit" loading={loading} variant="contained">
            Create
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default CreateGroupModal
