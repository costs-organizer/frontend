import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { paths } from 'config'
import { Layout, Loadable } from 'shared/components'

const routes: RouteObject[] = [
  {
    path: paths.groups,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Loadable component={lazy(() => import('./views/GroupsList'))} />
        ),
      },
    ],
  },
]

export default routes
