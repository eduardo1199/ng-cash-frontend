import { createContext, ReactNode, useState } from 'react'

type SessionContextType = {
  session: string
  handleSetSessionId: (sessionId: string) => void
  handleRemoveSessionId: () => void
}

interface SessionContextProviderProps {
  children: ReactNode
}

export const SessionContext = createContext({} as SessionContextType)

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const [session, setSession] = useState('')

  function handleSetSessionId(sessionId: string) {
    setSession(sessionId)
  }

  function handleRemoveSessionId() {
    setSession('')
  }

  return (
    <SessionContext.Provider
      value={{ session, handleSetSessionId, handleRemoveSessionId }}
    >
      {children}
    </SessionContext.Provider>
  )
}
