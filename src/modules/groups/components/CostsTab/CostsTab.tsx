import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { DataTable } from 'shared/components'
import { useModal } from 'shared/utils'
import { CostsTabProvider } from '../../utils'
import NewCostModal from '../NewCostModal'
import { useCostsTable } from './CostsTab.utils'

interface CostsTabProps {}

const CostsTab = (props: CostsTabProps) => {
  const { columns, costs, loading, setShowOnlyMy, showOnlyMy } = useCostsTable()
  const { handleClose, handleOpen, isOpen } = useModal()
  console.log(loading)
  return (
    <CostsTabProvider showOnlyMy={showOnlyMy}>
      <NewCostModal open={isOpen} onClose={handleClose} />
      <Grid container>
        <Grid item container justifyContent="space-between" xs={12}>
          <Grid item>
            <FormControlLabel
              disabled={loading}
              onChange={(_, isChecked) => setShowOnlyMy(isChecked)}
              value={showOnlyMy}
              control={<Checkbox defaultChecked />}
              label="Show only my costs"
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleOpen}>
              Create cost
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DataTable data={costs} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </CostsTabProvider>
  )
}

export default CostsTab
