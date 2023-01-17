import { ReactNode } from 'react'
import { SerializedError } from '@reduxjs/toolkit'
import { ErrorResponse } from '@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes'

export interface DataTableProps<T extends {} | undefined> {
  columns: Column<T>[]
  data?: T[]
  loading: boolean
  error?: ErrorResponse | SerializedError
  onRowClick?: (row: T) => void
}

export interface Column<T> {
  label: string
  renderValue: (row: T) => ReactNode
}
