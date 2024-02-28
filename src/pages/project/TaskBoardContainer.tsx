import { DndContext, type DragStartEvent, type DragEndEvent, DragOverlay } from '@dnd-kit/core'
import TaskColumn from './TaskColumn'
import TaskCard from './TaskCard'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'

function TaskBoardContainer (): JSX.Element {
  const initialItems = [
    { id: 'card-1', state: 'column-1' },
    { id: 'card-2', state: 'column-2' },
    { id: 'card-3', state: 'column-3' }
  ]

  const statuses = [
    { id: 'column-1', text: 'To Do' },
    { id: 'column-2', text: 'In Progress' },
    { id: 'column-3', text: 'Done' }
  ]

  const [items, setItems] = useState(initialItems)
  const [activeItem, setActiveItem] = useState<{ id: string } | undefined>()

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event
    setActiveItem(items.find(item => item.id === active.id))
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event
    if (over == null) return

    setItems(prevItems => {
      const updatedItems = [...prevItems]
      const activeIndex = prevItems.findIndex(item => item.id === active.id)
      const overIndex = prevItems.findIndex(item => item.state === over.id)

      updatedItems[activeIndex] = { ...updatedItems[activeIndex], state: over.id as string }

      console.log('updatedItems', updatedItems)

      const draggedItem = updatedItems.splice(activeIndex, 1)[0]
      updatedItems.splice(overIndex, 0, draggedItem)

      return updatedItems
    })
  }

  const handleDragCancel = (): void => {
    setActiveItem(undefined)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className='flex flex-row justify-start gap-4'>
        {statuses.map(status => (
          <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy} key={status.id}>
            <TaskColumn key={status.id} id={status.id} stateText={status.text}>
              {items.map(item => (
                item.state === status.id ? <TaskCard key={item.id} id={item.id} /> : null
              ))}
            </TaskColumn>
          </SortableContext>
        ))}
      </div>
      <DragOverlay>
        {(activeItem !== undefined) ? <TaskCard id={activeItem.id} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default TaskBoardContainer
