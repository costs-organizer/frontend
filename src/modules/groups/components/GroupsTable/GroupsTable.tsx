import { useQuery } from '@apollo/client'
import { Button, Grid, Typography } from '@mui/material'
import { GetGroupsQuery, GetGroupsQueryVariables } from 'generated/graphql'
import { getGroups } from 'graphql/groups'
import { DataTable } from 'shared/components'
import { useModal } from 'shared/utils'
import CreateGroupModal from '../CreateGroupModal'
import { useCoulumns, useGroupRedirect } from './GroupsTable.utils'

const GroupsTable = () => {
  const { loading, data, error } = useQuery<
    GetGroupsQuery,
    GetGroupsQueryVariables
  >(getGroups, { variables: { inp: {} } })
  const columns = useCoulumns()
  const { handleClose, handleOpen, isOpen } = useModal()
  const onRowClick = useGroupRedirect()

  return (
    <>
      <CreateGroupModal open={isOpen} onClose={handleClose} />
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">My groups</Typography>
        </Grid>
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
        loading={loading}
        error={error}
      />
    </>
  )
}

export default GroupsTable
