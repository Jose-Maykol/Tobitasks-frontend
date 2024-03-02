import { ChevronDown, KanbanSquare } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CreateProjectDialog from './CreateProjectDialog'

interface SideBarAccordionElementProps {
  isOpen: boolean
  data: Array<{
    id: string
    name: string
    color: string
  }>
}

function SideBarAccordionElement (
  { isOpen, data }: SideBarAccordionElementProps
): JSX.Element {
  const [isOpenAccordion, setIsOpen] = useState(isOpen)

  const handleOpen = (): void => {
    setIsOpen(!isOpenAccordion)
  }

  return (
    <li>
      <div className={`text-sm font-medium p-2 rounded-sm hover:bg-neutral-300 flex flex-row items-center ${isOpen ? 'justify-between' : 'mx-2 justify-center'}`} onClick={handleOpen}>
        <div className='inline-flex'>
          <KanbanSquare size={20} />
          <h2 className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Proyectos</h2>
        </div>
        <ChevronDown size={20} className={`transform transition-transform duration-300 ${isOpen ? 'block' : 'hidden'}`} style={{ transform: isOpenAccordion ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </div>
      {isOpen && isOpenAccordion && (
        <div className='flex flex-col'>
          <ul className='space-y-1'>
            {data?.map((item: { id: string, name: string, color: string }) => (
              <li className='flex flex-row text-sm items-center font-medium px-2 rounded-sm hover:bg-neutral-300'>
                <NavLink to={`/project/${item.id}`} className='flex flex-row items-center font-medium p-2 rounded-sm hover:bg-neutral-300' key={item.id}>
                  <span className={`bg-${item.color} rounded-sm w-4 h-4 mr-2`}/>
                  <h3 className='truncate w-40'>{item.name}</h3>
                </NavLink>
              </li>
            ))}
          </ul>
          <CreateProjectDialog />
        </div>
      )}
    </li>
  )
}

export default SideBarAccordionElement
