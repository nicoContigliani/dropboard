import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

interface AddColumnDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  columnName: string;
  onColumnNameChange: (name: string) => void;
}

export const AddColumnDialog: React.FC<AddColumnDialogProps> = ({
  open,
  onClose,
  onAdd,
  columnName,
  onColumnNameChange
}) => {
  const handleAdd = () => {
    if (columnName.trim()) {
      onAdd(columnName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Añadir nueva columna</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre de la columna"
          fullWidth
          variant="outlined"
          value={columnName}
          onChange={(e) => onColumnNameChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleAdd} variant="contained">Añadir</Button>
      </DialogActions>
    </Dialog>
  );
};