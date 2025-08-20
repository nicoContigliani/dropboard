// hooks/useKanbanBoard.ts
import { useState } from 'react';
import { KanbanData, Column, Task } from '@/components/ResponsiveKanbanBoard/KanbanBoard';

export const useKanbanBoard = (initialData: KanbanData) => {
  const [data, setData] = useState<KanbanData>(initialData);

  const addColumn = (column: Column) => {
    const newColumns = [...data.columns, column];
    setData({ ...data, columns: newColumns });
  };

  const removeColumn = (columnId: string) => {
    const newColumns = data.columns.filter(col => col.id !== columnId);
    setData({ ...data, columns: newColumns });
  };

  const updateColumn = (columnId: string, updatedColumn: Partial<Column>) => {
    const newColumns = data.columns.map(col => 
      col.id === columnId ? { ...col, ...updatedColumn } : col
    );
    setData({ ...data, columns: newColumns });
  };

  const addCard = (columnId: string, task: Task) => {
    const newColumns = data.columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, task] } 
        : col
    );
    setData({ ...data, columns: newColumns });
  };

  const updateCard = (taskId: string, updatedTask: Partial<Task>) => {
    const newColumns = data.columns.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    }));
    setData({ ...data, columns: newColumns });
  };

  const removeCard = (taskId: string) => {
    const newColumns = data.columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId)
    }));
    setData({ ...data, columns: newColumns });
  };

  const moveCard = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    const task = data.columns
      .find(col => col.id === sourceColumnId)
      ?.tasks.find(task => task.id === taskId);
    
    if (!task) return;

    // Remove from source column
    const columnsAfterRemoval = data.columns.map(col => 
      col.id === sourceColumnId
        ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
        : col
    );

    // Add to target column
    const newColumns = columnsAfterRemoval.map(col => 
      col.id === targetColumnId
        ? { ...col, tasks: [...col.tasks, task] }
        : col
    );

    setData({ ...data, columns: newColumns });
  };

  return {
    data,
    setData,
    addColumn,
    removeColumn,
    updateColumn,
    addCard,
    updateCard,
    removeCard,
    moveCard
  };
};