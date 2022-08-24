import { FunctionComponent } from 'react'
import { Grid, Typography } from '@mui/material'
import { useGetGroupsQuery } from 'generated/graphql'

interface GroupsListProps {}

const GroupsList: FunctionComponent<GroupsListProps> = () => {
  const { isLoading, data, error } = useGetGroupsQuery({
    inp: {},
  })
  if (isLoading) return <div>Loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <Grid container>
      {data?.groups.map((group, index) => (
        <Grid item key={`group-${index}`} xs={12}>
          <Typography>{group.name}</Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default GroupsList
