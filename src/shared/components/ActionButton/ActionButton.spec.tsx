import { screen } from '@testing-library/react'
import { renderWithProviders } from 'tests/utils'
import ActionButton from './ActionButton'

describe('<ActionButton />', () => {
  it('renders <label />', async () => {
    renderWithProviders(<ActionButton />)
    expect(screen.getByRole('label')).toBeVisible()
  })
})
