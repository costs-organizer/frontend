import urlJoin from 'url-join'
import config from 'config'

export const apiUrl = (path: string) => urlJoin(config.apiUrl, path)
