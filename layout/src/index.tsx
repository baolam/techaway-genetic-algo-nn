import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './hooks/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import UserLoginProvider from '@Providers/UserLoginProvider';
import App from './App'
import SocketProvider from '@Providers/SocketProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/service-worker.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope ', registration.scope);
//     })
//     .catch((err) => console.log(err));
// }

root.render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>
)
