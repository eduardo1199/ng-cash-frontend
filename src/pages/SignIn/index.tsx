import { Container, Main, Logo, Input } from './styles'

import logo from '../../assets/logo.svg'

import { SessionContext } from '../../context/SessionContext'

import { useNavigate } from 'react-router-dom'
import Cookie from 'universal-cookie'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'

const FormLoginSchema = z.object({
  name: z.string().min(1, 'Nome Obrigatório ou maior que um caractere'),
  email: z.string().email('Email Obrigatório'),
})

type FormTypeDataSchema = z.infer<typeof FormLoginSchema>

export function SignIn() {
  const cookie = new Cookie()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormTypeDataSchema>({
    resolver: zodResolver(FormLoginSchema),
  })

  const navigator = useNavigate()
  const { handleSetSessionId } = useContext(SessionContext)

  function handleCreateOrLogin(data: FormTypeDataSchema) {
    const { name, email } = data

    // function handle login and after save the token on cookies

    handleSetSessionId('0884cff5-4a48-4a93-b294-0c772755f2b5')

    cookie.set('@ng-cash:sessionId', '0884cff5-4a48-4a93-b294-0c772755f2b5')
    navigator('/home')

    reset()
  }

  return (
    <Container>
      <Main>
        <Logo src={logo} alt="" />

        <form action="" onSubmit={handleSubmit(handleCreateOrLogin)}>
          <Input
            type="text"
            placeholder="Digite seu nome"
            {...register('name')}
            invalid={!!errors.name?.message}
          />

          <Input
            type="email"
            placeholder="Digite seu email"
            {...register('email')}
            invalid={!!errors.email?.message}
          />

          <button type="submit">Entrar</button>
        </form>
      </Main>
    </Container>
  )
}
