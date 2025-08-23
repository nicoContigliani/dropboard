// import React, { useState } from 'react';import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   DragStartEvent,
//   DragOverlay,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import {
//   Box,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';

// import { ProjectData, Task, Column } from '@/types/types';
// import { ProjectHeader } from '../dashboardGeneral/ProjectHeader';
// import { SortableColumn } from '../dashboardGeneral/Column/SortableColumn';
// import { TaskCard } from '../dashboardGeneral/Task/TaskCard';
// import { AddColumnDialog } from '../dashboardGeneral/Dialogs/AddColumnDialog';
// import { EditTaskDialog } from '../dashboardGeneral/Dialogs/EditTaskDialog';
// import { useKanbanBoard } from '@/hooks/useKanbanBoard';

// interface TrelloBoardProps {
//   data: { data: ProjectData };
// }

// export const TrelloBoard: React.FC<TrelloBoardProps> = ({ data }) => {
//   const { data: projectData, addColumn, addCard, updateCard, removeCard, moveCard } = useKanbanBoard(data.data);
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [activeTask, setActiveTask] = useState<Task | null>(null);
//   const [newColumnDialog, setNewColumnDialog] = useState(false);
//   const [taskDialog, setTaskDialog] = useState(false);
//   const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
//   const [newColumnName, setNewColumnName] = useState('');
//   const [taskData, setTaskData] = useState<Partial<Task>>({
//     title: '',
//     description: '',
//     priority: 'media',
//     dueDate: new Date().toISOString().split('T')[0],
//     tags: [],
//   });
//   const [selectedColumnId, setSelectedColumnId] = useState<string>('');
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event;
//     setActiveId(active.id as string);

//     // Buscar la tarea activa de manera segura
//     let foundTask: Task | null = null;
//     for (const column of projectData.columns) {
//       const task = column.tasks.find(t => t.id === active.id);
//       if (task) {
//         foundTask = task;
//         break;
//       }
//     }
//     setActiveTask(foundTask);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     setActiveId(null);
//     setActiveTask(null);

//     if (!over) return;

//     try {
//       if (active.id !== over.id) {
//         let sourceColumn: Column | undefined, destColumn: Column | undefined;

//         // Encontrar columnas de origen y destino
//         for (const column of projectData.columns) {
//           // Buscar tarea activa
//           if (column.tasks.some(task => task.id === active.id)) {
//             sourceColumn = column;
//           }

//           // Buscar sobre qué se está soltando (puede ser una tarea o una columna)
//           if (column.tasks.some(task => task.id === over.id) || column.id === over.id) {
//             destColumn = column;
//           }
//         }

//         if (sourceColumn && destColumn) {
//           // Usar el hook para mover la tarjeta
//           moveCard(active.id as string, sourceColumn.id, destColumn.id);
//           setSnackbar({ open: true, message: 'Tarea movida correctamente', severity: 'success' });
//         }
//       }
//     } catch (error) {
//       console.error('Error en drag and drop:', error);
//       setSnackbar({ open: true, message: 'Error al mover la tarea', severity: 'error' });
//     }
//   };

//   const handleTaskClick = (task: Task) => {
//     console.log('📋 Task clicked:', task.title);
//     setTaskData(task);
//     setSelectedColumnId(findColumnIdByTaskId(task.id) || '');
//     setTaskDialog(true);
//   };

//   const handleTaskEdit = (task: Task) => {
//     console.log('✏️ Edit button clicked for:', task.title);
//     setTaskData(task);
//     setSelectedColumnId(findColumnIdByTaskId(task.id) || '');
//     setTaskDialog(true);
//   };

//   const handleTaskDelete = (task: Task) => {
//     console.log('🗑️ Delete button clicked for:', task.title);
//     setTaskToDelete(task);
//     setDeleteConfirmDialog(true);
//   };

//   const confirmDeleteTask = () => {
//     if (taskToDelete) {
//       removeCard(taskToDelete.id);
//       setDeleteConfirmDialog(false);
//       setTaskToDelete(null);
//       setSnackbar({ open: true, message: 'Tarea eliminada correctamente', severity: 'success' });
//     }
//   };

//   const findColumnIdByTaskId = (taskId: string): string | undefined => {
//     for (const column of projectData.columns) {
//       if (column.tasks.some(task => task.id === taskId)) {
//         return column.id;
//       }
//     }
//     return undefined;
//   };

//   const handleAddColumn = () => {
//     if (newColumnName.trim()) {
//       const newColumn: Column = {
//         id: `col-${Date.now()}`,
//         name: newColumnName.trim(),
//         tasks: []
//       };

//       addColumn(newColumn);
//       setNewColumnName('');
//       setNewColumnDialog(false);
//       setSnackbar({ open: true, message: 'Columna añadida correctamente', severity: 'success' });
//     }
//   };

//   const handleAddTask = (columnId: string) => {
//     setSelectedColumnId(columnId);
//     setTaskData({
//       title: '',
//       description: '',
//       priority: 'media',
//       dueDate: new Date().toISOString().split('T')[0],
//       tags: []
//     });
//     setTaskDialog(true);
//   };

//   const handleSaveTask = (taskData: Partial<Task>) => {
//     if (taskData.title?.trim()) {
//       if (taskData.id) {
//         // Actualizar tarea existente
//         updateCard(taskData.id, taskData);
//         setSnackbar({ open: true, message: 'Tarea actualizada correctamente', severity: 'success' });
//       } else {
//         // Crear nueva tarea
//         const newTask: Task = {
//           id: `task-${Date.now()}`,
//           title: taskData.title.trim() || '',
//           description: taskData.description || '',
//           priority: taskData.priority || 'media',
//           dueDate: taskData.dueDate || new Date().toISOString(),
//           tags: taskData.tags || []
//         };

//         addCard(selectedColumnId, newTask);
//         setSnackbar({ open: true, message: 'Tarea creada correctamente', severity: 'success' });
//       }

//       setTaskDialog(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 2, bgcolor: 'grey.200', minHeight: '100vh' }}>
//       <ProjectHeader project={projectData.project} stats={projectData.stats} />

//       <Box sx={{ overflowX: 'auto', pb: 2 }}>
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragStart={handleDragStart}
//           onDragEnd={handleDragEnd}
//         >
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'max-content' }}>
//             <SortableContext
//               items={projectData.columns.map(c => c.id)}
//               strategy={verticalListSortingStrategy}
//             >
//               {projectData.columns.map((column) => (
//                 <SortableColumn
//                   key={column.id}
//                   column={column}
//                   onTaskClick={handleTaskClick}
//                   onTaskEdit={handleTaskEdit}
//                   onTaskDelete={handleTaskDelete}
//                   onAddTask={handleAddTask}
//                 />
//               ))}
//             </SortableContext>

//             <Paper
//               sx={{
//                 width: 300,
//                 minHeight: 200,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 bgcolor: 'grey.100',
//                 cursor: 'pointer',
//                 flexShrink: 0
//               }}
//               onClick={() => setNewColumnDialog(true)}
//             >
//               <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
//                 Añadir otra columna
//               </Button>
//             </Paper>
//           </Box>

//           <DragOverlay>
//             {activeTask ? (
//               <Box sx={{ maxWidth: 300, opacity: 0.8 }}>
//                 <TaskCard
//                   task={activeTask}
//                   onClick={handleTaskClick}
//                   onEdit={handleTaskEdit}
//                   onDelete={handleTaskDelete}
//                   isDragging={true}
//                 />
//               </Box>
//             ) : null}
//           </DragOverlay>
//         </DndContext>
//       </Box>

//       <AddColumnDialog
//         open={newColumnDialog}
//         onClose={() => setNewColumnDialog(false)}
//         onAdd={handleAddColumn}
//         columnName={newColumnName}
//         onColumnNameChange={setNewColumnName}
//       />

//       {/* <EditTaskDialog
//         open={taskDialog}
//         onClose={() => setTaskDialog(false)}
//         onSave={handleSaveTask}
//         onDelete={taskData.id ? () => handleTaskDelete(taskData as Task) : undefined}
//         taskData={taskData}
//         onTaskDataChange={setTaskData}
//         availableTags={projectData.tags}
//       /> */}

//       <EditTaskDialog
//         open={taskDialog}
//         onClose={() => setTaskDialog(false)}
//         onSave={handleSaveTask}
//         onDelete={taskData.id ? () => handleTaskDelete(taskData as Task) : undefined}
//         taskData={taskData}
//         onTaskDataChange={setTaskData}
//         availableTags={projectData.tags || []} // ← Añadir valor por defecto aquí también
//       />



//       {/* Diálogo de confirmación para eliminar tarea */}
//       <Dialog open={deleteConfirmDialog} onClose={() => setDeleteConfirmDialog(false)}>
//         <DialogTitle>Confirmar eliminación</DialogTitle>
//         <DialogContent>
//           ¿Estás seguro de que quieres eliminar la tarea "{taskToDelete?.title}"?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteConfirmDialog(false)}>Cancelar</Button>
//           <Button onClick={confirmDeleteTask} color="error">
//             Eliminar
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default TrelloBoard;


import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Box,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { ProjectData, Task, Column } from '@/types/types';
import { ProjectHeader } from '../dashboardGeneral/ProjectHeader';
import { SortableColumn } from '../dashboardGeneral/Column/SortableColumn';
import { TaskCard } from '../dashboardGeneral/Task/TaskCard';
import { AddColumnDialog } from '../dashboardGeneral/Dialogs/AddColumnDialog';
import { EditTaskDialog } from '../dashboardGeneral/Dialogs/EditTaskDialog';
import { useKanbanBoard } from '@/hooks/useKanbanBoard';

interface TrelloBoardProps {
  data: { data: ProjectData };
}

export const TrelloBoard: React.FC<TrelloBoardProps> = ({ data }) => {
  const theme = useTheme();
  const { data: projectData, addColumn, addCard, updateCard, removeCard, moveCard } =
    useKanbanBoard(data.data);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newColumnDialog, setNewColumnDialog] = useState(false);
  const [taskDialog, setTaskDialog] = useState(false);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [newColumnName, setNewColumnName] = useState('');
  const [taskData, setTaskData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'media',
    dueDate: new Date().toISOString().split('T')[0],
    tags: [],
  });
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    let foundTask: Task | null = null;
    for (const column of projectData.columns) {
      const task = column.tasks.find((t) => t.id === active.id);
      if (task) {
        foundTask = task;
        break;
      }
    }
    setActiveTask(foundTask);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveTask(null);

    if (!over) return;

    try {
      if (active.id !== over.id) {
        let sourceColumn: Column | undefined, destColumn: Column | undefined;

        for (const column of projectData.columns) {
          if (column.tasks.some((task) => task.id === active.id)) {
            sourceColumn = column;
          }
          if (column.tasks.some((task) => task.id === over.id) || column.id === over.id) {
            destColumn = column;
          }
        }

        if (sourceColumn && destColumn) {
          moveCard(active.id as string, sourceColumn.id, destColumn.id);
          setSnackbar({ open: true, message: 'Tarea movida correctamente', severity: 'success' });
        }
      }
    } catch (error) {
      console.error('Error en drag and drop:', error);
      setSnackbar({ open: true, message: 'Error al mover la tarea', severity: 'error' });
    }
  };

  const handleTaskClick = (task: Task) => {
    setTaskData(task);
    setSelectedColumnId(findColumnIdByTaskId(task.id) || '');
    setTaskDialog(true);
  };

  const handleTaskEdit = (task: Task) => {
    setTaskData(task);
    setSelectedColumnId(findColumnIdByTaskId(task.id) || '');
    setTaskDialog(true);
  };

  const handleTaskDelete = (task: Task) => {
    setTaskToDelete(task);
    setDeleteConfirmDialog(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      removeCard(taskToDelete.id);
      setDeleteConfirmDialog(false);
      setTaskToDelete(null);
      setSnackbar({ open: true, message: 'Tarea eliminada correctamente', severity: 'success' });
    }
  };

  const findColumnIdByTaskId = (taskId: string): string | undefined => {
    for (const column of projectData.columns) {
      if (column.tasks.some((task) => task.id === taskId)) {
        return column.id;
      }
    }
    return undefined;
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: Column = {
        id: `col-${Date.now()}`,
        name: newColumnName.trim(),
        tasks: [],
      };

      addColumn(newColumn);
      setNewColumnName('');
      setNewColumnDialog(false);
      setSnackbar({ open: true, message: 'Columna añadida correctamente', severity: 'success' });
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setTaskData({
      title: '',
      description: '',
      priority: 'media',
      dueDate: new Date().toISOString().split('T')[0],
      tags: [],
    });
    setTaskDialog(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.title?.trim()) {
      if (taskData.id) {
        updateCard(taskData.id, taskData);
        setSnackbar({ open: true, message: 'Tarea actualizada correctamente', severity: 'success' });
      } else {
        const newTask: Task = {
          id: `task-${Date.now()}`,
          title: taskData.title.trim() || '',
          description: taskData.description || '',
          priority: taskData.priority || 'media',
          dueDate: taskData.dueDate || new Date().toISOString(),
          tags: taskData.tags || [],
        };

        addCard(selectedColumnId, newTask);
        setSnackbar({ open: true, message: 'Tarea creada correctamente', severity: 'success' });
      }

      setTaskDialog(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <ProjectHeader project={projectData.project} stats={projectData.stats} />

      <Box sx={{ overflowX: 'auto', pb: 3 }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2.5,
              alignItems: 'flex-start',
              minWidth: 'max-content',
            }}
          >
            <SortableContext
              items={projectData.columns.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {projectData.columns.map((column) => (
                <SortableColumn
                  key={column.id}
                  column={column}
                  onTaskClick={handleTaskClick}
                  onTaskEdit={handleTaskEdit}
                  onTaskDelete={handleTaskDelete}
                  onAddTask={handleAddTask}
                />
              ))}
            </SortableContext>

            <Paper
              sx={{
                width: 300,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.grey[50],
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: theme.palette.grey[100],
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                },
              }}
              onClick={() => setNewColumnDialog(true)}
            >
              <Button
                startIcon={<AddIcon />}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Añadir columna
              </Button>
            </Paper>
          </Box>

          <DragOverlay>
            {activeTask ? (
              <Box sx={{ maxWidth: 300, opacity: 0.9 }}>
                <TaskCard
                  task={activeTask}
                  onClick={handleTaskClick}
                  onEdit={handleTaskEdit}
                  onDelete={handleTaskDelete}
                  isDragging={true}
                />
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>

      <AddColumnDialog
        open={newColumnDialog}
        onClose={() => setNewColumnDialog(false)}
        onAdd={handleAddColumn}
        columnName={newColumnName}
        onColumnNameChange={setNewColumnName}
      />

      <EditTaskDialog
        open={taskDialog}
        onClose={() => setTaskDialog(false)}
        onSave={handleSaveTask}
        onDelete={taskData.id ? () => handleTaskDelete(taskData as Task) : undefined}
        taskData={taskData}
        onTaskDataChange={setTaskData}
        availableTags={projectData.tags || []}
      />

      <Dialog
        open={deleteConfirmDialog}
        onClose={() => setDeleteConfirmDialog(false)}
        PaperProps={{
          sx: { borderRadius: '16px', fontFamily: '"Poppins", sans-serif' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que quieres eliminar la tarea "{taskToDelete?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={confirmDeleteTask} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: '12px',
            fontFamily: '"Poppins", sans-serif',
            fontSize: '0.85rem',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrelloBoard;
