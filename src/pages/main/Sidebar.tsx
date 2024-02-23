import { CheckCircle, Home, Menu } from 'lucide-react'
import SideBarItem from './SidebarItem'
import SideBarAccordionElement from './SideBarAccordionElement'
import { useState } from 'react'

function SideBar (): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)

  const handleOpen = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`h-screen max-h-screen py-6 border-r border-neutral-200 ${isOpen ? 'w-60 px-4' : 'w-14'}`}>
      <div className={`h-8 flex flex-row w-full items-center min-w-12 ${isOpen ? 'justify-between p-2' : 'justify-center'}`}>
        <h1 className={`font-bold text-2xl ${isOpen ? 'block' : 'hidden'}`}>TobiTasks</h1>
        <Menu size={25} onClick={handleOpen}/>
      </div>
      <div className='py-6'>
        <ul className='space-y-2'>
          <SideBarItem to='/main' icon={<Home size={20}/>} text='Inicio' isOpen={isOpen} />
          <SideBarItem to='/my-tasks' icon={<CheckCircle size={20}/>} text='Mis tareas' isOpen={isOpen}/>
          <SideBarAccordionElement isOpen={isOpen}/>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
