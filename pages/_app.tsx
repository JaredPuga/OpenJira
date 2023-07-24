import '@/styles/globals.css'
import { darkTheme, lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { UIProvider } from '@/context/ui'
import { EntriesProvider } from '@/context/entries'

import type { AppProps } from 'next/app'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}
