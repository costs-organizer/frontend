import { useTranslation, UseTranslationOptions } from 'react-i18next'

export const createUseModuleTranslation =
  (moduleName: string) =>
  (options: UseTranslationOptions<typeof moduleName> = {}) =>
    useTranslation(moduleName, options)
