import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login.jsx'
import './index.css'
import Homepage from './pages/Homepage.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <RequireAuth />,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/profile', element: <Profile /> },
      ]
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
