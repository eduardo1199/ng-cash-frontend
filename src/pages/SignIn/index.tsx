import { Container, Main, Logo } from './styles'

import logo from '../../assets/logo.svg'

export function SignIn() {
  return (
    <Container>
      <Main>
        <Logo src={logo} alt="" />

        <form action="">
          <label htmlFor="">Seu nome</label>
          <input type="text" placeholder="Digite seu nome" />

          <label htmlFor="">Seu email</label>
          <input type="email" placeholder="Digite seu email" />

          <button type="submit">Entrar</button>
        </form>
      </Main>
    </Container>
  )
}
