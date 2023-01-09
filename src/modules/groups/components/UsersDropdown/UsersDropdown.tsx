import { People, Psychology } from '@mui/icons-material'
import { Button, Menu, Typography } from '@mui/material'
import { GetGroupQuery } from 'generated/graphql'
import { ConfirmationModal } from 'shared/components'
import RemoveUserButton from './RemoveUserButton'
import { StyledMenuItem } from './UsersDropdown.styles'
import { useConfirmationModal, useUsersDropdowns } from './UsersDropdown.utils'

interface MembersDropdownProps {
  members?: GetGroupQuery['group']['members']
  owner?: GetGroupQuery['group']['createdBy']
}

const MembersDropdown = ({ members, owner }: MembersDropdownProps) => {
  const {
    dropDownAnchorEl,
    handleDropdownClose,
    handleDropdownOpen,
    isDropdownOpen,
  } = useUsersDropdowns()
  const { handleModalClose, handleModalOpen, isModalOpen, onConfirm } =
    useConfirmationModal()
  if (!members) null

  return (
    <>
      <ConfirmationModal
        open={isModalOpen}
        onCancel={handleModalClose}
        mainContent={'This action will remove the user from the current group'}
        onConfirmation={onConfirm}
      />
      <Button onClick={handleDropdownOpen}>
        <People fontSize="large" />
        &nbsp;
        <Typography variant="subtitle1">Members</Typography>
      </Button>
      <Menu
        anchorEl={dropDownAnchorEl}
        open={isDropdownOpen}
        onClose={handleDropdownClose}
      >
        {members?.map((member, index) => {
          const showOwnerBadge = owner?.id === member.id
          const showRemoveButton =
            member.participatedCosts.length === 0 && !showOwnerBadge
          return (
            <StyledMenuItem key={`member-item-${index}`}>
              {member.username} {owner?.id === member.id && <Psychology />}
              {showRemoveButton && (
                <RemoveUserButton onClick={handleModalOpen} user={member} />
              )}
            </StyledMenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MembersDropdown
