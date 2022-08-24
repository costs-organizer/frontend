import { AccountCircle } from '@mui/icons-material'
import { Button, Skeleton } from '@mui/material'

const LOADER_WIDTH = 80

export interface UserMenuProps {
  name?: string
  isLoading?: boolean
}

const UserMenu = ({ name, isLoading }: UserMenuProps) => (
  <Button color="inherit" startIcon={<AccountCircle />}>
    {isLoading ? <Skeleton width={LOADER_WIDTH} /> : name}
  </Button>
)

export default UserMenu
