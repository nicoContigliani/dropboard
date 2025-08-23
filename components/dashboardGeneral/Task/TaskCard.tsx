// components/dashboardGeneral/Task/TaskCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon
} from '@mui/icons-material';
import { Task } from '@/types/types';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  showDragHandle?: boolean;
  isDragging?: boolean;
  dragHandleProps?: any; // Props para el handle de arrastre
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  onEdit,
  onDelete,
  showDragHandle = false,
  isDragging = false,
  dragHandleProps
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return '#f44336';
      case 'media': return '#ff9800';
      case 'baja': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const renderTags = () => {
    return task.tags.map((tag, index) => (
      <Chip
        key={index}
        label={tag}
        size="small"
        sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
        variant="outlined"
      />
    ));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(task);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevenir que se active durante operaciones de drag
    if (!isDragging) {
      onClick(task);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        mb: 1,
        cursor: isDragging ? 'grabbing' : 'pointer',
        '&:hover': {
          boxShadow: 3,
        },
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
        userSelect: 'none' // Prevenir selección de texto durante drag
      }}
    >
      {showDragHandle && (
        <Box 
          sx={{ 
            position: 'absolute', 
            left: 4, 
            top: 4, 
            opacity: 0.5,
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing'
            }
          }}
          {...dragHandleProps} // Aplicar props de drag aquí
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>
      )}
      <CardContent sx={{ 
        pt: showDragHandle ? 3 : 1, 
        pb: 1, 
        '&:last-child': { pb: 1 },
        ml: showDragHandle ? 2 : 0
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2 }}>
            {task.title}
          </Typography>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: getPriorityColor(task.priority),
              flexShrink: 0,
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
          {task.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          {renderTags()}
        </Box>
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          Vence: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
        <Box>
          <IconButton 
            size="small" 
            onClick={handleEdit}
            onMouseDown={(e) => e.stopPropagation()} // Importante: stopPropagation en mouseDown
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleDelete}
            onMouseDown={(e) => e.stopPropagation()} // Importante: stopPropagation en mouseDown
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};