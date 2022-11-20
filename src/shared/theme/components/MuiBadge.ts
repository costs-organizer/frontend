import { Components } from '@mui/material'

const MuiBadge: Components['MuiBadge'] = {
  styleOverrides: {
    badge: {
      height: 15,
      padding: 0,
      minWidth: 15,
    },
    root: {
      width: 15,
      height: 15,
    },
  },
}

export default MuiBadge
