import { useWatch } from 'react-hook-form'
import { UploadFile } from '@mui/icons-material'
import { Button, Dialog, DialogProps, Grid, Typography } from '@mui/material'
import {
  FileUploadField,
  Form,
  LoadingButton,
  ModalWrapper,
  Title,
} from 'shared/components'
import { TransactionType } from '../TransactionsTab.utils'
import {
  TransactionConfirmationValues,
  useTransactionConfirmationForm,
} from './TransactionConfirmationModal.utils'

interface TransactionConfirmationModalProps extends Omit<DialogProps, 'open'> {
  onCancel: () => void
  transaction?: TransactionType | null
}

const TransactionConfirmationModal = ({
  onCancel,
  transaction,
}: TransactionConfirmationModalProps) => {
  const { loading, handleFileChange, ...formProps } =
    useTransactionConfirmationForm(onCancel, transaction?.id)

  const { originalFilename } = useWatch<TransactionConfirmationValues>({
    control: formProps.control,
  })

  return (
    <Dialog open={!!transaction} onClose={onCancel} hideBackdrop={false}>
      <Form {...formProps}>
        <ModalWrapper>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Title>Confirm your transaction</Title>
            </Grid>
            <Grid item>
              <Typography>Upload your confirmation</Typography>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFile />}
                sx={{ marginRight: '1rem' }}
              >
                Upload File
                <FileUploadField
                  onChange={handleFileChange}
                  name=""
                  type="file"
                  accept=".pdf,.png,.jpg"
                  hidden
                />
              </Button>
              {originalFilename}
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
                <LoadingButton
                  color="primary"
                  variant="contained"
                  data-test-id="confirmation-button"
                  type="submit"
                  loading={loading}
                >
                  Confirm
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </ModalWrapper>
      </Form>
    </Dialog>
  )
}

export default TransactionConfirmationModal
