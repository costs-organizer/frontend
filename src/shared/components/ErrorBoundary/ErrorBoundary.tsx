import { Component, ComponentType, ErrorInfo, PropsWithChildren } from 'react'
import DefaultErrorHandler, { ErrorHandlerProps } from './ErrorHandler'

export type ErrorBoundaryProps = PropsWithChildren<{
  errorHandler?: ComponentType<ErrorHandlerProps>
}>

export interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError = (error: Error) => ({ error })

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error(error, errorInfo)
    this.setState({ error })
  }

  private reset = () => this.setState({ error: null })

  render = () => {
    const { children, errorHandler: ErrorHandler = DefaultErrorHandler } =
      this.props
    const { error } = this.state
    return error ? (
      <ErrorHandler error={error} onErrorReset={this.reset} />
    ) : (
      children
    )
  }
}

export default ErrorBoundary
