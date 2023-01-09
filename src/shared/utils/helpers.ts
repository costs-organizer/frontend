import { generatePath, Params } from 'react-router-dom'
import { stringify } from 'qs'

interface GeneratePathWithQueryParams {
  path: string
  params?: Params
  qs?: object
}

export const generatePathWithQuery = ({
  path,
  params,
  qs,
}: GeneratePathWithQueryParams) => {
  const url = generatePath(path, params)
  return qs ? `${url}?${stringify(qs)}` : url
}

export const downloadFile = (url: string, fileName: string) => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
  link?.parentNode?.removeChild(link)
}
