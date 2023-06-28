import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'

const theme = extendTheme({
  colors: {
    brand: '#5D5DFF',
    white: '#fff',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
