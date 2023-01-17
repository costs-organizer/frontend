import constants from './constants'
import env from './env'

const config = {
  ...env,
  ...constants,
}

export default config
export { default as paths } from './paths'
export { default as I18n } from './i18n'
