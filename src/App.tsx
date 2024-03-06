import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import { Toaster } from 'sonner'
import MainPage from './pages/main/MainPage'
import MainLayout from './layouts/MainLayout'
import MyTaskPage from './pages/myTasks/MyTasksPage'
import ProjectPage from './pages/project/ProjectPage'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

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
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: '/main',
            element: <MainPage />
          },
          {
            path: '/my-tasks',
            element: <MyTaskPage />
          },
          {
            path: '/project/:id',
            element: <ProjectPage />
          }
        ]
      }
    ]
  }
])

function App (): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors/>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
