import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/SignIn'
import { Transactions } from './pages/Transactions'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/home',
    element: <Transactions />,
  },
])
