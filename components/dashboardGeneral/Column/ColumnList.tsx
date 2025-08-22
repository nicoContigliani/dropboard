// import React from 'react';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { SortableTask } from '../Task/SortableTask';
// import { Task } from '@/types/types';

// interface ColumnListProps {
//   tasks: Task[];
//   onTaskClick: (task: Task) => void;
// }

// export const ColumnList: React.FC<ColumnListProps> = ({ tasks, onTaskClick }) => {
//   return (
//     <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
//       {tasks.map((task) => (
//         <SortableTask key={task.id} task={task} onClick={onTaskClick} onEdit={function (task: Task): void {
//           throw new Error('Function not implemented.');
//         } } onDelete={function (task: Task): void {
//           throw new Error('Function not implemented.');
//         } } />
//       ))}
//     </SortableContext>
//   );
// };


// components/dashboardGeneral/ColumnList.tsx
import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTask } from '../Task/SortableTask';
import { Task } from '@/types/types';

interface ColumnListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (task: Task) => void;
}

export const ColumnList: React.FC<ColumnListProps> = ({
  tasks,
  onTaskClick,
  onTaskEdit,
  onTaskDelete
}) => {
  return (
    <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
      {tasks.map((task) => (
        <SortableTask
          key={task.id}
          task={task}
          onClick={onTaskClick}
          onEdit={onTaskEdit}
          onDelete={onTaskDelete}
        />
      ))}
    </SortableContext>
  );
};