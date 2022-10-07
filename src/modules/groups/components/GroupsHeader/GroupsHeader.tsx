import { Button, Grid, Typography } from '@mui/material'
import { useHeaderModal } from './GroupsHeader.utils'

const GroupsHeader = () => {
  const { closeModal, isOpen, openModal } = useHeaderModal()

  return (
    <>
      <Grid container>
        <Grid item>
          <Typography variant="h5">My groups</Typography>
          <Button variant="contained" onClick={openModal}>
            Create group
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default GroupsHeader
