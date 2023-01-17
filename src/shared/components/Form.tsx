import { HTMLProps, PropsWithChildren } from 'react'
import { FormProvider, FormProviderProps, SubmitHandler } from 'react-hook-form'

export type FormProps<T = unknown> = Omit<
  FormProviderProps<T> &
    Omit<HTMLProps<HTMLFormElement>, 'onSubmit'> & {
      onSubmit: SubmitHandler<T>
    },
  'children'
> & {
  formProps?: Partial<HTMLProps<HTMLFormElement>>
}

const Form = ({
  children,
  onSubmit,
  formProps,
  ...props
}: PropsWithChildren<FormProps<any>>) => (
  <form {...formProps} onSubmit={props.handleSubmit(onSubmit)}>
    <FormProvider {...props}>{children}</FormProvider>
  </form>
)

export default Form
