import { createTheme } from '@mui/material'
import breakpoints from './breakpoints'
import components from './components'
import palette from './palette'
import typography from './typography'

const theme = createTheme({
  palette,
  typography,
  components,
  breakpoints,
})

export default theme
