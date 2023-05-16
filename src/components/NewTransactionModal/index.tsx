import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import { ArrowCircleDown, ArrowCircleUp, X, CaretDown } from 'phosphor-react'
import {
  CloseButton,
  Content,
  SelectViewPort,
  Overlay,
  SelectTrigger,
  TransactionsType,
  TransactionsTypeButton,
  NewTransactionsButton,
} from './styles'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../context/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { SelectItem } from './SelectItem'
import { useEffect, useState } from 'react'
import { User } from '../../@types/styled'
import { api } from '../../lib/axios'

const newTransactionsFormSchema = z
  .object({
    description: z.string(),
    amount: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
    user_id: z.string().uuid(),
  })
  .partial()
  .refine(
    (schema) => schema.type === 'income' || !!schema.user_id,
    'É obrigatório escolher usuário para de envio!',
  )

type NewTransactionSchemaFormType = z.infer<typeof newTransactionsFormSchema>

interface ResponseUsers {
  users: User[]
}

export function NewTransactionModal() {
  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<NewTransactionSchemaFormType>({
    resolver: zodResolver(newTransactionsFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  const { createTransaction, createTransference } = useContextSelector(
    TransactionContext,
    (context) => {
      return context
    },
  )

  function toggleTransactionModal() {
    setOpen((state) => !state)
  }

  async function handleCreateNewTransaction(
    data: NewTransactionSchemaFormType,
  ) {
    const newTransaction = {
      ...data,
    }

    if (newTransaction.type === 'income') {
      await createTransaction(newTransaction)
    } else {
      await createTransference(newTransaction)
    }

    reset()
    toggleTransactionModal()
  }

  useEffect(() => {
    async function getUsersRequest() {
      const response = await api.get<ResponseUsers>('users')

      setUsers(response.data.users)
    }

    getUsersRequest()
  }, [])

  const { type } = watch()

  return (
    <Dialog.Root open={open} onOpenChange={toggleTransactionModal}>
      <Dialog.Trigger asChild>
        <NewTransactionsButton title="new-transaction">
          Nova transação
        </NewTransactionsButton>
      </Dialog.Trigger>

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

            {type === 'outcome' && (
              <Controller
                control={control}
                name="user_id"
                render={(props) => {
                  return (
                    <Select.Root
                      value={props.field.value}
                      onValueChange={props.field.onChange}
                    >
                      <SelectTrigger>
                        <Select.Value
                          placeholder="Selecione um usuário..."
                          aria-label={props.field.name}
                        />
                        <Select.Icon>
                          <CaretDown size={14} />
                        </Select.Icon>
                      </SelectTrigger>

                      <Select.Portal>
                        <Select.Content>
                          <Select.ScrollUpButton>
                            <CaretDown size={14} />
                          </Select.ScrollUpButton>
                          <SelectViewPort>
                            {users.length > 0 &&
                              users.map((user) => {
                                return (
                                  <>
                                    <SelectItem value={user.id} key={user.id}>
                                      {user.name}
                                    </SelectItem>
                                    <Select.Separator />
                                  </>
                                )
                              })}
                          </SelectViewPort>
                          <Select.ScrollDownButton />
                          <Select.Arrow />
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  )
                }}
              />
            )}

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

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
