import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/Search'
import { Summary } from '../../components/Summary'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

type TransactionsData = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<TransactionsData[]>([])

  async function getTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="30%">{transaction.description}</td>

                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(transaction.price)}
                    </PriceHighLight>
                  </td>

                  <td>{transaction.category}</td>

                  <td>{transaction.createdAt}</td>

                  <td>Eduardo Soares</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
