// // // components/dashboardGeneral/Dialogs/EditTaskDialog.tsx
// // import React from 'react';
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   Button,
// //   MenuItem,
// //   Chip,
// //   Box,
// //   Autocomplete,
// // } from '@mui/material';
// // import { Task, Tag } from '@/types/types';

// // interface EditTaskDialogProps {
// //   open: boolean;
// //   onClose: () => void;
// //   onSave: (taskData: Partial<Task>) => void;
// //   onDelete?: () => void;
// //   taskData: Partial<Task>;
// //   onTaskDataChange: (data: Partial<Task>) => void;
// //   availableTags: Tag[];
// // }

// // export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
// //   open,
// //   onClose,
// //   onSave,
// //   onDelete,
// //   taskData,
// //   onTaskDataChange,
// //   availableTags,
// // }) => {
// //   const handleChange = (field: keyof Task, value: any) => {
// //     onTaskDataChange({
// //       ...taskData,
// //       [field]: value,
// //     });
// //   };

// //   const handleTagsChange = (event: any, newValue: (string | Tag)[]) => {
// //     const tags = newValue.map(tag => typeof tag === 'string' ? tag : tag.name);
// //     handleChange('tags', tags);
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
// //       <DialogTitle>
// //         {taskData.id ? 'Editar Tarea' : 'Crear Tarea'}
// //       </DialogTitle>
// //       <DialogContent>
// //         <TextField
// //           autoFocus
// //           margin="dense"
// //           label="Título"
// //           fullWidth
// //           variant="outlined"
// //           value={taskData.title || ''}
// //           onChange={(e) => handleChange('title', e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           margin="dense"
// //           label="Descripción"
// //           fullWidth
// //           multiline
// //           rows={3}
// //           variant="outlined"
// //           value={taskData.description || ''}
// //           onChange={(e) => handleChange('description', e.target.value)}
// //           sx={{ mb: 2 }}
// //         />
// //         <TextField
// //           select
// //           margin="dense"
// //           label="Prioridad"
// //           fullWidth
// //           variant="outlined"
// //           value={taskData.priority || 'media'}
// //           onChange={(e) => handleChange('priority', e.target.value)}
// //           sx={{ mb: 2 }}
// //         >
// //           <MenuItem value="alta">Alta</MenuItem>
// //           <MenuItem value="media">Media</MenuItem>
// //           <MenuItem value="baja">Baja</MenuItem>
// //         </TextField>
// //         <TextField
// //           margin="dense"
// //           label="Fecha de vencimiento"
// //           type="date"
// //           fullWidth
// //           variant="outlined"
// //           value={taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : ''}
// //           onChange={(e) => handleChange('dueDate', e.target.value)}
// //           InputLabelProps={{
// //             shrink: true,
// //           }}
// //           sx={{ mb: 2 }}
// //         />
// //         <Autocomplete
// //           multiple
// //           freeSolo
// //           options={availableTags.map(tag => tag.name)}
// //           value={taskData.tags || []}
// //           onChange={handleTagsChange}
// //           renderTags={(value: string[], getTagProps) =>
// //             value.map((option: string, index: number) => (
// //               <Chip
// //                 variant="outlined"
// //                 label={option}
// //                 {...getTagProps({ index })}
// //                 key={index}
// //               />
// //             ))
// //           }
// //           renderInput={(params) => (
// //             <TextField
// //               {...params}
// //               variant="outlined"
// //               label="Etiquetas"
// //               placeholder="Añadir etiqueta"
// //             />
// //           )}
// //         />
// //       </DialogContent>
// //       <DialogActions>
// //         {onDelete && taskData.id && (
// //           <Button onClick={onDelete} color="error">
// //             Eliminar
// //           </Button>
// //         )}
// //         <Button onClick={onClose}>Cancelar</Button>
// //         <Button 
// //           onClick={() => onSave(taskData)} 
// //           disabled={!taskData.title?.trim()}
// //         >
// //           Guardar
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };


// // components/dashboardGeneral/Dialogs/EditTaskDialog.tsx
// import React from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Button,
//     MenuItem,
//     Chip,
//     Box,
//     Autocomplete,
// } from '@mui/material';
// import { Task, Tag } from '@/types/types';

// interface EditTaskDialogProps {
//     open: boolean;
//     onClose: () => void;
//     onSave: (taskData: Partial<Task>) => void;
//     onDelete?: () => void;
//     taskData: Partial<Task>;
//     onTaskDataChange: (data: Partial<Task>) => void;
//     availableTags: Tag[];
// }

// export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
//     open,
//     onClose,
//     onSave,
//     onDelete,
//     taskData,
//     onTaskDataChange,
//     availableTags,
// }) => {
//     const handleChange = (field: keyof Task, value: any) => {
//         onTaskDataChange({
//             ...taskData,
//             [field]: value,
//         });
//     };

//     const handleTagsChange = (event: React.SyntheticEvent, newValue: string[]) => {
//         handleChange('tags', newValue);
//     };

//     // Convertir las etiquetas a formato string para el Autocomplete
//     const currentTags = Array.isArray(taskData.tags) ? taskData.tags : [];

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitle>
//                 {taskData.id ? 'Editar Tarea' : 'Crear Tarea'}
//             </DialogTitle>
//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     label="Título"
//                     fullWidth
//                     variant="outlined"
//                     value={taskData.title || ''}
//                     onChange={(e) => handleChange('title', e.target.value)}
//                     sx={{ mb: 2 }}
//                 />
//                 <TextField
//                     margin="dense"
//                     label="Descripción"
//                     fullWidth
//                     multiline
//                     rows={3}
//                     variant="outlined"
//                     value={taskData.description || ''}
//                     onChange={(e) => handleChange('description', e.target.value)}
//                     sx={{ mb: 2 }}
//                 />
//                 <TextField
//                     select
//                     margin="dense"
//                     label="Prioridad"
//                     fullWidth
//                     variant="outlined"
//                     value={taskData.priority || 'media'}
//                     onChange={(e) => handleChange('priority', e.target.value)}
//                     sx={{ mb: 2 }}
//                 >
//                     <MenuItem value="alta">Alta</MenuItem>
//                     <MenuItem value="media">Media</MenuItem>
//                     <MenuItem value="baja">Baja</MenuItem>
//                 </TextField>
//                 <TextField
//                     margin="dense"
//                     label="Fecha de vencimiento"
//                     type="date"
//                     fullWidth
//                     variant="outlined"
//                     value={taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : ''}
//                     onChange={(e) => handleChange('dueDate', e.target.value)}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     sx={{ mb: 2 }}
//                 />
//                 <Autocomplete
//                     multiple
//                     freeSolo
//                     options={availableTags.map(tag => tag.name)}
//                     value={currentTags}
//                     onChange={handleTagsChange}
//                     renderTags={(value: string[], getTagProps) =>
//                         value.map((option: string, index: number) => (
//                             <Chip
//                                 variant="outlined"
//                                 label={option}
//                                 {...getTagProps({ index })}
//                                 key={index}
//                             />
//                         ))
//                     }
//                     renderInput={(params) => (
//                         <TextField
//                             {...params}
//                             variant="outlined"
//                             label="Etiquetas"
//                             placeholder="Añadir etiqueta"
//                         />
//                     )}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 {onDelete && taskData.id && (
//                     <Button onClick={onDelete} color="error">
//                         Eliminar
//                     </Button>
//                 )}
//                 <Button onClick={onClose}>Cancelar</Button>
//                 <Button
//                     onClick={() => onSave(taskData)}
//                     disabled={!taskData.title?.trim()}
//                 >
//                     Guardar
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };



// components/dashboardGeneral/Dialogs/EditTaskDialog.tsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Chip,
    Box,
    Autocomplete,
} from '@mui/material';
import { Task, Tag } from '@/types/types';

interface EditTaskDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (taskData: Partial<Task>) => void;
    onDelete?: () => void;
    taskData: Partial<Task>;
    onTaskDataChange: (data: Partial<Task>) => void;
    availableTags: Tag[];
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
    open,
    onClose,
    onSave,
    onDelete,
    taskData,
    onTaskDataChange,
    availableTags = [], // Valor por defecto para evitar undefined
}) => {
    const handleChange = (field: keyof Task, value: any) => {
        onTaskDataChange({
            ...taskData,
            [field]: value,
        });
    };

    const handleTagsChange = (event: React.SyntheticEvent, newValue: string[]) => {
        handleChange('tags', newValue);
    };

    // Convertir las etiquetas a formato string para el Autocomplete
    const currentTags = Array.isArray(taskData.tags) ? taskData.tags : [];

    // Obtener opciones de etiquetas de forma segura
    const tagOptions = Array.isArray(availableTags)
        ? availableTags.map(tag => tag.name)
        : [];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {taskData.id ? 'Editar Tarea' : 'Crear Tarea'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    fullWidth
                    variant="outlined"
                    value={taskData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={taskData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    select
                    margin="dense"
                    label="Prioridad"
                    fullWidth
                    variant="outlined"
                    value={taskData.priority || 'media'}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="alta">Alta</MenuItem>
                    <MenuItem value="media">Media</MenuItem>
                    <MenuItem value="baja">Baja</MenuItem>
                </TextField>
                <TextField
                    margin="dense"
                    label="Fecha de vencimiento"
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mb: 2 }}
                />
                <Autocomplete
                    multiple
                    freeSolo
                    options={tagOptions} // Usar las opciones seguras
                    value={currentTags}
                    onChange={handleTagsChange}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                                key={index}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Etiquetas"
                            placeholder="Añadir etiqueta"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                {onDelete && taskData.id && (
                    <Button onClick={onDelete} color="error">
                        Eliminar
                    </Button>
                )}
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={() => onSave(taskData)}
                    disabled={!taskData.title?.trim()}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};