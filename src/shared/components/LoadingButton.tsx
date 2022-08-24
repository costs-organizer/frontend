import { Button, ButtonProps, CircularProgress } from '@mui/material'

const SPINNER_SIZE = '1rem'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

const LoadingButton = ({
  disabled,
  loading = false,
  ...props
}: LoadingButtonProps) => (
  <Button
    {...props}
    disabled={loading || disabled}
    startIcon={
      loading ? (
        <CircularProgress color="inherit" size={SPINNER_SIZE} />
      ) : (
        props.startIcon
      )
    }
  />
)

export default LoadingButton
