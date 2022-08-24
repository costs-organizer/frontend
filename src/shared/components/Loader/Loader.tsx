import { HTMLAttributes, ReactNode } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import { Container } from './Loader.styles'

const DEFAULT_SIZE = 100

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  size?: number
}

const Loader = ({ label, size = DEFAULT_SIZE, ...props }: LoaderProps) => (
  <Container {...props}>
    <CircularProgress size={size} />
    <Typography variant="subtitle1" color="textPrimary">
      {label}
    </Typography>
  </Container>
)

export default Loader
