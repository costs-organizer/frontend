import { MouseEvent, useState, useCallback } from 'react'
import {
  TypedUseSelectorHook,
  useDispatch as useBaseDispatch,
  useSelector as useBaseSelector,
} from 'react-redux'
import { RootDispatch, RootState } from 'app'

export const useModal = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return { isOpen: !!anchorEl, handleClose, handleOpen, anchorEl }
}

export const useHandleCloseModal = (
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
) =>
  useCallback(() => {
    if (!onClose) return
    return onClose({}, 'backdropClick')
  }, [onClose])

export const useDispatch: () => RootDispatch = useBaseDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector
