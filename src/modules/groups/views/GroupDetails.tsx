import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Grid, Typography } from '@mui/material'
import { GetGroupQuery, GetGroupQueryVariables } from 'generated/graphql'
import { getSingleGroupQuery } from 'graphql/groups/getSingleGroup'
import { Loader, Tabs } from 'shared/components'
import {
  AddUsersButton,
  CostsTab,
  TransactionsTab,
  UsersDropdown,
} from '../components'

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const { data, loading } = useQuery<GetGroupQuery, GetGroupQueryVariables>(
    getSingleGroupQuery,
    { variables: { inp: Number(groupId) } }
  )
  const labels = ['Costs', 'Transactions']
  const panels = [
    <CostsTab key="costs-tab" />,
    <TransactionsTab key="translations-tab" />,
  ]

  const groupCreator = useMemo(
    () => ({
      id: Number(data?.group.createdBy.id),
      name: data?.group.createdBy.username || '',
    }),
    [data?.group.createdBy.id, data?.group.createdBy.username]
  )
  if (loading) return <Loader />

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
