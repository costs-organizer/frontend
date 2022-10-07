import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { useGetGroupQuery } from 'generated/graphql'
import { Loader, Tabs } from 'shared/components'
import { AddUsersButton, CostsTab, UsersDropdown } from '../components'

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const { data, isLoading } = useGetGroupQuery({ inp: Number(groupId) })
  const labels = ['Costs', 'Transactions']
  const panels = [
    <CostsTab key="costs-tab" />,
    <div key="xdd">Transactions</div>,
  ]

  const groupCreator = useMemo(
    () => ({
      id: Number(data?.group.createdBy.id),
      name: data?.group.createdBy.username || '',
    }),
    [data?.group.createdBy.id, data?.group.createdBy.username]
  )
  if (isLoading) return <Loader />

  return (
    <Grid container>
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        xs={12}
      >
        <Grid item xs={6}>
          <Typography variant="h4">{data?.group.name}</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={3}
          justifyContent="space-around"
        >
          <Grid item>
            <UsersDropdown
              members={data?.group.members}
              owner={data?.group.createdBy}
            />
          </Grid>
          <Grid item>
            <AddUsersButton createdBy={groupCreator} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Tabs labels={labels} panels={panels} />
      </Grid>
    </Grid>
  )
}

export default GroupDetails
