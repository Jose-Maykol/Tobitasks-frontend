import { NavLink } from 'react-router-dom'

interface SideBarItemProps {
  to: string
  icon: JSX.Element
  text: string
  isOpen: boolean
}

function SideBarItem (
  { to, icon, text, isOpen }: SideBarItemProps
): JSX.Element {
  return (
    <li className={`text-sm font-medium rounded-sm hover:bg-neutral-300 ${isOpen || 'mx-2'}`}>
      <NavLink
        to={to}
        className={({ isActive }) => `p-2 rounded-sm flex flex-row items-center ${isActive ? 'font-bold text-purple-600 bg-purple-300' : ''} ${isOpen || 'justify-center'}`}
      >
        {icon}
        <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>{text}</span>
      </NavLink>
    </li>
  )
}

export default SideBarItem
