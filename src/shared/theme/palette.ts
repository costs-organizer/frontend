import { darken, lighten, Palette } from '@mui/material'

declare module '@mui/material/styles' {}

const palette: Partial<Palette> = {
  mode: 'light',
  primary: {
    light: lighten('#023C40', 0.1),
    main: '#023C40',
    dark: darken('#023C40', 0.1),
    contrastText: '#fff',
  },
  secondary: {
    light: lighten('#05CEB3', 0.1),
    main: '#05CEB3',
    dark: darken('#05CEB3', 0.1),
    contrastText: '#fff',
  },
  text: {
    primary: '#000',
    secondary: '#C1C1C1',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
}

export default palette

//E1FAF9
