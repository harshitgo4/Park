import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Cookies from 'js-cookie'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn:
    'https://10eca5a3bc0b8e4389bfc7e433ef988f@o97713.ingest.sentry.io/4505669107646464',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', 'http:yourserver.io/api/'],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const theme = extendTheme({
  colors: {
    brand: '#5D5DFF',
    white: '#fff',
  },
})

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker registered:', registration)
    } catch (err) {
      console.error('Failed to register service worker:', err)
    }
  }
}

const requestNotificationPermission = async () => {
  try {
    const permissionResult = await Notification.requestPermission()
    return permissionResult === 'granted'
  } catch (err) {
    console.error('Error requesting notification permission:', err)
    return false
  }
}

const subscribeToPush = async () => {
  // Check if the token exists before proceeding to request permission
  const token = Cookies.get('token')
  if (!token) {
    console.log('Token not available. Skipping push notification subscription.')
    return
  }

  if (!('PushManager' in window)) {
    console.error('Push notifications are not supported in this browser')
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready

    // Replace 'YOUR_PUBLIC_KEY' with the actual VAPID public key you generated
    const applicationServerKey =
      'BJGSc-NAWBwkw5pXl_FaUNj2ebiXtPJm_qRUfsTkMCps6jSBm67xqn12FBpH53woCjmp6mjRZel2uhZXOhdgQyY'

    const options = {
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    }

    const subscription = await registration.pushManager.subscribe(options)

    // Send the subscription data to your backend (via an API call, for example)
    await sendSubscriptionToBackend(subscription)

    console.log('Push subscription successful')
  } catch (err) {
    console.error('Error subscribing to push notifications:', err)
  }
}

const sendSubscriptionToBackend = async (subscription) => {
  // Send the subscription data to your backend
  // You need to implement this API call to send the subscription to your backend
  console.log(subscription)
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    body: JSON.stringify({ subscription }),
  })
}

const Main = () => {
  useEffect(() => {
    registerServiceWorker()
    const initializePushNotifications = async () => {
      // Check if the token exists before requesting permission
      const token = Cookies.get('token')
      if (token) {
        const permissionGranted = await requestNotificationPermission()
        if (permissionGranted) {
          await subscribeToPush()
        } else {
          console.log('Permission denied for push notifications')
        }
      } else {
        console.log(
          'Token not available. Skipping push notification permission request.',
        )
      }
    }
    initializePushNotifications()
    // Dynamically add the usetiful script to the head of the document
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.usetiful.com/dist/usetiful.js'
    script.dataset.token = 'e14550a592dc64167f785861d9e8ce7e'
    script.id = 'usetifulScript'

    document.head.appendChild(script)

    return () => {
      // Clean up the script tag when the component unmounts
      document.head.removeChild(script)
    }
  }, [])

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Router>
            <App />
          </Router>
        </GoogleOAuthProvider>
      </ChakraProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
