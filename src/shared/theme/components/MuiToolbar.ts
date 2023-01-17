import { Components } from '@mui/material'
import breakpoints from '../breakpoints'

const MuiToolbar: Components['MuiToolbar'] = {
  styleOverrides: {
    regular: {
      minHeight: 60,
      paddingLeft: 15,
      paddingRight: 15,
      [breakpoints.up('sm')]: {
        minHeight: 60,
        paddingLeft: 15,
        paddingRight: 15,
      },
    },
    gutters: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
}

export default MuiToolbar
