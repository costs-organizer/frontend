import { useState, MouseEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {
  RemoveUserFromGroupMutation,
  RemoveUserFromGroupMutationVariables,
} from 'generated/graphql'
import {
  getSingleGroupQuery,
  removeUserFromGroupMutation,
} from 'graphql/groups'
import { UserType } from './UsersDropdown.types'

export const useUsersDropdowns = () => {
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

export const useConfirmationModal = () => {
  const { groupId } = useParams()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const isModalOpen = Boolean(selectedUser)
  const handleModalOpen = (user: UserType) => {
    setSelectedUser(user)
  }
  const handleModalClose = () => {
    setSelectedUser(null)
  }

  const [removeUserFromGroup, { loading: removalLoading }] = useMutation<
    RemoveUserFromGroupMutation,
    RemoveUserFromGroupMutationVariables
  >(removeUserFromGroupMutation, {
    onCompleted: () => handleModalClose(),
    refetchQueries: [
      { query: getSingleGroupQuery, variables: { inp: Number(groupId) } },
    ],
  })

  const onConfirm = useCallback(() => {
    if (!selectedUser) return
    removeUserFromGroup({
      variables: {
        inp: { groupId: Number(groupId), userId: selectedUser?.id },
      },
    })
  }, [groupId, removeUserFromGroup, selectedUser])

  return {
    isModalOpen,
    handleModalClose,
    handleModalOpen,
    onConfirm,
    removalLoading,
  }
}
