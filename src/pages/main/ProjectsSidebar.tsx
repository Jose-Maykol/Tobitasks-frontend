import ProjectService from '@/services/ProjectService'
import SideBarAccordionElement from './SideBarAccordionElement'
import { useQuery } from 'react-query'
import { type Project } from '@/types/Project'
import { KanbanSquare, Loader2 } from 'lucide-react'

interface DataProps {
  projects: Project[]
}

interface ProjectsSidebarProps {
  isOpen: boolean
}

function ProjectsSidebar (
  { isOpen }: ProjectsSidebarProps
): JSX.Element {
  const { data, isLoading } = useQuery('projects', async () => {
    const projects = await ProjectService.get()
    return projects
  }, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isLoading) {
    return (
      <div className={'text-sm font-medium p-2 rounded-sm hover:bg-neutral-300 flex flex-row items-center justify-between w-full'}>
        <div className='inline-flex'>
          <KanbanSquare size={20} />
          <h2 className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Proyectos</h2>
        </div>
        <Loader2 size={20} className={'animate-spin'}/>
      </div>
    )
  }

  return (
    <SideBarAccordionElement isOpen={isOpen} data={(data as DataProps).projects}/>
  )
}

export default ProjectsSidebar
