import { useContext } from 'react'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/Search'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../context/TransactionsContext'
import { formatCurrencyNumber } from '../../utils'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const { transactions } = useContext(TransactionContext)

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
                      {formatCurrencyNumber(transaction.price)}
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
