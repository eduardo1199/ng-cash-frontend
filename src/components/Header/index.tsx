import {
  HeaderContainer,
  HeaderContent,
  NewTransactionsButton,
  ContainerButton,
  LogoutButton,
} from './styles'

import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  const navigator = useNavigate()

  function handleLogout() {
    navigator('/')
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="" />

        <ContainerButton>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionsButton>Nova transação</NewTransactionsButton>
            </Dialog.Trigger>

            <NewTransactionModal />
          </Dialog.Root>

          <LogoutButton type="button" onClick={handleLogout}>
            Sair
          </LogoutButton>
        </ContainerButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
