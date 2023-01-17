import { Typography } from '@mui/material/styles/createTypography'

const fontFamily = [
  'Poppins',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',')

const typography: Partial<Typography> = {
  fontFamily,
  button: {
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
}

export default typography
