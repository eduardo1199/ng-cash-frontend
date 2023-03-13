import { render } from '@testing-library/react'

import { Header } from './index'

jest.mock('react-router-dom', () => {
  return {
    useNavigate() {
      return {}
    },
  }
})

describe('Test component header', () => {
  it('should be rendered button new Transaction', () => {
    const { debug } = render(<Header />)

    debug()
  })
})
