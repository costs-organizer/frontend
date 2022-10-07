import { useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Grid,
} from '@mui/material'
import {
  DialogContent,
  Form,
  LoadingButton,
  TextField,
} from 'shared/components'
import { useHandleCloseModal } from 'shared/utils'
import UsersSelectChips from '../UsersSelectChips'
import { NewCostFormFields, useNewCostForm } from './NewCostModal.utils'

interface NewCostModalProps extends DialogProps {
  refetchCosts: () => void
}

const NewCostModal = ({ refetchCosts, ...dialogProps }: NewCostModalProps) => {
  const handleClose = useHandleCloseModal(dialogProps.onClose)
  const { isLoading, error, isSuccess, resetSubmit, ...formProps } =
    useNewCostForm()

  useEffect(() => {
    if (!isSuccess) return
    refetchCosts()
    handleClose()

    return () => {
      resetSubmit()
    }
  }, [handleClose, isSuccess, refetchCosts, resetSubmit])

  return (
    <Dialog {...dialogProps}>
      <Form {...formProps}>
        <DialogTitle>Add new members</DialogTitle>
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
          <UsersSelectChips fieldName={NewCostFormFields.Participants} />
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

export default NewCostModal
