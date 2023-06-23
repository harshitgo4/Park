import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'

const theme = extendTheme({
  colors: {
    brand: '#5D5DFF',
    white: '#fff',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* <GoogleOAuthProvider clientId="429483041271-ejdh5sm4c42q0f2bbrnfre9o0fcsvf6i.apps.googleusercontent.com"> */}
        <Router>
          <App />
        </Router>
      {/* </GoogleOAuthProvider> */}
    </ChakraProvider>
  </React.StrictMode>,
)
