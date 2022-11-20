import { useState, MouseEvent } from 'react'
import { People, Psychology } from '@mui/icons-material'
import { Button, Menu, Typography } from '@mui/material'
import { GetGroupQuery } from 'generated/graphql'
import { StyledMenuItem } from './UsersDropdown.styles'

interface MembersDropdownProps {
  members?: GetGroupQuery['group']['members']
  owner?: GetGroupQuery['group']['createdBy']
}

const MembersDropdown = ({ members, owner }: MembersDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!members) null

  return (
    <>
      <Button onClick={handleClick}>
        <People fontSize="large" />
        &nbsp;
        <Typography variant="subtitle1">Members</Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {members?.map((member, index) => (
          <StyledMenuItem key={`member-item-${index}`}>
            {member.username} {owner?.id === member.id && <Psychology />}
          </StyledMenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MembersDropdown
