import { Grid, FormControlLabel, Checkbox } from '@mui/material'
import { DataTable } from 'shared/components'
import { useTransactionsTable } from './TransactionsTab.utils'

interface TransactionsTabProps {}

const TransactionsTab = (props: TransactionsTabProps) => {
  const { columns, loading, setShowOnlyMy, showOnlyMy, transactions } =
    useTransactionsTable()
  return (
    <Grid container>
      <Grid item container justifyContent="space-between" xs={12}>
        <Grid item>
          <FormControlLabel
            disabled={loading}
            onChange={(_, isChecked) => setShowOnlyMy(isChecked)}
            value={showOnlyMy}
            control={<Checkbox defaultChecked />}
            label="Show only my transactions"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataTable data={transactions} columns={columns} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default TransactionsTab
