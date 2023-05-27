import * as Dialog from '@radix-ui/react-dialog'
import { Eye, Warning, X } from 'phosphor-react'

import {
  ButtonViewTransaction,
  CloseButton,
  Content,
  Overlay,
  Trigger,
  Error,
  Detail,
} from './styles'
import { useState } from 'react'
import { api } from '../../lib/axios'
import { Transaction, ViewTransactionModalProps } from './types'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

export function ViewTransactionModal({ id }: ViewTransactionModalProps) {
  const [open, setIsOpen] = useState(false)
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  function handleOpenModal() {
    setIsOpen((state) => !state)
  }

  async function handleRequestGetTransference() {
    try {
      const response = await api.get<{ transaction: Transaction }>(
        `/transactions/transfer/${id}`,
      )

      setTransaction(response.data.transaction)
      console.log(response.data)
    } catch (error) {}
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenModal}>
      <Trigger>
        <ButtonViewTransaction onClick={handleRequestGetTransference}>
          <Eye />
        </ButtonViewTransaction>
      </Trigger>

      <Dialog.Portal>
        <Overlay />

        <Content>
          <Dialog.Title>Transferência</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          {transaction ? (
            <Detail>
              <p>Transferência realizada para:</p>
              <span>{transaction.name}</span>
              <p>No valor de:</p>
              <span>{priceFormatter.format(transaction.amount)}</span>
              <p>No dia:</p>
              <span>
                {dateFormatter.format(new Date(transaction.createdAt))}
              </span>
              <p>Sobre:</p>
              <span>{transaction.description}</span>
            </Detail>
          ) : (
            <Error>
              <span>
                Essa transação foi do tipo depósito, selecione uma transferência
                do tipo retirada!
              </span>
              <Warning />
            </Error>
          )}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
