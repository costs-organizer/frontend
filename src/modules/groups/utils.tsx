import { createContext, useContext, PropsWithChildren } from 'react'

export const MODULE_NAME = 'groups'

interface CostsTabContextValue {
  showOnlyMy: boolean
}

const costsTabInitialValue: CostsTabContextValue | undefined = undefined

export const CostsTabContext = createContext<CostsTabContextValue | undefined>(
  costsTabInitialValue
)

export const useCostsTabContext = () => {
  const value = useContext(CostsTabContext)

  if (!value) throw new Error('No values')

  return value
}

export const CostsTabProvider = (
  props: PropsWithChildren<CostsTabContextValue>
) => {
  const { children, ...value } = props
  return (
    <CostsTabContext.Provider value={value || costsTabInitialValue}>
      {children}
    </CostsTabContext.Provider>
  )
}

interface TransactionsTabContextValue {
  showOnlyMy: boolean
}

const transactionsTabInitialValue: TransactionsTabContextValue | undefined =
  undefined

export const TransactionsTabContext = createContext<
  TransactionsTabContextValue | undefined
>(transactionsTabInitialValue)

export const useTransactionsTabContext = () => {
  const value = useContext(TransactionsTabContext)

  if (!value) throw new Error('No values')

  return value
}

export const TransactionsTabProvider = (
  props: PropsWithChildren<TransactionsTabContextValue>
) => {
  const { children, ...value } = props
  return (
    <TransactionsTabContext.Provider
      value={value || transactionsTabInitialValue}
    >
      {children}
    </TransactionsTabContext.Provider>
  )
}
