import { CheckCircle, Home, Menu } from 'lucide-react'
import SideBarItem from './SidebarItem'
import { useState } from 'react'
import UserAccount from './UserAccount'
import ProjectsSidebar from './ProjectsSidebar'

function SideBar (): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)

  const handleOpen = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`flex flex-col justify-between h-screen max-h-screen pt-6 pb-2 border-r border-neutral-200 ${isOpen ? 'w-60 px-4' : 'w-14'}`}>
      <div>
        <div className={`h-8 flex flex-row w-full items-center min-w-12 ${isOpen ? 'justify-between p-2' : 'justify-center'}`}>
          <h1 className={`font-bold text-2xl ${isOpen ? 'block' : 'hidden'}`}>TobiTasks</h1>
          <Menu size={25} onClick={handleOpen}/>
        </div>
        <div className='py-6'>
          <ul className='space-y-2'>
            <SideBarItem to='/main' icon={<Home size={20}/>} text='Inicio' isOpen={isOpen} />
            <SideBarItem to='/my-tasks' icon={<CheckCircle size={20}/>} text='Mis tareas' isOpen={isOpen}/>
            <ProjectsSidebar isOpen={isOpen}/>
          </ul>
        </div>
      </div>
      <div>
        <div className={`h-14 flex flex-row items-center w-full ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <UserAccount isOpen={isOpen}/>
        </div>
      </div>
    </div>
  )
}

export default SideBar
