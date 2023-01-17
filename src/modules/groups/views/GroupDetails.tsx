import { useMemo } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Grid, styled, Typography } from '@mui/material'
import { GetGroupQuery, GetGroupQueryVariables } from 'generated/graphql'
import { getSingleGroupQuery } from 'graphql/groups/getSingleGroup'
import { paths } from 'config'
import { Loader, Tabs } from 'shared/components'
import {
  AddUsersButton,
  CostsTab,
  TransactionsTab,
  UsersDropdown,
} from '../components'

const StyledLink = styled(Link)(({ theme }) => ({
  '& , &:active, &:visited': {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
  },
}))

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
    <Grid container spacing={2}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          <StyledLink to={paths.groups}>Groups List</StyledLink>
          <span>{data?.group.name}</span>
        </Breadcrumbs>
      </Grid>
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
