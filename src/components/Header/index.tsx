import {
  HeaderContainer,
  HeaderContent,
  NewTransactionsButton,
  ContainerButton,
  LogoutButton,
} from './styles'
import Cookie from 'universal-cookie'

import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { SessionContext } from '../../context/SessionContext'
import { useContext } from 'react'

export function Header() {
  const cookie = new Cookie()

  const navigator = useNavigate()
  const { handleRemoveSessionId } = useContext(SessionContext)

  function handleLogout() {
    navigator('/')
    handleRemoveSessionId()
    cookie.remove('@ng-cash:sessionId')
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
