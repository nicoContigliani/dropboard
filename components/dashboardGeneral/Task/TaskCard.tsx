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
} from '@mui/icons-material';
import { Task } from '@/types/types';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  showDragHandle?: boolean;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  showDragHandle = false,
  isDragging = false
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
    console.log("🚀 ~ task:", task)
    return task.tags.map((tag, index) => {
      const tagName = typeof tag === 'string' ? tag : tag.name;
      return (
        <Chip
          key={index}
          label={tagName}
          size="small"
          sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
          variant="outlined"
        />
      );
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Editando tarea:", task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Eliminando tarea:", task);
  };


  return (
    <Card
      onClick={() => onClick(task)}
      sx={{
        mb: 1,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
        },
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {showDragHandle && (
        <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
          {/* <DragIndicatorIcon fontSize="small" /> */}
        </Box>
      )}
      <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
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
          {/* <IconButton size="small">
            <EditIcon fontSize="small" onClick={handleEdit} />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon fontSize="small" onClick={handleDelete}/>
          </IconButton> */}

          <IconButton size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>

        </Box>
      </CardActions>
    </Card>
  );
};