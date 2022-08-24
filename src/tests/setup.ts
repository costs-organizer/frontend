import '@testing-library/jest-dom'
import 'isomorphic-fetch'
import { vi } from 'vitest'
import server from 'mocks/server'

type GlobalThis = typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
;(globalThis as GlobalThis).IS_REACT_ACT_ENVIRONMENT = true

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
