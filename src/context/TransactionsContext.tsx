import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

import Cookie from 'universal-cookie'

type Transaction = {
  id: string
  type: 'income' | 'outcome'
  amount: number
  user_id: string
  description: string | null
  category: string | null
}

type CreateNewTransaction = Omit<Transaction, 'id' | 'createdAt' | 'user_id'>

type TransactionContextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateNewTransaction) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const cookie = new Cookie()

  const id = cookie.get('@ngcash/id')

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get<{ transactions: Transaction[] }>(
        `transactions/${id}`,
      )
      setTransactions(response.data.transactions)
    },
    [id],
  )

  const createTransaction = useCallback(
    async (data: CreateNewTransaction) => {
      const { category, amount, type, description } = data

      await api.post('transactions/deposit', {
        category,
        type,
        amount,
        description,
        userId: id,
      })

      await fetchTransactions()
    },
    [fetchTransactions, id],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
