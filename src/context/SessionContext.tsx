import { createContext, ReactNode, useState } from 'react'

type SessionContextType = {
  session: string
  handleLogin: () => void
  handleLogout: () => void
}

interface SessionContextProviderProps {
  children: ReactNode
}

export const SessionContext = createContext({} as SessionContextType)

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const [session] = useState('')

  function handleLogin() {}

  function handleLogout() {}

  return (
    <SessionContext.Provider value={{ session, handleLogin, handleLogout }}>
      {children}
    </SessionContext.Provider>
  )
}
