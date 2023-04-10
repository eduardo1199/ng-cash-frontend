import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import { ArrowCircleDown, ArrowCircleUp, X, CaretDown } from 'phosphor-react'
import {
  CloseButton,
  Content,
  ContentSelect,
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
  amount: z.number(),
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

        <form
          action=""
          title="new-transaction-form"
          onSubmit={handleSubmit(handleCreateNewTransaction)}
        >
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
            {...register('amount', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder="Selecione um usuário..." />
              <Select.Icon>
                <CaretDown size={14} />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <ContentSelect>
                <Select.ScrollUpButton>
                  <CaretDown size={14} />
                </Select.ScrollUpButton>
                <Select.Viewport>
                  <Select.Item value="1">Valor 1</Select.Item>
                  <Select.Separator />
                  <Select.Item value="2">Valor 2</Select.Item>
                </Select.Viewport>
                <Select.ScrollDownButton />
                <Select.Arrow />
              </ContentSelect>
            </Select.Portal>
          </Select.Root>

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
