import { useDraggable } from '@dnd-kit/core'

interface TaskCardProps {
  id: string
}

function TaskCard (
  { id }: TaskCardProps
): JSX.Element {
  const { attributes, listeners, setNodeRef } = useDraggable({ id })

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
