import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColumnList } from './ColumnList';
import { Column, Task } from '@/types/types';

interface SortableColumnProps {
  column: Column;
  onTaskClick: (task: Task) => void;
  onAddTask: (columnId: string) => void;
}

export const SortableColumn: React.FC<SortableColumnProps> = ({
  column,
  onTaskClick,
  onAddTask
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
      {...listeners}
      sx={{
        width: 300,
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDragging ? 'action.hover' : 'grey.100',
      }}
    >
      <Box sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {column.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            label={column.tasks.length}
            size="small"
            sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)' }}
          />
          <IconButton size="small" sx={{ color: 'primary.contrastText' }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
        <ColumnList tasks={column.tasks} onTaskClick={onTaskClick} />
      </Box>

      <Button
        startIcon={<AddIcon />}
        sx={{ m: 1, justifyContent: 'flex-start' }}
        onClick={() => onAddTask(column.id)}
      >
        Añadir tarea
      </Button>
    </Paper>
  );
};