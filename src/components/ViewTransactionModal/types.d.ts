export interface ViewTransactionModalProps {
  id: string
}

export type Transaction = {
  amount: number
  category: string
  createdAt: string
  description: string
  name: string
  type: 'outcome' | 'income'
}
