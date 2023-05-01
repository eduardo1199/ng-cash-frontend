import { ReactNode, useEffect, useState, useCallback, useMemo } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

import Cookie from 'universal-cookie'

type Transaction = {
  id: string
  type?: 'income' | 'outcome'
  amount?: number
  user_id?: string
  description?: string
  category?: string | null
  created_at?: string | null
}

type CreateNewTransaction = Omit<Transaction, 'id' | 'created_at' | 'user_id'>

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

  const cookie = useMemo(() => new Cookie(), [])

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const id = cookie.get('@ngcash/id')

      const response = await api.get<{ transactions: Transaction[] }>(
        `transactions/${id}`,
      )
      setTransactions(response.data.transactions)
    },
    [cookie],
  )

  const createTransaction = useCallback(
    async (data: CreateNewTransaction) => {
      const id = cookie.get('@ngcash/id')

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
    [fetchTransactions, cookie],
  )

  useEffect(() => {
    fetchTransactions()

    return () => {
      setTransactions([])
    }
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
