import { DndContext, type DragStartEvent, type DragEndEvent, DragOverlay, closestCorners, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import TaskColumn from './TaskColumn'
import TaskCard from './TaskCard'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { type Task } from '@/types/Task'
import { type Status } from '@/types/Status'

function TaskBoardContainer (): JSX.Element {
  const inititalTasks: Task[] = [
    { id: 'card-1', state: 'column-1' },
    { id: 'card-2', state: 'column-2' },
    { id: 'card-3', state: 'column-3' },
    { id: 'card-4', state: 'column-1' },
    { id: 'card-5', state: 'column-2' },
    { id: 'card-6', state: 'column-3' }
  ]

  const statuses: Status[] = [
    { id: 'column-1', name: 'To Do' },
    { id: 'column-2', name: 'In Progress' },
    { id: 'column-3', name: 'Done' }
  ]

  const [tasks, setTasks] = useState<Task[]>(inititalTasks)
  const [activeTask, setActiveTask] = useState< Task | undefined>()

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event
    setActiveTask(tasks.find(item => item.id === active.id))
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    setActiveTask(undefined)

    const { active, over } = event
    if (over === null) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    setActiveTask(undefined)
  }

  const handleDragCancel = (): void => {
    setActiveTask(undefined)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const handleDragOver = (event: DragEndEvent): Task[] | undefined => {
    const { active, over } = event
    if (over == null) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'

    if (!isActiveTask) return

    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const overIndex = tasks.findIndex(task => task.id === overId)
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        if (tasks[activeIndex].state !== tasks[overIndex].state) {
          tasks[activeIndex].state = tasks[overIndex].state
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverColumn = over.data.current?.type === 'Status'

    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        const overIndex = tasks.findIndex(task => task.state === overId)
        tasks[activeIndex].state = overId as string
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      <div className='flex flex-row justify-start gap-4'>
        {statuses.map(status => (
          <SortableContext items={tasks.map(item => item.id)} strategy={rectSortingStrategy} key={status.id}>
            <TaskColumn
              id={status.id}
              stateText={status.name}
              tasks={tasks.filter(task => task.state === status.id)}
            />
          </SortableContext>
        ))}
      </div>
      <DragOverlay>
        {(activeTask !== undefined) ? <TaskCard id={activeTask.id} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default TaskBoardContainer
