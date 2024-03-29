import { useContext, useEffect } from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from 'react-router-dom'
import { SessionContext } from './context/SessionContext'
import Cookie from 'universal-cookie'

import { SignIn } from './pages/SignIn'
import { Transactions } from './pages/Transactions'

import { TransactionsProvider } from './context/TransactionsContext'
interface ProtectedRouterProps {
  children: JSX.Element
}

function ProtectedRouter({ children }: ProtectedRouterProps) {
  const cookie = new Cookie()

  const sessionId = cookie.get('sessionId')

  const { handleSetSessionId } = useContext(SessionContext)
  const location = useLocation()

  useEffect(() => {
    if (sessionId) {
      handleSetSessionId(sessionId)
    }
  }, [handleSetSessionId, sessionId])

  if (!sessionId) {
    return <Navigate to="/" replace state={{ from: location }} />
  } else {
    return children
  }
}

interface RedirectToHomeProps {
  children: JSX.Element
}

function RedirectToHome({ children }: RedirectToHomeProps) {
  const { session, handleSetSessionId } = useContext(SessionContext)
  const location = useLocation()

  useEffect(() => {
    const cookie = new Cookie()

    const sessionId = cookie.get('sessionId')

    if (sessionId) {
      handleSetSessionId(sessionId)
    }
  }, [handleSetSessionId])

  if (session) {
    return <Navigate to="/home" replace state={{ from: location }} />
  } else {
    return children
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RedirectToHome>
        <SignIn />
      </RedirectToHome>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRouter>
        <TransactionsProvider>
          <Transactions />
        </TransactionsProvider>
      </ProtectedRouter>
    ),
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
