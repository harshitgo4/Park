import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie';

const theme = extendTheme({
  colors: {
    brand: '#5D5DFF',
    white: '#fff',
  },
});

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered:', registration);
    } catch (err) {
      console.error('Failed to register service worker:', err);
    }
  }
};

const requestNotificationPermission = async () => {
  try {
    const permissionResult = await Notification.requestPermission();
    return permissionResult === 'granted';
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return false;
  }
};

const subscribeToPush = async () => {
  // Check if the token exists before proceeding to request permission
  const token = Cookies.get('token');
  if (!token) {
    console.log('Token not available. Skipping push notification subscription.');
    return;
  }

  if (!('PushManager' in window)) {
    console.error('Push notifications are not supported in this browser');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // Replace 'YOUR_PUBLIC_KEY' with the actual VAPID public key you generated
    const applicationServerKey =
      'BJGSc-NAWBwkw5pXl_FaUNj2ebiXtPJm_qRUfsTkMCps6jSBm67xqn12FBpH53woCjmp6mjRZel2uhZXOhdgQyY';

    const options = {
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    };

    const subscription = await registration.pushManager.subscribe(options);

    // Send the subscription data to your backend (via an API call, for example)
    await sendSubscriptionToBackend(subscription);

    console.log('Push subscription successful');
  } catch (err) {
    console.error('Error subscribing to push notifications:', err);
  }
};

const sendSubscriptionToBackend = async (subscription) => {
  // Send the subscription data to your backend
  // You need to implement this API call to send the subscription to your backend
  console.log(subscription);
  await fetch('https://bdsm-backend.onrender.com/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    body: JSON.stringify({ subscription }),
  });
};

const Main = () => {
  useEffect(() => {
    registerServiceWorker();
    const initializePushNotifications = async () => {
      // Check if the token exists before requesting permission
      const token = Cookies.get('token');
      if (token) {
        const permissionGranted = await requestNotificationPermission();
        if (permissionGranted) {
          await subscribeToPush();
        } else {
          console.log('Permission denied for push notifications');
        }
      } else {
        console.log('Token not available. Skipping push notification permission request.');
      }
    };
    initializePushNotifications();
  }, []);

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
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
