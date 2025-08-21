import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { Task } from '@/types/types';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  taskData: Partial<Task>;
  onTaskDataChange: (data: Partial<Task>) => void;
}

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onClose,
  onSave,
  taskData,
  onTaskDataChange
}) => {
  const handleSave = () => {
    if (taskData.title?.trim()) {
      onSave(taskData);
    }
  };

  const updateField = (field: keyof Task, value: string) => {
    onTaskDataChange({ ...taskData, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Añadir nueva tarea</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Título de la tarea"
          fullWidth
          variant="outlined"
          value={taskData.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Descripción"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={taskData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Prioridad"
            select
            fullWidth
            SelectProps={{ native: true }}
            value={taskData.priority || 'media'}
            onChange={(e) => updateField('priority', e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </TextField>
          <TextField
            label="Fecha de vencimiento"
            type="date"
            fullWidth
            value={taskData.dueDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => updateField('dueDate', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">Añadir tarea</Button>
      </DialogActions>
    </Dialog>
  );
};