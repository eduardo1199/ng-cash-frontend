import { TransactionContext } from '../context/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.outcome += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}
