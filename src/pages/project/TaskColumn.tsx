import { type Task } from '@/types/Task'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TaskColumnProps {
  id: string
  stateText: string
  tasks: Task[]
}

function TaskColumn (
  { id, stateText, tasks }: TaskColumnProps
): JSX.Element {
  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id,
    data: {
      type: 'Status'
    }
  })

  return (
    <div className='w-80 h-[350px]'>
      <div className='my-2'>
        <h3 className='font-bold text-base'>{stateText}</h3>
      </div>
      <ScrollArea className='h-[600px]'>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className={`w-80 h-full rounded-sm space-y-4 ${isOver ? 'bg-neutral-100' : null}`}
        >
          <SortableContext items={tasks.map(task => task.id)}>
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </ScrollArea>
    </div>
  )
}

export default TaskColumn
