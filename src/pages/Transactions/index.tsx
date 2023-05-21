import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/Search'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../context/TransactionsContext'
import { priceFormatter, dateFormatter } from '../../utils/formatter'
import * as RadioGroup from '@radix-ui/react-radio-group'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  RadioGroupRoot,
  Item,
  RadioItem,
  ButtonViewTransaction,
} from './styles'
import { Eye } from 'phosphor-react'

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

        <RadioGroupRoot>
          <Item>
            <RadioItem value="transaction" id="transaction">
              <RadioGroup.Indicator />
            </RadioItem>
            <label htmlFor="transaction">Transações</label>
          </Item>
          <Item>
            <RadioItem value="users" id="users">
              <RadioGroup.Indicator />
            </RadioItem>
            <label htmlFor="users">Usuários</label>
          </Item>
        </RadioGroupRoot>

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
                    <ButtonViewTransaction>
                      <Eye />
                    </ButtonViewTransaction>
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
