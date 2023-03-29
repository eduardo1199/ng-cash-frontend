import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

import Cookie from 'universal-cookie'

type Transaction = {
  id: string
  type: 'income' | 'outcome'
  amount: number
  created_at: string
  user_id: string
  description: string | null
  category: string | null
}

type CreateNewTransaction = Omit<Transaction, 'id' | 'createdAt'>

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

  const sessionId = cookie.get('sessionId')

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get<{ transactions: Transaction[] }>(
        `transactions/${sessionId}`,
      )
      setTransactions(response.data.transactions)
    },
    [sessionId],
  )

  const createTransaction = useCallback(async (data: CreateNewTransaction) => {
    const { category, price, type } = data

    /*  const response = await api.post('transactions', {
      title: category,
      type,
      amount: price,
    }) */

    /* const cookie = response.headers['set-cookie']
     */
    /* console.log(cookie) */

    /* setTransactions((state) => [response.data, ...state]) */
  }, [])

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
