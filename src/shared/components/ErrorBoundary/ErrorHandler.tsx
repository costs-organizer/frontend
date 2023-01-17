import { useTranslation } from 'react-i18next'
import { Alert, AlertTitle, Box, Button } from '@mui/material'

export interface ErrorHandlerProps {
  error?: Error | null
  onErrorReset?: () => void
}

const ErrorHandler = ({ error, onErrorReset }: ErrorHandlerProps) => {
  const { t } = useTranslation()
  return (
    <Box padding={4}>
      <Alert
        severity="error"
        {...(onErrorReset && {
          action: (
            <Button color="inherit" size="small" onClick={onErrorReset}>
              {t('components.errorBoundary.reset')}
            </Button>
          ),
        })}
      >
        <AlertTitle>{t('components.errorBoundary.title')}</AlertTitle>
        {error?.message}
      </Alert>
    </Box>
  )
}

export default ErrorHandler
