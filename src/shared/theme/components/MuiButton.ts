import { Components } from '@mui/material'
import palette from '../palette'

const MuiButton: Components['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      textTransform: 'none',
    },
    outlined: {
      borderRadius: 100,
      borderWidth: 2,
      '&:hover': {
        borderWidth: 2,
      },
    },
    outlinedPrimary: {
      borderColor: palette.primary?.main,
    },
    outlinedSecondary: {
      borderColor: palette.secondary?.main,
    },
    contained: {
      borderRadius: 100,
    },
    text: {
      fontWeight: 500,
    },
  },
}

export default MuiButton
