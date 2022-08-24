import { AppModule } from 'shared/types'
import routes from './routes'
import { MODULE_NAME } from './utils'

const appModule: AppModule = {
  routes,
  name: MODULE_NAME,
}

export default appModule
