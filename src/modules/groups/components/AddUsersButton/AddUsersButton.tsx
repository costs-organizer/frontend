import { Button } from '@mui/material'
import { useMeQuery } from 'generated/graphql'
import { Entity } from 'shared/types/data'
import { useModal } from 'shared/utils'
import AddUsersModal from './AddUsersModal'

interface AddUsersButtonProps {
  createdBy?: Entity
}

const AddUsersButton = ({ createdBy }: AddUsersButtonProps) => {
  const { data } = useMeQuery()
  const { handleClose, handleOpen, isOpen } = useModal()
  if (createdBy?.id !== data?.me.id) return null

  return (
    <>
      <AddUsersModal open={isOpen} onClose={handleClose} />
      <Button variant="contained" onClick={handleOpen}>
        Add User
      </Button>
    </>
  )
}

export default AddUsersButton
