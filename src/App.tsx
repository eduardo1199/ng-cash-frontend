import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './context/TransactionsContext'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyle } from './styles/global'

import { defaultTheme } from './styles/themes/default'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <RouterProvider router={router} />
      </TransactionsProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
