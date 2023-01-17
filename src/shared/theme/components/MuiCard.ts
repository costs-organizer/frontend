import { Components } from '@mui/material'
import palette from '../palette'

const MuiCard: Components['MuiCard'] = {
  styleOverrides: {
    root: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: palette.primary?.main,
      borderRadius: 10,
    },
  },
}

export default MuiCard
