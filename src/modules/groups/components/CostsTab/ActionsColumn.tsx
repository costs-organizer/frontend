import { GetCostsQuery } from 'generated/graphql'
import { ArrayElement } from 'shared/utils'
import JoinCostButton from './JoinCostButton'
import RemoveCostButton from './RemoveCostButton'

interface ActionsColumnProps {
  cost: ArrayElement<GetCostsQuery['costs']>
  userId: number
}

const ActionsColumn = ({ cost, userId }: ActionsColumnProps) => {
  const showRemoveButton = cost.createdBy.id === userId
  const showJoinButton = !cost.participants.some(({ id }) => id === userId)

  return (
    <>
      {showJoinButton && <JoinCostButton costId={cost.id} />}
      {showRemoveButton && <RemoveCostButton costId={cost.id} />}
    </>
  )
}

export default ActionsColumn
