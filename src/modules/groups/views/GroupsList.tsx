import { FunctionComponent } from 'react'
import { Grid } from '@mui/material'
import { GroupsTable } from '../components'

interface GroupsListProps {}

const GroupsList: FunctionComponent<GroupsListProps> = () => {
  return (
    <Grid container>
      <Grid item container></Grid>
      <GroupsTable />
    </Grid>
  )
}

export default GroupsList
