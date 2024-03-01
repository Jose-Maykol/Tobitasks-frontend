import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TaskCardProps {
  id: string
}

function TaskCard (
  { id }: TaskCardProps
): JSX.Element {
  const { attributes, listeners, setNodeRef, isDragging, transition, transform } = useSortable({
    id,
    data: {
      type: 'Task'
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='w-80 h-36 rounded-sm bg-neutral-200'>

      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='w-80 h-36 border border-neutral-200 rounded-md p-2 bg-white'
    >
      <div>
        <h3 className='font-bold text-base'>Tarea {id}</h3>
      </div>
    </div>
  )
}

export default TaskCard
