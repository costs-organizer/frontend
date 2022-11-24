import { useMemo } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { MeQuery, MeQueryVariables } from 'generated/graphql'
import { meQuery } from 'graphql/auth'
import { paths } from 'config'
import { Layout } from 'shared/components'
import { routes as moduleRoutes } from '../modules'

const routes: RouteObject[] = [
  ...moduleRoutes,
  {
    path: '*',
    element: <Layout />,
    children: [{ path: '*', element: <Navigate to={paths.login}></Navigate> }],
  },
]

const AppRoutes = () => {
  const { data } = useQuery<MeQuery, MeQueryVariables>(meQuery)

  const routes = useMemo(
    () => [
      ...moduleRoutes,
      {
        path: '*',
        element: <Layout />,
        children: [
          {
            path: '*',
            element: (
              <Navigate to={data?.me ? paths.groups : paths.login}></Navigate>
            ),
          },
        ],
      },
    ],
    [data?.me]
  )
  const children = useRoutes(routes)
  return children
}

export default AppRoutes
