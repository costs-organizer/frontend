import { RouteObject, useRoutes } from 'react-router-dom'
import { Layout } from 'shared/components'
import { routes as moduleRoutes } from '../modules'

const routes: RouteObject[] = [
  ...moduleRoutes,
  {
    path: '*',
    element: <Layout />,
    children: [{ path: '*', element: <div>Hello</div> }],
  },
]

const AppRoutes = () => {
  const children = useRoutes(routes)
  return children
}

export default AppRoutes
