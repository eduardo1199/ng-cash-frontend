import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './context/TransactionsContext'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyle } from './styles/global'

import { defaultTheme } from './styles/themes/default'
import { router } from './routes'
import { SessionContextProvider } from './context/SessionContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SessionContextProvider>
        <TransactionsProvider>
          <RouterProvider router={router} />
        </TransactionsProvider>
      </SessionContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
