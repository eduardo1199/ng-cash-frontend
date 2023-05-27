import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/Search'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../context/TransactionsContext'
import { priceFormatter, dateFormatter } from '../../utils/formatter'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { ViewTransactionModal } from '../../components/ViewTransactionModal'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions?.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="30%">{transaction.description}</td>

                  <td>
                    <PriceHighLight variant={transaction.type!}>
                      {transaction.type === 'outcome' && '- '}
                      {transaction.type === 'income' && '+ '}
                      {priceFormatter.format(transaction.amount!)}
                    </PriceHighLight>
                  </td>

                  <td>{transaction.category}</td>

                  <td>
                    {dateFormatter.format(new Date(transaction.created_at!))}
                  </td>

                  <td>
                    <ViewTransactionModal id={transaction.id} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
