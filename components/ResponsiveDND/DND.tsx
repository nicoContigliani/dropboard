import React, { useState, useCallback, useMemo } from 'react';
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
  CircularProgress,
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
  data: any;
  onUpdateData?: (updatedData: any) => Promise<void>;
}

export const TrelloBoard: React.FC<TrelloBoardProps> = ({ data, onUpdateData }) => {
  const projectData = data.data || data;
  
  const { 
    data: kanbanData, 
    isSaving, 
    addColumn, 
    addCard, 
    updateCard, 
    removeCard, 
    moveCard 
  } = useKanbanBoard({
    initialData: projectData,
    onUpdateData
  });

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Función para encontrar una tarea por ID
  const findTaskById = useCallback((taskId: string): Task | null => {
    for (const column of kanbanData.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return null;
  }, [kanbanData.columns]);

  // Función para encontrar el ID de columna por ID de tarea
  const findColumnIdByTaskId = useCallback((taskId: string): string | undefined => {
    for (const column of kanbanData.columns) {
      if (column.tasks.some(task => task.id === taskId)) {
        return column.id;
      }
    }
    return undefined;
  }, [kanbanData.columns]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    setActiveId(taskId);
    
    // Encontrar la tarea activa
    const foundTask = findTaskById(taskId);
    setActiveTask(foundTask);
  }, [findTaskById]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveTask(null);
      return;
    }

    try {
      if (active.id !== over.id) {
        let sourceColumn: Column | undefined, destColumn: Column | undefined;

        // Encontrar columnas de origen y destino
        for (const column of kanbanData.columns) {
          if (column.tasks.some(task => task.id === active.id)) {
            sourceColumn = column;
          }
          if (column.tasks.some(task => task.id === over.id) || column.id === over.id) {
            destColumn = column;
          }
        }

        if (sourceColumn && destColumn && sourceColumn.id !== destColumn.id) {
          await moveCard(active.id as string, sourceColumn.id, destColumn.id);
          setSnackbar({ open: true, message: 'Tarea movida correctamente', severity: 'success' });
        }
      }
    } catch (error) {
      console.error('Error en drag and drop:', error);
      setSnackbar({ open: true, message: 'Error al mover la tarea', severity: 'error' });
    } finally {
      setActiveId(null);
      setActiveTask(null);
    }
  }, [kanbanData.columns, moveCard]);

  const handleTaskClick = useCallback((task: Task) => {
    setTaskData(task);
    setSelectedColumnId(findColumnIdByTaskId(task.id) || '');
    setTaskDialog(true);
  }, [findColumnIdByTaskId]);

  const handleTaskEdit = useCallback((task: Task) => {
    setTaskData(task);
    setSelectedColumnId(findColumnIdByTaskId(task.id) || '');
    setTaskDialog(true);
  }, [findColumnIdByTaskId]);

  const handleTaskDelete = useCallback((task: Task) => {
    setTaskToDelete(task);
    setDeleteConfirmDialog(true);
  }, []);

  const confirmDeleteTask = useCallback(async () => {
    if (taskToDelete) {
      try {
        await removeCard(taskToDelete.id);
        setDeleteConfirmDialog(false);
        setTaskToDelete(null);
        setSnackbar({ open: true, message: 'Tarea eliminada correctamente', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al eliminar la tarea', severity: 'error' });
      }
    }
  }, [taskToDelete, removeCard]);

  const handleAddColumn = useCallback(async () => {
    if (newColumnName.trim()) {
      try {
        const newColumn: Column = {
          id: `col-${Date.now()}`,
          name: newColumnName.trim(),
          tasks: []
        };
        await addColumn(newColumn);
        setNewColumnName('');
        setNewColumnDialog(false);
        setSnackbar({ open: true, message: 'Columna añadida correctamente', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al añadir columna', severity: 'error' });
      }
    }
  }, [newColumnName, addColumn]);

  const handleAddTask = useCallback((columnId: string) => {
    setSelectedColumnId(columnId);
    setTaskData({
      title: '',
      description: '',
      priority: 'media',
      dueDate: new Date().toISOString().split('T')[0],
      tags: []
    });
    setTaskDialog(true);
  }, []);

  const handleSaveTask = useCallback(async (taskData: Partial<Task>) => {
    try {
      if (taskData.title?.trim()) {
        if (taskData.id) {
          await updateCard(taskData.id, taskData);
          setSnackbar({ open: true, message: 'Tarea actualizada correctamente', severity: 'success' });
        } else {
          const newTask: Task = {
            id: `task-${Date.now()}`,
            title: taskData.title.trim() || '',
            description: taskData.description || '',
            priority: taskData.priority || 'media',
            dueDate: taskData.dueDate || new Date().toISOString(),
            tags: taskData.tags || []
          };
          await addCard(selectedColumnId, newTask);
          setSnackbar({ open: true, message: 'Tarea creada correctamente', severity: 'success' });
        }
        setTaskDialog(false);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar la tarea', severity: 'error' });
    }
  }, [selectedColumnId, addCard, updateCard]);

  // Memoizar las columnas para evitar re-renders innecesarios
  const sortableColumns = useMemo(() => 
    kanbanData.columns.map((column) => (
      <SortableColumn
        key={column.id}
        column={column}
        onTaskClick={handleTaskClick}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={handleTaskDelete}
        onAddTask={handleAddTask}
      />
    )), 
    [kanbanData.columns, handleTaskClick, handleTaskEdit, handleTaskDelete, handleAddTask]
  );

  // Memoizar el overlay del drag para mejor rendimiento
  const dragOverlayContent = useMemo(() => {
    if (!activeTask) return null;
    
    return (
      <Box sx={{ maxWidth: 300, opacity: 0.8 }}>
        <TaskCard
          task={activeTask}
          onClick={handleTaskClick}
          onEdit={handleTaskEdit}
          onDelete={handleTaskDelete}
          isDragging={true}
        />
      </Box>
    );
  }, [activeTask, handleTaskClick, handleTaskEdit, handleTaskDelete]);

  return (
    <Box sx={{ p: 2, bgcolor: 'grey.200', minHeight: '100vh', position: 'relative' }}>
      {isSaving && (
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      <ProjectHeader project={kanbanData.project} stats={kanbanData.stats} />

      <Box sx={{ overflowX: 'auto', pb: 2 }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'max-content' }}>
            <SortableContext
              items={kanbanData.columns.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {sortableColumns}
            </SortableContext>

            <Paper
              sx={{
                width: 300,
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
                cursor: 'pointer',
                flexShrink: 0
              }}
              onClick={() => setNewColumnDialog(true)}
            >
              <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
                Añadir otra columna
              </Button>
            </Paper>
          </Box>

          <DragOverlay>
            {dragOverlayContent}
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
        availableTags={kanbanData.tags || []}
      />

      <Dialog open={deleteConfirmDialog} onClose={() => setDeleteConfirmDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
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
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrelloBoard;