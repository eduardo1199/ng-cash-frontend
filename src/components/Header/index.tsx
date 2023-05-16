import {
  HeaderContainer,
  HeaderContent,
  ContainerButton,
  LogoutButton,
} from './styles'
import Cookie from 'universal-cookie'

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
    cookie.remove('sessionId')
    localStorage.clear()
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="" />

        <ContainerButton>
          <NewTransactionModal />

          <LogoutButton type="button" onClick={handleLogout} title="logout">
            Sair
          </LogoutButton>
        </ContainerButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
