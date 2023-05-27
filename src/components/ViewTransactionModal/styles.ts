import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const ButtonViewTransaction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 8px;

  svg {
    font-size: 20px;
    color: ${(props) => props.theme.white};
  }

  :hover {
    svg {
      color: ${(props) => props.theme['green-500']};
      transition: color 0.2s;
    }
  }
`

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;

  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const Trigger = styled(Dialog.Trigger)`
  background: transparent;
  border: none;
  padding: 0;
`

export const Error = styled.div`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme['red-500']};

  margin-top: 2rem;
  font-weight: 700;
  font-size: 1rem;

  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
  }
`

export const Detail = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  margin-top: 2rem;
  gap: 1.5rem;

  span {
    color: ${(props) => props.theme['gray-400']};
    font-weight: bold;
  }
`
