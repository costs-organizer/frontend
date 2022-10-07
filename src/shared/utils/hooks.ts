import { useState, useCallback } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, handleClose, handleOpen }
}

export const useHandleCloseModal = (
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
) =>
  useCallback(() => {
    if (!onClose) return
    return onClose({}, 'backdropClick')
  }, [onClose])
