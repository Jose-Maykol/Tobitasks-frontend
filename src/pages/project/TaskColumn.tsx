import { useSortable } from '@dnd-kit/sortable'

interface TaskColumnProps {
  id: string
  children?: React.ReactNode
  stateText: string
}

function TaskColumn (
  { id, children, stateText }: TaskColumnProps
): JSX.Element {
  const { attributes, listeners, setNodeRef, isOver } = useSortable({ id })

  return (
    <div className='w-80 h-[350px]'>
      <div className='my-2'>
        <h3 className='font-bold text-base'>{stateText}</h3>
      </div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`w-80 h-full rounded-sm space-y-4 ${isOver ? 'bg-neutral-100' : null}`}
      >
        {children}
      </div>
    </div>
  )
}

export default TaskColumn
