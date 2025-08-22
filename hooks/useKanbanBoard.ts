// // // hooks/useKanbanBoard.ts
// // import { useState } from 'react';
// // import { KanbanData, Column, Task } from '@/components/ResponsiveKanbanBoard/KanbanBoard';

// // export const useKanbanBoard = (initialData: KanbanData) => {
// //   const [data, setData] = useState<KanbanData>(initialData);

// //   const addColumn = (column: Column) => {
// //     const newColumns = [...data.columns, column];
// //     setData({ ...data, columns: newColumns });
// //   };

// //   const removeColumn = (columnId: string) => {
// //     const newColumns = data.columns.filter(col => col.id !== columnId);
// //     setData({ ...data, columns: newColumns });
// //   };

// //   const updateColumn = (columnId: string, updatedColumn: Partial<Column>) => {
// //     const newColumns = data.columns.map(col => 
// //       col.id === columnId ? { ...col, ...updatedColumn } : col
// //     );
// //     setData({ ...data, columns: newColumns });
// //   };

// //   const addCard = (columnId: string, task: Task) => {
// //     const newColumns = data.columns.map(col => 
// //       col.id === columnId 
// //         ? { ...col, tasks: [...col.tasks, task] } 
// //         : col
// //     );
// //     setData({ ...data, columns: newColumns });
// //   };

// //   const updateCard = (taskId: string, updatedTask: Partial<Task>) => {
// //     const newColumns = data.columns.map(col => ({
// //       ...col,
// //       tasks: col.tasks.map(task => 
// //         task.id === taskId ? { ...task, ...updatedTask } : task
// //       )
// //     }));
// //     setData({ ...data, columns: newColumns });
// //   };

// //   const removeCard = (taskId: string) => {
// //     const newColumns = data.columns.map(col => ({
// //       ...col,
// //       tasks: col.tasks.filter(task => task.id !== taskId)
// //     }));
// //     setData({ ...data, columns: newColumns });
// //   };

// //   const moveCard = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
// //     const task = data.columns
// //       .find(col => col.id === sourceColumnId)
// //       ?.tasks.find(task => task.id === taskId);

// //     if (!task) return;

// //     // Remove from source column
// //     const columnsAfterRemoval = data.columns.map(col => 
// //       col.id === sourceColumnId
// //         ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
// //         : col
// //     );

// //     // Add to target column
// //     const newColumns = columnsAfterRemoval.map(col => 
// //       col.id === targetColumnId
// //         ? { ...col, tasks: [...col.tasks, task] }
// //         : col
// //     );

// //     setData({ ...data, columns: newColumns });
// //   };

// //   return {
// //     data,
// //     setData,
// //     addColumn,
// //     removeColumn,
// //     updateColumn,
// //     addCard,
// //     updateCard,
// //     removeCard,
// //     moveCard
// //   };
// // };


// // hooks/useKanbanBoard.ts
// import { useState } from 'react';
// import { KanbanData, Column, Task } from '@/types/types';

// export const useKanbanBoard = (initialData: KanbanData) => {
//   const [data, setData] = useState<KanbanData>(initialData);

//   const addColumn = (column: Column) => {
//     const newColumns = [...data.columns, column];
//     setData({ ...data, columns: newColumns });
//   };

//   const removeColumn = (columnId: string) => {
//     const newColumns = data.columns.filter(col => col.id !== columnId);
//     setData({ ...data, columns: newColumns });
//   };

//   const updateColumn = (columnId: string, updatedColumn: Partial<Column>) => {
//     const newColumns = data.columns.map(col =>
//       col.id === columnId ? { ...col, ...updatedColumn } : col
//     );
//     setData({ ...data, columns: newColumns });
//   };

//   const addCard = (columnId: string, task: Task) => {
//     const newColumns = data.columns.map(col =>
//       col.id === columnId
//         ? { ...col, tasks: [...col.tasks, task] }
//         : col
//     );
//     setData({ ...data, columns: newColumns });
//   };

//   const updateCard = (taskId: string, updatedTask: Partial<Task>) => {
//     const newColumns = data.columns.map(col => ({
//       ...col,
//       tasks: col.tasks.map(task =>
//         task.id === taskId ? { ...task, ...updatedTask } : task
//       )
//     }));
//     setData({ ...data, columns: newColumns });
//   };

//   const removeCard = (taskId: string) => {
//     const newColumns = data.columns.map(col => ({
//       ...col,
//       tasks: col.tasks.filter(task => task.id !== taskId)
//     }));
//     setData({ ...data, columns: newColumns });
//   };

//   const moveCard = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
//     // Encontrar la tarea en la columna de origen
//     const sourceColumn = data.columns.find(col => col.id === sourceColumnId);
//     if (!sourceColumn) return;

//     const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
//     if (taskIndex === -1) return;

//     const task = sourceColumn.tasks[taskIndex];

//     // Crear nuevas columnas
//     const newColumns = data.columns.map(col => {
//       if (col.id === sourceColumnId) {
//         // Remover de la columna de origen
//         return {
//           ...col,
//           tasks: col.tasks.filter(t => t.id !== taskId)
//         };
//       } else if (col.id === targetColumnId) {
//         // Agregar a la columna de destino
//         return {
//           ...col,
//           tasks: [...col.tasks, task]
//         };
//       }
//       return col;
//     });

//     setData({ ...data, columns: newColumns });
//   };

//   return {
//     data,
//     setData,
//     addColumn,
//     removeColumn,
//     updateColumn,
//     addCard,
//     updateCard,
//     removeCard,
//     moveCard
//   };
// };



// hooks/useKanbanBoard.ts
import { useState } from 'react';
import { KanbanData, Column, Task, ProjectData } from '@/types/types';

export const useKanbanBoard = (initialData: ProjectData) => {
  const [data, setData] = useState<ProjectData>(initialData);

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
    
    // Actualizar estadísticas
    const newStats = {
      ...data.stats,
      totalTasks: data.stats.totalTasks + 1,
      inProgressTasks: columnId === 'col-2' ? data.stats.inProgressTasks + 1 : data.stats.inProgressTasks
    };
    
    setData({ ...data, columns: newColumns, stats: newStats });
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
    let columnId = '';
    const newColumns = data.columns.map(col => {
      const taskExists = col.tasks.some(task => task.id === taskId);
      if (taskExists) columnId = col.id;
      
      return {
        ...col,
        tasks: col.tasks.filter(task => task.id !== taskId)
      };
    });
    
    // Actualizar estadísticas
    const newStats = {
      ...data.stats,
      totalTasks: data.stats.totalTasks - 1,
      inProgressTasks: columnId === 'col-2' ? data.stats.inProgressTasks - 1 : data.stats.inProgressTasks
    };
    
    setData({ ...data, columns: newColumns, stats: newStats });
  };

  const moveCard = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    const sourceColumn = data.columns.find(col => col.id === sourceColumnId);
    if (!sourceColumn) return;

    const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    const task = sourceColumn.tasks[taskIndex];

    const newColumns = data.columns.map(col => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          tasks: col.tasks.filter(t => t.id !== taskId)
        };
      } else if (col.id === targetColumnId) {
        return {
          ...col,
          tasks: [...col.tasks, task]
        };
      }
      return col;
    });

    // Actualizar estadísticas basado en movimiento entre columnas
    let completedTasksChange = 0;
    let inProgressTasksChange = 0;

    if (sourceColumnId === 'col-4' && targetColumnId !== 'col-4') {
      completedTasksChange = -1;
    } else if (targetColumnId === 'col-4' && sourceColumnId !== 'col-4') {
      completedTasksChange = 1;
    }

    if (sourceColumnId === 'col-2' && targetColumnId !== 'col-2') {
      inProgressTasksChange = -1;
    } else if (targetColumnId === 'col-2' && sourceColumnId !== 'col-2') {
      inProgressTasksChange = 1;
    }

    const newStats = {
      ...data.stats,
      completedTasks: data.stats.completedTasks + completedTasksChange,
      inProgressTasks: data.stats.inProgressTasks + inProgressTasksChange,
      completionPercentage: Math.round(
        ((data.stats.completedTasks + completedTasksChange) / data.stats.totalTasks) * 100
      )
    };

    setData({ ...data, columns: newColumns, stats: newStats });
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