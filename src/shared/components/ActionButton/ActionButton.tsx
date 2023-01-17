import { Label } from './ActionButton.styles'
import './ActionButton.utils'

export interface ActionButtonProps {
  label?: string
}

const ActionButton = ({
  label = 'ActionButton component',
}: ActionButtonProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <div />
      <div />
    </div>
  )
}

export default ActionButton
