// components/dashboardGeneral/Column/SortableColumn.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Paper,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Column, Task } from '@/types/types';
import { SortableTask } from '../Task/SortableTask';

interface SortableColumnProps {
  column: Column;
  onTaskClick: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (task: Task) => void;
  onAddTask: (columnId: string) => void;
}

export const SortableColumn: React.FC<SortableColumnProps> = ({
  column,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
  onAddTask,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        width: 300,
        p: 2,
        flexShrink: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" {...listeners} sx={{ cursor: 'grab' }}>
          {column.name}
        </Typography>
        <IconButton size="small" onClick={() => onAddTask(column.id)}>
          <AddIcon />
        </IconButton>
      </Box>
      <Box>
        {column.tasks.map((task) => (
          <SortableTask
            key={task.id}
            task={task}
            onClick={onTaskClick}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
          />
        ))}
      </Box>
    </Paper>
  );
};