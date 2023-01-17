import { Done, Download, UploadFile } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { GetTransactionsQuery } from 'generated/graphql'
import { ArrayElement, downloadFile } from 'shared/utils'

interface CompletedTransactionActionsProps {
  onUpload: (
    transaction: ArrayElement<GetTransactionsQuery['transactions']>
  ) => void
  transaction: ArrayElement<GetTransactionsQuery['transactions']>
}

const CompletedTransactionActions = ({
  onUpload,
  transaction,
}: CompletedTransactionActionsProps) => {
  const isFileUploaded = !!transaction.confirmationFileURL
  const filename = `${transaction.payer.username}-to-${transaction.receiver.username}`
  const handleIconClick = () =>
    isFileUploaded
      ? downloadFile(transaction.confirmationFileURL, filename)
      : onUpload(transaction)
  const buttonTooltipTitle = isFileUploaded
    ? "Get transaction's confirmation"
    : "Upload transaction's confirmation"

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Tooltip title="Transaction completed" placement="top">
          <Done color="primary" />
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={buttonTooltipTitle} placement="top">
          <IconButton onClick={handleIconClick}>
            {isFileUploaded ? <Download /> : <UploadFile />}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default CompletedTransactionActions
