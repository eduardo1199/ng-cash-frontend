import { ReactNode, useEffect, useState, useCallback, useContext } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

import { SessionContext } from './SessionContext'

type Transaction = {
  id: string
  type?: 'income' | 'outcome'
  amount?: number
  user_id?: string
  description?: string
  category?: string | null
  created_at?: string | null
}

type CreateNewTransactionDeposit = Omit<
  Transaction,
  'id' | 'created_at' | 'user_id'
>
type CreateDataTransfer = Omit<Transaction, 'created_at' | 'id'>

interface CreateNewTransactionTransfer extends CreateDataTransfer {
  userDestinationId?: string
}

type TransactionContextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateNewTransactionDeposit) => Promise<void>
  createTransference: (data: CreateNewTransactionTransfer) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const { session } = useContext(SessionContext)

  const fetchTransactions = useCallback(
    async (query?: string) => {
      if (!session) {
        return
      }

      const response = await api.get<{ transactions: Transaction[] }>(
        `transactions/${session}`,
      )

      setTransactions(response.data.transactions)
    },
    [session],
  )

  const createTransaction = useCallback(
    async (data: CreateNewTransactionDeposit) => {
      const { category, amount, type, description } = data

      await api.post('transactions/deposit', {
        category,
        type,
        amount,
        description,
        userId: session,
      })

      await fetchTransactions()
    },
    [fetchTransactions, session],
  )

  const createTransference = useCallback(
    async (data: CreateNewTransactionTransfer) => {
      const {
        category,
        amount,
        type,
        description,
        user_id: userDestinationId,
      } = data

      await api.post('transactions/transfer', {
        category,
        type,
        amount,
        description,
        userId: session,
        userDestinationId,
      })

      await fetchTransactions()
    },
    [fetchTransactions, session],
  )

  useEffect(() => {
    fetchTransactions()

    return () => {
      setTransactions([])
    }
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        createTransference,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
