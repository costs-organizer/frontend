import { Components } from '@mui/material'

const elevations = Array.from({ length: 21 }, (_, i) => i + 4).reduce(
  (overrides, elevation) => ({
    ...overrides,
    [`elevation${elevation}`]: {
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    },
  }),
  {}
)

const MuiPaper: Components['MuiPaper'] = {
  defaultProps: {
    elevation: 0,
  },
  styleOverrides: {
    rounded: {
      borderRadius: 8,
    },
    elevation1: {
      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.05)',
    },
    elevation2: {
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
    },
    elevation3: {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    ...elevations,
  },
}

export default MuiPaper
