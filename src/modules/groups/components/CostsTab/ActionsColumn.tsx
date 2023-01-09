import { Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { GetCostsQuery } from 'generated/graphql'
import { ArrayElement } from 'shared/utils'
import JoinCostButton from './JoinCostButton'
import RemoveCostButton from './RemoveCostButton'

type CostType = ArrayElement<GetCostsQuery['costs']>

interface ActionsColumnProps {
  cost: CostType
  userId: number
  openEditModal: (cost: CostType) => void
}

const ActionsColumn = ({ cost, userId, openEditModal }: ActionsColumnProps) => {
  const isCostMine = cost.createdBy.id === userId
  const showJoinButton = !cost.participants.some(({ id }) => id === userId)

  return (
    <>
      {showJoinButton && <JoinCostButton costId={cost.id} />}
      {isCostMine && (
        <>
          <Tooltip title="Join Cost" placement="top">
            <IconButton onClick={() => openEditModal(cost)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <RemoveCostButton costId={cost.id} />
        </>
      )}
    </>
  )
}

export default ActionsColumn
