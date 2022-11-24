import { Button, Dialog, DialogProps, Grid, Typography } from '@mui/material'
import { ModalWrapper, Title } from './ConfirmationModal.styles'

interface ConfirmationModalProps extends DialogProps {
  open: boolean
  mainContent: string
  onCancel: () => void
  onConfirmation: () => void
  confirmationButtonLabel?: string
  title?: string
}

const ConfirmationModal = ({
  open,
  mainContent,
  onCancel,
  onConfirmation,
  confirmationButtonLabel,
  hideBackdrop = false,
  title,
}: ConfirmationModalProps) => {
  const handleConfirmation = () => {
    onConfirmation()
    onCancel()
  }

  return (
    <Dialog open={open} onClose={onCancel} hideBackdrop={hideBackdrop}>
      <ModalWrapper>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Title>{title || 'Are you sure?'}</Title>
          </Grid>
          <Grid item>
            <Typography>{mainContent}</Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Button
                color="primary"
                variant="outlined"
                onClick={onCancel}
                data-test-id="cancel-button"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={handleConfirmation}
                data-test-id="confirmation-button"
              >
                {confirmationButtonLabel || 'Accept'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ModalWrapper>
    </Dialog>
  )
}

export default ConfirmationModal
