import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { DataTable } from 'shared/components'
import { useModal } from 'shared/utils'
import NewCostModal from '../NewCostModal'
import { useCostsTable } from './CostsTab.utils'

interface CostsTabProps {}

const CostsTab = (props: CostsTabProps) => {
  const { columns, costs, isLoading, setShowOnlyMy, showOnlyMy, refetch } =
    useCostsTable()
  const { handleClose, handleOpen, isOpen } = useModal()

  return (
    <>
      <NewCostModal
        open={isOpen}
        onClose={handleClose}
        refetchCosts={refetch}
      />
      <Grid container>
        <Grid item container justifyContent="space-between" xs={12}>
          <Grid item>
            <FormControlLabel
              disabled={isLoading}
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
          <DataTable data={costs} columns={columns} loading={isLoading} />
        </Grid>
      </Grid>
    </>
  )
}

export default CostsTab
