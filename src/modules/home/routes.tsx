import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { paths } from 'config'
import { Layout, Loadable } from 'shared/components'

const routes: RouteObject[] = [
  {
    path: paths.register,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Loadable component={lazy(() => import('./views/Register'))} />
        ),
      },
    ],
  },
  {
    path: paths.login,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Loadable component={lazy(() => import('./views/Login'))} />,
      },
    ],
  },
]

export default routes
