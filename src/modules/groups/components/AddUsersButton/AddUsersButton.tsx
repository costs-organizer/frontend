import { useQuery } from '@apollo/client'
import { Button } from '@mui/material'
import { MeQuery, MeQueryVariables } from 'generated/graphql'
import { meQuery } from 'graphql/auth'
import { Entity } from 'shared/types/data'
import { useModal } from 'shared/utils'
import AddUsersModal from './AddUsersModal'

interface AddUsersButtonProps {
  createdBy?: Entity
}

const AddUsersButton = ({ createdBy }: AddUsersButtonProps) => {
  const { data } = useQuery<MeQuery, MeQueryVariables>(meQuery)
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
