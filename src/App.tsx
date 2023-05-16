import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'

import { defaultTheme } from './styles/themes/default'
import { Routes } from './routes'
import { SessionContextProvider } from './context/SessionContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SessionContextProvider>
        <Routes />
      </SessionContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
