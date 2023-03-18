import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './context/TransactionsContext'
import { GlobalStyle } from './styles/global'

import { defaultTheme } from './styles/themes/default'
import { Routes } from './routes'
import { SessionContextProvider } from './context/SessionContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SessionContextProvider>
        <TransactionsProvider>
          <Routes />
        </TransactionsProvider>
      </SessionContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
