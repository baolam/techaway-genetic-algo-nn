import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import About from '@Features/About'
import Dashboard from '@Features/Dashboard/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/about'} />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
