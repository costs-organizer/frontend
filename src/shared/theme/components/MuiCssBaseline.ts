import { Components } from '@mui/material'

const MuiCssBaseline: Components['MuiCssBaseline'] = {
  styleOverrides: {
    html: {
      scrollBehavior: 'smooth',
      height: '100%',
    },
    'body, #root': {
      height: '100%',
    },
  },
}

export default MuiCssBaseline
