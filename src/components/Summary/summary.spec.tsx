import { render, screen } from '@testing-library/react'
import { TransactionContext } from '../../context/TransactionsContext'
import { faker } from '@faker-js/faker'

import { Summary } from './index'

type Transaction = {
  id: string
  type: 'income' | 'outcome'
  amount: number
  user_id: string | undefined
  description: string
  category: string | null
  created_at: string
}

beforeEach(() => {
  const fetchTransactions = async () => {}
  const createTransaction = async () => {}
  const createTransference = async () => {}

  const transactions: Transaction[] = [
    {
      id: String(faker.datatype.uuid()),
      description: 'Venda',
      type: 'income',
      amount: 1500,
      category: 'Entrada',
      created_at: new Date().toISOString(),
      user_id: undefined,
    },
    {
      id: String(faker.datatype.uuid()),
      description: 'Deposito',
      type: 'income',
      amount: 200,
      category: 'Poupança',
      created_at: new Date().toISOString(),
      user_id: undefined,
    },
  ]

  render(
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        createTransference,
      }}
    >
      <Summary />
    </TransactionContext.Provider>,
  )
})

describe('Testing component Summary', () => {
  it('should render component summary', async () => {
    expect(await screen.findByTestId('income-card')).toBeInTheDocument()
    expect(await screen.findByTestId('outcome-card')).toBeInTheDocument()
    expect(await screen.findByTestId('total-card')).toBeInTheDocument()
  })

  it('should render correct value income', async () => {
    expect(await screen.findByTestId('income-card')).toHaveTextContent(
      'R$ 1.700,00',
    )
  })

  it('should render correct value income', async () => {
    expect(await screen.findByTestId('outcome-card')).toHaveTextContent(
      'R$ 0,00',
    )
  })

  it('should render correct value income', async () => {
    expect(await screen.findByTestId('total-card')).toHaveTextContent(
      'R$ 1.700,00',
    )
  })
})
