import { render, screen } from '@testing-library/react'
import { TransactionContext } from '../../context/TransactionsContext'
import { faker } from '@faker-js/faker'

import { Summary } from './index'

type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

beforeEach(() => {
  const fetchTransactions = async () => {}
  const createTransaction = async () => {}

  const transactions: Transaction[] = [
    {
      id: Number(faker.datatype.uuid()),
      description: 'Venda',
      type: 'income',
      price: 1500,
      category: 'Entrada',
      createdAt: new Date().toISOString(),
    },
    {
      id: Number(faker.datatype.uuid()),
      description: 'Emprestimo',
      type: 'outcome',
      price: 200,
      category: 'Saída',
      createdAt: new Date().toISOString(),
    },
  ]

  render(
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
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
      'R$ 1.500,00',
    )
  })

  it('should render correct value income', async () => {
    expect(await screen.findByTestId('outcome-card')).toHaveTextContent(
      'R$ 200,00',
    )
  })

  it('should render correct value income', async () => {
    expect(await screen.findByTestId('total-card')).toHaveTextContent(
      'R$ 1.300,00',
    )
  })
})
