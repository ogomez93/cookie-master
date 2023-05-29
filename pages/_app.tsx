import { useEffect, useState } from 'react'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'

import '../styles/globals.css'
import { customTheme, darkTheme, lightTheme } from '../themes'
import Cookies from 'js-cookie'

interface Props extends AppProps {
  theme?: string
}

function MyApp({ Component, pageProps, theme }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookiesTheme = Cookies.get('COOKIE_MASTER-theme')
    const selectedTheme: Theme = cookiesTheme === 'light'
      ? lightTheme
      : (cookiesTheme === 'dark')
        ? darkTheme
        : customTheme
    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const cookies = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
//   const validThemes = ['light', 'dark', 'custom']
//   const { 'COOKIE_MASTER-theme': theme } = cookies
//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark'
//   }
// }

export default MyApp
