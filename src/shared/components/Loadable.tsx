import { Suspense, SuspenseProps, ComponentType } from 'react'
import ErrorBoundary, { ErrorBoundaryProps } from './ErrorBoundary'
import Loader from './Loader'

export interface LoadableProps extends ErrorBoundaryProps {
  component: ComponentType<any>
  componentProps?: Record<string, any>
  loader?: SuspenseProps['fallback']
}

const Loadable = ({
  component: Component,
  componentProps,
  loader,
  ...errorBoundaryProps
}: LoadableProps) => (
  <Suspense fallback={loader || <Loader />}>
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...componentProps} />
    </ErrorBoundary>
  </Suspense>
)

export default Loadable
