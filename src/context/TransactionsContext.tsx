import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
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

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(async (data: CreateNewTransaction) => {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      category,
      type,
      description,
      price,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
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
