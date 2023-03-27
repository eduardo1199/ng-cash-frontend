import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './index'

import { SessionContextProvider } from '../../context/SessionContext'

const mockNavigation = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigation,
  }
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Test component header', () => {
  window.ResizeObserver = ResizeObserver

  it('should be rendered button new Transaction', async () => {
    const { findByTitle } = render(<Header />)

    const NewTransactionButton = await findByTitle('new-transaction')

    expect(NewTransactionButton).toBeInTheDocument()
  })

  it('should be rendered button logout', async () => {
    const { findByTitle } = render(<Header />)

    const LogoutButton = await findByTitle('logout')

    expect(LogoutButton).toBeInTheDocument()
  })

  it('logout app redirect by home', async () => {
    const { findByTitle } = render(
      <SessionContextProvider>
        <Header />
      </SessionContextProvider>,
    )

    const LogoutButton = await findByTitle('logout')

    expect(LogoutButton).toBeInTheDocument()
    await userEvent.click(LogoutButton)

    expect(mockNavigation).toHaveBeenCalledWith('/')
  })

  it('should be not rendered new transaction modal', () => {
    const { queryByTitle } = render(<Header />)

    const TransactionForm = queryByTitle('new-transaction-form')

    expect(TransactionForm).not.toBeInTheDocument()
  })

  it('should be rendered new transaction modal', async () => {
    const { findByTitle } = render(<Header />)

    const NewTransactionButton = await findByTitle('new-transaction')

    await userEvent.click(NewTransactionButton)

    const TransactionForm = await findByTitle('new-transaction-form')
    expect(TransactionForm).toBeInTheDocument()
  })
})
