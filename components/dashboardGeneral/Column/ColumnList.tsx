import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTask } from '../Task/SortableTask';
import { Task } from '@/types/types';

interface ColumnListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const ColumnList: React.FC<ColumnListProps> = ({ tasks, onTaskClick }) => {
  return (
    <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
      {tasks.map((task) => (
        <SortableTask key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </SortableContext>
  );
};