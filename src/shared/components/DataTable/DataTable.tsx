import { useCallback } from 'react'
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Alert,
} from '@mui/material'
import { DataTableProps } from './DataTable.types'

const DataTable = <Row extends {} | undefined>({
  columns,
  data,
  loading,
  error,
  onRowClick,
}: DataTableProps<Row>) => {
  const handleRowClick = useCallback(
    (row: Row) => {
      if (!row || !onRowClick) return
      onRowClick(row)
    },
    [onRowClick]
  )

  return (
    <>
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && <LinearProgress />}
      <Table>
        <TableHead>
          {columns.map((col, index) => (
            <TableCell key={`head-cell-${index}`}>{col.label}</TableCell>
          ))}
        </TableHead>
        {data?.map((row, rowIndex) => (
          <TableRow key={`row-${rowIndex}`} onClick={() => handleRowClick(row)}>
            {columns.map((col, colIndex) => (
              <TableCell key={`row-col-${colIndex}`}>
                {col.renderValue(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default DataTable
