import { useCallback, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { GetGroupsQuery } from 'generated/graphql'
import { paths } from 'config'
import { Column } from 'shared/components'
import { ArrayElement } from 'shared/utils'

export type GroupType = ArrayElement<GetGroupsQuery['groups']>

export const useCoulumns = (): Column<GroupType>[] => {
  const columns: Column<GroupType>[] = useMemo(
    () => [
      {
        label: 'name',
        renderValue: (row: GroupType) => row.name,
      },
      {
        label: 'number of members',
        renderValue: (row: GroupType) => row.members.length,
      },
      {
        label: 'created by',
        renderValue: (row: GroupType) => row.createdBy.username,
      },
      {
        label: 'date of creation',
        renderValue: (row: GroupType) =>
          format(parseISO(row.createdAt), 'hh:mm dd/MM/yyyy'),
      },
    ],
    []
  )

  return columns
}

export const useGroupRedirect = () => {
  const navigate = useNavigate()

  return useCallback(
    (row: GroupType) => {
      const groupPath = generatePath(paths.group, {
        groupId: row.id.toString(),
      })
      navigate(groupPath)
    },
    [navigate]
  )
}
