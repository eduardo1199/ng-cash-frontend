import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionsType,
  TransactionsTypeButton,
} from './styles'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../context/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionSchemaFormType = z.infer<typeof newTransactionsFormSchema>

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitted },
  } = useForm<NewTransactionSchemaFormType>({
    resolver: zodResolver(newTransactionsFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction
    },
  )

  async function handleCreateNewTransaction(
    data: NewTransactionSchemaFormType,
  ) {
    const newTransaction = {
      ...data,
    }

    await createTransaction(newTransaction)

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={(props) => {
              return (
                <TransactionsType
                  onValueChange={props.field.onChange}
                  value={props.field.value}
                >
                  <TransactionsTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Guardar
                  </TransactionsTypeButton>
                  <TransactionsTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Transferir
                  </TransactionsTypeButton>
                </TransactionsType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitted}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
