import { ComponentStory, ComponentMeta } from '@storybook/react'
import ActionButton from './ActionButton'

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>

const Template: ComponentStory<typeof ActionButton> = args => (
  <ActionButton {...args} />
)

export const Default = Template.bind({})
Default.args = {}
