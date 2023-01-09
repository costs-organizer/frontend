import { styled, TableRow } from '@mui/material'

interface StyledTableRowProps {
  clickable: boolean
}

export const StyledTableRow = styled(TableRow)<StyledTableRowProps>(
  ({ clickable }) => ({
    cursor: clickable ? 'pointer' : 'default',
  })
)
