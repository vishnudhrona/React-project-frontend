import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="767228121593-to3o9r5l0507q14oambb2h98k3ob7418.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
