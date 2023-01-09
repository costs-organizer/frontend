import { gql } from '@apollo/client'

export const uploadTransactionConfirmationMutation = gql`
  mutation UploadTransactionConfirmation($file: Upload!) {
    uploadConmfirmationFile(file: $file)
  }
`
