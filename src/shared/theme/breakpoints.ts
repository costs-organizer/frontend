import { Breakpoints } from '@mui/material'
import { createBreakpoints } from '@mui/system'

const breakpoints: Breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
})

export default breakpoints
