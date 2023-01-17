import { useState, MouseEvent } from 'react'

export const useUsersMenuDropdown = () => {
  const [dropDownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const isDropdownOpen = Boolean(dropDownAnchorEl)
  const handleDropdownOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setDropdownAnchorEl(event.currentTarget)
  }
  const handleDropdownClose = () => {
    setDropdownAnchorEl(null)
  }

  return {
    dropDownAnchorEl,
    isDropdownOpen,
    handleDropdownClose,
    handleDropdownOpen,
  }
}
