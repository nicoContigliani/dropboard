// components/dashboardGeneral/Task/SortableTask.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import { Task } from '@/types/types';

interface SortableTaskProps {
  task: Task;
  onClick: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const SortableTask: React.FC<SortableTaskProps> = ({
  task,
  onClick,
  onEdit,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Separar los atributos del drag handle
  const { onClick: _, ...dragHandleProps } = listeners || {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <TaskCard
        task={task}
        onClick={onClick}
        onEdit={onEdit}
        onDelete={onDelete}
        showDragHandle={true}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps} // Pasar solo los props necesarios para el drag
      />
    </div>
  );
};