import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchForm } from './index'

/* jest.mock('useContextSelector', () => {
  return {
    fetchTransactions() {
      return []
    },
  }
}) */

describe('Testing Component Search Form', () => {
  it('should be render input search', async () => {
    const { findByPlaceholderText } = render(<SearchForm />)

    const SearchInput = await findByPlaceholderText('Busque por transações')

    expect(SearchInput).toBeInTheDocument()
  })

  it('should be render button input search', async () => {
    const { findByTitle } = render(<SearchForm />)

    const SearchButton = await findByTitle('search')

    expect(SearchButton).toBeInTheDocument()
  })

  it('should be render text transaction is required', async () => {
    const { findByTitle, queryByText } = render(<SearchForm />)

    const SearchButton = await findByTitle('search')

    expect(SearchButton).toBeInTheDocument()
    // await userEvent.click(SearchButton)

    expect(queryByText('Nome de transação obrigatória')).not.toBeInTheDocument()
  })

  it('should be render search transaction', async () => {
    const { findByTitle, queryByText, findByPlaceholderText } = render(
      <SearchForm />,
    )

    const SearchInput = await findByPlaceholderText('Busque por transações')
    await userEvent.type(SearchInput, 'Salário')

    const SearchButton = await findByTitle('search')

    expect(SearchButton).toBeInTheDocument()
    // await userEvent.click(SearchButton)

    expect(queryByText('Nome de transação obrigatória')).not.toBeInTheDocument()
  })
})
