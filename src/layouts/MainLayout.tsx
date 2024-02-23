import SideBar from '@/pages/main/Sidebar'
import { Outlet } from 'react-router-dom'

function MainLayout (): JSX.Element {
  return (
    <div className='flex flex-row w-full h-screen'>
      <SideBar />
      <div className='flex-1 flex-shrink-0 p-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
