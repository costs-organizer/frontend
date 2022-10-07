import { Button, Grid } from '@mui/material'
import { useGetGroupsQuery } from 'generated/graphql'
import { DataTable } from 'shared/components'
import { useModal } from 'shared/utils'
import CreateGroupModal from '../CreateGroupModal'
import { useCoulumns, useGroupRedirect } from './GroupsTable.utils'

const GroupsTable = () => {
  const { isLoading, data, error } = useGetGroupsQuery(
    {
      inp: {},
    },
    {}
  )
  const columns = useCoulumns()
  const { handleClose, handleOpen, isOpen } = useModal()
  const onRowClick = useGroupRedirect()

  return (
    <>
      <CreateGroupModal open={isOpen} onClose={handleClose} />
      <Grid container justifyContent="space-between">
        <Grid item>My groups</Grid>
        <Grid item>
          <Button onClick={handleOpen} variant="contained">
            Create Group
          </Button>
        </Grid>
      </Grid>
      <DataTable
        onRowClick={onRowClick}
        columns={columns}
        data={data?.groups}
        loading={isLoading}
        error={error}
      />
    </>
  )
}

export default GroupsTable
