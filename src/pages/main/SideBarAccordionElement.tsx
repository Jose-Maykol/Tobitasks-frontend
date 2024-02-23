import { ChevronDown, KanbanSquare } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface SideBarAccordionElementProps {
  isOpen: boolean
}

function SideBarAccordionElement (
  { isOpen }: SideBarAccordionElementProps
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
        <div>
          <ul className='space-y-1'>
            <NavLink to='/project/1' className='flex flex-row items-center font-medium p-2 rounded-sm hover:bg-neutral-300'>
              <li className='flex flex-row text-sm items-center font-medium px-2 rounded-sm hover:bg-neutral-300'>
                <span className='bg-green-500 rounded-sm w-2 h-2 mr-2'/>
                <h3 className='truncate w-40'>Proyecto 1</h3>
              </li>
            </NavLink>
            <NavLink to='/project/2' className='flex flex-row items-center font-medium p-2 rounded-sm hover:bg-neutral-300'>
              <li className='flex flex-row text-sm items-center font-medium px-2 rounded-sm hover:bg-neutral-300'>
                <span className='bg-amber-500 rounded-sm w-2 h-2 mr-2'/>
                <h3 className='truncate w-40'>Proyecto 2 dsadasdasdasdasdasdasdasdasd</h3>
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </li>
  )
}

export default SideBarAccordionElement
