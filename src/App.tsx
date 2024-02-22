import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
])

function App (): JSX.Element {
  return (
    <>
      <Toaster richColors/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
