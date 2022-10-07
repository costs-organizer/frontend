import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
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
  const children = useRoutes(routes)
  return children
}

export default AppRoutes
