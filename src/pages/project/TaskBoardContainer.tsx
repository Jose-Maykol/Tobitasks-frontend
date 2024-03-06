import { DndContext, type DragStartEvent, type DragEndEvent, DragOverlay, closestCorners, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import TaskColumn from './TaskColumn'
import TaskCard from './TaskCard'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { type Task } from '@/types/Task'
import { type Status } from '@/types/Status'
import { socket } from '@/socket'
import { useParams } from 'react-router-dom'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

function TaskBoardContainer (): JSX.Element {
  const params = useParams()
  const { id } = params

  // TODO: Fetch statuses from socket

  const statuses: Status[] = [
    { id: '65dd1ac5657aff113d451767', name: 'En planificación' },
    { id: '65dd1ac5657aff113d451768', name: 'En desarrollo' },
    { id: '5dd1ac5657aff113d451769', name: 'En pruebas' },
    { id: '65dd1ac5657aff113d45176a', name: 'Finalizado' }
  ]

  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTask, setActiveTask] = useState< Task | undefined>()
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.io.opts.query = { projectId: id }

    socket.emit('task')

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.connect()

    socket.on('task', (data) => {
      console.log('tasks', data.tasks as Task[])
      const projectTasks: Task[] = data.tasks
      setTasks(projectTasks)
    })

    socket.on('status', (data) => {
      console.log('statuses', data.statuses as Status[])
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [id])

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
        if (tasks[activeIndex].status !== tasks[overIndex].status) {
          tasks[activeIndex].status = tasks[overIndex].status
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverColumn = over.data.current?.type === 'Status'

    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        const overIndex = tasks.findIndex(task => task.status === overId)
        tasks[activeIndex].status = overId as string
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }
  }

  if (!isConnected) {
    return <div>Connecting...</div>
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
      <ScrollArea className='w-full whitespace-nowrap h-[700px]'>
        <div className='flex flex-row justify-start gap-4'>
          {statuses.map(status => (
            <SortableContext items={tasks.map(item => item.id)} strategy={rectSortingStrategy} key={status.id}>
              <TaskColumn
                id={status.id}
                stateText={status.name}
                tasks={tasks.filter(task => task.status === status.id)}
                />
            </SortableContext>
          ))}
        </div>
        <ScrollBar orientation='horizontal'/>
      </ScrollArea>
      <DragOverlay>
        {(activeTask !== undefined) ? <TaskCard id={activeTask.id} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default TaskBoardContainer
