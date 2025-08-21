// // // // // // import React, { useState } from 'react';
// // // // // // import {
// // // // // //   DndContext,
// // // // // //   closestCenter,
// // // // // //   KeyboardSensor,
// // // // // //   PointerSensor,
// // // // // //   useSensor,
// // // // // //   useSensors,
// // // // // //   DragEndEvent,
// // // // // //   DragStartEvent,
// // // // // //   DragOverlay,
// // // // // // } from '@dnd-kit/core';
// // // // // // import {
// // // // // //   arrayMove,
// // // // // //   SortableContext,
// // // // // //   sortableKeyboardCoordinates,
// // // // // //   verticalListSortingStrategy,
// // // // // //   useSortable,
// // // // // // } from '@dnd-kit/sortable';
// // // // // // import { CSS } from '@dnd-kit/utilities';
// // // // // // import {
// // // // // //   Paper,
// // // // // //   Typography,
// // // // // //   Box,
// // // // // //   Button,
// // // // // //   IconButton,
// // // // // //   TextField,
// // // // // //   Dialog,
// // // // // //   DialogActions,
// // // // // //   DialogContent,
// // // // // //   DialogTitle,
// // // // // //   Chip,
// // // // // //   Avatar,
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   CardActions,
// // // // // //   useTheme,
// // // // // //   useMediaQuery,
// // // // // // } from '@mui/material';
// // // // // // import {
// // // // // //   Add as AddIcon,
// // // // // //   MoreVert as MoreVertIcon,
// // // // // //   Edit as EditIcon,
// // // // // //   Delete as DeleteIcon,
// // // // // //   DragIndicator as DragIndicatorIcon
// // // // // // } from '@mui/icons-material';

// // // // // // // Interfaz para los tipos de datos
// // // // // // interface Tag {
// // // // // //   name: string;
// // // // // //   color?: string;
// // // // // // }

// // // // // // interface Task {
// // // // // //   id: string;
// // // // // //   title: string;
// // // // // //   description: string;
// // // // // //   priority: string;
// // // // // //   dueDate: string;
// // // // // //   tags: Tag[];
// // // // // // }

// // // // // // interface Column {
// // // // // //   id: string;
// // // // // //   name: string;
// // // // // //   tasks: Task[];
// // // // // // }

// // // // // // interface ProjectData {
// // // // // //   project: {
// // // // // //     id: string;
// // // // // //     name: string;
// // // // // //     description: string;
// // // // // //     startDate: string;
// // // // // //     deadline: string;
// // // // // //     progress: number;
// // // // // //   };
// // // // // //   columns: Column[];
// // // // // //   stats: {
// // // // // //     totalTasks: number;
// // // // // //     completedTasks: number;
// // // // // //     inProgressTasks: number;
// // // // // //     overdueTasks: number;
// // // // // //     completionPercentage: number;
// // // // // //   };
// // // // // // }

// // // // // // // Componente para tareas sortable
// // // // // // const SortableTask = ({ task, onClick }: { task: Task; onClick: (task: Task) => void }) => {
// // // // // //   const {
// // // // // //     attributes,
// // // // // //     listeners,
// // // // // //     setNodeRef,
// // // // // //     transform,
// // // // // //     transition,
// // // // // //     isDragging,
// // // // // //   } = useSortable({ id: task.id });

// // // // // //   const style = {
// // // // // //     transform: CSS.Transform.toString(transform),
// // // // // //     transition,
// // // // // //     opacity: isDragging ? 0.5 : 1,
// // // // // //   };

// // // // // //   const getPriorityColor = (priority: string) => {
// // // // // //     switch (priority) {
// // // // // //       case 'alta': return '#f44336';
// // // // // //       case 'media': return '#ff9800';
// // // // // //       case 'baja': return '#4caf50';
// // // // // //       default: return '#9e9e9e';
// // // // // //     }
// // // // // //   };

// // // // // //   // Función para renderizar tags de manera segura
// // // // // //   const renderTags = () => {
// // // // // //     return task.tags.map((tag, index) => {
// // // // // //       const tagName = typeof tag === 'string' ? tag : tag.name;
// // // // // //       return (
// // // // // //         <Chip
// // // // // //           key={index}
// // // // // //           label={tagName}
// // // // // //           size="small"
// // // // // //           sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
// // // // // //           variant="outlined"
// // // // // //         />
// // // // // //       );
// // // // // //     });
// // // // // //   };

// // // // // //   return (
// // // // // //     <Card
// // // // // //       ref={setNodeRef}
// // // // // //       style={style}
// // // // // //       {...attributes}
// // // // // //       {...listeners}
// // // // // //       sx={{
// // // // // //         mb: 1,
// // // // // //         cursor: 'grab',
// // // // // //         '&:hover': {
// // // // // //           boxShadow: 3,
// // // // // //         },
// // // // // //         position: 'relative',
// // // // // //       }}
// // // // // //       onClick={() => onClick(task)}
// // // // // //     >
// // // // // //       <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
// // // // // //         <DragIndicatorIcon fontSize="small" />
// // // // // //       </Box>
// // // // // //       <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
// // // // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // // // // //           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2 }}>
// // // // // //             {task.title}
// // // // // //           </Typography>
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               width: 12,
// // // // // //               height: 12,
// // // // // //               borderRadius: '50%',
// // // // // //               backgroundColor: getPriorityColor(task.priority),
// // // // // //               flexShrink: 0,
// // // // // //             }}
// // // // // //           />
// // // // // //         </Box>
// // // // // //         <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
// // // // // //           {task.description}
// // // // // //         </Typography>
// // // // // //         <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
// // // // // //           {renderTags()}
// // // // // //         </Box>
// // // // // //       </CardContent>
// // // // // //       <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
// // // // // //         <Typography variant="caption" color="text.secondary">
// // // // // //           Vence: {new Date(task.dueDate).toLocaleDateString()}
// // // // // //         </Typography>
// // // // // //         <Box>
// // // // // //           <IconButton size="small">
// // // // // //             <EditIcon fontSize="small" />
// // // // // //           </IconButton>
// // // // // //           <IconButton size="small">
// // // // // //             <DeleteIcon fontSize="small" />
// // // // // //           </IconButton>
// // // // // //         </Box>
// // // // // //       </CardActions>
// // // // // //     </Card>
// // // // // //   );
// // // // // // };

// // // // // // // Componente para columnas sortable
// // // // // // const SortableColumn = ({ 
// // // // // //   column, 
// // // // // //   onTaskClick,
// // // // // //   onAddTask
// // // // // // }: { 
// // // // // //   column: Column; 
// // // // // //   onTaskClick: (task: Task) => void;
// // // // // //   onAddTask: (columnId: string) => void;
// // // // // // }) => {
// // // // // //   const {
// // // // // //     attributes,
// // // // // //     listeners,
// // // // // //     setNodeRef,
// // // // // //     transform,
// // // // // //     transition,
// // // // // //     isDragging,
// // // // // //   } = useSortable({ id: column.id });

// // // // // //   const style = {
// // // // // //     transform: CSS.Transform.toString(transform),
// // // // // //     transition,
// // // // // //     opacity: isDragging ? 0.5 : 1,
// // // // // //   };

// // // // // //   return (
// // // // // //     <Paper
// // // // // //       ref={setNodeRef}
// // // // // //       style={style}
// // // // // //       {...attributes}
// // // // // //       {...listeners}
// // // // // //       sx={{
// // // // // //         width: 300,
// // // // // //         minHeight: 500,
// // // // // //         display: 'flex',
// // // // // //         flexDirection: 'column',
// // // // // //         bgcolor: isDragging ? 'action.hover' : 'grey.100',
// // // // // //       }}
// // // // // //     >
// // // // // //       <Box sx={{ 
// // // // // //         p: 2, 
// // // // // //         display: 'flex', 
// // // // // //         justifyContent: 'space-between', 
// // // // // //         alignItems: 'center',
// // // // // //         bgcolor: 'primary.main',
// // // // // //         color: 'primary.contrastText'
// // // // // //       }}>
// // // // // //         <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// // // // // //           {column.name}
// // // // // //         </Typography>
// // // // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // // //           <Chip 
// // // // // //             label={column.tasks.length} 
// // // // // //             size="small" 
// // // // // //             sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)' }} 
// // // // // //           />
// // // // // //           <IconButton size="small" sx={{ color: 'primary.contrastText' }}>
// // // // // //             <MoreVertIcon />
// // // // // //           </IconButton>
// // // // // //         </Box>
// // // // // //       </Box>

// // // // // //       <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
// // // // // //         <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
// // // // // //           {column.tasks.map((task) => (
// // // // // //             <SortableTask key={task.id} task={task} onClick={onTaskClick} />
// // // // // //           ))}
// // // // // //         </SortableContext>
// // // // // //       </Box>

// // // // // //       <Button 
// // // // // //         startIcon={<AddIcon />} 
// // // // // //         sx={{ m: 1, justifyContent: 'flex-start' }}
// // // // // //         onClick={() => onAddTask(column.id)}
// // // // // //       >
// // // // // //         Añadir tarea
// // // // // //       </Button>
// // // // // //     </Paper>
// // // // // //   );
// // // // // // };

// // // // // // // Componente principal del tablero
// // // // // // const TrelloBoard = ({ data }: { data: any }) => {
// // // // // //   const [projectData, setProjectData] = useState<ProjectData>(data.data);
// // // // // //   const [activeId, setActiveId] = useState<string | null>(null);
// // // // // //   const [activeTask, setActiveTask] = useState<Task | null>(null);
// // // // // //   const [newColumnDialog, setNewColumnDialog] = useState(false);
// // // // // //   const [newTaskDialog, setNewTaskDialog] = useState(false);
// // // // // //   const [newColumnName, setNewColumnName] = useState('');
// // // // // //   const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
// // // // // //     title: '',
// // // // // //     description: '',
// // // // // //     priority: 'media',
// // // // // //     dueDate: new Date().toISOString().split('T')[0],
// // // // // //   });
// // // // // //   const [selectedColumnId, setSelectedColumnId] = useState<string>('');

// // // // // //   const theme = useTheme();
// // // // // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// // // // // //   const sensors = useSensors(
// // // // // //     useSensor(PointerSensor),
// // // // // //     useSensor(KeyboardSensor, {
// // // // // //       coordinateGetter: sortableKeyboardCoordinates,
// // // // // //     })
// // // // // //   );

// // // // // //   const handleDragStart = (event: DragStartEvent) => {
// // // // // //     setActiveId(event.active.id as string);

// // // // // //     // Encontrar la tarea activa para el overlay
// // // // // //     for (const column of projectData.columns) {
// // // // // //       const task = column.tasks.find(t => t.id === event.active.id);
// // // // // //       if (task) {
// // // // // //         setActiveTask(task);
// // // // // //         break;
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDragEnd = (event: DragEndEvent) => {
// // // // // //     const { active, over } = event;
// // // // // //     setActiveId(null);
// // // // // //     setActiveTask(null);

// // // // // //     if (!over) return;

// // // // // //     if (active.id !== over.id) {
// // // // // //       // Encontrar las columnas de origen y destino
// // // // // //       let sourceColumn: Column | undefined, destColumn: Column | undefined;
// // // // // //       let sourceIndex: number = -1, destIndex: number = -1;

// // // // // //       // Buscar en qué columna está la tarea activa y la de destino
// // // // // //       for (const column of projectData.columns) {
// // // // // //         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
// // // // // //         if (taskIndex !== -1) {
// // // // // //           sourceColumn = column;
// // // // // //           sourceIndex = taskIndex;
// // // // // //         }

// // // // // //         const overIndex = column.tasks.findIndex(task => task.id === over.id);
// // // // // //         if (overIndex !== -1) {
// // // // // //           destColumn = column;
// // // // // //           destIndex = overIndex;
// // // // // //         }

// // // // // //         // Si no encontramos la tarea de destino, puede que estemos sobre una columna
// // // // // //         if (!destColumn && column.id === over.id) {
// // // // // //           destColumn = column;
// // // // // //           destIndex = column.tasks.length; // Añadir al final
// // // // // //         }
// // // // // //       }

// // // // // //       // Si se encontraron ambas columnas
// // // // // //       if (sourceColumn && destColumn && sourceIndex !== -1) {
// // // // // //         // Crear una copia profunda de las columnas para evitar mutaciones
// // // // // //         const newColumns = projectData.columns.map(column => ({
// // // // // //           ...column,
// // // // // //           tasks: [...column.tasks]
// // // // // //         }));

// // // // // //         // Encontrar índices de las columnas en el array
// // // // // //         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
// // // // // //         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

// // // // // //         // Si es la misma columna, reordenar
// // // // // //         if (sourceColumn.id === destColumn.id) {
// // // // // //           newColumns[sourceColIndex].tasks = arrayMove(
// // // // // //             newColumns[sourceColIndex].tasks,
// // // // // //             sourceIndex,
// // // // // //             destIndex
// // // // // //           );
// // // // // //         } else {
// // // // // //           // Si son columnas diferentes, mover la tarea
// // // // // //           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
// // // // // //           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
// // // // // //         }

// // // // // //         setProjectData({
// // // // // //           ...projectData,
// // // // // //           columns: newColumns
// // // // // //         });
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleTaskClick = (task: Task) => {
// // // // // //     console.log("Tarea seleccionada:", task);
// // // // // //     // Aquí puedes abrir un modal de edición
// // // // // //   };

// // // // // //   const handleAddColumn = () => {
// // // // // //     if (newColumnName.trim()) {
// // // // // //       const newColumn: Column = {
// // // // // //         id: `col-${Date.now()}`,
// // // // // //         name: newColumnName,
// // // // // //         tasks: []
// // // // // //       };

// // // // // //       setProjectData({
// // // // // //         ...projectData,
// // // // // //         columns: [...projectData.columns, newColumn]
// // // // // //       });

// // // // // //       setNewColumnName('');
// // // // // //       setNewColumnDialog(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleAddTask = (columnId: string) => {
// // // // // //     setSelectedColumnId(columnId);
// // // // // //     setNewTaskData({
// // // // // //       title: '',
// // // // // //       description: '',
// // // // // //       priority: 'media',
// // // // // //       dueDate: new Date().toISOString().split('T')[0],
// // // // // //     });
// // // // // //     setNewTaskDialog(true);
// // // // // //   };

// // // // // //   const handleSaveTask = () => {
// // // // // //     if (newTaskData.title?.trim()) {
// // // // // //       const newTask: Task = {
// // // // // //         id: `task-${Date.now()}`,
// // // // // //         title: newTaskData.title || '',
// // // // // //         description: newTaskData.description || '',
// // // // // //         priority: newTaskData.priority || 'media',
// // // // // //         dueDate: newTaskData.dueDate || new Date().toISOString(),
// // // // // //         tags: []
// // // // // //       };

// // // // // //       const newColumns = projectData.columns.map(column => {
// // // // // //         if (column.id === selectedColumnId) {
// // // // // //           return {
// // // // // //             ...column,
// // // // // //             tasks: [...column.tasks, newTask]
// // // // // //           };
// // // // // //         }
// // // // // //         return column;
// // // // // //       });

// // // // // //       setProjectData({
// // // // // //         ...projectData,
// // // // // //         columns: newColumns
// // // // // //       });

// // // // // //       setNewTaskDialog(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Box sx={{ p: 2, bgcolor: 'grey.200', minHeight: '100vh' }}>
// // // // // //       <Paper sx={{ p: 3, mb: 2 }}>
// // // // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// // // // // //           <Box>
// // // // // //             <Typography variant="h4" gutterBottom>
// // // // // //               {projectData.project.name}
// // // // // //             </Typography>
// // // // // //             <Typography variant="body1" color="text.secondary">
// // // // // //               {projectData.project.description}
// // // // // //             </Typography>
// // // // // //           </Box>

// // // // // //           <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// // // // // //             <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'success.light', color: 'white', borderRadius: 1 }}>
// // // // // //               <Typography variant="h6">
// // // // // //                 {projectData.stats.completedTasks}/{projectData.stats.totalTasks}
// // // // // //               </Typography>
// // // // // //               <Typography variant="body2">Tareas completadas</Typography>
// // // // // //             </Box>

// // // // // //             <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
// // // // // //               <Typography variant="h6">
// // // // // //                 {projectData.stats.completionPercentage}%
// // // // // //               </Typography>
// // // // // //               <Typography variant="body2">Progreso</Typography>
// // // // // //             </Box>
// // // // // //           </Box>
// // // // // //         </Box>
// // // // // //       </Paper>

// // // // // //       <Box sx={{ overflowX: 'auto', pb: 2 }}>
// // // // // //         <DndContext
// // // // // //           sensors={sensors}
// // // // // //           collisionDetection={closestCenter}
// // // // // //           onDragStart={handleDragStart}
// // // // // //           onDragEnd={handleDragEnd}
// // // // // //         >
// // // // // //           <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
// // // // // //             <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
// // // // // //               {projectData.columns.map((column) => (
// // // // // //                 <SortableColumn 
// // // // // //                   key={column.id} 
// // // // // //                   column={column} 
// // // // // //                   onTaskClick={handleTaskClick}
// // // // // //                   onAddTask={handleAddTask}
// // // // // //                 />
// // // // // //               ))}
// // // // // //             </SortableContext>

// // // // // //             <Paper 
// // // // // //               sx={{ 
// // // // // //                 width: 300, 
// // // // // //                 minHeight: 200, 
// // // // // //                 display: 'flex', 
// // // // // //                 alignItems: 'center', 
// // // // // //                 justifyContent: 'center',
// // // // // //                 bgcolor: 'grey.100',
// // // // // //                 cursor: 'pointer'
// // // // // //               }}
// // // // // //               onClick={() => setNewColumnDialog(true)}
// // // // // //             >
// // // // // //               <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
// // // // // //                 Añadir otra columna
// // // // // //               </Button>
// // // // // //             </Paper>
// // // // // //           </Box>

// // // // // //           <DragOverlay>
// // // // // //             {activeTask ? (
// // // // // //               <Card sx={{ width: 280, opacity: 0.8, boxShadow: 3 }}>
// // // // // //                 <CardContent>
// // // // // //                   <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
// // // // // //                     {activeTask.title}
// // // // // //                   </Typography>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             ) : null}
// // // // // //           </DragOverlay>
// // // // // //         </DndContext>
// // // // // //       </Box>

// // // // // //       {/* Diálogo para nueva columna */}
// // // // // //       <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
// // // // // //         <DialogTitle>Añadir nueva columna</DialogTitle>
// // // // // //         <DialogContent>
// // // // // //           <TextField
// // // // // //             autoFocus
// // // // // //             margin="dense"
// // // // // //             label="Nombre de la columna"
// // // // // //             fullWidth
// // // // // //             variant="outlined"
// // // // // //             value={newColumnName}
// // // // // //             onChange={(e) => setNewColumnName(e.target.value)}
// // // // // //             onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
// // // // // //           />
// // // // // //         </DialogContent>
// // // // // //         <DialogActions>
// // // // // //           <Button onClick={() => setNewColumnDialog(false)}>Cancelar</Button>
// // // // // //           <Button onClick={handleAddColumn} variant="contained">Añadir</Button>
// // // // // //         </DialogActions>
// // // // // //       </Dialog>

// // // // // //       {/* Diálogo para nueva tarea */}
// // // // // //       <Dialog open={newTaskDialog} onClose={() => setNewTaskDialog(false)} maxWidth="sm" fullWidth>
// // // // // //         <DialogTitle>Añadir nueva tarea</DialogTitle>
// // // // // //         <DialogContent>
// // // // // //           <TextField
// // // // // //             autoFocus
// // // // // //             margin="dense"
// // // // // //             label="Título de la tarea"
// // // // // //             fullWidth
// // // // // //             variant="outlined"
// // // // // //             value={newTaskData.title}
// // // // // //             onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
// // // // // //             sx={{ mb: 2 }}
// // // // // //           />
// // // // // //           <TextField
// // // // // //             margin="dense"
// // // // // //             label="Descripción"
// // // // // //             fullWidth
// // // // // //             variant="outlined"
// // // // // //             multiline
// // // // // //             rows={3}
// // // // // //             value={newTaskData.description}
// // // // // //             onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
// // // // // //             sx={{ mb: 2 }}
// // // // // //           />
// // // // // //           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // // // // //             <TextField
// // // // // //               label="Prioridad"
// // // // // //               select
// // // // // //               fullWidth
// // // // // //               SelectProps={{ native: true }}
// // // // // //               value={newTaskData.priority}
// // // // // //               onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
// // // // // //             >
// // // // // //               <option value="alta">Alta</option>
// // // // // //               <option value="media">Media</option>
// // // // // //               <option value="baja">Baja</option>
// // // // // //             </TextField>
// // // // // //             <TextField
// // // // // //               label="Fecha de vencimiento"
// // // // // //               type="date"
// // // // // //               fullWidth
// // // // // //               value={newTaskData.dueDate}
// // // // // //               onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
// // // // // //               InputLabelProps={{
// // // // // //                 shrink: true,
// // // // // //               }}
// // // // // //             />
// // // // // //           </Box>
// // // // // //         </DialogContent>
// // // // // //         <DialogActions>
// // // // // //           <Button onClick={() => setNewTaskDialog(false)}>Cancelar</Button>
// // // // // //           <Button onClick={handleSaveTask} variant="contained">Añadir tarea</Button>
// // // // // //         </DialogActions>
// // // // // //       </Dialog>
// // // // // //     </Box>
// // // // // //   );
// // // // // // };

// // // // // // export default TrelloBoard;



// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   DndContext,
// // // // //   closestCenter,
// // // // //   KeyboardSensor,
// // // // //   PointerSensor,
// // // // //   useSensor,
// // // // //   useSensors,
// // // // //   DragEndEvent,
// // // // //   DragStartEvent,
// // // // //   DragOverlay,
// // // // // } from '@dnd-kit/core';
// // // // // import {
// // // // //   arrayMove,
// // // // //   SortableContext,
// // // // //   sortableKeyboardCoordinates,
// // // // //   verticalListSortingStrategy,
// // // // //   useSortable,
// // // // // } from '@dnd-kit/sortable';
// // // // // import { CSS } from '@dnd-kit/utilities';
// // // // // import {
// // // // //   Paper,
// // // // //   Typography,
// // // // //   Box,
// // // // //   Button,
// // // // //   IconButton,
// // // // //   TextField,
// // // // //   Dialog,
// // // // //   DialogActions,
// // // // //   DialogContent,
// // // // //   DialogTitle,
// // // // //   Chip,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardActions,
// // // // //   useTheme,
// // // // //   useMediaQuery,
// // // // //   AppBar,
// // // // //   Toolbar,
// // // // //   LinearProgress,
// // // // //   Menu,
// // // // //   MenuItem,
// // // // //   Fab,
// // // // //   Snackbar,
// // // // //   Alert,
// // // // //   Tooltip,
// // // // // } from '@mui/material';
// // // // // import {
// // // // //   Add as AddIcon,
// // // // //   MoreVert as MoreVertIcon,
// // // // //   Edit as EditIcon,
// // // // //   Delete as DeleteIcon,
// // // // //   DragIndicator as DragIndicatorIcon,
// // // // //   ViewColumn as ViewColumnIcon,
// // // // //   Dashboard as DashboardIcon,
// // // // //   Notifications as NotificationsIcon,
// // // // //   AccountCircle as AccountCircleIcon,
// // // // //   Search as SearchIcon,
// // // // // } from '@mui/icons-material';

// // // // // // Interfaz para los tipos de datos
// // // // // interface Tag {
// // // // //   name: string;
// // // // //   color?: string;
// // // // // }

// // // // // interface Task {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   description: string;
// // // // //   priority: string;
// // // // //   dueDate: string;
// // // // //   tags: Tag[];
// // // // // }

// // // // // interface Column {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   tasks: Task[];
// // // // // }

// // // // // interface ProjectData {
// // // // //   project: {
// // // // //     id: string;
// // // // //     name: string;
// // // // //     description: string;
// // // // //     startDate: string;
// // // // //     deadline: string;
// // // // //     progress: number;
// // // // //   };
// // // // //   columns: Column[];
// // // // //   stats: {
// // // // //     totalTasks: number;
// // // // //     completedTasks: number;
// // // // //     inProgressTasks: number;
// // // // //     overdueTasks: number;
// // // // //     completionPercentage: number;
// // // // //   };
// // // // // }

// // // // // // Componente para tareas sortable
// // // // // const SortableTask = ({ task, onClick }: { task: Task; onClick: (task: Task) => void }) => {
// // // // //   const {
// // // // //     attributes,
// // // // //     listeners,
// // // // //     setNodeRef,
// // // // //     transform,
// // // // //     transition,
// // // // //     isDragging,
// // // // //   } = useSortable({ id: task.id });

// // // // //   const style = {
// // // // //     transform: CSS.Transform.toString(transform),
// // // // //     transition,
// // // // //     opacity: isDragging ? 0.5 : 1,
// // // // //   };

// // // // //   const getPriorityColor = (priority: string) => {
// // // // //     switch (priority) {
// // // // //       case 'alta': return '#f44336';
// // // // //       case 'media': return '#ff9800';
// // // // //       case 'baja': return '#4caf50';
// // // // //       default: return '#9e9e9e';
// // // // //     }
// // // // //   };

// // // // //   const getPriorityText = (priority: string) => {
// // // // //     switch (priority) {
// // // // //       case 'alta': return 'Alta';
// // // // //       case 'media': return 'Media';
// // // // //       case 'baja': return 'Baja';
// // // // //       default: return 'Sin prioridad';
// // // // //     }
// // // // //   };

// // // // //   // Función para renderizar tags de manera segura
// // // // //   const renderTags = () => {
// // // // //     return task.tags.map((tag, index) => {
// // // // //       const tagName = typeof tag === 'string' ? tag : tag.name;
// // // // //       return (
// // // // //         <Chip
// // // // //           key={index}
// // // // //           label={tagName}
// // // // //           size="small"
// // // // //           sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
// // // // //           variant="outlined"
// // // // //         />
// // // // //       );
// // // // //     });
// // // // //   };

// // // // //   return (
// // // // //     <Card
// // // // //       ref={setNodeRef}
// // // // //       style={style}
// // // // //       {...attributes}
// // // // //       {...listeners}
// // // // //       sx={{
// // // // //         mb: 1,
// // // // //         cursor: 'grab',
// // // // //         '&:hover': {
// // // // //           boxShadow: 3,
// // // // //         },
// // // // //         position: 'relative',
// // // // //       }}
// // // // //       onClick={() => onClick(task)}
// // // // //     >
// // // // //       <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
// // // // //         <DragIndicatorIcon fontSize="small" />
// // // // //       </Box>
// // // // //       <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
// // // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // // // //           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2 }}>
// // // // //             {task.title}
// // // // //           </Typography>
// // // // //           <Tooltip title={getPriorityText(task.priority)}>
// // // // //             <Box
// // // // //               sx={{
// // // // //                 width: 12,
// // // // //                 height: 12,
// // // // //                 borderRadius: '50%',
// // // // //                 backgroundColor: getPriorityColor(task.priority),
// // // // //                 flexShrink: 0,
// // // // //               }}
// // // // //             />
// // // // //           </Tooltip>
// // // // //         </Box>
// // // // //         <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1, fontSize: '0.8rem' }}>
// // // // //           {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
// // // // //         </Typography>
// // // // //         <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
// // // // //           {renderTags()}
// // // // //         </Box>
// // // // //       </CardContent>
// // // // //       <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
// // // // //         <Typography variant="caption" color="text.secondary">
// // // // //           Vence: {new Date(task.dueDate).toLocaleDateString()}
// // // // //         </Typography>
// // // // //         <Box>
// // // // //           <Tooltip title="Editar">
// // // // //             <IconButton size="small">
// // // // //               <EditIcon fontSize="small" />
// // // // //             </IconButton>
// // // // //           </Tooltip>
// // // // //           <Tooltip title="Eliminar">
// // // // //             <IconButton size="small">
// // // // //               <DeleteIcon fontSize="small" />
// // // // //             </IconButton>
// // // // //           </Tooltip>
// // // // //         </Box>
// // // // //       </CardActions>
// // // // //     </Card>
// // // // //   );
// // // // // };

// // // // // // Componente para columnas sortable
// // // // // const SortableColumn = ({ 
// // // // //   column, 
// // // // //   onTaskClick,
// // // // //   onAddTask,
// // // // //   onEditColumn,
// // // // //   onDeleteColumn
// // // // // }: { 
// // // // //   column: Column; 
// // // // //   onTaskClick: (task: Task) => void;
// // // // //   onAddTask: (columnId: string) => void;
// // // // //   onEditColumn: (columnId: string) => void;
// // // // //   onDeleteColumn: (columnId: string) => void;
// // // // // }) => {
// // // // //   const {
// // // // //     attributes,
// // // // //     listeners,
// // // // //     setNodeRef,
// // // // //     transform,
// // // // //     transition,
// // // // //     isDragging,
// // // // //   } = useSortable({ id: column.id });

// // // // //   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

// // // // //   const style = {
// // // // //     transform: CSS.Transform.toString(transform),
// // // // //     transition,
// // // // //     opacity: isDragging ? 0.5 : 1,
// // // // //   };

// // // // //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // // // //     event.stopPropagation();
// // // // //     setMenuAnchor(event.currentTarget);
// // // // //   };

// // // // //   const handleMenuClose = () => {
// // // // //     setMenuAnchor(null);
// // // // //   };

// // // // //   const handleEdit = () => {
// // // // //     onEditColumn(column.id);
// // // // //     handleMenuClose();
// // // // //   };

// // // // //   const handleDelete = () => {
// // // // //     onDeleteColumn(column.id);
// // // // //     handleMenuClose();
// // // // //   };

// // // // //   return (
// // // // //     <Paper
// // // // //       ref={setNodeRef}
// // // // //       style={style}
// // // // //       {...attributes}
// // // // //       {...listeners}
// // // // //       sx={{
// // // // //         width: 300,
// // // // //         minHeight: 500,
// // // // //         display: 'flex',
// // // // //         flexDirection: 'column',
// // // // //         bgcolor: isDragging ? 'action.hover' : 'grey.100',
// // // // //       }}
// // // // //     >
// // // // //       <Box sx={{ 
// // // // //         p: 2, 
// // // // //         display: 'flex', 
// // // // //         justifyContent: 'space-between', 
// // // // //         alignItems: 'center',
// // // // //         bgcolor: 'primary.main',
// // // // //         color: 'primary.contrastText'
// // // // //       }}>
// // // // //         <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
// // // // //           {column.name}
// // // // //         </Typography>
// // // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // //           <Chip 
// // // // //             label={column.tasks.length} 
// // // // //             size="small" 
// // // // //             sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)', mr: 1 }} 
// // // // //           />
// // // // //           <IconButton 
// // // // //             size="small" 
// // // // //             sx={{ color: 'primary.contrastText' }}
// // // // //             onClick={handleMenuOpen}
// // // // //           >
// // // // //             <MoreVertIcon />
// // // // //           </IconButton>
// // // // //           <Menu
// // // // //             anchorEl={menuAnchor}
// // // // //             open={Boolean(menuAnchor)}
// // // // //             onClose={handleMenuClose}
// // // // //           >
// // // // //             <MenuItem onClick={handleEdit}>Editar columna</MenuItem>
// // // // //             <MenuItem onClick={handleDelete}>Eliminar columna</MenuItem>
// // // // //           </Menu>
// // // // //         </Box>
// // // // //       </Box>

// // // // //       <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
// // // // //         <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
// // // // //           {column.tasks.map((task) => (
// // // // //             <SortableTask key={task.id} task={task} onClick={onTaskClick} />
// // // // //           ))}
// // // // //         </SortableContext>
// // // // //         {column.tasks.length === 0 && (
// // // // //           <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
// // // // //             <ViewColumnIcon sx={{ fontSize: 40, opacity: 0.5 }} />
// // // // //             <Typography variant="body2" sx={{ mt: 1 }}>
// // // // //               No hay tareas en esta columna
// // // // //             </Typography>
// // // // //           </Box>
// // // // //         )}
// // // // //       </Box>

// // // // //       <Button 
// // // // //         startIcon={<AddIcon />} 
// // // // //         sx={{ m: 1, justifyContent: 'flex-start' }}
// // // // //         onClick={() => onAddTask(column.id)}
// // // // //       >
// // // // //         Añadir tarea
// // // // //       </Button>
// // // // //     </Paper>
// // // // //   );
// // // // // };

// // // // // // Componente principal del tablero
// // // // // const TrelloBoard = ({ data }: { data: any }) => {
// // // // //   const [projectData, setProjectData] = useState<ProjectData>(data.data);
// // // // //   const [activeId, setActiveId] = useState<string | null>(null);
// // // // //   const [activeTask, setActiveTask] = useState<Task | null>(null);
// // // // //   const [newColumnDialog, setNewColumnDialog] = useState(false);
// // // // //   const [editColumnDialog, setEditColumnDialog] = useState(false);
// // // // //   const [newTaskDialog, setNewTaskDialog] = useState(false);
// // // // //   const [newColumnName, setNewColumnName] = useState('');
// // // // //   const [editColumnName, setEditColumnName] = useState('');
// // // // //   const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
// // // // //     title: '',
// // // // //     description: '',
// // // // //     priority: 'media',
// // // // //     dueDate: new Date().toISOString().split('T')[0],
// // // // //   });
// // // // //   const [selectedColumnId, setSelectedColumnId] = useState<string>('');
// // // // //   const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
// // // // //   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

// // // // //   const theme = useTheme();
// // // // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// // // // //   const sensors = useSensors(
// // // // //     useSensor(PointerSensor),
// // // // //     useSensor(KeyboardSensor, {
// // // // //       coordinateGetter: sortableKeyboardCoordinates,
// // // // //     })
// // // // //   );

// // // // //   // Función segura para obtener el rango de selección
// // // // //   const safeGetSelection = () => {
// // // // //     try {
// // // // //       return window.getSelection();
// // // // //     } catch (error) {
// // // // //       console.error("Error getting selection:", error);
// // // // //       return null;
// // // // //     }
// // // // //   };

// // // // //   // Reemplazar el uso de getRangeAt con una implementación segura
// // // // //   useEffect(() => {
// // // // //     // Esta es una solución para el error de getRangeAt
// // // // //     const originalGetRangeAt = Selection.prototype.getRangeAt;

// // // // //     Selection.prototype.getRangeAt = function(index) {
// // // // //       if (index >= this.rangeCount || index < 0) {
// // // // //         return document.createRange();
// // // // //       }
// // // // //       return originalGetRangeAt.call(this, index);
// // // // //     };

// // // // //     return () => {
// // // // //       Selection.prototype.getRangeAt = originalGetRangeAt;
// // // // //     };
// // // // //   }, []);

// // // // //   const handleDragStart = (event: DragStartEvent) => {
// // // // //     setActiveId(event.active.id as string);

// // // // //     // Encontrar la tarea activa para el overlay
// // // // //     for (const column of projectData.columns) {
// // // // //       const task = column.tasks.find(t => t.id === event.active.id);
// // // // //       if (task) {
// // // // //         setActiveTask(task);
// // // // //         break;
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleDragEnd = (event: DragEndEvent) => {
// // // // //     const { active, over } = event;
// // // // //     setActiveId(null);
// // // // //     setActiveTask(null);

// // // // //     if (!over) return;

// // // // //     if (active.id !== over.id) {
// // // // //       // Encontrar las columnas de origen y destino
// // // // //       let sourceColumn: Column | undefined, destColumn: Column | undefined;
// // // // //       let sourceIndex: number = -1, destIndex: number = -1;

// // // // //       // Buscar en qué columna está la tarea activa y la de destino
// // // // //       for (const column of projectData.columns) {
// // // // //         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
// // // // //         if (taskIndex !== -1) {
// // // // //           sourceColumn = column;
// // // // //           sourceIndex = taskIndex;
// // // // //         }

// // // // //         const overIndex = column.tasks.findIndex(task => task.id === over.id);
// // // // //         if (overIndex !== -1) {
// // // // //           destColumn = column;
// // // // //           destIndex = overIndex;
// // // // //         }

// // // // //         // Si no encontramos la tarea de destino, puede que estemos sobre una columna
// // // // //         if (!destColumn && column.id === over.id) {
// // // // //           destColumn = column;
// // // // //           destIndex = column.tasks.length; // Añadir al final
// // // // //         }
// // // // //       }

// // // // //       // Si se encontraron ambas columnas
// // // // //       if (sourceColumn && destColumn && sourceIndex !== -1) {
// // // // //         // Crear una copia profunda de las columnas para evitar mutaciones
// // // // //         const newColumns = projectData.columns.map(column => ({
// // // // //           ...column,
// // // // //           tasks: [...column.tasks]
// // // // //         }));

// // // // //         // Encontrar índices de las columnas en el array
// // // // //         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
// // // // //         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

// // // // //         // Si es la misma columna, reordenar
// // // // //         if (sourceColumn.id === destColumn.id) {
// // // // //           newColumns[sourceColIndex].tasks = arrayMove(
// // // // //             newColumns[sourceColIndex].tasks,
// // // // //             sourceIndex,
// // // // //             destIndex
// // // // //           );
// // // // //         } else {
// // // // //           // Si son columnas diferentes, mover la tarea
// // // // //           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
// // // // //           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
// // // // //         }

// // // // //         setProjectData({
// // // // //           ...projectData,
// // // // //           columns: newColumns
// // // // //         });

// // // // //         setNotification({
// // // // //           open: true,
// // // // //           message: 'Tarea movida correctamente',
// // // // //           severity: 'success'
// // // // //         });
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleTaskClick = (task: Task) => {
// // // // //     console.log("Tarea seleccionada:", task);
// // // // //     // Aquí puedes abrir un modal de edición
// // // // //   };

// // // // //   const handleAddColumn = () => {
// // // // //     if (newColumnName.trim()) {
// // // // //       const newColumn: Column = {
// // // // //         id: `col-${Date.now()}`,
// // // // //         name: newColumnName,
// // // // //         tasks: []
// // // // //       };

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: [...projectData.columns, newColumn]
// // // // //       });

// // // // //       setNewColumnName('');
// // // // //       setNewColumnDialog(false);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Columna añadida correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleEditColumn = () => {
// // // // //     if (editColumnName.trim() && selectedColumn) {
// // // // //       const newColumns = projectData.columns.map(column => {
// // // // //         if (column.id === selectedColumn.id) {
// // // // //           return {
// // // // //             ...column,
// // // // //             name: editColumnName
// // // // //           };
// // // // //         }
// // // // //         return column;
// // // // //       });

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: newColumns
// // // // //       });

// // // // //       setEditColumnDialog(false);
// // // // //       setSelectedColumn(null);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Columna actualizada correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteColumn = (columnId: string) => {
// // // // //     const columnToDelete = projectData.columns.find(col => col.id === columnId);
// // // // //     if (columnToDelete && columnToDelete.tasks.length > 0) {
// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'No puedes eliminar una columna que contiene tareas',
// // // // //         severity: 'error'
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     const newColumns = projectData.columns.filter(column => column.id !== columnId);

// // // // //     setProjectData({
// // // // //       ...projectData,
// // // // //       columns: newColumns
// // // // //     });

// // // // //     setNotification({
// // // // //       open: true,
// // // // //       message: 'Columna eliminada correctamente',
// // // // //       severity: 'success'
// // // // //     });
// // // // //   };

// // // // //   const handleAddTask = (columnId: string) => {
// // // // //     setSelectedColumnId(columnId);
// // // // //     setNewTaskData({
// // // // //       title: '',
// // // // //       description: '',
// // // // //       priority: 'media',
// // // // //       dueDate: new Date().toISOString().split('T')[0],
// // // // //     });
// // // // //     setNewTaskDialog(true);
// // // // //   };

// // // // //   const handleSaveTask = () => {
// // // // //     if (newTaskData.title?.trim()) {
// // // // //       const newTask: Task = {
// // // // //         id: `task-${Date.now()}`,
// // // // //         title: newTaskData.title || '',
// // // // //         description: newTaskData.description || '',
// // // // //         priority: newTaskData.priority || 'media',
// // // // //         dueDate: newTaskData.dueDate || new Date().toISOString(),
// // // // //         tags: []
// // // // //       };

// // // // //       const newColumns = projectData.columns.map(column => {
// // // // //         if (column.id === selectedColumnId) {
// // // // //           return {
// // // // //             ...column,
// // // // //             tasks: [...column.tasks, newTask]
// // // // //           };
// // // // //         }
// // // // //         return column;
// // // // //       });

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: newColumns
// // // // //       });

// // // // //       setNewTaskDialog(false);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Tarea añadida correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleOpenEditColumn = (columnId: string) => {
// // // // //     const column = projectData.columns.find(col => col.id === columnId);
// // // // //     if (column) {
// // // // //       setSelectedColumn(column);
// // // // //       setEditColumnName(column.name);
// // // // //       setEditColumnDialog(true);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Box sx={{ flexGrow: 1, bgcolor: 'grey.200', minHeight: '100vh' }}>
// // // // //       <AppBar position="static" elevation={0}>
// // // // //         <Toolbar>
// // // // //           <DashboardIcon sx={{ mr: 2 }} />
// // // // //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// // // // //             Tablero Trello
// // // // //           </Typography>
// // // // //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
// // // // //             <IconButton color="inherit">
// // // // //               <SearchIcon />
// // // // //             </IconButton>
// // // // //             <IconButton color="inherit">
// // // // //               <NotificationsIcon />
// // // // //             </IconButton>
// // // // //             <IconButton color="inherit">
// // // // //               <AccountCircleIcon />
// // // // //             </IconButton>
// // // // //           </Box>
// // // // //         </Toolbar>
// // // // //       </AppBar>

// // // // //       <Box sx={{ p: 2 }}>
// // // // //         <Paper sx={{ p: 3, mb: 2 }}>
// // // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// // // // //             <Box sx={{ flex: 1, minWidth: 300 }}>
// // // // //               <Typography variant="h4" gutterBottom>
// // // // //                 {projectData.project.name}
// // // // //               </Typography>
// // // // //               <Typography variant="body1" color="text.secondary" paragraph>
// // // // //                 {projectData.project.description}
// // // // //               </Typography>

// // // // //               <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2">
// // // // //                   Progreso del proyecto:
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2" fontWeight="bold">
// // // // //                   {projectData.project.progress}%
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //               <LinearProgress 
// // // // //                 variant="determinate" 
// // // // //                 value={projectData.project.progress} 
// // // // //                 sx={{ height: 8, borderRadius: 4, mb: 2 }}
// // // // //               />

// // // // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                 <Typography variant="body2">
// // // // //                   {new Date(projectData.project.startDate).toLocaleDateString()} - {new Date(projectData.project.deadline).toLocaleDateString()}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             </Box>

// // // // //             <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// // // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // // //                 <Typography variant="h5" fontWeight="bold">
// // // // //                   {projectData.stats.completedTasks}/{projectData.stats.totalTasks}
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">Tareas completadas</Typography>
// // // // //               </Box>

// // // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // // //                 <Typography variant="h5" fontWeight="bold">
// // // // //                   {projectData.stats.completionPercentage}%
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">Progreso total</Typography>
// // // // //               </Box>
// // // // //             </Box>
// // // // //           </Box>
// // // // //         </Paper>

// // // // //         <Box sx={{ overflowX: 'auto', pb: 2 }}>
// // // // //           <DndContext
// // // // //             sensors={sensors}
// // // // //             collisionDetection={closestCenter}
// // // // //             onDragStart={handleDragStart}
// // // // //             onDragEnd={handleDragEnd}
// // // // //           >
// // // // //             <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'min-content' }}>
// // // // //               <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
// // // // //                 {projectData.columns.map((column) => (
// // // // //                   <SortableColumn 
// // // // //                     key={column.id} 
// // // // //                     column={column} 
// // // // //                     onTaskClick={handleTaskClick}
// // // // //                     onAddTask={handleAddTask}
// // // // //                     onEditColumn={handleOpenEditColumn}
// // // // //                     onDeleteColumn={handleDeleteColumn}
// // // // //                   />
// // // // //                 ))}
// // // // //               </SortableContext>

// // // // //               <Paper 
// // // // //                 sx={{ 
// // // // //                   width: 300, 
// // // // //                   minHeight: 200, 
// // // // //                   display: 'flex', 
// // // // //                   alignItems: 'center', 
// // // // //                   justifyContent: 'center',
// // // // //                   bgcolor: 'grey.100',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //                 onClick={() => setNewColumnDialog(true)}
// // // // //               >
// // // // //                 <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
// // // // //                   Añadir otra columna
// // // // //                 </Button>
// // // // //               </Paper>
// // // // //             </Box>

// // // // //             <DragOverlay>
// // // // //               {activeTask ? (
// // // // //                 <Card sx={{ width: 280, opacity: 0.8, boxShadow: 3 }}>
// // // // //                   <CardContent>
// // // // //                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
// // // // //                       {activeTask.title}
// // // // //                     </Typography>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               ) : null}
// // // // //             </DragOverlay>
// // // // //           </DndContext>
// // // // //         </Box>

// // // // //         <Fab
// // // // //           color="primary"
// // // // //           aria-label="add"
// // // // //           sx={{ position: 'fixed', bottom: 16, right: 16 }}
// // // // //           onClick={() => setNewColumnDialog(true)}
// // // // //         >
// // // // //           <AddIcon />
// // // // //         </Fab>
// // // // //       </Box>

// // // // //       {/* Diálogo para nueva columna */}
// // // // //       <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
// // // // //         <DialogTitle>Añadir nueva columna</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             autoFocus
// // // // //             margin="dense"
// // // // //             label="Nombre de la columna"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             value={newColumnName}
// // // // //             onChange={(e) => setNewColumnName(e.target.value)}
// // // // //             onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
// // // // //           />
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setNewColumnDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleAddColumn} variant="contained">Añadir</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       {/* Diálogo para editar columna */}
// // // // //       <Dialog open={editColumnDialog} onClose={() => setEditColumnDialog(false)}>
// // // // //         <DialogTitle>Editar columna</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             autoFocus
// // // // //             margin="dense"
// // // // //             label="Nombre de la columna"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             value={editColumnName}
// // // // //             onChange={(e) => setEditColumnName(e.target.value)}
// // // // //             onKeyPress={(e) => e.key === 'Enter' && handleEditColumn()}
// // // // //           />
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setEditColumnDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleEditColumn} variant="contained">Guardar</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       {/* Diálogo para nueva tarea */}
// // // // //       <Dialog open={newTaskDialog} onClose={() => setNewTaskDialog(false)} maxWidth="sm" fullWidth>
// // // // //         <DialogTitle>Añadir nueva tarea</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             autoFocus
// // // // //             margin="dense"
// // // // //             label="Título de la tarea"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             value={newTaskData.title}
// // // // //             onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
// // // // //             sx={{ mb: 2 }}
// // // // //           />
// // // // //           <TextField
// // // // //             margin="dense"
// // // // //             label="Descripción"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             multiline
// // // // //             rows={3}
// // // // //             value={newTaskData.description}
// // // // //             onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
// // // // //             sx={{ mb: 2 }}
// // // // //           />
// // // // //           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // // // //             <TextField
// // // // //               label="Prioridad"
// // // // //               select
// // // // //               fullWidth
// // // // //               SelectProps={{ native: true }}
// // // // //               value={newTaskData.priority}
// // // // //               onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
// // // // //             >
// // // // //               <option value="alta">Alta</option>
// // // // //               <option value="media">Media</option>
// // // // //               <option value="baja">Baja</option>
// // // // //             </TextField>
// // // // //             <TextField
// // // // //               label="Fecha de vencimiento"
// // // // //               type="date"
// // // // //               fullWidth
// // // // //               value={newTaskData.dueDate}
// // // // //               onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
// // // // //               InputLabelProps={{
// // // // //                 shrink: true,
// // // // //               }}
// // // // //             />
// // // // //           </Box>
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setNewTaskDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleSaveTask} variant="contained">Añadir tarea</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       <Snackbar
// // // // //         open={notification.open}
// // // // //         autoHideDuration={3000}
// // // // //         onClose={() => setNotification({...notification, open: false})}
// // // // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // // // //       >
// // // // //         <Alert 
// // // // //           onClose={() => setNotification({...notification, open: false})} 
// // // // //           severity={notification.severity as any} 
// // // // //           sx={{ width: '100%' }}
// // // // //         >
// // // // //           {notification.message}
// // // // //         </Alert>
// // // // //       </Snackbar>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default TrelloBoard;


// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import {
// // // // //   DndContext,
// // // // //   closestCenter,
// // // // //   KeyboardSensor,
// // // // //   PointerSensor,
// // // // //   useSensor,
// // // // //   useSensors,
// // // // //   DragEndEvent,
// // // // //   DragStartEvent,
// // // // //   DragOverlay,
// // // // // } from '@dnd-kit/core';
// // // // // import {
// // // // //   arrayMove,
// // // // //   SortableContext,
// // // // //   sortableKeyboardCoordinates,
// // // // //   verticalListSortingStrategy,
// // // // //   useSortable,
// // // // // } from '@dnd-kit/sortable';
// // // // // import { CSS } from '@dnd-kit/utilities';
// // // // // import {
// // // // //   Paper,
// // // // //   Typography,
// // // // //   Box,
// // // // //   Button,
// // // // //   IconButton,
// // // // //   TextField,
// // // // //   Dialog,
// // // // //   DialogActions,
// // // // //   DialogContent,
// // // // //   DialogTitle,
// // // // //   Chip,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardActions,
// // // // //   useTheme,
// // // // //   useMediaQuery,
// // // // //   AppBar,
// // // // //   Toolbar,
// // // // //   LinearProgress,
// // // // //   Menu,
// // // // //   MenuItem,
// // // // //   Fab,
// // // // //   Snackbar,
// // // // //   Alert,
// // // // //   Tooltip,
// // // // //   Divider,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   Select,
// // // // //   OutlinedInput,
// // // // //   ListItemText,
// // // // //   Checkbox,
// // // // //   FormGroup,
// // // // //   FormControlLabel,
// // // // //   Switch,
// // // // // } from '@mui/material';
// // // // // import {
// // // // //   Add as AddIcon,
// // // // //   MoreVert as MoreVertIcon,
// // // // //   Edit as EditIcon,
// // // // //   Delete as DeleteIcon,
// // // // //   DragIndicator as DragIndicatorIcon,
// // // // //   ViewColumn as ViewColumnIcon,
// // // // //   Dashboard as DashboardIcon,
// // // // //   Notifications as NotificationsIcon,
// // // // //   AccountCircle as AccountCircleIcon,
// // // // //   Search as SearchIcon,
// // // // //   Label as LabelIcon,
// // // // //   Schedule as ScheduleIcon,
// // // // // } from '@mui/icons-material';

// // // // // // Interfaz para los tipos de datos
// // // // // interface Tag {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   color: string;
// // // // // }

// // // // // interface Task {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   description: string;
// // // // //   priority: string;
// // // // //   dueDate: string;
// // // // //   tags: string[];
// // // // //   completed: boolean;
// // // // // }

// // // // // interface Column {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   tasks: Task[];
// // // // // }

// // // // // interface ProjectData {
// // // // //   project: {
// // // // //     id: string;
// // // // //     name: string;
// // // // //     description: string;
// // // // //     startDate: string;
// // // // //     deadline: string;
// // // // //     progress: number;
// // // // //   };
// // // // //   columns: Column[];
// // // // //   tags: Tag[];
// // // // //   stats: {
// // // // //     totalTasks: number;
// // // // //     completedTasks: number;
// // // // //     inProgressTasks: number;
// // // // //     overdueTasks: number;
// // // // //     completionPercentage: number;
// // // // //   };
// // // // // }

// // // // // // Datos iniciales de ejemplo
// // // // // const initialData: { data: ProjectData } = {
// // // // //   data: {
// // // // //     project: {
// // // // //       id: "proyecto-app-002",
// // // // //       name: "Desarrollo Web",
// // // // //       description: "Aplicación móvil para gestión de tareas personales",
// // // // //       startDate: "2024-01-10",
// // // // //       deadline: "2024-06-15",
// // // // //       progress: 35
// // // // //     },
// // // // //     tags: [
// // // // //       { id: 'tag-1', name: 'diseño', color: '#ff5252' },
// // // // //       { id: 'tag-2', name: 'UI/UX', color: '#7c4dff' },
// // // // //       { id: 'tag-3', name: 'backend', color: '#448aff' },
// // // // //       { id: 'tag-4', name: 'database', color: '#ffab40' },
// // // // //       { id: 'tag-5', name: 'API', color: '#69f0ae' },
// // // // //       { id: 'tag-6', name: 'seguridad', color: '#ff4081' },
// // // // //       { id: 'tag-7', name: 'devops', color: '#9c27b0' },
// // // // //       { id: 'tag-8', name: 'configuración', color: '#795548' },
// // // // //     ],
// // // // //     columns: [
// // // // //       {
// // // // //         id: "col-1",
// // // // //         name: "Por Hacer",
// // // // //         tasks: [
// // // // //           {
// // // // //             id: "task-1",
// // // // //             title: "Diseñar interfaz de login",
// // // // //             description: "Crear mockups para la pantalla de inicio de sesión",
// // // // //             priority: "alta",
// // // // //             dueDate: "2024-01-15",
// // // // //             tags: ["tag-1", "tag-2"],
// // // // //             completed: false
// // // // //           },
// // // // //           {
// // // // //             id: "task-2",
// // // // //             title: "Configurar base de datos",
// // // // //             description: "Implementar esquema inicial de la base de datos",
// // // // //             priority: "media",
// // // // //             dueDate: "2024-01-20",
// // // // //             tags: ["tag-3", "tag-4"],
// // // // //             completed: false
// // // // //           }
// // // // //         ]
// // // // //       },
// // // // //       {
// // // // //         id: "col-2",
// // // // //         name: "En Progreso",
// // // // //         tasks: [
// // // // //           {
// // // // //             id: "task-3",
// // // // //             title: "Desarrollar API de usuarios",
// // // // //             description: "Crear endpoints para registro y login de usuarios",
// // // // //             priority: "alta",
// // // // //             dueDate: "2024-01-18",
// // // // //             tags: ["tag-3", "tag-5"],
// // // // //             completed: false
// // // // //           }
// // // // //         ]
// // // // //       },
// // // // //       {
// // // // //         id: "col-3",
// // // // //         name: "En Revisión",
// // // // //         tasks: [
// // // // //           {
// // // // //             id: "task-4",
// // // // //             title: "Implementar autenticación",
// // // // //             description: "Sistema de autenticación con JWT",
// // // // //             priority: "alta",
// // // // //             dueDate: "2024-01-22",
// // // // //             tags: ["tag-6", "tag-3"],
// // // // //             completed: false
// // // // //           }
// // // // //         ]
// // // // //       },
// // // // //       {
// // // // //         id: "col-4",
// // // // //         name: "Terminado",
// // // // //         tasks: [
// // // // //           {
// // // // //             id: "task-5",
// // // // //             title: "Configurar entorno de desarrollo",
// // // // //             description: "Setup inicial del proyecto con todas las dependencias",
// // // // //             priority: "baja",
// // // // //             dueDate: "2024-01-10",
// // // // //             tags: ["tag-7", "tag-8"],
// // // // //             completed: true
// // // // //           }
// // // // //         ]
// // // // //       }
// // // // //     ],
// // // // //     stats: {
// // // // //       totalTasks: 5,
// // // // //       completedTasks: 1,
// // // // //       inProgressTasks: 1,
// // // // //       overdueTasks: 0,
// // // // //       completionPercentage: 20
// // // // //     }
// // // // //   }
// // // // // };

// // // // // // Componente para tareas sortable
// // // // // const SortableTask = ({ task, onClick, onEdit, onDelete, allTags }: { 
// // // // //   task: Task; 
// // // // //   onClick: (task: Task) => void;
// // // // //   onEdit: (task: Task) => void;
// // // // //   onDelete: (taskId: string) => void;
// // // // //   allTags: Tag[];
// // // // // }) => {
// // // // //   const {
// // // // //     attributes,
// // // // //     listeners,
// // // // //     setNodeRef,
// // // // //     transform,
// // // // //     transition,
// // // // //     isDragging,
// // // // //   } = useSortable({ id: task.id });

// // // // //   const style = {
// // // // //     transform: CSS.Transform.toString(transform),
// // // // //     transition,
// // // // //     opacity: isDragging ? 0.5 : 1,
// // // // //   };

// // // // //   const getPriorityColor = (priority: string) => {
// // // // //     switch (priority) {
// // // // //       case 'alta': return '#f44336';
// // // // //       case 'media': return '#ff9800';
// // // // //       case 'baja': return '#4caf50';
// // // // //       default: return '#9e9e9e';
// // // // //     }
// // // // //   };

// // // // //   const getPriorityText = (priority: string) => {
// // // // //     switch (priority) {
// // // // //       case 'alta': return 'Alta';
// // // // //       case 'media': return 'Media';
// // // // //       case 'baja': return 'Baja';
// // // // //       default: return 'Sin prioridad';
// // // // //     }
// // // // //   };

// // // // //   // Función para obtener información de los tags
// // // // //   const getTagInfo = (tagId: string) => {
// // // // //     return allTags.find(tag => tag.id === tagId) || { name: 'Unknown', color: '#ccc' };
// // // // //   };

// // // // //   const handleEdit = (e: React.MouseEvent) => {
// // // // //     e.stopPropagation();
// // // // //     onEdit(task);
// // // // //   };

// // // // //   const handleDelete = (e: React.MouseEvent) => {
// // // // //     e.stopPropagation();
// // // // //     onDelete(task.id);
// // // // //   };

// // // // //   return (
// // // // //     <Card
// // // // //       ref={setNodeRef}
// // // // //       style={style}
// // // // //       {...attributes}
// // // // //       {...listeners}
// // // // //       sx={{
// // // // //         mb: 1,
// // // // //         cursor: 'grab',
// // // // //         '&:hover': {
// // // // //           boxShadow: 3,
// // // // //         },
// // // // //         position: 'relative',
// // // // //         borderLeft: task.completed ? '4px solid #4caf50' : `4px solid ${getPriorityColor(task.priority)}`,
// // // // //       }}
// // // // //       onClick={() => onClick(task)}
// // // // //     >
// // // // //       <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
// // // // //         <DragIndicatorIcon fontSize="small" />
// // // // //       </Box>
// // // // //       <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
// // // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // // // //           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2, textDecoration: task.completed ? 'line-through' : 'none' }}>
// // // // //             {task.title}
// // // // //           </Typography>
// // // // //           <Tooltip title={getPriorityText(task.priority)}>
// // // // //             <Box
// // // // //               sx={{
// // // // //                 width: 12,
// // // // //                 height: 12,
// // // // //                 borderRadius: '50%',
// // // // //                 backgroundColor: getPriorityColor(task.priority),
// // // // //                 flexShrink: 0,
// // // // //               }}
// // // // //             />
// // // // //           </Tooltip>
// // // // //         </Box>
// // // // //         <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1, fontSize: '0.8rem' }}>
// // // // //           {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
// // // // //         </Typography>
// // // // //         <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
// // // // //           {task.tags.map((tagId, index) => {
// // // // //             const tag = getTagInfo(tagId);
// // // // //             return (
// // // // //               <Chip
// // // // //                 key={index}
// // // // //                 label={tag.name}
// // // // //                 size="small"
// // // // //                 sx={{ 
// // // // //                   mr: 0.5, 
// // // // //                   mb: 0.5, 
// // // // //                   fontSize: '0.7rem',
// // // // //                   backgroundColor: tag.color,
// // // // //                   color: 'white',
// // // // //                 }}
// // // // //               />
// // // // //             );
// // // // //           })}
// // // // //         </Box>
// // // // //       </CardContent>
// // // // //       <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
// // // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // //           <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
// // // // //           <Typography variant="caption" color="text.secondary">
// // // // //             {new Date(task.dueDate).toLocaleDateString()}
// // // // //           </Typography>
// // // // //         </Box>
// // // // //         <Box>
// // // // //           <Tooltip title="Editar">
// // // // //             <IconButton size="small" onClick={handleEdit}>
// // // // //               <EditIcon fontSize="small" />
// // // // //             </IconButton>
// // // // //           </Tooltip>
// // // // //           <Tooltip title="Eliminar">
// // // // //             <IconButton size="small" onClick={handleDelete}>
// // // // //               <DeleteIcon fontSize="small" />
// // // // //             </IconButton>
// // // // //           </Tooltip>
// // // // //         </Box>
// // // // //       </CardActions>
// // // // //     </Card>
// // // // //   );
// // // // // };

// // // // // // Componente para columnas sortable
// // // // // const SortableColumn = ({ 
// // // // //   column, 
// // // // //   onTaskClick,
// // // // //   onAddTask,
// // // // //   onEditColumn,
// // // // //   onDeleteColumn,
// // // // //   onEditTask,
// // // // //   onDeleteTask,
// // // // //   allTags
// // // // // }: { 
// // // // //   column: Column; 
// // // // //   onTaskClick: (task: Task) => void;
// // // // //   onAddTask: (columnId: string) => void;
// // // // //   onEditColumn: (columnId: string) => void;
// // // // //   onDeleteColumn: (columnId: string) => void;
// // // // //   onEditTask: (task: Task) => void;
// // // // //   onDeleteTask: (taskId: string) => void;
// // // // //   allTags: Tag[];
// // // // // }) => {
// // // // //   const {
// // // // //     attributes,
// // // // //     listeners,
// // // // //     setNodeRef,
// // // // //     transform,
// // // // //     transition,
// // // // //     isDragging,
// // // // //   } = useSortable({ id: column.id });

// // // // //   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

// // // // //   const style = {
// // // // //     transform: CSS.Transform.toString(transform),
// // // // //     transition,
// // // // //     opacity: isDragging ? 0.5 : 1,
// // // // //   };

// // // // //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // // // //     event.stopPropagation();
// // // // //     setMenuAnchor(event.currentTarget);
// // // // //   };

// // // // //   const handleMenuClose = () => {
// // // // //     setMenuAnchor(null);
// // // // //   };

// // // // //   const handleEdit = () => {
// // // // //     onEditColumn(column.id);
// // // // //     handleMenuClose();
// // // // //   };

// // // // //   const handleDelete = () => {
// // // // //     onDeleteColumn(column.id);
// // // // //     handleMenuClose();
// // // // //   };

// // // // //   return (
// // // // //     <Paper
// // // // //       ref={setNodeRef}
// // // // //       style={style}
// // // // //       {...attributes}
// // // // //       {...listeners}
// // // // //       sx={{
// // // // //         width: 300,
// // // // //         minHeight: 500,
// // // // //         display: 'flex',
// // // // //         flexDirection: 'column',
// // // // //         bgcolor: isDragging ? 'action.hover' : 'grey.100',
// // // // //       }}
// // // // //     >
// // // // //       <Box sx={{ 
// // // // //         p: 2, 
// // // // //         display: 'flex', 
// // // // //         justifyContent: 'space-between', 
// // // // //         alignItems: 'center',
// // // // //         bgcolor: 'primary.main',
// // // // //         color: 'primary.contrastText'
// // // // //       }}>
// // // // //         <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
// // // // //           {column.name}
// // // // //         </Typography>
// // // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // //           <Chip 
// // // // //             label={column.tasks.length} 
// // // // //             size="small" 
// // // // //             sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)', mr: 1 }} 
// // // // //           />
// // // // //           <IconButton 
// // // // //             size="small" 
// // // // //             sx={{ color: 'primary.contrastText' }}
// // // // //             onClick={handleMenuOpen}
// // // // //           >
// // // // //             <MoreVertIcon />
// // // // //           </IconButton>
// // // // //           <Menu
// // // // //             anchorEl={menuAnchor}
// // // // //             open={Boolean(menuAnchor)}
// // // // //             onClose={handleMenuClose}
// // // // //           >
// // // // //             <MenuItem onClick={handleEdit}>Editar columna</MenuItem>
// // // // //             <MenuItem onClick={handleDelete}>Eliminar columna</MenuItem>
// // // // //           </Menu>
// // // // //         </Box>
// // // // //       </Box>

// // // // //       <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
// // // // //         <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
// // // // //           {column.tasks.map((task) => (
// // // // //             <SortableTask 
// // // // //               key={task.id} 
// // // // //               task={task} 
// // // // //               onClick={onTaskClick}
// // // // //               onEdit={onEditTask}
// // // // //               onDelete={onDeleteTask}
// // // // //               allTags={allTags}
// // // // //             />
// // // // //           ))}
// // // // //         </SortableContext>
// // // // //         {column.tasks.length === 0 && (
// // // // //           <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
// // // // //             <ViewColumnIcon sx={{ fontSize: 40, opacity: 0.5 }} />
// // // // //             <Typography variant="body2" sx={{ mt: 1 }}>
// // // // //               No hay tareas en esta columna
// // // // //             </Typography>
// // // // //           </Box>
// // // // //         )}
// // // // //       </Box>

// // // // //       <Button 
// // // // //         startIcon={<AddIcon />} 
// // // // //         sx={{ m: 1, justifyContent: 'flex-start' }}
// // // // //         onClick={() => onAddTask(column.id)}
// // // // //       >
// // // // //         Añadir tarea
// // // // //       </Button>
// // // // //     </Paper>
// // // // //   );
// // // // // };

// // // // // // Componente principal del tablero
// // // // // const TrelloBoard = () => {
// // // // //   const [projectData, setProjectData] = useState<ProjectData>(initialData.data);
// // // // //   const [activeId, setActiveId] = useState<string | null>(null);
// // // // //   const [activeTask, setActiveTask] = useState<Task | null>(null);
// // // // //   const [newColumnDialog, setNewColumnDialog] = useState(false);
// // // // //   const [editColumnDialog, setEditColumnDialog] = useState(false);
// // // // //   const [newTaskDialog, setNewTaskDialog] = useState(false);
// // // // //   const [editTaskDialog, setEditTaskDialog] = useState(false);
// // // // //   const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
// // // // //   const [newColumnName, setNewColumnName] = useState('');
// // // // //   const [editColumnName, setEditColumnName] = useState('');
// // // // //   const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
// // // // //     title: '',
// // // // //     description: '',
// // // // //     priority: 'media',
// // // // //     dueDate: new Date().toISOString().split('T')[0],
// // // // //     tags: [],
// // // // //     completed: false,
// // // // //   });
// // // // //   const [editTaskData, setEditTaskData] = useState<Task | null>(null);
// // // // //   const [selectedColumnId, setSelectedColumnId] = useState<string>('');
// // // // //   const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
// // // // //   const [itemToDelete, setItemToDelete] = useState<{type: string, id: string} | null>(null);
// // // // //   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

// // // // //   const theme = useTheme();
// // // // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// // // // //   const sensors = useSensors(
// // // // //     useSensor(PointerSensor),
// // // // //     useSensor(KeyboardSensor, {
// // // // //       coordinateGetter: sortableKeyboardCoordinates,
// // // // //     })
// // // // //   );

// // // // //   // Solución para el error de getRangeAt
// // // // //   useEffect(() => {
// // // // //     const originalGetRangeAt = Selection.prototype.getRangeAt;

// // // // //     Selection.prototype.getRangeAt = function(index) {
// // // // //       if (index >= this.rangeCount || index < 0) {
// // // // //         return document.createRange();
// // // // //       }
// // // // //       return originalGetRangeAt.call(this, index);
// // // // //     };

// // // // //     return () => {
// // // // //       Selection.prototype.getRangeAt = originalGetRangeAt;
// // // // //     };
// // // // //   }, []);

// // // // //   const handleDragStart = (event: DragStartEvent) => {
// // // // //     setActiveId(event.active.id as string);

// // // // //     // Encontrar la tarea activa para el overlay
// // // // //     for (const column of projectData.columns) {
// // // // //       const task = column.tasks.find(t => t.id === event.active.id);
// // // // //       if (task) {
// // // // //         setActiveTask(task);
// // // // //         break;
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleDragEnd = (event: DragEndEvent) => {
// // // // //     const { active, over } = event;
// // // // //     setActiveId(null);
// // // // //     setActiveTask(null);

// // // // //     if (!over) return;

// // // // //     if (active.id !== over.id) {
// // // // //       // Encontrar las columnas de origen y destino
// // // // //       let sourceColumn: Column | undefined, destColumn: Column | undefined;
// // // // //       let sourceIndex: number = -1, destIndex: number = -1;

// // // // //       // Buscar en qué columna está la tarea activa y la de destino
// // // // //       for (const column of projectData.columns) {
// // // // //         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
// // // // //         if (taskIndex !== -1) {
// // // // //           sourceColumn = column;
// // // // //           sourceIndex = taskIndex;
// // // // //         }

// // // // //         const overIndex = column.tasks.findIndex(task => task.id === over.id);
// // // // //         if (overIndex !== -1) {
// // // // //           destColumn = column;
// // // // //           destIndex = overIndex;
// // // // //         }

// // // // //         // Si no encontramos la tarea de destino, puede que estemos sobre una columna
// // // // //         if (!destColumn && column.id === over.id) {
// // // // //           destColumn = column;
// // // // //           destIndex = column.tasks.length; // Añadir al final
// // // // //         }
// // // // //       }

// // // // //       // Si se encontraron ambas columnas
// // // // //       if (sourceColumn && destColumn && sourceIndex !== -1) {
// // // // //         // Crear una copia profunda de las columnas para evitar mutaciones
// // // // //         const newColumns = projectData.columns.map(column => ({
// // // // //           ...column,
// // // // //           tasks: [...column.tasks]
// // // // //         }));

// // // // //         // Encontrar índices de las columnas en el array
// // // // //         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
// // // // //         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

// // // // //         // Si es la misma columna, reordenar
// // // // //         if (sourceColumn.id === destColumn.id) {
// // // // //           newColumns[sourceColIndex].tasks = arrayMove(
// // // // //             newColumns[sourceColIndex].tasks,
// // // // //             sourceIndex,
// // // // //             destIndex
// // // // //           );
// // // // //         } else {
// // // // //           // Si son columnas diferentes, mover la tarea
// // // // //           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
// // // // //           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
// // // // //         }

// // // // //         setProjectData({
// // // // //           ...projectData,
// // // // //           columns: newColumns
// // // // //         });

// // // // //         setNotification({
// // // // //           open: true,
// // // // //           message: 'Tarea movida correctamente',
// // // // //           severity: 'success'
// // // // //         });
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleTaskClick = (task: Task) => {
// // // // //     setEditTaskData(task);
// // // // //     setEditTaskDialog(true);
// // // // //   };

// // // // //   const handleAddColumn = () => {
// // // // //     if (newColumnName.trim()) {
// // // // //       const newColumn: Column = {
// // // // //         id: `col-${Date.now()}`,
// // // // //         name: newColumnName,
// // // // //         tasks: []
// // // // //       };

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: [...projectData.columns, newColumn]
// // // // //       });

// // // // //       setNewColumnName('');
// // // // //       setNewColumnDialog(false);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Columna añadida correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleEditColumn = () => {
// // // // //     if (editColumnName.trim() && selectedColumn) {
// // // // //       const newColumns = projectData.columns.map(column => {
// // // // //         if (column.id === selectedColumn.id) {
// // // // //           return {
// // // // //             ...column,
// // // // //             name: editColumnName
// // // // //           };
// // // // //         }
// // // // //         return column;
// // // // //       });

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: newColumns
// // // // //       });

// // // // //       setEditColumnDialog(false);
// // // // //       setSelectedColumn(null);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Columna actualizada correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteColumn = (columnId: string) => {
// // // // //     const newColumns = projectData.columns.filter(column => column.id !== columnId);

// // // // //     setProjectData({
// // // // //       ...projectData,
// // // // //       columns: newColumns
// // // // //     });

// // // // //     setDeleteConfirmDialog(false);
// // // // //     setItemToDelete(null);

// // // // //     setNotification({
// // // // //       open: true,
// // // // //       message: 'Columna eliminada correctamente',
// // // // //       severity: 'success'
// // // // //     });
// // // // //   };

// // // // //   const handleAddTask = (columnId: string) => {
// // // // //     setSelectedColumnId(columnId);
// // // // //     setNewTaskData({
// // // // //       title: '',
// // // // //       description: '',
// // // // //       priority: 'media',
// // // // //       dueDate: new Date().toISOString().split('T')[0],
// // // // //       tags: [],
// // // // //       completed: false,
// // // // //     });
// // // // //     setNewTaskDialog(true);
// // // // //   };

// // // // //   const handleSaveTask = () => {
// // // // //     if (newTaskData.title?.trim()) {
// // // // //       const newTask: Task = {
// // // // //         id: `task-${Date.now()}`,
// // // // //         title: newTaskData.title || '',
// // // // //         description: newTaskData.description || '',
// // // // //         priority: newTaskData.priority || 'media',
// // // // //         dueDate: newTaskData.dueDate || new Date().toISOString(),
// // // // //         tags: newTaskData.tags || [],
// // // // //         completed: newTaskData.completed || false,
// // // // //       };

// // // // //       const newColumns = projectData.columns.map(column => {
// // // // //         if (column.id === selectedColumnId) {
// // // // //           return {
// // // // //             ...column,
// // // // //             tasks: [...column.tasks, newTask]
// // // // //           };
// // // // //         }
// // // // //         return column;
// // // // //       });

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: newColumns
// // // // //       });

// // // // //       setNewTaskDialog(false);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Tarea añadida correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleSaveEditTask = () => {
// // // // //     if (editTaskData && editTaskData.title.trim()) {
// // // // //       const newColumns = projectData.columns.map(column => ({
// // // // //         ...column,
// // // // //         tasks: column.tasks.map(task => 
// // // // //           task.id === editTaskData.id ? editTaskData : task
// // // // //         )
// // // // //       }));

// // // // //       setProjectData({
// // // // //         ...projectData,
// // // // //         columns: newColumns
// // // // //       });

// // // // //       setEditTaskDialog(false);
// // // // //       setEditTaskData(null);

// // // // //       setNotification({
// // // // //         open: true,
// // // // //         message: 'Tarea actualizada correctamente',
// // // // //         severity: 'success'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteTask = (taskId: string) => {
// // // // //     const newColumns = projectData.columns.map(column => ({
// // // // //       ...column,
// // // // //       tasks: column.tasks.filter(task => task.id !== taskId)
// // // // //     }));

// // // // //     setProjectData({
// // // // //       ...projectData,
// // // // //       columns: newColumns
// // // // //     });

// // // // //     setNotification({
// // // // //       open: true,
// // // // //       message: 'Tarea eliminada correctamente',
// // // // //       severity: 'success'
// // // // //     });
// // // // //   };

// // // // //   const handleOpenEditColumn = (columnId: string) => {
// // // // //     const column = projectData.columns.find(col => col.id === columnId);
// // // // //     if (column) {
// // // // //       setSelectedColumn(column);
// // // // //       setEditColumnName(column.name);
// // // // //       setEditColumnDialog(true);
// // // // //     }
// // // // //   };

// // // // //   const handleOpenEditTask = (task: Task) => {
// // // // //     setEditTaskData(task);
// // // // //     setEditTaskDialog(true);
// // // // //   };

// // // // //   const handleOpenDeleteConfirm = (type: string, id: string) => {
// // // // //     setItemToDelete({ type, id });
// // // // //     setDeleteConfirmDialog(true);
// // // // //   };

// // // // //   const handleConfirmDelete = () => {
// // // // //     if (itemToDelete) {
// // // // //       if (itemToDelete.type === 'column') {
// // // // //         handleDeleteColumn(itemToDelete.id);
// // // // //       } else if (itemToDelete.type === 'task') {
// // // // //         handleDeleteTask(itemToDelete.id);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleTagChange = (event: any) => {
// // // // //     const value = event.target.value;
// // // // //     setNewTaskData({
// // // // //       ...newTaskData,
// // // // //       tags: typeof value === 'string' ? value.split(',') : value,
// // // // //     });
// // // // //   };

// // // // //   const handleEditTagChange = (event: any) => {
// // // // //     const value = event.target.value;
// // // // //     if (editTaskData) {
// // // // //       setEditTaskData({
// // // // //         ...editTaskData,
// // // // //         tags: typeof value === 'string' ? value.split(',') : value,
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   // Calcular estadísticas actualizadas
// // // // //   const calculateStats = useCallback(() => {
// // // // //     let totalTasks = 0;
// // // // //     let completedTasks = 0;
// // // // //     let inProgressTasks = 0;

// // // // //     projectData.columns.forEach(column => {
// // // // //       totalTasks += column.tasks.length;
// // // // //       column.tasks.forEach(task => {
// // // // //         if (task.completed) completedTasks++;
// // // // //         if (!task.completed && column.name !== 'Por Hacer' && column.name !== 'Terminado') inProgressTasks++;
// // // // //       });
// // // // //     });

// // // // //     const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

// // // // //     return {
// // // // //       totalTasks,
// // // // //       completedTasks,
// // // // //       inProgressTasks,
// // // // //       overdueTasks: 0, // Podrías implementar lógica para calcular tareas vencidas
// // // // //       completionPercentage
// // // // //     };
// // // // //   }, [projectData.columns]);

// // // // //   // Actualizar estadísticas cuando cambien las columnas
// // // // //   useEffect(() => {
// // // // //     const newStats = calculateStats();
// // // // //     setProjectData(prev => ({
// // // // //       ...prev,
// // // // //       stats: newStats
// // // // //     }));
// // // // //   }, [projectData.columns, calculateStats]);

// // // // //   return (
// // // // //     <Box sx={{ flexGrow: 1, bgcolor: 'grey.200', minHeight: '100vh' }}>
// // // // //       <AppBar position="static" elevation={0}>
// // // // //         <Toolbar>
// // // // //           <DashboardIcon sx={{ mr: 2 }} />
// // // // //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// // // // //             {projectData.project.name}
// // // // //           </Typography>
// // // // //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
// // // // //             <IconButton color="inherit">
// // // // //               <SearchIcon />
// // // // //             </IconButton>
// // // // //             <IconButton color="inherit">
// // // // //               <NotificationsIcon />
// // // // //             </IconButton>
// // // // //             <IconButton color="inherit">
// // // // //               <AccountCircleIcon />
// // // // //             </IconButton>
// // // // //           </Box>
// // // // //         </Toolbar>
// // // // //       </AppBar>

// // // // //       <Box sx={{ p: 2 }}>
// // // // //         <Paper sx={{ p: 3, mb: 2 }}>
// // // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// // // // //             <Box sx={{ flex: 1, minWidth: 300 }}>
// // // // //               <Typography variant="h4" gutterBottom>
// // // // //                 {projectData.project.name}
// // // // //               </Typography>
// // // // //               <Typography variant="body1" color="text.secondary" paragraph>
// // // // //                 {projectData.project.description}
// // // // //               </Typography>

// // // // //               <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
// // // // //                 <Typography variant="body2">
// // // // //                   Progreso del proyecto:
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2" fontWeight="bold">
// // // // //                   {projectData.project.progress}%
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //               <LinearProgress 
// // // // //                 variant="determinate" 
// // // // //                 value={projectData.project.progress} 
// // // // //                 sx={{ height: 8, borderRadius: 4, mb: 2 }}
// // // // //               />

// // // // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                 <Typography variant="body2">
// // // // //                   {new Date(projectData.project.startDate).toLocaleDateString()} - {new Date(projectData.project.deadline).toLocaleDateString()}
// // // // //                 </Typography>
// // // // //               </Box>
// // // // //             </Box>

// // // // //             <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// // // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // // //                 <Typography variant="h5" fontWeight="bold">
// // // // //                   {projectData.stats.completedTasks}/{projectData.stats.totalTasks}
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">Completadas</Typography>
// // // // //               </Box>

// // // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // // //                 <Typography variant="h5" fontWeight="bold">
// // // // //                   {projectData.stats.completionPercentage}%
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">Progreso</Typography>
// // // // //               </Box>

// // // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // // //                 <Typography variant="h5" fontWeight="bold">
// // // // //                   {projectData.stats.inProgressTasks}
// // // // //                 </Typography>
// // // // //                 <Typography variant="body2">En progreso</Typography>
// // // // //               </Box>
// // // // //             </Box>
// // // // //           </Box>
// // // // //         </Paper>

// // // // //         <Box sx={{ overflowX: 'auto', pb: 2 }}>
// // // // //           <DndContext
// // // // //             sensors={sensors}
// // // // //             collisionDetection={closestCenter}
// // // // //             onDragStart={handleDragStart}
// // // // //             onDragEnd={handleDragEnd}
// // // // //           >
// // // // //             <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'min-content' }}>
// // // // //               <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
// // // // //                 {projectData.columns.map((column) => (
// // // // //                   <SortableColumn 
// // // // //                     key={column.id} 
// // // // //                     column={column} 
// // // // //                     onTaskClick={handleTaskClick}
// // // // //                     onAddTask={handleAddTask}
// // // // //                     onEditColumn={handleOpenEditColumn}
// // // // //                     onDeleteColumn={(id) => handleOpenDeleteConfirm('column', id)}
// // // // //                     onEditTask={handleOpenEditTask}
// // // // //                     onDeleteTask={(id) => handleOpenDeleteConfirm('task', id)}
// // // // //                     allTags={projectData.tags}
// // // // //                   />
// // // // //                 ))}
// // // // //               </SortableContext>

// // // // //               <Paper 
// // // // //                 sx={{ 
// // // // //                   width: 300, 
// // // // //                   minHeight: 200, 
// // // // //                   display: 'flex', 
// // // // //                   alignItems: 'center', 
// // // // //                   justifyContent: 'center',
// // // // //                   bgcolor: 'grey.100',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //                 onClick={() => setNewColumnDialog(true)}
// // // // //               >
// // // // //                 <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
// // // // //                   Añadir otra columna
// // // // //                 </Button>
// // // // //               </Paper>
// // // // //             </Box>

// // // // //             <DragOverlay>
// // // // //               {activeTask ? (
// // // // //                 <Card sx={{ width: 280, opacity: 0.8, boxShadow: 3 }}>
// // // // //                   <CardContent>
// // // // //                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
// // // // //                       {activeTask.title}
// // // // //                     </Typography>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               ) : null}
// // // // //             </DragOverlay>
// // // // //           </DndContext>
// // // // //         </Box>

// // // // //         <Fab
// // // // //           color="primary"
// // // // //           aria-label="add"
// // // // //           sx={{ position: 'fixed', bottom: 16, right: 16 }}
// // // // //           onClick={() => setNewColumnDialog(true)}
// // // // //         >
// // // // //           <AddIcon />
// // // // //         </Fab>
// // // // //       </Box>

// // // // //       {/* Diálogo para nueva columna */}
// // // // //       <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
// // // // //         <DialogTitle>Añadir nueva columna</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             autoFocus
// // // // //             margin="dense"
// // // // //             label="Nombre de la columna"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             value={newColumnName}
// // // // //             onChange={(e) => setNewColumnName(e.target.value)}
// // // // //             onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
// // // // //           />
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setNewColumnDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleAddColumn} variant="contained">Añadir</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       {/* Diálogo para editar columna */}
// // // // //       <Dialog open={editColumnDialog} onClose={() => setEditColumnDialog(false)}>
// // // // //         <DialogTitle>Editar columna</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             autoFocus
// // // // //             margin="dense"
// // // // //             label="Nombre de la columna"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             value={editColumnName}
// // // // //             onChange={(e) => setEditColumnName(e.target.value)}
// // // // //             onKeyPress={(e) => e.key === 'Enter' && handleEditColumn()}
// // // // //           />
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setEditColumnDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleEditColumn} variant="contained">Guardar</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       {/* Diálogo para nueva tarea */}
// // // // //       <Dialog open={newTaskDialog} onClose={() => setNewTaskDialog(false)} maxWidth="sm" fullWidth>
// // // // //         <DialogTitle>Añadir nueva tarea</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             autoFocus
// // // // //             margin="dense"
// // // // //             label="Título de la tarea"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             value={newTaskData.title}
// // // // //             onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
// // // // //             sx={{ mb: 2 }}
// // // // //           />
// // // // //           <TextField
// // // // //             margin="dense"
// // // // //             label="Descripción"
// // // // //             fullWidth
// // // // //             variant="outlined"
// // // // //             multiline
// // // // //             rows={3}
// // // // //             value={newTaskData.description}
// // // // //             onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
// // // // //             sx={{ mb: 2 }}
// // // // //           />
// // // // //           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // // // //             <TextField
// // // // //               label="Prioridad"
// // // // //               select
// // // // //               fullWidth
// // // // //               SelectProps={{ native: true }}
// // // // //               value={newTaskData.priority}
// // // // //               onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
// // // // //             >
// // // // //               <option value="alta">Alta</option>
// // // // //               <option value="media">Media</option>
// // // // //               <option value="baja">Baja</option>
// // // // //             </TextField>
// // // // //             <TextField
// // // // //               label="Fecha de vencimiento"
// // // // //               type="date"
// // // // //               fullWidth
// // // // //               value={newTaskData.dueDate}
// // // // //               onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
// // // // //               InputLabelProps={{
// // // // //                 shrink: true,
// // // // //               }}
// // // // //             />
// // // // //           </Box>
// // // // //           <FormControl fullWidth sx={{ mb: 2 }}>
// // // // //             <InputLabel>Etiquetas</InputLabel>
// // // // //             <Select
// // // // //               multiple
// // // // //               value={newTaskData.tags}
// // // // //               onChange={handleTagChange}
// // // // //               input={<OutlinedInput label="Etiquetas" />}
// // // // //               renderValue={(selected) => (
// // // // //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // // // //                   {selected.map((value) => {
// // // // //                     const tag = projectData.tags.find(t => t.id === value);
// // // // //                     return (
// // // // //                       <Chip 
// // // // //                         key={value} 
// // // // //                         label={tag?.name || value} 
// // // // //                         size="small"
// // // // //                         sx={{ backgroundColor: tag?.color, color: 'white' }}
// // // // //                       />
// // // // //                     );
// // // // //                   })}
// // // // //                 </Box>
// // // // //               )}
// // // // //             >
// // // // //               {projectData.tags.map((tag) => (
// // // // //                 <MenuItem key={tag.id} value={tag.id}>
// // // // //                   <Checkbox checked={newTaskData.tags?.indexOf(tag.id) > -1} />
// // // // //                   <ListItemText primary={tag.name} />
// // // // //                   <Box sx={{ width: 16, height: 16, backgroundColor: tag.color, borderRadius: '50%', ml: 1 }} />
// // // // //                 </MenuItem>
// // // // //               ))}
// // // // //             </Select>
// // // // //           </FormControl>
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setNewTaskDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleSaveTask} variant="contained">Añadir tarea</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       {/* Diálogo para editar tarea */}
// // // // //       <Dialog open={editTaskDialog} onClose={() => setEditTaskDialog(false)} maxWidth="sm" fullWidth>
// // // // //         <DialogTitle>Editar tarea</DialogTitle>
// // // // //         <DialogContent>
// // // // //           {editTaskData && (
// // // // //             <>
// // // // //               <TextField
// // // // //                 autoFocus
// // // // //                 margin="dense"
// // // // //                 label="Título de la tarea"
// // // // //                 fullWidth
// // // // //                 variant="outlined"
// // // // //                 value={editTaskData.title}
// // // // //                 onChange={(e) => setEditTaskData({...editTaskData, title: e.target.value})}
// // // // //                 sx={{ mb: 2 }}
// // // // //               />
// // // // //               <TextField
// // // // //                 margin="dense"
// // // // //                 label="Descripción"
// // // // //                 fullWidth
// // // // //                 variant="outlined"
// // // // //                 multiline
// // // // //                 rows={3}
// // // // //                 value={editTaskData.description}
// // // // //                 onChange={(e) => setEditTaskData({...editTaskData, description: e.target.value})}
// // // // //                 sx={{ mb: 2 }}
// // // // //               />
// // // // //               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // // // //                 <TextField
// // // // //                   label="Prioridad"
// // // // //                   select
// // // // //                   fullWidth
// // // // //                   SelectProps={{ native: true }}
// // // // //                   value={editTaskData.priority}
// // // // //                   onChange={(e) => setEditTaskData({...editTaskData, priority: e.target.value})}
// // // // //                 >
// // // // //                   <option value="alta">Alta</option>
// // // // //                   <option value="media">Media</option>
// // // // //                   <option value="baja">Baja</option>
// // // // //                 </TextField>
// // // // //                 <TextField
// // // // //                   label="Fecha de vencimiento"
// // // // //                   type="date"
// // // // //                   fullWidth
// // // // //                   value={editTaskData.dueDate.split('T')[0]}
// // // // //                   onChange={(e) => setEditTaskData({...editTaskData, dueDate: e.target.value})}
// // // // //                   InputLabelProps={{
// // // // //                     shrink: true,
// // // // //                   }}
// // // // //                 />
// // // // //               </Box>
// // // // //               <FormControl fullWidth sx={{ mb: 2 }}>
// // // // //                 <InputLabel>Etiquetas</InputLabel>
// // // // //                 <Select
// // // // //                   multiple
// // // // //                   value={editTaskData.tags}
// // // // //                   onChange={handleEditTagChange}
// // // // //                   input={<OutlinedInput label="Etiquetas" />}
// // // // //                   renderValue={(selected) => (
// // // // //                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // // // //                       {selected.map((value) => {
// // // // //                         const tag = projectData.tags.find(t => t.id === value);
// // // // //                         return (
// // // // //                           <Chip 
// // // // //                             key={value} 
// // // // //                             label={tag?.name || value} 
// // // // //                             size="small"
// // // // //                             sx={{ backgroundColor: tag?.color, color: 'white' }}
// // // // //                           />
// // // // //                         );
// // // // //                       })}
// // // // //                     </Box>
// // // // //                   )}
// // // // //                 >
// // // // //                   {projectData.tags.map((tag) => (
// // // // //                     <MenuItem key={tag.id} value={tag.id}>
// // // // //                       <Checkbox checked={editTaskData.tags.indexOf(tag.id) > -1} />
// // // // //                       <ListItemText primary={tag.name} />
// // // // //                       <Box sx={{ width: 16, height: 16, backgroundColor: tag.color, borderRadius: '50%', ml: 1 }} />
// // // // //                     </MenuItem>
// // // // //                   ))}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //               <FormGroup>
// // // // //                 <FormControlLabel 
// // // // //                   control={
// // // // //                     <Switch 
// // // // //                       checked={editTaskData.completed} 
// // // // //                       onChange={(e) => setEditTaskData({...editTaskData, completed: e.target.checked})} 
// // // // //                     />
// // // // //                   } 
// // // // //                   label="Tarea completada" 
// // // // //                 />
// // // // //               </FormGroup>
// // // // //             </>
// // // // //           )}
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setEditTaskDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleSaveEditTask} variant="contained">Guardar cambios</Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       {/* Diálogo de confirmación para eliminar */}
// // // // //       <Dialog open={deleteConfirmDialog} onClose={() => setDeleteConfirmDialog(false)}>
// // // // //         <DialogTitle>Confirmar eliminación</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <Typography>
// // // // //             ¿Estás seguro de que quieres eliminar este {itemToDelete?.type === 'column' ? 'columna' : 'tarea'}? 
// // // // //             Esta acción no se puede deshacer.
// // // // //           </Typography>
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setDeleteConfirmDialog(false)}>Cancelar</Button>
// // // // //           <Button onClick={handleConfirmDelete} variant="contained" color="error">
// // // // //             Eliminar
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>

// // // // //       <Snackbar
// // // // //         open={notification.open}
// // // // //         autoHideDuration={3000}
// // // // //         onClose={() => setNotification({...notification, open: false})}
// // // // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // // // //       >
// // // // //         <Alert 
// // // // //           onClose={() => setNotification({...notification, open: false})} 
// // // // //           severity={notification.severity as any} 
// // // // //           sx={{ width: '100%' }}
// // // // //         >
// // // // //           {notification.message}
// // // // //         </Alert>
// // // // //       </Snackbar>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default TrelloBoard;


// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import {
// // // //   DndContext,
// // // //   closestCenter,
// // // //   KeyboardSensor,
// // // //   PointerSensor,
// // // //   useSensor,
// // // //   useSensors,
// // // //   DragEndEvent,
// // // //   DragStartEvent,
// // // //   DragOverlay,
// // // // } from '@dnd-kit/core';
// // // // import {
// // // //   arrayMove,
// // // //   SortableContext,
// // // //   sortableKeyboardCoordinates,
// // // //   verticalListSortingStrategy,
// // // //   useSortable,
// // // // } from '@dnd-kit/sortable';
// // // // import { CSS } from '@dnd-kit/utilities';
// // // // import {
// // // //   Paper,
// // // //   Typography,
// // // //   Box,
// // // //   Button,
// // // //   IconButton,
// // // //   TextField,
// // // //   Dialog,
// // // //   DialogActions,
// // // //   DialogContent,
// // // //   DialogTitle,
// // // //   Chip,
// // // //   Card,
// // // //   CardContent,
// // // //   CardActions,
// // // //   useTheme,
// // // //   useMediaQuery,
// // // //   AppBar,
// // // //   Toolbar,
// // // //   LinearProgress,
// // // //   Menu,
// // // //   MenuItem,
// // // //   Fab,
// // // //   Snackbar,
// // // //   Alert,
// // // //   Tooltip,
// // // //   Divider,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   Select,
// // // //   OutlinedInput,
// // // //   ListItemText,
// // // //   Checkbox,
// // // //   FormGroup,
// // // //   FormControlLabel,
// // // //   Switch,
// // // // } from '@mui/material';
// // // // import {
// // // //   Add as AddIcon,
// // // //   MoreVert as MoreVertIcon,
// // // //   Edit as EditIcon,
// // // //   Delete as DeleteIcon,
// // // //   DragIndicator as DragIndicatorIcon,
// // // //   ViewColumn as ViewColumnIcon,
// // // //   Dashboard as DashboardIcon,
// // // //   Notifications as NotificationsIcon,
// // // //   AccountCircle as AccountCircleIcon,
// // // //   Search as SearchIcon,
// // // //   Label as LabelIcon,
// // // //   Schedule as ScheduleIcon,
// // // // } from '@mui/icons-material';

// // // // // Interfaz para los tipos de datos
// // // // interface Tag {
// // // //   id: string;
// // // //   name: string;
// // // //   color: string;
// // // // }

// // // // interface Task {
// // // //   id: string;
// // // //   title: string;
// // // //   description: string;
// // // //   priority: string;
// // // //   dueDate: string;
// // // //   tags: string[];
// // // //   completed: boolean;
// // // // }

// // // // interface Column {
// // // //   id: string;
// // // //   name: string;
// // // //   tasks: Task[];
// // // // }

// // // // interface ProjectData {
// // // //   project: {
// // // //     id: string;
// // // //     name: string;
// // // //     description: string;
// // // //     startDate: string;
// // // //     deadline: string;
// // // //     progress: number;
// // // //   };
// // // //   columns: Column[];
// // // //   tags: Tag[];
// // // //   stats: {
// // // //     totalTasks: number;
// // // //     completedTasks: number;
// // // //     inProgressTasks: number;
// // // //     overdueTasks: number;
// // // //     completionPercentage: number;
// // // //   };
// // // // }

// // // // // Datos iniciales de ejemplo
// // // // const initialData: { data: ProjectData } = {
// // // //   data: {
// // // //     project: {
// // // //       id: "proyecto-app-002",
// // // //       name: "Desarrollo Web",
// // // //       description: "Aplicación móvil para gestión de tareas personales",
// // // //       startDate: "2024-01-10",
// // // //       deadline: "2024-06-15",
// // // //       progress: 35
// // // //     },
// // // //     tags: [
// // // //       { id: 'tag-1', name: 'diseño', color: '#ff5252' },
// // // //       { id: 'tag-2', name: 'UI/UX', color: '#7c4dff' },
// // // //       { id: 'tag-3', name: 'backend', color: '#448aff' },
// // // //       { id: 'tag-4', name: 'database', color: '#ffab40' },
// // // //       { id: 'tag-5', name: 'API', color: '#69f0ae' },
// // // //       { id: 'tag-6', name: 'seguridad', color: '#ff4081' },
// // // //       { id: 'tag-7', name: 'devops', color: '#9c27b0' },
// // // //       { id: 'tag-8', name: 'configuración', color: '#795548' },
// // // //     ],
// // // //     columns: [
// // // //       {
// // // //         id: "col-1",
// // // //         name: "Por Hacer",
// // // //         tasks: [
// // // //           {
// // // //             id: "task-1",
// // // //             title: "Diseñar interfaz de login",
// // // //             description: "Crear mockups para la pantalla de inicio de sesión",
// // // //             priority: "alta",
// // // //             dueDate: "2024-01-15",
// // // //             tags: ["tag-1", "tag-2"],
// // // //             completed: false
// // // //           },
// // // //           {
// // // //             id: "task-2",
// // // //             title: "Configurar base de datos",
// // // //             description: "Implementar esquema inicial de la base de datos",
// // // //             priority: "media",
// // // //             dueDate: "2024-01-20",
// // // //             tags: ["tag-3", "tag-4"],
// // // //             completed: false
// // // //           }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: "col-2",
// // // //         name: "En Progreso",
// // // //         tasks: [
// // // //           {
// // // //             id: "task-3",
// // // //             title: "Desarrollar API de usuarios",
// // // //             description: "Crear endpoints para registro y login de usuarios",
// // // //             priority: "alta",
// // // //             dueDate: "2024-01-18",
// // // //             tags: ["tag-3", "tag-5"],
// // // //             completed: false
// // // //           }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: "col-3",
// // // //         name: "En Revisión",
// // // //         tasks: [
// // // //           {
// // // //             id: "task-4",
// // // //             title: "Implementar autenticación",
// // // //             description: "Sistema de autenticación con JWT",
// // // //             priority: "alta",
// // // //             dueDate: "2024-01-22",
// // // //             tags: ["tag-6", "tag-3"],
// // // //             completed: false
// // // //           }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: "col-4",
// // // //         name: "Terminado",
// // // //         tasks: [
// // // //           {
// // // //             id: "task-5",
// // // //             title: "Configurar entorno de desarrollo",
// // // //             description: "Setup inicial del proyecto con todas las dependencias",
// // // //             priority: "baja",
// // // //             dueDate: "2024-01-10",
// // // //             tags: ["tag-7", "tag-8"],
// // // //             completed: true
// // // //           }
// // // //         ]
// // // //       }
// // // //     ],
// // // //     stats: {
// // // //       totalTasks: 5,
// // // //       completedTasks: 1,
// // // //       inProgressTasks: 1,
// // // //       overdueTasks: 0,
// // // //       completionPercentage: 20
// // // //     }
// // // //   }
// // // // };

// // // // // Componente para tareas sortable
// // // // const SortableTask = ({ task, onClick, onEdit, onDelete, allTags }: { 
// // // //   task: Task; 
// // // //   onClick: (task: Task) => void;
// // // //   onEdit: (task: Task) => void;
// // // //   onDelete: (taskId: string) => void;
// // // //   allTags: Tag[];
// // // // }) => {
// // // //   const {
// // // //     attributes,
// // // //     listeners,
// // // //     setNodeRef,
// // // //     transform,
// // // //     transition,
// // // //     isDragging,
// // // //   } = useSortable({ id: task.id });

// // // //   const style = {
// // // //     transform: CSS.Transform.toString(transform),
// // // //     transition,
// // // //     opacity: isDragging ? 0.5 : 1,
// // // //   };

// // // //   const getPriorityColor = (priority: string) => {
// // // //     switch (priority) {
// // // //       case 'alta': return '#f44336';
// // // //       case 'media': return '#ff9800';
// // // //       case 'baja': return '#4caf50';
// // // //       default: return '#9e9e9e';
// // // //     }
// // // //   };

// // // //   const getPriorityText = (priority: string) => {
// // // //     switch (priority) {
// // // //       case 'alta': return 'Alta';
// // // //       case 'media': return 'Media';
// // // //       case 'baja': return 'Baja';
// // // //       default: return 'Sin prioridad';
// // // //     }
// // // //   };

// // // //   // Función para obtener información de los tags
// // // //   const getTagInfo = (tagId: string) => {
// // // //     return allTags.find(tag => tag.id === tagId) || { name: 'Unknown', color: '#ccc' };
// // // //   };

// // // //   const handleEdit = (e: React.MouseEvent) => {
// // // //     e.stopPropagation();
// // // //     onEdit(task);
// // // //   };

// // // //   const handleDelete = (e: React.MouseEvent) => {
// // // //     e.stopPropagation();
// // // //     onDelete(task.id);
// // // //   };

// // // //   return (
// // // //     <Card
// // // //       ref={setNodeRef}
// // // //       style={style}
// // // //       {...attributes}
// // // //       {...listeners}
// // // //       sx={{
// // // //         mb: 1,
// // // //         cursor: 'grab',
// // // //         '&:hover': {
// // // //           boxShadow: 3,
// // // //         },
// // // //         position: 'relative',
// // // //         borderLeft: task.completed ? '4px solid #4caf50' : `4px solid ${getPriorityColor(task.priority)}`,
// // // //       }}
// // // //       onClick={() => onClick(task)}
// // // //     >
// // // //       <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
// // // //         <DragIndicatorIcon fontSize="small" />
// // // //       </Box>
// // // //       <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
// // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // // //           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2, textDecoration: task.completed ? 'line-through' : 'none' }}>
// // // //             {task.title}
// // // //           </Typography>
// // // //           <Tooltip title={getPriorityText(task.priority)}>
// // // //             <Box
// // // //               sx={{
// // // //                 width: 12,
// // // //                 height: 12,
// // // //                 borderRadius: '50%',
// // // //                 backgroundColor: getPriorityColor(task.priority),
// // // //                 flexShrink: 0,
// // // //               }}
// // // //             />
// // // //           </Tooltip>
// // // //         </Box>
// // // //         <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1, fontSize: '0.8rem' }}>
// // // //           {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
// // // //         </Typography>
// // // //         <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
// // // //           {task.tags.map((tagId, index) => {
// // // //             const tag = getTagInfo(tagId);
// // // //             return (
// // // //               <Chip
// // // //                 key={index}
// // // //                 label={tag.name}
// // // //                 size="small"
// // // //                 sx={{ 
// // // //                   mr: 0.5, 
// // // //                   mb: 0.5, 
// // // //                   fontSize: '0.7rem',
// // // //                   backgroundColor: tag.color,
// // // //                   color: 'white',
// // // //                 }}
// // // //               />
// // // //             );
// // // //           })}
// // // //         </Box>
// // // //       </CardContent>
// // // //       <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
// // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // //           <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
// // // //           <Typography variant="caption" color="text.secondary">
// // // //             {new Date(task.dueDate).toLocaleDateString()}
// // // //           </Typography>
// // // //         </Box>
// // // //         <Box>
// // // //           <Tooltip title="Editar">
// // // //             <IconButton size="small" onClick={handleEdit}>
// // // //               <EditIcon fontSize="small" />
// // // //             </IconButton>
// // // //           </Tooltip>
// // // //           <Tooltip title="Eliminar">
// // // //             <IconButton size="small" onClick={handleDelete}>
// // // //               <DeleteIcon fontSize="small" />
// // // //             </IconButton>
// // // //           </Tooltip>
// // // //         </Box>
// // // //       </CardActions>
// // // //     </Card>
// // // //   );
// // // // };

// // // // // Componente para columnas sortable
// // // // const SortableColumn = ({ 
// // // //   column, 
// // // //   onTaskClick,
// // // //   onAddTask,
// // // //   onEditColumn,
// // // //   onDeleteColumn,
// // // //   onEditTask,
// // // //   onDeleteTask,
// // // //   allTags
// // // // }: { 
// // // //   column: Column; 
// // // //   onTaskClick: (task: Task) => void;
// // // //   onAddTask: (columnId: string) => void;
// // // //   onEditColumn: (columnId: string) => void;
// // // //   onDeleteColumn: (columnId: string) => void;
// // // //   onEditTask: (task: Task) => void;
// // // //   onDeleteTask: (taskId: string) => void;
// // // //   allTags: Tag[];
// // // // }) => {
// // // //   const {
// // // //     attributes,
// // // //     listeners,
// // // //     setNodeRef,
// // // //     transform,
// // // //     transition,
// // // //     isDragging,
// // // //   } = useSortable({ id: column.id });

// // // //   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

// // // //   const style = {
// // // //     transform: CSS.Transform.toString(transform),
// // // //     transition,
// // // //     opacity: isDragging ? 0.5 : 1,
// // // //   };

// // // //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // // //     event.stopPropagation();
// // // //     setMenuAnchor(event.currentTarget);
// // // //   };

// // // //   const handleMenuClose = () => {
// // // //     setMenuAnchor(null);
// // // //   };

// // // //   const handleEdit = () => {
// // // //     onEditColumn(column.id);
// // // //     handleMenuClose();
// // // //   };

// // // //   const handleDelete = () => {
// // // //     onDeleteColumn(column.id);
// // // //     handleMenuClose();
// // // //   };

// // // //   return (
// // // //     <Paper
// // // //       ref={setNodeRef}
// // // //       style={style}
// // // //       {...attributes}
// // // //       {...listeners}
// // // //       sx={{
// // // //         width: 300,
// // // //         minHeight: 500,
// // // //         display: 'flex',
// // // //         flexDirection: 'column',
// // // //         bgcolor: isDragging ? 'action.hover' : 'grey.100',
// // // //       }}
// // // //     >
// // // //       <Box sx={{ 
// // // //         p: 2, 
// // // //         display: 'flex', 
// // // //         justifyContent: 'space-between', 
// // // //         alignItems: 'center',
// // // //         bgcolor: 'primary.main',
// // // //         color: 'primary.contrastText'
// // // //       }}>
// // // //         <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
// // // //           {column.name}
// // // //         </Typography>
// // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // //           <Chip 
// // // //             label={column.tasks.length} 
// // // //             size="small" 
// // // //             sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)', mr: 1 }} 
// // // //           />
// // // //           <IconButton 
// // // //             size="small" 
// // // //             sx={{ color: 'primary.contrastText' }}
// // // //             onClick={handleMenuOpen}
// // // //           >
// // // //             <MoreVertIcon />
// // // //           </IconButton>
// // // //           <Menu
// // // //             anchorEl={menuAnchor}
// // // //             open={Boolean(menuAnchor)}
// // // //             onClose={handleMenuClose}
// // // //           >
// // // //             <MenuItem onClick={handleEdit}>Editar columna</MenuItem>
// // // //             <MenuItem onClick={handleDelete}>Eliminar columna</MenuItem>
// // // //           </Menu>
// // // //         </Box>
// // // //       </Box>

// // // //       <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
// // // //         <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
// // // //           {column.tasks.map((task) => (
// // // //             <SortableTask 
// // // //               key={task.id} 
// // // //               task={task} 
// // // //               onClick={onTaskClick}
// // // //               onEdit={onEditTask}
// // // //               onDelete={onDeleteTask}
// // // //               allTags={allTags}
// // // //             />
// // // //           ))}
// // // //         </SortableContext>
// // // //         {column.tasks.length === 0 && (
// // // //           <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
// // // //             <ViewColumnIcon sx={{ fontSize: 40, opacity: 0.5 }} />
// // // //             <Typography variant="body2" sx={{ mt: 1 }}>
// // // //               No hay tareas en esta columna
// // // //             </Typography>
// // // //           </Box>
// // // //         )}
// // // //       </Box>

// // // //       <Button 
// // // //         startIcon={<AddIcon />} 
// // // //         sx={{ m: 1, justifyContent: 'flex-start' }}
// // // //         onClick={() => onAddTask(column.id)}
// // // //       >
// // // //         Añadir tarea
// // // //       </Button>
// // // //     </Paper>
// // // //   );
// // // // };

// // // // // Componente principal del tablero
// // // // const TrelloBoard = ({ data }: { data: any }) => {
// // // //   const [projectData, setProjectData] = useState<ProjectData>(initialData.data);
// // // //   const [activeId, setActiveId] = useState<string | null>(null);
// // // //   const [activeTask, setActiveTask] = useState<Task | null>(null);
// // // //   const [newColumnDialog, setNewColumnDialog] = useState(false);
// // // //   const [editColumnDialog, setEditColumnDialog] = useState(false);
// // // //   const [newTaskDialog, setNewTaskDialog] = useState(false);
// // // //   const [editTaskDialog, setEditTaskDialog] = useState(false);
// // // //   const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
// // // //   const [newColumnName, setNewColumnName] = useState('');
// // // //   const [editColumnName, setEditColumnName] = useState('');
// // // //   const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
// // // //     title: '',
// // // //     description: '',
// // // //     priority: 'media',
// // // //     dueDate: new Date().toISOString().split('T')[0],
// // // //     tags: [],
// // // //     completed: false,
// // // //   });
// // // //   const [editTaskData, setEditTaskData] = useState<Task | null>(null);
// // // //   const [selectedColumnId, setSelectedColumnId] = useState<string>('');
// // // //   const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
// // // //   const [itemToDelete, setItemToDelete] = useState<{type: string, id: string} | null>(null);
// // // //   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

// // // //   const theme = useTheme();
// // // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// // // //   const sensors = useSensors(
// // // //     useSensor(PointerSensor),
// // // //     useSensor(KeyboardSensor, {
// // // //       coordinateGetter: sortableKeyboardCoordinates,
// // // //     })
// // // //   );

// // // //   // Solución para el error de getRangeAt
// // // //   useEffect(() => {
// // // //     const originalGetRangeAt = Selection.prototype.getRangeAt;

// // // //     Selection.prototype.getRangeAt = function(index) {
// // // //       if (index >= this.rangeCount || index < 0) {
// // // //         return document.createRange();
// // // //       }
// // // //       return originalGetRangeAt.call(this, index);
// // // //     };

// // // //     return () => {
// // // //       Selection.prototype.getRangeAt = originalGetRangeAt;
// // // //     };
// // // //   }, []);

// // // //   // Cargar datos desde props
// // // //   useEffect(() => {
// // // //     if (data && data.data) {
// // // //       // Convertir los datos de entrada al formato esperado
// // // //       const formattedData: ProjectData = {
// // // //         project: {
// // // //           id: data.data.project.id,
// // // //           name: data.data.project.name,
// // // //           description: data.data.project.description,
// // // //           startDate: data.data.project.startDate,
// // // //           deadline: data.data.project.deadline,
// // // //           progress: data.data.project.progress
// // // //         },
// // // //         tags: [
// // // //           { id: 'tag-1', name: 'diseño', color: '#ff5252' },
// // // //           { id: 'tag-2', name: 'UI/UX', color: '#7c4dff' },
// // // //           { id: 'tag-3', name: 'backend', color: '#448aff' },
// // // //           { id: 'tag-4', name: 'database', color: '#ffab40' },
// // // //           { id: 'tag-5', name: 'API', color: '#69f0ae' },
// // // //           { id: 'tag-6', name: 'seguridad', color: '#ff4081' },
// // // //           { id: 'tag-7', name: 'devops', color: '#9c27b0' },
// // // //           { id: 'tag-8', name: 'configuración', color: '#795548' },
// // // //         ],
// // // //         columns: data.data.columns.map((col: any) => ({
// // // //           id: col.id,
// // // //           name: col.name,
// // // //           tasks: col.tasks.map((task: any) => ({
// // // //             id: task.id,
// // // //             title: task.title,
// // // //             description: task.description,
// // // //             priority: task.priority,
// // // //             dueDate: task.dueDate,
// // // //             tags: task.tags.map((tagName: string) => {
// // // //               // Mapear nombres de tags a IDs
// // // //               const tagMap: Record<string, string> = {
// // // //                 'diseño': 'tag-1',
// // // //                 'UI/UX': 'tag-2',
// // // //                 'backend': 'tag-3',
// // // //                 'database': 'tag-4',
// // // //                 'API': 'tag-5',
// // // //                 'seguridad': 'tag-6',
// // // //                 'devops': 'tag-7',
// // // //                 'configuración': 'tag-8'
// // // //               };
// // // //               return tagMap[tagName] || 'tag-1';
// // // //             }),
// // // //             completed: col.name === 'Terminado' // Marcar como completadas las tareas en la columna "Terminado"
// // // //           }))
// // // //         })),
// // // //         stats: {
// // // //           totalTasks: data.data.stats.totalTasks,
// // // //           completedTasks: data.data.stats.completedTasks,
// // // //           inProgressTasks: data.data.stats.inProgressTasks,
// // // //           overdueTasks: data.data.stats.overdueTasks,
// // // //           completionPercentage: data.data.stats.completionPercentage
// // // //         }
// // // //       };

// // // //       setProjectData(formattedData);
// // // //     }
// // // //   }, [data]);

// // // //   const handleDragStart = (event: DragStartEvent) => {
// // // //     setActiveId(event.active.id as string);

// // // //     // Encontrar la tarea activa para el overlay
// // // //     for (const column of projectData.columns) {
// // // //       const task = column.tasks.find(t => t.id === event.active.id);
// // // //       if (task) {
// // // //         setActiveTask(task);
// // // //         break;
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleDragEnd = (event: DragEndEvent) => {
// // // //     const { active, over } = event;
// // // //     setActiveId(null);
// // // //     setActiveTask(null);

// // // //     if (!over) return;

// // // //     if (active.id !== over.id) {
// // // //       // Encontrar las columnas de origen y destino
// // // //       let sourceColumn: Column | undefined, destColumn: Column | undefined;
// // // //       let sourceIndex: number = -1, destIndex: number = -1;

// // // //       // Buscar en qué columna está la tarea activa y la de destino
// // // //       for (const column of projectData.columns) {
// // // //         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
// // // //         if (taskIndex !== -1) {
// // // //           sourceColumn = column;
// // // //           sourceIndex = taskIndex;
// // // //         }

// // // //         const overIndex = column.tasks.findIndex(task => task.id === over.id);
// // // //         if (overIndex !== -1) {
// // // //           destColumn = column;
// // // //           destIndex = overIndex;
// // // //         }

// // // //         // Si no encontramos la tarea de destino, puede que estemos sobre una columna
// // // //         if (!destColumn && column.id === over.id) {
// // // //           destColumn = column;
// // // //           destIndex = column.tasks.length; // Añadir al final
// // // //         }
// // // //       }

// // // //       // Si se encontraron ambas columnas
// // // //       if (sourceColumn && destColumn && sourceIndex !== -1) {
// // // //         // Crear una copia profunda de las columnas para evitar mutaciones
// // // //         const newColumns = projectData.columns.map(column => ({
// // // //           ...column,
// // // //           tasks: [...column.tasks]
// // // //         }));

// // // //         // Encontrar índices de las columnas en el array
// // // //         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
// // // //         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

// // // //         // Si es la misma columna, reordenar
// // // //         if (sourceColumn.id === destColumn.id) {
// // // //           newColumns[sourceColIndex].tasks = arrayMove(
// // // //             newColumns[sourceColIndex].tasks,
// // // //             sourceIndex,
// // // //             destIndex
// // // //           );
// // // //         } else {
// // // //           // Si son columnas diferentes, mover la tarea
// // // //           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
// // // //           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
// // // //         }

// // // //         setProjectData({
// // // //           ...projectData,
// // // //           columns: newColumns
// // // //         });

// // // //         setNotification({
// // // //           open: true,
// // // //           message: 'Tarea movida correctamente',
// // // //           severity: 'success'
// // // //         });
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleTaskClick = (task: Task) => {
// // // //     setEditTaskData(task);
// // // //     setEditTaskDialog(true);
// // // //   };

// // // //   const handleAddColumn = () => {
// // // //     if (newColumnName.trim()) {
// // // //       const newColumn: Column = {
// // // //         id: `col-${Date.now()}`,
// // // //         name: newColumnName,
// // // //         tasks: []
// // // //       };

// // // //       setProjectData({
// // // //         ...projectData,
// // // //         columns: [...projectData.columns, newColumn]
// // // //       });

// // // //       setNewColumnName('');
// // // //       setNewColumnDialog(false);

// // // //       setNotification({
// // // //         open: true,
// // // //         message: 'Columna añadida correctamente',
// // // //         severity: 'success'
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleEditColumn = () => {
// // // //     if (editColumnName.trim() && selectedColumn) {
// // // //       const newColumns = projectData.columns.map(column => {
// // // //         if (column.id === selectedColumn.id) {
// // // //           return {
// // // //             ...column,
// // // //             name: editColumnName
// // // //           };
// // // //         }
// // // //         return column;
// // // //       });

// // // //       setProjectData({
// // // //         ...projectData,
// // // //         columns: newColumns
// // // //       });

// // // //       setEditColumnDialog(false);
// // // //       setSelectedColumn(null);

// // // //       setNotification({
// // // //         open: true,
// // // //         message: 'Columna actualizada correctamente',
// // // //         severity: 'success'
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleDeleteColumn = (columnId: string) => {
// // // //     const newColumns = projectData.columns.filter(column => column.id !== columnId);

// // // //     setProjectData({
// // // //       ...projectData,
// // // //       columns: newColumns
// // // //     });

// // // //     setDeleteConfirmDialog(false);
// // // //     setItemToDelete(null);

// // // //     setNotification({
// // // //       open: true,
// // // //       message: 'Columna eliminada correctamente',
// // // //       severity: 'success'
// // // //     });
// // // //   };

// // // //   const handleAddTask = (columnId: string) => {
// // // //     setSelectedColumnId(columnId);
// // // //     setNewTaskData({
// // // //       title: '',
// // // //       description: '',
// // // //       priority: 'media',
// // // //       dueDate: new Date().toISOString().split('T')[0],
// // // //       tags: [],
// // // //       completed: false,
// // // //     });
// // // //     setNewTaskDialog(true);
// // // //   };

// // // //   const handleSaveTask = () => {
// // // //     if (newTaskData.title?.trim()) {
// // // //       const newTask: Task = {
// // // //         id: `task-${Date.now()}`,
// // // //         title: newTaskData.title || '',
// // // //         description: newTaskData.description || '',
// // // //         priority: newTaskData.priority || 'media',
// // // //         dueDate: newTaskData.dueDate || new Date().toISOString(),
// // // //         tags: newTaskData.tags || [],
// // // //         completed: newTaskData.completed || false,
// // // //       };

// // // //       const newColumns = projectData.columns.map(column => {
// // // //         if (column.id === selectedColumnId) {
// // // //           return {
// // // //             ...column,
// // // //             tasks: [...column.tasks, newTask]
// // // //           };
// // // //         }
// // // //         return column;
// // // //       });

// // // //       setProjectData({
// // // //         ...projectData,
// // // //         columns: newColumns
// // // //       });

// // // //       setNewTaskDialog(false);

// // // //       setNotification({
// // // //         open: true,
// // // //         message: 'Tarea añadida correctamente',
// // // //         severity: 'success'
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleSaveEditTask = () => {
// // // //     if (editTaskData && editTaskData.title.trim()) {
// // // //       const newColumns = projectData.columns.map(column => ({
// // // //         ...column,
// // // //         tasks: column.tasks.map(task => 
// // // //           task.id === editTaskData.id ? editTaskData : task
// // // //         )
// // // //       }));

// // // //       setProjectData({
// // // //         ...projectData,
// // // //         columns: newColumns
// // // //       });

// // // //       setEditTaskDialog(false);
// // // //       setEditTaskData(null);

// // // //       setNotification({
// // // //         open: true,
// // // //         message: 'Tarea actualizada correctamente',
// // // //         severity: 'success'
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleDeleteTask = (taskId: string) => {
// // // //     const newColumns = projectData.columns.map(column => ({
// // // //       ...column,
// // // //       tasks: column.tasks.filter(task => task.id !== taskId)
// // // //     }));

// // // //     setProjectData({
// // // //       ...projectData,
// // // //       columns: newColumns
// // // //     });

// // // //     setNotification({
// // // //       open: true,
// // // //       message: 'Tarea eliminada correctamente',
// // // //       severity: 'success'
// // // //     });
// // // //   };

// // // //   const handleOpenEditColumn = (columnId: string) => {
// // // //     const column = projectData.columns.find(col => col.id === columnId);
// // // //     if (column) {
// // // //       setSelectedColumn(column);
// // // //       setEditColumnName(column.name);
// // // //       setEditColumnDialog(true);
// // // //     }
// // // //   };

// // // //   const handleOpenEditTask = (task: Task) => {
// // // //     setEditTaskData(task);
// // // //     setEditTaskDialog(true);
// // // //   };

// // // //   const handleOpenDeleteConfirm = (type: string, id: string) => {
// // // //     setItemToDelete({ type, id });
// // // //     setDeleteConfirmDialog(true);
// // // //   };

// // // //   const handleConfirmDelete = () => {
// // // //     if (itemToDelete) {
// // // //       if (itemToDelete.type === 'column') {
// // // //         handleDeleteColumn(itemToDelete.id);
// // // //       } else if (itemToDelete.type === 'task') {
// // // //         handleDeleteTask(itemToDelete.id);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleTagChange = (event: any) => {
// // // //     const value = event.target.value;
// // // //     setNewTaskData({
// // // //       ...newTaskData,
// // // //       tags: typeof value === 'string' ? value.split(',') : value,
// // // //     });
// // // //   };

// // // //   const handleEditTagChange = (event: any) => {
// // // //     const value = event.target.value;
// // // //     if (editTaskData) {
// // // //       setEditTaskData({
// // // //         ...editTaskData,
// // // //         tags: typeof value === 'string' ? value.split(',') : value,
// // // //       });
// // // //     }
// // // //   };

// // // //   // Calcular estadísticas actualizadas
// // // //   const calculateStats = useCallback(() => {
// // // //     let totalTasks = 0;
// // // //     let completedTasks = 0;
// // // //     let inProgressTasks = 0;

// // // //     projectData.columns.forEach(column => {
// // // //       totalTasks += column.tasks.length;
// // // //       column.tasks.forEach(task => {
// // // //         if (task.completed) completedTasks++;
// // // //         if (!task.completed && column.name !== 'Por Hacer' && column.name !== 'Terminado') inProgressTasks++;
// // // //       });
// // // //     });

// // // //     const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

// // // //     return {
// // // //       totalTasks,
// // // //       completedTasks,
// // // //       inProgressTasks,
// // // //       overdueTasks: 0, // Podrías implementar lógica para calcular tareas vencidas
// // // //       completionPercentage
// // // //     };
// // // //   }, [projectData.columns]);

// // // //   // Actualizar estadísticas cuando cambien las columnas
// // // //   useEffect(() => {
// // // //     const newStats = calculateStats();
// // // //     setProjectData(prev => ({
// // // //       ...prev,
// // // //       stats: newStats
// // // //     }));
// // // //   }, [projectData.columns, calculateStats]);

// // // //   return (
// // // //     <Box sx={{ flexGrow: 1, bgcolor: 'grey.200', minHeight: '100vh' }}>
// // // //       <AppBar position="static" elevation={0}>
// // // //         <Toolbar>
// // // //           <DashboardIcon sx={{ mr: 2 }} />
// // // //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// // // //             {projectData.project.name}
// // // //           </Typography>
// // // //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
// // // //             <IconButton color="inherit">
// // // //               <SearchIcon />
// // // //             </IconButton>
// // // //             <IconButton color="inherit">
// // // //               <NotificationsIcon />
// // // //             </IconButton>
// // // //             <IconButton color="inherit">
// // // //               <AccountCircleIcon />
// // // //             </IconButton>
// // // //           </Box>
// // // //         </Toolbar>
// // // //       </AppBar>

// // // //       <Box sx={{ p: 2 }}>
// // // //         <Paper sx={{ p: 3, mb: 2 }}>
// // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// // // //             <Box sx={{ flex: 1, minWidth: 300 }}>
// // // //               <Typography variant="h4" gutterBottom>
// // // //                 {projectData.project.name}
// // // //               </Typography>
// // // //               <Typography variant="body1" color="text.secondary" paragraph>
// // // //                 {projectData.project.description}
// // // //               </Typography>

// // // //               <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
// // // //                 <Typography variant="body2">
// // // //                   Progreso del proyecto:
// // // //                 </Typography>
// // // //                 <Typography variant="body2" fontWeight="bold">
// // // //                   {projectData.project.progress}%
// // // //                 </Typography>
// // // //               </Box>
// // // //               <LinearProgress 
// // // //                 variant="determinate" 
// // // //                 value={projectData.project.progress} 
// // // //                 sx={{ height: 8, borderRadius: 4, mb: 2 }}
// // // //               />

// // // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // // //                 <Typography variant="body2">
// // // //                   {new Date(projectData.project.startDate).toLocaleDateString()} - {new Date(projectData.project.deadline).toLocaleDateString()}
// // // //                 </Typography>
// // // //               </Box>
// // // //             </Box>

// // // //             <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // //                 <Typography variant="h5" fontWeight="bold">
// // // //                   {projectData.stats.completedTasks}/{projectData.stats.totalTasks}
// // // //                 </Typography>
// // // //                 <Typography variant="body2">Completadas</Typography>
// // // //               </Box>

// // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // //                 <Typography variant="h5" fontWeight="bold">
// // // //                   {projectData.stats.completionPercentage}%
// // // //                 </Typography>
// // // //                 <Typography variant="body2">Progreso</Typography>
// // // //               </Box>

// // // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // // //                 <Typography variant="h5" fontWeight="bold">
// // // //                   {projectData.stats.inProgressTasks}
// // // //                 </Typography>
// // // //                 <Typography variant="body2">En progreso</Typography>
// // // //               </Box>
// // // //             </Box>
// // // //           </Box>
// // // //         </Paper>

// // // //         <Box sx={{ overflowX: 'auto', pb: 2 }}>
// // // //           <DndContext
// // // //             sensors={sensors}
// // // //             collisionDetection={closestCenter}
// // // //             onDragStart={handleDragStart}
// // // //             onDragEnd={handleDragEnd}
// // // //           >
// // // //             <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'min-content' }}>
// // // //               <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
// // // //                 {projectData.columns.map((column) => (
// // // //                   <SortableColumn 
// // // //                     key={column.id} 
// // // //                     column={column} 
// // // //                     onTaskClick={handleTaskClick}
// // // //                     onAddTask={handleAddTask}
// // // //                     onEditColumn={handleOpenEditColumn}
// // // //                     onDeleteColumn={(id) => handleOpenDeleteConfirm('column', id)}
// // // //                     onEditTask={handleOpenEditTask}
// // // //                     onDeleteTask={(id) => handleOpenDeleteConfirm('task', id)}
// // // //                     allTags={projectData.tags}
// // // //                   />
// // // //                 ))}
// // // //               </SortableContext>

// // // //               <Paper 
// // // //                 sx={{ 
// // // //                   width: 300, 
// // // //                   minHeight: 200, 
// // // //                   display: 'flex', 
// // // //                   alignItems: 'center', 
// // // //                   justifyContent: 'center',
// // // //                   bgcolor: 'grey.100',
// // // //                   cursor: 'pointer'
// // // //                 }}
// // // //                 onClick={() => setNewColumnDialog(true)}
// // // //               >
// // // //                 <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
// // // //                   Añadir otra columna
// // // //                 </Button>
// // // //               </Paper>
// // // //             </Box>

// // // //             <DragOverlay>
// // // //               {activeTask ? (
// // // //                 <Card sx={{ width: 280, opacity: 0.8, boxShadow: 3 }}>
// // // //                   <CardContent>
// // // //                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
// // // //                       {activeTask.title}
// // // //                     </Typography>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               ) : null}
// // // //             </DragOverlay>
// // // //           </DndContext>
// // // //         </Box>

// // // //         <Fab
// // // //           color="primary"
// // // //           aria-label="add"
// // // //           sx={{ position: 'fixed', bottom: 16, right: 16 }}
// // // //           onClick={() => setNewColumnDialog(true)}
// // // //         >
// // // //           <AddIcon />
// // // //         </Fab>
// // // //       </Box>

// // // //       {/* Diálogo para nueva columna */}
// // // //       <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
// // // //         <DialogTitle>Añadir nueva columna</DialogTitle>
// // // //         <DialogContent>
// // // //           <TextField
// // // //             autoFocus
// // // //             margin="dense"
// // // //             label="Nombre de la columna"
// // // //             fullWidth
// // // //             variant="outlined"
// // // //             value={newColumnName}
// // // //             onChange={(e) => setNewColumnName(e.target.value)}
// // // //             onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
// // // //           />
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setNewColumnDialog(false)}>Cancelar</Button>
// // // //           <Button onClick={handleAddColumn} variant="contained">Añadir</Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* Diálogo para editar columna */}
// // // //       <Dialog open={editColumnDialog} onClose={() => setEditColumnDialog(false)}>
// // // //         <DialogTitle>Editar columna</DialogTitle>
// // // //         <DialogContent>
// // // //           <TextField
// // // //             autoFocus
// // // //             margin="dense"
// // // //             label="Nombre de la columna"
// // // //             fullWidth
// // // //             variant="outlined"
// // // //             value={editColumnName}
// // // //             onChange={(e) => setEditColumnName(e.target.value)}
// // // //             onKeyPress={(e) => e.key === 'Enter' && handleEditColumn()}
// // // //           />
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setEditColumnDialog(false)}>Cancelar</Button>
// // // //           <Button onClick={handleEditColumn} variant="contained">Guardar</Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* Diálogo para nueva tarea */}
// // // //       <Dialog open={newTaskDialog} onClose={() => setNewTaskDialog(false)} maxWidth="sm" fullWidth>
// // // //         <DialogTitle>Añadir nueva tarea</DialogTitle>
// // // //         <DialogContent>
// // // //           <TextField
// // // //             autoFocus
// // // //             margin="dense"
// // // //             label="Título de la tarea"
// // // //             fullWidth
// // // //             variant="outlined"
// // // //             value={newTaskData.title}
// // // //             onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
// // // //             sx={{ mb: 2 }}
// // // //           />
// // // //           <TextField
// // // //             margin="dense"
// // // //             label="Descripción"
// // // //             fullWidth
// // // //             variant="outlined"
// // // //             multiline
// // // //             rows={3}
// // // //             value={newTaskData.description}
// // // //             onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
// // // //             sx={{ mb: 2 }}
// // // //           />
// // // //           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // // //             <TextField
// // // //               label="Prioridad"
// // // //               select
// // // //               fullWidth
// // // //               SelectProps={{ native: true }}
// // // //               value={newTaskData.priority}
// // // //               onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
// // // //             >
// // // //               <option value="alta">Alta</option>
// // // //               <option value="media">Media</option>
// // // //               <option value="baja">Baja</option>
// // // //             </TextField>
// // // //             <TextField
// // // //               label="Fecha de vencimiento"
// // // //               type="date"
// // // //               fullWidth
// // // //               value={newTaskData.dueDate}
// // // //               onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
// // // //               InputLabelProps={{
// // // //                 shrink: true,
// // // //               }}
// // // //             />
// // // //           </Box>
// // // //           <FormControl fullWidth sx={{ mb: 2 }}>
// // // //             <InputLabel>Etiquetas</InputLabel>
// // // //             <Select
// // // //               multiple
// // // //               value={newTaskData.tags}
// // // //               onChange={handleTagChange}
// // // //               input={<OutlinedInput label="Etiquetas" />}
// // // //               renderValue={(selected) => (
// // // //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // // //                   {selected.map((value) => {
// // // //                     const tag = projectData.tags.find(t => t.id === value);
// // // //                     return (
// // // //                       <Chip 
// // // //                         key={value} 
// // // //                         label={tag?.name || value} 
// // // //                         size="small"
// // // //                         sx={{ backgroundColor: tag?.color, color: 'white' }}
// // // //                       />
// // // //                     );
// // // //                   })}
// // // //                 </Box>
// // // //               )}
// // // //             >
// // // //               {projectData.tags.map((tag) => (
// // // //                 <MenuItem key={tag.id} value={tag.id}>
// // // //                   <Checkbox checked={newTaskData.tags?.indexOf(tag.id) > -1} />
// // // //                   <ListItemText primary={tag.name} />
// // // //                   <Box sx={{ width: 16, height: 16, backgroundColor: tag.color, borderRadius: '50%', ml: 1 }} />
// // // //                 </MenuItem>
// // // //               ))}
// // // //             </Select>
// // // //           </FormControl>
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setNewTaskDialog(false)}>Cancelar</Button>
// // // //           <Button onClick={handleSaveTask} variant="contained">Añadir tarea</Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* Diálogo para editar tarea */}
// // // //       <Dialog open={editTaskDialog} onClose={() => setEditTaskDialog(false)} maxWidth="sm" fullWidth>
// // // //         <DialogTitle>Editar tarea</DialogTitle>
// // // //         <DialogContent>
// // // //           {editTaskData && (
// // // //             <>
// // // //               <TextField
// // // //                 autoFocus
// // // //                 margin="dense"
// // // //                 label="Título de la tarea"
// // // //                 fullWidth
// // // //                 variant="outlined"
// // // //                 value={editTaskData.title}
// // // //                 onChange={(e) => setEditTaskData({...editTaskData, title: e.target.value})}
// // // //                 sx={{ mb: 2 }}
// // // //               />
// // // //               <TextField
// // // //                 margin="dense"
// // // //                 label="Descripción"
// // // //                 fullWidth
// // // //                 variant="outlined"
// // // //                 multiline
// // // //                 rows={3}
// // // //                 value={editTaskData.description}
// // // //                 onChange={(e) => setEditTaskData({...editTaskData, description: e.target.value})}
// // // //                 sx={{ mb: 2 }}
// // // //               />
// // // //               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // // //                 <TextField
// // // //                   label="Prioridad"
// // // //                   select
// // // //                   fullWidth
// // // //                   SelectProps={{ native: true }}
// // // //                   value={editTaskData.priority}
// // // //                   onChange={(e) => setEditTaskData({...editTaskData, priority: e.target.value})}
// // // //                 >
// // // //                   <option value="alta">Alta</option>
// // // //                   <option value="media">Media</option>
// // // //                   <option value="baja">Baja</option>
// // // //                 </TextField>
// // // //                 <TextField
// // // //                   label="Fecha de vencimiento"
// // // //                   type="date"
// // // //                   fullWidth
// // // //                   value={editTaskData.dueDate.split('T')[0]}
// // // //                   onChange={(e) => setEditTaskData({...editTaskData, dueDate: e.target.value})}
// // // //                   InputLabelProps={{
// // // //                     shrink: true,
// // // //                   }}
// // // //                 />
// // // //               </Box>
// // // //               <FormControl fullWidth sx={{ mb: 2 }}>
// // // //                 <InputLabel>Etiquetas</InputLabel>
// // // //                 <Select
// // // //                   multiple
// // // //                   value={editTaskData.tags}
// // // //                   onChange={handleEditTagChange}
// // // //                   input={<OutlinedInput label="Etiquetas" />}
// // // //                   renderValue={(selected) => (
// // // //                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // // //                       {selected.map((value) => {
// // // //                         const tag = projectData.tags.find(t => t.id === value);
// // // //                         return (
// // // //                           <Chip 
// // // //                             key={value} 
// // // //                             label={tag?.name || value} 
// // // //                             size="small"
// // // //                             sx={{ backgroundColor: tag?.color, color: 'white' }}
// // // //                           />
// // // //                         );
// // // //                       })}
// // // //                     </Box>
// // // //                   )}
// // // //                 >
// // // //                   {projectData.tags.map((tag) => (
// // // //                     <MenuItem key={tag.id} value={tag.id}>
// // // //                       <Checkbox checked={editTaskData.tags.indexOf(tag.id) > -1} />
// // // //                       <ListItemText primary={tag.name} />
// // // //                       <Box sx={{ width: 16, height: 16, backgroundColor: tag.color, borderRadius: '50%', ml: 1 }} />
// // // //                     </MenuItem>
// // // //                   ))}
// // // //                 </Select>
// // // //               </FormControl>
// // // //               <FormGroup>
// // // //                 <FormControlLabel 
// // // //                   control={
// // // //                     <Switch 
// // // //                       checked={editTaskData.completed} 
// // // //                       onChange={(e) => setEditTaskData({...editTaskData, completed: e.target.checked})} 
// // // //                     />
// // // //                   } 
// // // //                   label="Tarea completada" 
// // // //                 />
// // // //               </FormGroup>
// // // //             </>
// // // //           )}
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setEditTaskDialog(false)}>Cancelar</Button>
// // // //           <Button onClick={handleSaveEditTask} variant="contained">Guardar cambios</Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* Diálogo de confirmación para eliminar */}
// // // //       <Dialog open={deleteConfirmDialog} onClose={() => setDeleteConfirmDialog(false)}>
// // // //         <DialogTitle>Confirmar eliminación</DialogTitle>
// // // //         <DialogContent>
// // // //           <Typography>
// // // //             ¿Estás seguro de que quieres eliminar este {itemToDelete?.type === 'column' ? 'columna' : 'tarea'}? 
// // // //             Esta acción no se puede deshacer.
// // // //           </Typography>
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setDeleteConfirmDialog(false)}>Cancelar</Button>
// // // //           <Button onClick={handleConfirmDelete} variant="contained" color="error">
// // // //             Eliminar
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       <Snackbar
// // // //         open={notification.open}
// // // //         autoHideDuration={3000}
// // // //         onClose={() => setNotification({...notification, open: false})}
// // // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // // //       >
// // // //         <Alert 
// // // //           onClose={() => setNotification({...notification, open: false})} 
// // // //           severity={notification.severity as any} 
// // // //           sx={{ width: '100%' }}
// // // //         >
// // // //           {notification.message}
// // // //         </Alert>
// // // //       </Snackbar>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default TrelloBoard;


// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import {
// // //   DndContext,
// // //   closestCenter,
// // //   KeyboardSensor,
// // //   PointerSensor,
// // //   useSensor,
// // //   useSensors,
// // //   DragEndEvent,
// // //   DragStartEvent,
// // //   DragOverlay,
// // // } from '@dnd-kit/core';
// // // import {
// // //   arrayMove,
// // //   SortableContext,
// // //   sortableKeyboardCoordinates,
// // //   verticalListSortingStrategy,
// // //   useSortable,
// // // } from '@dnd-kit/sortable';
// // // import { CSS } from '@dnd-kit/utilities';
// // // import {
// // //   Paper,
// // //   Typography,
// // //   Box,
// // //   Button,
// // //   IconButton,
// // //   TextField,
// // //   Dialog,
// // //   DialogActions,
// // //   DialogContent,
// // //   DialogTitle,
// // //   Chip,
// // //   Card,
// // //   CardContent,
// // //   CardActions,
// // //   useTheme,
// // //   useMediaQuery,
// // //   AppBar,
// // //   Toolbar,
// // //   LinearProgress,
// // //   Menu,
// // //   MenuItem,
// // //   Fab,
// // //   Snackbar,
// // //   Alert,
// // //   Tooltip,
// // //   Divider,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   OutlinedInput,
// // //   ListItemText,
// // //   Checkbox,
// // //   FormGroup,
// // //   FormControlLabel,
// // //   Switch,
// // //   CircularProgress,
// // // } from '@mui/material';
// // // import {
// // //   Add as AddIcon,
// // //   MoreVert as MoreVertIcon,
// // //   Edit as EditIcon,
// // //   Delete as DeleteIcon,
// // //   DragIndicator as DragIndicatorIcon,
// // //   ViewColumn as ViewColumnIcon,
// // //   Dashboard as DashboardIcon,
// // //   Notifications as NotificationsIcon,
// // //   AccountCircle as AccountCircleIcon,
// // //   Search as SearchIcon,
// // //   Label as LabelIcon,
// // //   Schedule as ScheduleIcon,
// // // } from '@mui/icons-material';

// // // // Interfaz para los tipos de datos
// // // interface Tag {
// // //   id: string;
// // //   name: string;
// // //   color: string;
// // // }

// // // interface Task {
// // //   id: string;
// // //   title: string;
// // //   description: string;
// // //   priority: string;
// // //   dueDate: string;
// // //   tags: string[];
// // //   completed: boolean;
// // // }

// // // interface Column {
// // //   id: string;
// // //   name: string;
// // //   tasks: Task[];
// // // }

// // // interface ProjectData {
// // //   project: {
// // //     id: string;
// // //     name: string;
// // //     description: string;
// // //     startDate: string;
// // //     deadline: string;
// // //     progress: number;
// // //   };
// // //   columns: Column[];
// // //   tags?: Tag[];
// // //   stats: {
// // //     totalTasks: number;
// // //     completedTasks: number;
// // //     inProgressTasks: number;
// // //     overdueTasks: number;
// // //     completionPercentage: number;
// // //   };
// // // }

// // // // Props para el componente TrelloBoard
// // // interface TrelloBoardProps {
// // //   data: any;
// // //   onUpdateData: (updatedData: ProjectData) => Promise<void>;
// // //   isLoading?: boolean;
// // // }

// // // // Tags predefinidos con colores
// // // const DEFAULT_TAGS: Tag[] = [
// // //   { id: 'diseño', name: 'diseño', color: '#ff5252' },
// // //   { id: 'UI/UX', name: 'UI/UX', color: '#7c4dff' },
// // //   { id: 'backend', name: 'backend', color: '#448aff' },
// // //   { id: 'database', name: 'database', color: '#ffab40' },
// // //   { id: 'API', name: 'API', color: '#69f0ae' },
// // //   { id: 'seguridad', name: 'seguridad', color: '#ff4081' },
// // //   { id: 'devops', name: 'devops', color: '#9c27b0' },
// // //   { id: 'configuración', name: 'configuración', color: '#795548' },
// // // ];

// // // // Componente para tareas sortable
// // // const SortableTask = ({ task, onClick, onEdit, onDelete, allTags }: { 
// // //   task: Task; 
// // //   onClick: (task: Task) => void;
// // //   onEdit: (task: Task) => void;
// // //   onDelete: (taskId: string) => void;
// // //   allTags: Tag[];
// // // }) => {
// // //   const {
// // //     attributes,
// // //     listeners,
// // //     setNodeRef,
// // //     transform,
// // //     transition,
// // //     isDragging,
// // //   } = useSortable({ id: task.id });

// // //   const style = {
// // //     transform: CSS.Transform.toString(transform),
// // //     transition,
// // //     opacity: isDragging ? 0.5 : 1,
// // //   };

// // //   const getPriorityColor = (priority: string) => {
// // //     switch (priority) {
// // //       case 'alta': return '#f44336';
// // //       case 'media': return '#ff9800';
// // //       case 'baja': return '#4caf50';
// // //       default: return '#9e9e9e';
// // //     }
// // //   };

// // //   const getPriorityText = (priority: string) => {
// // //     switch (priority) {
// // //       case 'alta': return 'Alta';
// // //       case 'media': return 'Media';
// // //       case 'baja': return 'Baja';
// // //       default: return 'Sin prioridad';
// // //     }
// // //   };

// // //   // Función para obtener información de los tags
// // //   const getTagInfo = (tagId: string) => {
// // //     return allTags.find(tag => tag.id === tagId) || { name: tagId, color: '#ccc' };
// // //   };

// // //   const handleEdit = (e: React.MouseEvent) => {
// // //     e.stopPropagation();
// // //     onEdit(task);
// // //   };

// // //   const handleDelete = (e: React.MouseEvent) => {
// // //     e.stopPropagation();
// // //     onDelete(task.id);
// // //   };

// // //   return (
// // //     <Card
// // //       ref={setNodeRef}
// // //       style={style}
// // //       {...attributes}
// // //       {...listeners}
// // //       sx={{
// // //         mb: 1,
// // //         cursor: 'grab',
// // //         '&:hover': {
// // //           boxShadow: 3,
// // //         },
// // //         position: 'relative',
// // //         borderLeft: task.completed ? '4px solid #4caf50' : `4px solid ${getPriorityColor(task.priority)}`,
// // //       }}
// // //       onClick={() => onClick(task)}
// // //     >
// // //       <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
// // //         <DragIndicatorIcon fontSize="small" />
// // //       </Box>
// // //       <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
// // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // //           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2, textDecoration: task.completed ? 'line-through' : 'none' }}>
// // //             {task.title}
// // //           </Typography>
// // //           <Tooltip title={getPriorityText(task.priority)}>
// // //             <Box
// // //               sx={{
// // //                 width: 12,
// // //                 height: 12,
// // //                 borderRadius: '50%',
// // //                 backgroundColor: getPriorityColor(task.priority),
// // //                 flexShrink: 0,
// // //               }}
// // //             />
// // //           </Tooltip>
// // //         </Box>
// // //         <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1, fontSize: '0.8rem' }}>
// // //           {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
// // //         </Typography>
// // //         <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
// // //           {task.tags.map((tagId, index) => {
// // //             const tag = getTagInfo(tagId);
// // //             return (
// // //               <Chip
// // //                 key={index}
// // //                 label={tag.name}
// // //                 size="small"
// // //                 sx={{ 
// // //                   mr: 0.5, 
// // //                   mb: 0.5, 
// // //                   fontSize: '0.7rem',
// // //                   backgroundColor: tag.color,
// // //                   color: 'white',
// // //                 }}
// // //               />
// // //             );
// // //           })}
// // //         </Box>
// // //       </CardContent>
// // //       <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
// // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //           <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
// // //           <Typography variant="caption" color="text.secondary">
// // //             {new Date(task.dueDate).toLocaleDateString()}
// // //           </Typography>
// // //         </Box>
// // //         <Box>
// // //           <Tooltip title="Editar">
// // //             <IconButton size="small" onClick={handleEdit}>
// // //               <EditIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>
// // //           <Tooltip title="Eliminar">
// // //             <IconButton size="small" onClick={handleDelete}>
// // //               <DeleteIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>
// // //         </Box>
// // //       </CardActions>
// // //     </Card>
// // //   );
// // // };

// // // // Componente para columnas sortable
// // // const SortableColumn = ({ 
// // //   column, 
// // //   onTaskClick,
// // //   onAddTask,
// // //   onEditColumn,
// // //   onDeleteColumn,
// // //   onEditTask,
// // //   onDeleteTask,
// // //   allTags
// // // }: { 
// // //   column: Column; 
// // //   onTaskClick: (task: Task) => void;
// // //   onAddTask: (columnId: string) => void;
// // //   onEditColumn: (columnId: string) => void;
// // //   onDeleteColumn: (columnId: string) => void;
// // //   onEditTask: (task: Task) => void;
// // //   onDeleteTask: (taskId: string) => void;
// // //   allTags: Tag[];
// // // }) => {
// // //   const {
// // //     attributes,
// // //     listeners,
// // //     setNodeRef,
// // //     transform,
// // //     transition,
// // //     isDragging,
// // //   } = useSortable({ id: column.id });

// // //   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

// // //   const style = {
// // //     transform: CSS.Transform.toString(transform),
// // //     transition,
// // //     opacity: isDragging ? 0.5 : 1,
// // //   };

// // //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // //     event.stopPropagation();
// // //     setMenuAnchor(event.currentTarget);
// // //   };

// // //   const handleMenuClose = () => {
// // //     setMenuAnchor(null);
// // //   };

// // //   const handleEdit = () => {
// // //     onEditColumn(column.id);
// // //     handleMenuClose();
// // //   };

// // //   const handleDelete = () => {
// // //     onDeleteColumn(column.id);
// // //     handleMenuClose();
// // //   };

// // //   return (
// // //     <Paper
// // //       ref={setNodeRef}
// // //       style={style}
// // //       {...attributes}
// // //       {...listeners}
// // //       sx={{
// // //         width: 300,
// // //         minHeight: 500,
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         bgcolor: isDragging ? 'action.hover' : 'grey.100',
// // //       }}
// // //     >
// // //       <Box sx={{ 
// // //         p: 2, 
// // //         display: 'flex', 
// // //         justifyContent: 'space-between', 
// // //         alignItems: 'center',
// // //         bgcolor: 'primary.main',
// // //         color: 'primary.contrastText'
// // //       }}>
// // //         <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
// // //           {column.name}
// // //         </Typography>
// // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //           <Chip 
// // //             label={column.tasks.length} 
// // //             size="small" 
// // //             sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)', mr: 1 }} 
// // //           />
// // //           <IconButton 
// // //             size="small" 
// // //             sx={{ color: 'primary.contrastText' }}
// // //             onClick={handleMenuOpen}
// // //           >
// // //             <MoreVertIcon />
// // //           </IconButton>
// // //           <Menu
// // //             anchorEl={menuAnchor}
// // //             open={Boolean(menuAnchor)}
// // //             onClose={handleMenuClose}
// // //           >
// // //             <MenuItem onClick={handleEdit}>Editar columna</MenuItem>
// // //             <MenuItem onClick={handleDelete}>Eliminar columna</MenuItem>
// // //           </Menu>
// // //         </Box>
// // //       </Box>

// // //       <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
// // //         <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
// // //           {column.tasks.map((task) => (
// // //             <SortableTask 
// // //               key={task.id} 
// // //               task={task} 
// // //               onClick={onTaskClick}
// // //               onEdit={onEditTask}
// // //               onDelete={onDeleteTask}
// // //               allTags={allTags}
// // //             />
// // //           ))}
// // //         </SortableContext>
// // //         {column.tasks.length === 0 && (
// // //           <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
// // //             <ViewColumnIcon sx={{ fontSize: 40, opacity: 0.5 }} />
// // //             <Typography variant="body2" sx={{ mt: 1 }}>
// // //               No hay tareas en esta columna
// // //             </Typography>
// // //           </Box>
// // //         )}
// // //       </Box>

// // //       <Button 
// // //         startIcon={<AddIcon />} 
// // //         sx={{ m: 1, justifyContent: 'flex-start' }}
// // //         onClick={() => onAddTask(column.id)}
// // //       >
// // //         Añadir tarea
// // //       </Button>
// // //     </Paper>
// // //   );
// // // };

// // // // Componente principal del tablero
// // // const TrelloBoard = ({ data, onUpdateData, isLoading = false }: TrelloBoardProps) => {
// // //   const [projectData, setProjectData] = useState<ProjectData>({
// // //     project: {
// // //       id: "",
// // //       name: "",
// // //       description: "",
// // //       startDate: "",
// // //       deadline: "",
// // //       progress: 0
// // //     },
// // //     columns: [],
// // //     tags: DEFAULT_TAGS,
// // //     stats: {
// // //       totalTasks: 0,
// // //       completedTasks: 0,
// // //       inProgressTasks: 0,
// // //       overdueTasks: 0,
// // //       completionPercentage: 0
// // //     }
// // //   });
// // //   const [activeId, setActiveId] = useState<string | null>(null);
// // //   const [activeTask, setActiveTask] = useState<Task | null>(null);
// // //   const [newColumnDialog, setNewColumnDialog] = useState(false);
// // //   const [editColumnDialog, setEditColumnDialog] = useState(false);
// // //   const [newTaskDialog, setNewTaskDialog] = useState(false);
// // //   const [editTaskDialog, setEditTaskDialog] = useState(false);
// // //   const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
// // //   const [newColumnName, setNewColumnName] = useState('');
// // //   const [editColumnName, setEditColumnName] = useState('');
// // //   const [newTaskData, setNewTaskData] = useState<any>({
// // //     title: '',
// // //     description: '',
// // //     priority: 'media',
// // //     dueDate: new Date().toISOString().split('T')[0],
// // //     tags: [],
// // //     completed: false,
// // //   });
// // //   const [editTaskData, setEditTaskData] = useState<Task | null>(null);
// // //   const [selectedColumnId, setSelectedColumnId] = useState<string>('');
// // //   const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
// // //   const [itemToDelete, setItemToDelete] = useState<{type: string, id: string} | null>(null);
// // //   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

// // //   const theme = useTheme();
// // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// // //   const sensors = useSensors(
// // //     useSensor(PointerSensor),
// // //     useSensor(KeyboardSensor, {
// // //       coordinateGetter: sortableKeyboardCoordinates,
// // //     })
// // //   );

// // //   // Cargar datos desde props
// // //   useEffect(() => {
// // //     if (data && data.data) {
// // //       // Asegurarnos de que siempre haya tags disponibles
// // //       const projectDataWithTags = {
// // //         ...data.data,
// // //         tags: data.data.tags || DEFAULT_TAGS
// // //       };
// // //       setProjectData(projectDataWithTags);
// // //     }
// // //   }, [data]);

// // //   // Función para actualizar los datos en el servidor
// // //   const updateProjectData = async (updatedData: ProjectData) => {
// // //     try {
// // //       setProjectData(updatedData);
// // //       if (onUpdateData) {
// // //         await onUpdateData(updatedData);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating project data:', error);
// // //       setNotification({
// // //         open: true,
// // //         message: 'Error al guardar los cambios',
// // //         severity: 'error'
// // //       });
// // //     }
// // //   };

// // //   const handleDragStart = (event: DragStartEvent) => {
// // //     setActiveId(event.active.id as string);

// // //     // Encontrar la tarea activa para el overlay
// // //     for (const column of projectData.columns) {
// // //       const task = column.tasks.find(t => t.id === event.active.id);
// // //       if (task) {
// // //         setActiveTask(task);
// // //         break;
// // //       }
// // //     }
// // //   };

// // //   const handleDragEnd = (event: DragEndEvent) => {
// // //     const { active, over } = event;
// // //     setActiveId(null);
// // //     setActiveTask(null);

// // //     if (!over) return;

// // //     if (active.id !== over.id) {
// // //       // Encontrar las columnas de origen y destino
// // //       let sourceColumn: Column | undefined, destColumn: Column | undefined;
// // //       let sourceIndex: number = -1, destIndex: number = -1;

// // //       // Buscar en qué columna está la tarea activa y la de destino
// // //       for (const column of projectData.columns) {
// // //         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
// // //         if (taskIndex !== -1) {
// // //           sourceColumn = column;
// // //           sourceIndex = taskIndex;
// // //         }

// // //         const overIndex = column.tasks.findIndex(task => task.id === over.id);
// // //         if (overIndex !== -1) {
// // //           destColumn = column;
// // //           destIndex = overIndex;
// // //         }

// // //         // Si no encontramos la tarea de destino, puede que estemos sobre una columna
// // //         if (!destColumn && column.id === over.id) {
// // //           destColumn = column;
// // //           destIndex = column.tasks.length; // Añadir al final
// // //         }
// // //       }

// // //       // Si se encontraron ambas columnas
// // //       if (sourceColumn && destColumn && sourceIndex !== -1) {
// // //         // Crear una copia profunda de las columnas para evitar mutaciones
// // //         const newColumns = projectData.columns.map(column => ({
// // //           ...column,
// // //           tasks: [...column.tasks]
// // //         }));

// // //         // Encontrar índices de las columnas en el array
// // //         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
// // //         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

// // //         // Si es la misma columna, reordenar
// // //         if (sourceColumn.id === destColumn.id) {
// // //           newColumns[sourceColIndex].tasks = arrayMove(
// // //             newColumns[sourceColIndex].tasks,
// // //             sourceIndex,
// // //             destIndex
// // //           );
// // //         } else {
// // //           // Si son columnas diferentes, mover la tarea
// // //           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
// // //           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
// // //         }

// // //         const updatedData = {
// // //           ...projectData,
// // //           columns: newColumns
// // //         };

// // //         updateProjectData(updatedData);

// // //         setNotification({
// // //           open: true,
// // //           message: 'Tarea movida correctamente',
// // //           severity: 'success'
// // //         });
// // //       }
// // //     }
// // //   };

// // //   const handleTaskClick = (task: Task) => {
// // //     setEditTaskData(task);
// // //     setEditTaskDialog(true);
// // //   };

// // //   const handleAddColumn = async () => {
// // //     if (newColumnName.trim()) {
// // //       const newColumn: Column = {
// // //         id: `col-${Date.now()}`,
// // //         name: newColumnName,
// // //         tasks: []
// // //       };

// // //       const updatedData = {
// // //         ...projectData,
// // //         columns: [...projectData.columns, newColumn]
// // //       };

// // //       await updateProjectData(updatedData);

// // //       setNewColumnName('');
// // //       setNewColumnDialog(false);

// // //       setNotification({
// // //         open: true,
// // //         message: 'Columna añadida correctamente',
// // //         severity: 'success'
// // //       });
// // //     }
// // //   };

// // //   const handleEditColumn = async () => {
// // //     if (editColumnName.trim() && selectedColumn) {
// // //       const newColumns = projectData.columns.map(column => {
// // //         if (column.id === selectedColumn.id) {
// // //           return {
// // //             ...column,
// // //             name: editColumnName
// // //           };
// // //         }
// // //         return column;
// // //       });

// // //       const updatedData = {
// // //         ...projectData,
// // //         columns: newColumns
// // //       };

// // //       await updateProjectData(updatedData);

// // //       setEditColumnDialog(false);
// // //       setSelectedColumn(null);

// // //       setNotification({
// // //         open: true,
// // //         message: 'Columna actualizada correctamente',
// // //         severity: 'success'
// // //       });
// // //     }
// // //   };

// // //   const handleDeleteColumn = async (columnId: string) => {
// // //     const newColumns = projectData.columns.filter(column => column.id !== columnId);

// // //     const updatedData = {
// // //       ...projectData,
// // //       columns: newColumns
// // //     };

// // //     await updateProjectData(updatedData);

// // //     setDeleteConfirmDialog(false);
// // //     setItemToDelete(null);

// // //     setNotification({
// // //       open: true,
// // //       message: 'Columna eliminada correctamente',
// // //       severity: 'success'
// // //     });
// // //   };

// // //   const handleAddTask = (columnId: string) => {
// // //     setSelectedColumnId(columnId);
// // //     setNewTaskData({
// // //       title: '',
// // //       description: '',
// // //       priority: 'media',
// // //       dueDate: new Date().toISOString().split('T')[0],
// // //       tags: [],
// // //       completed: false,
// // //     });
// // //     setNewTaskDialog(true);
// // //   };

// // //   const handleSaveTask = async () => {
// // //     if (newTaskData.title?.trim()) {
// // //       const newTask: Task = {
// // //         id: `task-${Date.now()}`,
// // //         title: newTaskData.title || '',
// // //         description: newTaskData.description || '',
// // //         priority: newTaskData.priority || 'media',
// // //         dueDate: newTaskData.dueDate || new Date().toISOString(),
// // //         tags: newTaskData.tags || [],
// // //         completed: newTaskData.completed || false,
// // //       };

// // //       const newColumns = projectData.columns.map(column => {
// // //         if (column.id === selectedColumnId) {
// // //           return {
// // //             ...column,
// // //             tasks: [...column.tasks, newTask]
// // //           };
// // //         }
// // //         return column;
// // //       });

// // //       const updatedData = {
// // //         ...projectData,
// // //         columns: newColumns
// // //       };

// // //       await updateProjectData(updatedData);

// // //       setNewTaskDialog(false);

// // //       setNotification({
// // //         open: true,
// // //         message: 'Tarea añadida correctamente',
// // //         severity: 'success'
// // //       });
// // //     }
// // //   };

// // //   const handleSaveEditTask = async () => {
// // //     if (editTaskData && editTaskData.title.trim()) {
// // //       const newColumns = projectData.columns.map(column => ({
// // //         ...column,
// // //         tasks: column.tasks.map(task => 
// // //           task.id === editTaskData.id ? editTaskData : task
// // //         )
// // //       }));

// // //       const updatedData = {
// // //         ...projectData,
// // //         columns: newColumns
// // //       };

// // //       await updateProjectData(updatedData);

// // //       setEditTaskDialog(false);
// // //       setEditTaskData(null);

// // //       setNotification({
// // //         open: true,
// // //         message: 'Tarea actualizada correctamente',
// // //         severity: 'success'
// // //       });
// // //     }
// // //   };

// // //   const handleDeleteTask = async (taskId: string) =>{
// // //     const newColumns = projectData.columns.map(column => ({
// // //       ...column,
// // //       tasks: column.tasks.filter(task => task.id !== taskId)
// // //     }));

// // //     const updatedData = {
// // //       ...projectData,
// // //       columns: newColumns
// // //     };

// // //     await updateProjectData(updatedData);

// // //     setNotification({
// // //       open: true,
// // //       message: 'Tarea eliminada correctamente',
// // //       severity: 'success'
// // //     });
// // //   };

// // //   const handleOpenEditColumn = (columnId: string) => {
// // //     const column = projectData.columns.find(col => col.id === columnId);
// // //     if (column) {
// // //       setSelectedColumn(column);
// // //       setEditColumnName(column.name);
// // //       setEditColumnDialog(true);
// // //     }
// // //   };

// // //   const handleOpenEditTask = (task: Task) => {
// // //     setEditTaskData(task);
// // //     setEditTaskDialog(true);
// // //   };

// // //   const handleOpenDeleteConfirm = (type: string, id: string) => {
// // //     setItemToDelete({ type, id });
// // //     setDeleteConfirmDialog(true);
// // //   };

// // //   const handleConfirmDelete = () => {
// // //     if (itemToDelete) {
// // //       if (itemToDelete.type === 'column') {
// // //         handleDeleteColumn(itemToDelete.id);
// // //       } else if (itemToDelete.type === 'task') {
// // //         handleDeleteTask(itemToDelete.id);
// // //       }
// // //     }
// // //   };

// // //   const handleTagChange = (event: any) => {
// // //     const value = event.target.value;
// // //     setNewTaskData({
// // //       ...newTaskData,
// // //       tags: typeof value === 'string' ? value.split(',') : value,
// // //     });
// // //   };

// // //   const handleEditTagChange = (event: any) => {
// // //     const value = event.target.value;
// // //     if (editTaskData) {
// // //       setEditTaskData({
// // //         ...editTaskData,
// // //         tags: typeof value === 'string' ? value.split(',') : value,
// // //       });
// // //     }
// // //   };

// // //   // Calcular estadísticas actualizadas
// // //   const calculateStats = useCallback(() => {
// // //     let totalTasks = 0;
// // //     let completedTasks = 0;
// // //     let inProgressTasks = 0;

// // //     projectData.columns.forEach(column => {
// // //       totalTasks += column.tasks.length;
// // //       column.tasks.forEach(task => {
// // //         if (task.completed) completedTasks++;
// // //         if (!task.completed && column.name !== 'Por Hacer' && column.name !== 'Terminado') inProgressTasks++;
// // //       });
// // //     });

// // //     const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

// // //     return {
// // //       totalTasks,
// // //       completedTasks,
// // //       inProgressTasks,
// // //       overdueTasks: 0, // Podrías implementar lógica para calcular tareas vencidas
// // //       completionPercentage
// // //     };
// // //   }, [projectData.columns]);

// // //   // Actualizar estadísticas cuando cambien las columnas
// // //   useEffect(() => {
// // //     const newStats = calculateStats();
// // //     setProjectData(prev => ({
// // //       ...prev,
// // //       stats: newStats
// // //     }));
// // //   }, [projectData.columns, calculateStats]);

// // //   if (isLoading) {
// // //     return (
// // //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box sx={{ flexGrow: 1, bgcolor: 'grey.200', minHeight: '100vh' }}>
// // //       <AppBar position="static" elevation={0}>
// // //         <Toolbar>
// // //           <DashboardIcon sx={{ mr: 2 }} />
// // //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// // //             {projectData.project.name}
// // //           </Typography>
// // //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
// // //             <IconButton color="inherit">
// // //               <SearchIcon />
// // //             </IconButton>
// // //             <IconButton color="inherit">
// // //               <NotificationsIcon />
// // //             </IconButton>
// // //             <IconButton color="inherit">
// // //               <AccountCircleIcon />
// // //             </IconButton>
// // //           </Box>
// // //         </Toolbar>
// // //       </AppBar>

// // //       <Box sx={{ p: 2 }}>
// // //         <Paper sx={{ p: 3, mb: 2 }}>
// // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// // //             <Box sx={{ flex: 1, minWidth: 300 }}>
// // //               <Typography variant="h4" gutterBottom>
// // //                 {projectData.project.name}
// // //               </Typography>
// // //               <Typography variant="body1" color="text.secondary" paragraph>
// // //                 {projectData.project.description}
// // //               </Typography>

// // //               <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
// // //                 <Typography variant="body2">
// // //                   Progreso del proyecto:
// // //                 </Typography>
// // //                 <Typography variant="body2" fontWeight="bold">
// // //                   {projectData.project.progress}%
// // //                 </Typography>
// // //               </Box>
// // //               <LinearProgress 
// // //                 variant="determinate" 
// // //                 value={projectData.project.progress} 
// // //                 sx={{ height: 8, borderRadius: 4, mb: 2 }}
// // //               />

// // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // //                 <Typography variant="body2">
// // //                   {new Date(projectData.project.startDate).toLocaleDateString()} - {new Date(projectData.project.deadline).toLocaleDateString()}
// // //                 </Typography>
// // //               </Box>
// // //             </Box>

// // //             <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // //                 <Typography variant="h5" fontWeight="bold">
// // //                   {projectData.stats.completedTasks}/{projectData.stats.totalTasks}
// // //                 </Typography>
// // //                 <Typography variant="body2">Completadas</Typography>
// // //               </Box>

// // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // //                 <Typography variant="h5" fontWeight="bold">
// // //                   {projectData.stats.completionPercentage}%
// // //                 </Typography>
// // //                 <Typography variant="body2">Progreso</Typography>
// // //               </Box>

// // //               <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.main', color: 'white', borderRadius: 2, minWidth: 100 }}>
// // //                 <Typography variant="h5" fontWeight="bold">
// // //                   {projectData.stats.inProgressTasks}
// // //                 </Typography>
// // //                 <Typography variant="body2">En progreso</Typography>
// // //               </Box>
// // //             </Box>
// // //           </Box>
// // //         </Paper>

// // //         <Box sx={{ overflowX: 'auto', pb: 2 }}>
// // //           <DndContext
// // //             sensors={sensors}
// // //             collisionDetection={closestCenter}
// // //             onDragStart={handleDragStart}
// // //             onDragEnd={handleDragEnd}
// // //           >
// // //             <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'min-content' }}>
// // //               <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
// // //                 {projectData.columns.map((column) => (
// // //                   <SortableColumn 
// // //                     key={column.id} 
// // //                     column={column} 
// // //                     onTaskClick={handleTaskClick}
// // //                     onAddTask={handleAddTask}
// // //                     onEditColumn={handleOpenEditColumn}
// // //                     onDeleteColumn={(id) => handleOpenDeleteConfirm('column', id)}
// // //                     onEditTask={handleOpenEditTask}
// // //                     onDeleteTask={(id) => handleOpenDeleteConfirm('task', id)}
// // //                     allTags={projectData.tags || DEFAULT_TAGS}
// // //                   />
// // //                 ))}
// // //               </SortableContext>

// // //               <Paper 
// // //                 sx={{ 
// // //                   width: 300, 
// // //                   minHeight: 200, 
// // //                   display: 'flex', 
// // //                   alignItems: 'center', 
// // //                   justifyContent: 'center',
// // //                   bgcolor: 'grey.100',
// // //                   cursor: 'pointer'
// // //                 }}
// // //                 onClick={() => setNewColumnDialog(true)}
// // //               >
// // //                 <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
// // //                   Añadir otra columna
// // //                 </Button>
// // //               </Paper>
// // //             </Box>

// // //             <DragOverlay>
// // //               {activeTask ? (
// // //                 <Card sx={{ width: 280, opacity: 0.8, boxShadow: 3 }}>
// // //                   <CardContent>
// // //                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
// // //                       {activeTask.title}
// // //                     </Typography>
// // //                   </CardContent>
// // //                 </Card>
// // //               ) : null}
// // //             </DragOverlay>
// // //           </DndContext>
// // //         </Box>

// // //         <Fab
// // //           color="primary"
// // //           aria-label="add"
// // //           sx={{ position: 'fixed', bottom: 16, right: 16 }}
// // //           onClick={() => setNewColumnDialog(true)}
// // //         >
// // //           <AddIcon />
// // //         </Fab>
// // //       </Box>

// // //       {/* Diálogo para nueva columna */}
// // //       <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
// // //         <DialogTitle>Añadir nueva columna</DialogTitle>
// // //         <DialogContent>
// // //           <TextField
// // //             autoFocus
// // //             margin="dense"
// // //             label="Nombre de la columna"
// // //             fullWidth
// // //             variant="outlined"
// // //             value={newColumnName}
// // //             onChange={(e) => setNewColumnName(e.target.value)}
// // //             onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
// // //           />
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={() => setNewColumnDialog(false)}>Cancelar</Button>
// // //           <Button onClick={handleAddColumn} variant="contained">Añadir</Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Diálogo para editar columna */}
// // //       <Dialog open={editColumnDialog} onClose={() => setEditColumnDialog(false)}>
// // //         <DialogTitle>Editar columna</DialogTitle>
// // //         <DialogContent>
// // //           <TextField
// // //             autoFocus
// // //             margin="dense"
// // //             label="Nombre de la columna"
// // //             fullWidth
// // //             variant="outlined"
// // //             value={editColumnName}
// // //             onChange={(e) => setEditColumnName(e.target.value)}
// // //             onKeyPress={(e) => e.key === 'Enter' && handleEditColumn()}
// // //           />
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={() => setEditColumnDialog(false)}>Cancelar</Button>
// // //           <Button onClick={handleEditColumn} variant="contained">Guardar</Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Diálogo para nueva tarea */}
// // //       <Dialog open={newTaskDialog} onClose={() => setNewTaskDialog(false)} maxWidth="sm" fullWidth>
// // //         <DialogTitle>Añadir nueva tarea</DialogTitle>
// // //         <DialogContent>
// // //           <TextField
// // //             autoFocus
// // //             margin="dense"
// // //             label="Título de la tarea"
// // //             fullWidth
// // //             variant="outlined"
// // //             value={newTaskData.title}
// // //             onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
// // //             sx={{ mb: 2 }}
// // //           />
// // //           <TextField
// // //             margin="dense"
// // //             label="Descripción"
// // //             fullWidth
// // //             variant="outlined"
// // //             multiline
// // //             rows={3}
// // //             value={newTaskData.description}
// // //             onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
// // //             sx={{ mb: 2 }}
// // //           />
// // //           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // //             <TextField
// // //               label="Prioridad"
// // //               select
// // //               fullWidth
// // //               SelectProps={{ native: true }}
// // //               value={newTaskData.priority}
// // //               onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
// // //             >
// // //               <option value="alta">Alta</option>
// // //               <option value="media">Media</option>
// // //               <option value="baja">Baja</option>
// // //             </TextField>
// // //             <TextField
// // //               label="Fecha de vencimiento"
// // //               type="date"
// // //               fullWidth
// // //               value={newTaskData.dueDate}
// // //               onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
// // //               InputLabelProps={{
// // //                 shrink: true,
// // //               }}
// // //             />
// // //           </Box>
// // //           <FormControl fullWidth sx={{ mb: 2 }}>
// // //             <InputLabel>Etiquetas</InputLabel>
// // //             <Select
// // //               multiple
// // //               value={newTaskData.tags}
// // //               onChange={handleTagChange}
// // //               input={<OutlinedInput label="Etiquetas" />}
// // //               renderValue={(selected) => (
// // //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // //                   {selected?.map((value:any) => {
// // //                     const tag = (projectData.tags || DEFAULT_TAGS).find(t => t.id === value);
// // //                     return (
// // //                       <Chip 
// // //                         key={value} 
// // //                         label={tag?.name || value} 
// // //                         size="small"
// // //                         sx={{ backgroundColor: tag?.color, color: 'white' }}
// // //                       />
// // //                     );
// // //                   })}
// // //                 </Box>
// // //               )}
// // //             >
// // //               {(projectData.tags || DEFAULT_TAGS).map((tag) => (
// // //                 <MenuItem key={tag.id} value={tag.id}>
// // //                   <Checkbox checked={newTaskData.tags?.indexOf(tag.id) > -1} />
// // //                   <ListItemText primary={tag.name} />
// // //                   <Box sx={{ width: 16, height: 16, backgroundColor: tag.color, borderRadius: '50%', ml: 1 }} />
// // //                 </MenuItem>
// // //               ))}
// // //             </Select>
// // //           </FormControl>
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={() => setNewTaskDialog(false)}>Cancelar</Button>
// // //           <Button onClick={handleSaveTask} variant="contained">Añadir tarea</Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Diálogo para editar tarea */}
// // //       <Dialog open={editTaskDialog} onClose={() => setEditTaskDialog(false)} maxWidth="sm" fullWidth>
// // //         <DialogTitle>Editar tarea</DialogTitle>
// // //         <DialogContent>
// // //           {editTaskData && (
// // //             <>
// // //               <TextField
// // //                 autoFocus
// // //                 margin="dense"
// // //                 label="Título de la tarea"
// // //                 fullWidth
// // //                 variant="outlined"
// // //                 value={editTaskData.title}
// // //                 onChange={(e) => setEditTaskData({...editTaskData, title: e.target.value})}
// // //                 sx={{ mb: 2 }}
// // //               />
// // //               <TextField
// // //                 margin="dense"
// // //                 label="Descripción"
// // //                 fullWidth
// // //                 variant="outlined"
// // //                 multiline
// // //                 rows={3}
// // //                 value={editTaskData.description}
// // //                 onChange={(e) => setEditTaskData({...editTaskData, description: e.target.value})}
// // //                 sx={{ mb: 2 }}
// // //               />
// // //               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// // //                 <TextField
// // //                   label="Prioridad"
// // //                   select
// // //                   fullWidth
// // //                   SelectProps={{ native: true }}
// // //                   value={editTaskData.priority}
// // //                   onChange={(e) => setEditTaskData({...editTaskData, priority: e.target.value})}
// // //                 >
// // //                   <option value="alta">Alta</option>
// // //                   <option value="media">Media</option>
// // //                   <option value="baja">Baja</option>
// // //                 </TextField>
// // //                 <TextField
// // //                   label="Fecha de vencimiento"
// // //                   type="date"
// // //                   fullWidth
// // //                   value={editTaskData.dueDate.split('T')[0]}
// // //                   onChange={(e) => setEditTaskData({...editTaskData, dueDate: e.target.value})}
// // //                   InputLabelProps={{
// // //                     shrink: true,
// // //                   }}
// // //                 />
// // //               </Box>
// // //               <FormControl fullWidth sx={{ mb: 2 }}>
// // //                 <InputLabel>Etiquetas</InputLabel>
// // //                 <Select
// // //                   multiple
// // //                   value={editTaskData.tags}
// // //                   onChange={handleEditTagChange}
// // //                   input={<OutlinedInput label="Etiquetas" />}
// // //                   renderValue={(selected) => (
// // //                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // //                       {selected.map((value) => {
// // //                         const tag = (projectData.tags || DEFAULT_TAGS).find(t => t.id === value);
// // //                         return (
// // //                           <Chip 
// // //                             key={value} 
// // //                             label={tag?.name || value} 
// // //                             size="small"
// // //                             sx={{ backgroundColor: tag?.color, color: 'white' }}
// // //                           />
// // //                         );
// // //                       })}
// // //                     </Box>
// // //                   )}
// // //                 >
// // //                   {(projectData.tags || DEFAULT_TAGS).map((tag) => (
// // //                     <MenuItem key={tag.id} value={tag.id}>
// // //                       <Checkbox checked={editTaskData.tags.indexOf(tag.id) > -1} />
// // //                       <ListItemText primary={tag.name} />
// // //                       <Box sx={{ width: 16, height: 16, backgroundColor: tag.color, borderRadius: '50%', ml: 1 }} />
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //               <FormGroup>
// // //                 <FormControlLabel 
// // //                   control={
// // //                     <Switch 
// // //                       checked={editTaskData.completed} 
// // //                       onChange={(e) => setEditTaskData({...editTaskData, completed: e.target.checked})} 
// // //                     />
// // //                   } 
// // //                   label="Tarea completada" 
// // //                 />
// // //               </FormGroup>
// // //             </>
// // //           )}
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={() => setEditTaskDialog(false)}>Cancelar</Button>
// // //           <Button onClick={handleSaveEditTask} variant="contained">Guardar cambios</Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Diálogo de confirmación para eliminar */}
// // //       <Dialog open={deleteConfirmDialog} onClose={() => setDeleteConfirmDialog(false)}>
// // //         <DialogTitle>Confirmar eliminación</DialogTitle>
// // //         <DialogContent>
// // //           <Typography>
// // //             ¿Estás seguro de que quieres eliminar este {itemToDelete?.type === 'column' ? 'columna' : 'tarea'}? 
// // //             Esta acción no se puede deshacer.
// // //           </Typography>
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={() => setDeleteConfirmDialog(false)}>Cancelar</Button>
// // //           <Button onClick={handleConfirmDelete} variant="contained" color="error">
// // //             Eliminar
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       <Snackbar
// // //         open={notification.open}
// // //         autoHideDuration={3000}
// // //         onClose={() => setNotification({...notification, open: false})}
// // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // //       >
// // //         <Alert 
// // //           onClose={() => setNotification({...notification, open: false})} 
// // //           severity={notification.severity as any} 
// // //           sx={{ width: '100%' }}
// // //         >
// // //           {notification.message}
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // export default TrelloBoard;









// // import React, { useState } from 'react';
// // import {
// //   DndContext,
// //   closestCenter,
// //   KeyboardSensor,
// //   PointerSensor,
// //   useSensor,
// //   useSensors,
// //   DragEndEvent,
// //   DragStartEvent,
// //   DragOverlay,
// // } from '@dnd-kit/core';
// // import {
// //   arrayMove,
// //   SortableContext,
// //   sortableKeyboardCoordinates,
// //   verticalListSortingStrategy,
// //   useSortable,
// // } from '@dnd-kit/sortable';
// // import { CSS } from '@dnd-kit/utilities';
// // import {
// //   Paper,
// //   Typography,
// //   Box,
// //   Button,
// //   IconButton,
// //   TextField,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   Chip,
// //   Avatar,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   useTheme,
// //   useMediaQuery,
// // } from '@mui/material';
// // import {
// //   Add as AddIcon,
// //   MoreVert as MoreVertIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   DragIndicator as DragIndicatorIcon
// // } from '@mui/icons-material';

// // // Interfaz para los tipos de datos
// // interface Tag {
// //   name: string;
// //   color?: string;
// // }

// // interface Task {
// //   id: string;
// //   title: string;
// //   description: string;
// //   priority: string;
// //   dueDate: string;
// //   tags: Tag[];
// // }

// // interface Column {
// //   id: string;
// //   name: string;
// //   tasks: Task[];
// // }

// // interface ProjectData {
// //   project: {
// //     id: string;
// //     name: string;
// //     description: string;
// //     startDate: string;
// //     deadline: string;
// //     progress: number;
// //   };
// //   columns: Column[];
// //   stats: {
// //     totalTasks: number;
// //     completedTasks: number;
// //     inProgressTasks: number;
// //     overdueTasks: number;
// //     completionPercentage: number;
// //   };
// // }

// // // Componente para tareas sortable
// // const SortableTask = ({ task, onClick }: { task: Task; onClick: (task: Task) => void }) => {
// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //     isDragging,
// //   } = useSortable({ id: task.id });

// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //     opacity: isDragging ? 0.5 : 1,
// //   };

// //   const getPriorityColor = (priority: string) => {
// //     switch (priority) {
// //       case 'alta': return '#f44336';
// //       case 'media': return '#ff9800';
// //       case 'baja': return '#4caf50';
// //       default: return '#9e9e9e';
// //     }
// //   };

// //   // Función para renderizar tags de manera segura
// //   const renderTags = () => {
// //     return task.tags.map((tag, index) => {
// //       const tagName = typeof tag === 'string' ? tag : tag.name;
// //       return (
// //         <Chip
// //           key={index}
// //           label={tagName}
// //           size="small"
// //           sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
// //           variant="outlined"
// //         />
// //       );
// //     });
// //   };

// //   return (
// //     <Card
// //       ref={setNodeRef}
// //       style={style}
// //       {...attributes}
// //       {...listeners}
// //       sx={{
// //         mb: 1,
// //         cursor: 'grab',
// //         '&:hover': {
// //           boxShadow: 3,
// //         },
// //         position: 'relative',
// //       }}
// //       onClick={() => onClick(task)}
// //     >
// //       <Box sx={{ position: 'absolute', left: 4, top: 4, opacity: 0.5 }}>
// //         <DragIndicatorIcon fontSize="small" />
// //       </Box>
// //       <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pr: 2 }}>
// //             {task.title}
// //           </Typography>
// //           <Box
// //             sx={{
// //               width: 12,
// //               height: 12,
// //               borderRadius: '50%',
// //               backgroundColor: getPriorityColor(task.priority),
// //               flexShrink: 0,
// //             }}
// //           />
// //         </Box>
// //         <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
// //           {task.description}
// //         </Typography>
// //         <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
// //           {renderTags()}
// //         </Box>
// //       </CardContent>
// //       <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
// //         <Typography variant="caption" color="text.secondary">
// //           Vence: {new Date(task.dueDate).toLocaleDateString()}
// //         </Typography>
// //         <Box>
// //           <IconButton size="small">
// //             <EditIcon fontSize="small" />
// //           </IconButton>
// //           <IconButton size="small">
// //             <DeleteIcon fontSize="small" />
// //           </IconButton>
// //         </Box>
// //       </CardActions>
// //     </Card>
// //   );
// // };

// // // Componente para columnas sortable
// // const SortableColumn = ({
// //   column,
// //   onTaskClick,
// //   onAddTask
// // }: {
// //   column: Column;
// //   onTaskClick: (task: Task) => void;
// //   onAddTask: (columnId: string) => void;
// // }) => {
// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //     isDragging,
// //   } = useSortable({ id: column.id });

// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //     opacity: isDragging ? 0.5 : 1,
// //   };

// //   return (
// //     <Paper
// //       ref={setNodeRef}
// //       style={style}
// //       {...attributes}
// //       {...listeners}
// //       sx={{
// //         width: 300,
// //         minHeight: 500,
// //         display: 'flex',
// //         flexDirection: 'column',
// //         bgcolor: isDragging ? 'action.hover' : 'grey.100',
// //       }}
// //     >
// //       <Box sx={{
// //         p: 2,
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         bgcolor: 'primary.main',
// //         color: 'primary.contrastText'
// //       }}>
// //         <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// //           {column.name}
// //         </Typography>
// //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //           <Chip
// //             label={column.tasks.length}
// //             size="small"
// //             sx={{ color: 'primary.contrastText', bgcolor: 'rgba(255,255,255,0.2)' }}
// //           />
// //           <IconButton size="small" sx={{ color: 'primary.contrastText' }}>
// //             <MoreVertIcon />
// //           </IconButton>
// //         </Box>
// //       </Box>

// //       <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
// //         <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
// //           {column.tasks.map((task) => (
// //             <SortableTask key={task.id} task={task} onClick={onTaskClick} />
// //           ))}
// //         </SortableContext>
// //       </Box>

// //       <Button
// //         startIcon={<AddIcon />}
// //         sx={{ m: 1, justifyContent: 'flex-start' }}
// //         onClick={() => onAddTask(column.id)}
// //       >
// //         Añadir tarea
// //       </Button>
// //     </Paper>
// //   );
// // };

// // // Componente principal del tablero
// // const TrelloBoard = ({ data }: { data: any }) => {
// //   const [projectData, setProjectData] = useState<ProjectData>(data.data);
// //   const [activeId, setActiveId] = useState<string | null>(null);
// //   const [activeTask, setActiveTask] = useState<Task | null>(null);
// //   const [newColumnDialog, setNewColumnDialog] = useState(false);
// //   const [newTaskDialog, setNewTaskDialog] = useState(false);
// //   const [newColumnName, setNewColumnName] = useState('');
// //   const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
// //     title: '',
// //     description: '',
// //     priority: 'media',
// //     dueDate: new Date().toISOString().split('T')[0],
// //   });
// //   const [selectedColumnId, setSelectedColumnId] = useState<string>('');

// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// //   const sensors = useSensors(
// //     useSensor(PointerSensor),
// //     useSensor(KeyboardSensor, {
// //       coordinateGetter: sortableKeyboardCoordinates,
// //     })
// //   );

// //   const handleDragStart = (event: DragStartEvent) => {
// //     setActiveId(event.active.id as string);

// //     // Encontrar la tarea activa para el overlay
// //     for (const column of projectData.columns) {
// //       const task = column.tasks.find(t => t.id === event.active.id);
// //       if (task) {
// //         setActiveTask(task);
// //         break;
// //       }
// //     }
// //   };

// //   const handleDragEnd = (event: DragEndEvent) => {
// //     const { active, over } = event;
// //     setActiveId(null);
// //     setActiveTask(null);

// //     if (!over) return;

// //     if (active.id !== over.id) {
// //       // Encontrar las columnas de origen y destino
// //       let sourceColumn: Column | undefined, destColumn: Column | undefined;
// //       let sourceIndex: number = -1, destIndex: number = -1;

// //       // Buscar en qué columna está la tarea activa y la de destino
// //       for (const column of projectData.columns) {
// //         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
// //         if (taskIndex !== -1) {
// //           sourceColumn = column;
// //           sourceIndex = taskIndex;
// //         }

// //         const overIndex = column.tasks.findIndex(task => task.id === over.id);
// //         if (overIndex !== -1) {
// //           destColumn = column;
// //           destIndex = overIndex;
// //         }

// //         // Si no encontramos la tarea de destino, puede que estemos sobre una columna
// //         if (!destColumn && column.id === over.id) {
// //           destColumn = column;
// //           destIndex = column.tasks.length; // Añadir al final
// //         }
// //       }

// //       // Si se encontraron ambas columnas
// //       if (sourceColumn && destColumn && sourceIndex !== -1) {
// //         // Crear una copia profunda de las columnas para evitar mutaciones
// //         const newColumns = projectData.columns.map(column => ({
// //           ...column,
// //           tasks: [...column.tasks]
// //         }));

// //         // Encontrar índices de las columnas en el array
// //         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
// //         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

// //         // Si es la misma columna, reordenar
// //         if (sourceColumn.id === destColumn.id) {
// //           newColumns[sourceColIndex].tasks = arrayMove(
// //             newColumns[sourceColIndex].tasks,
// //             sourceIndex,
// //             destIndex
// //           );
// //         } else {
// //           // Si son columnas diferentes, mover la tarea
// //           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
// //           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
// //         }

// //         setProjectData({
// //           ...projectData,
// //           columns: newColumns
// //         });
// //       }
// //     }
// //   };

// //   const handleTaskClick = (task: Task) => {
// //     console.log("Tarea seleccionada:", task);
// //     // Aquí puedes abrir un modal de edición
// //   };

// //   const handleAddColumn = () => {
// //     if (newColumnName.trim()) {
// //       const newColumn: Column = {
// //         id: `col-${Date.now()}`,
// //         name: newColumnName,
// //         tasks: []
// //       };

// //       setProjectData({
// //         ...projectData,
// //         columns: [...projectData.columns, newColumn]
// //       });

// //       setNewColumnName('');
// //       setNewColumnDialog(false);
// //     }
// //   };

// //   const handleAddTask = (columnId: string) => {
// //     setSelectedColumnId(columnId);
// //     setNewTaskData({
// //       title: '',
// //       description: '',
// //       priority: 'media',
// //       dueDate: new Date().toISOString().split('T')[0],
// //     });
// //     setNewTaskDialog(true);
// //   };

// //   const handleSaveTask = () => {
// //     if (newTaskData.title?.trim()) {
// //       const newTask: Task = {
// //         id: `task-${Date.now()}`,
// //         title: newTaskData.title || '',
// //         description: newTaskData.description || '',
// //         priority: newTaskData.priority || 'media',
// //         dueDate: newTaskData.dueDate || new Date().toISOString(),
// //         tags: []
// //       };

// //       const newColumns = projectData.columns.map(column => {
// //         if (column.id === selectedColumnId) {
// //           return {
// //             ...column,
// //             tasks: [...column.tasks, newTask]
// //           };
// //         }
// //         return column;
// //       });

// //       setProjectData({
// //         ...projectData,
// //         columns: newColumns
// //       });

// //       setNewTaskDialog(false);
// //     }
// //   };

// //   return (
// //     <Box sx={{ p: 2, bgcolor: 'grey.200', minHeight: '100vh' }}>
// //       <Paper sx={{ p: 3, mb: 2 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// //           <Box>
// //             <Typography variant="h4" gutterBottom>
// //               {projectData.project.name}
// //             </Typography>
// //             <Typography variant="body1" color="text.secondary">
// //               {projectData.project.description}
// //             </Typography>
// //           </Box>

// //           <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// //             <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'success.light', color: 'white', borderRadius: 1 }}>
// //               <Typography variant="h6">
// //                 {projectData.stats.completedTasks}/{projectData.stats.totalTasks}
// //               </Typography>
// //               <Typography variant="body2">Tareas completadas</Typography>
// //             </Box>

// //             <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
// //               <Typography variant="h6">
// //                 {projectData.stats.completionPercentage}%
// //               </Typography>
// //               <Typography variant="body2">Progreso</Typography>
// //             </Box>
// //           </Box>
// //         </Box>
// //       </Paper>

// //       <Box sx={{ overflowX: 'auto', pb: 2 }}>
// //         <DndContext
// //           sensors={sensors}
// //           collisionDetection={closestCenter}
// //           onDragStart={handleDragStart}
// //           onDragEnd={handleDragEnd}
// //         >
// //           <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
// //             <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
// //               {projectData.columns.map((column) => (
// //                 <SortableColumn
// //                   key={column.id}
// //                   column={column}
// //                   onTaskClick={handleTaskClick}
// //                   onAddTask={handleAddTask}
// //                 />
// //               ))}
// //             </SortableContext>

// //             <Paper
// //               sx={{
// //                 width: 300,
// //                 minHeight: 200,
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 bgcolor: 'grey.100',
// //                 cursor: 'pointer'
// //               }}
// //               onClick={() => setNewColumnDialog(true)}
// //             >
// //               <Button startIcon={<AddIcon />} sx={{ py: 2 }}>
// //                 Añadir otra columna
// //               </Button>
// //             </Paper>
// //           </Box>

// //           <DragOverlay>
// //             {activeTask ? (
// //               <Card sx={{ width: 280, opacity: 0.8, boxShadow: 3 }}>
// //                 <CardContent>
// //                   <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
// //                     {activeTask.title}
// //                   </Typography>
// //                 </CardContent>
// //               </Card>
// //             ) : null}
// //           </DragOverlay>
// //         </DndContext>
// //       </Box>

// //       {/* Diálogo para nueva columna */}
// //       <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
// //         <DialogTitle>Añadir nueva columna</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             autoFocus
// //             margin="dense"
// //             label="Nombre de la columna"
// //             fullWidth
// //             variant="outlined"
// //             value={newColumnName}
// //             onChange={(e) => setNewColumnName(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setNewColumnDialog(false)}>Cancelar</Button>
// //           <Button onClick={handleAddColumn} variant="contained">Añadir</Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Diálogo para nueva tarea */}
// //       <Dialog open={newTaskDialog} onClose={() => setNewTaskDialog(false)} maxWidth="sm" fullWidth>
// //         <DialogTitle>Añadir nueva tarea</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             autoFocus
// //             margin="dense"
// //             label="Título de la tarea"
// //             fullWidth
// //             variant="outlined"
// //             value={newTaskData.title}
// //             onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
// //             sx={{ mb: 2 }}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Descripción"
// //             fullWidth
// //             variant="outlined"
// //             multiline
// //             rows={3}
// //             value={newTaskData.description}
// //             onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
// //             sx={{ mb: 2 }}
// //           />
// //           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// //             <TextField
// //               label="Prioridad"
// //               select
// //               fullWidth
// //               SelectProps={{ native: true }}
// //               value={newTaskData.priority}
// //               onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value })}
// //             >
// //               <option value="alta">Alta</option>
// //               <option value="media">Media</option>
// //               <option value="baja">Baja</option>
// //             </TextField>
// //             <TextField
// //               label="Fecha de vencimiento"
// //               type="date"
// //               fullWidth
// //               value={newTaskData.dueDate}
// //               onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
// //               InputLabelProps={{
// //                 shrink: true,
// //               }}
// //             />
// //           </Box>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setNewTaskDialog(false)}>Cancelar</Button>
// //           <Button onClick={handleSaveTask} variant="contained">Añadir tarea</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default TrelloBoard;




// import React, { useState } from 'react';
// import {
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
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import {
//   Box,
//   Paper,
//   Button
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';

// import { ProjectData, Task, Column } from '@/types/types';
// import { ProjectHeader } from '../dashboardGeneral/ProjectHeader';
// import { SortableColumn } from '../dashboardGeneral/Column/SortableColumn';
// import { TaskCard } from '../dashboardGeneral/Task/TaskCard';
// import { AddColumnDialog } from '../dashboardGeneral/Dialogs/AddColumnDialog';
// import { AddTaskDialog } from '../dashboardGeneral/Dialogs/AddTaskDialog';


// interface TrelloBoardProps {
//   data: { data: ProjectData };
// }

// export const TrelloBoard: React.FC<TrelloBoardProps> = ({ data }) => {
//   const [projectData, setProjectData] = useState<ProjectData>(data.data);
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [activeTask, setActiveTask] = useState<Task | null>(null);
//   const [newColumnDialog, setNewColumnDialog] = useState(false);
//   const [newTaskDialog, setNewTaskDialog] = useState(false);
//   const [newColumnName, setNewColumnName] = useState('');
//   const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
//     title: '',
//     description: '',
//     priority: 'media',
//     dueDate: new Date().toISOString().split('T')[0],
//   });
//   const [selectedColumnId, setSelectedColumnId] = useState<string>('');

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragStart = (event: DragStartEvent) => {
//     setActiveId(event.active.id as string);

//     for (const column of projectData.columns) {
//       const task = column.tasks.find(t => t.id === event.active.id);
//       if (task) {
//         setActiveTask(task);
//         break;
//       }
//     }
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     setActiveId(null);
//     setActiveTask(null);

//     if (!over) return;

//     if (active.id !== over.id) {
//       let sourceColumn: Column | undefined, destColumn: Column | undefined;
//       let sourceIndex: number = -1, destIndex: number = -1;

//       for (const column of projectData.columns) {
//         const taskIndex = column.tasks.findIndex(task => task.id === active.id);
//         if (taskIndex !== -1) {
//           sourceColumn = column;
//           sourceIndex = taskIndex;
//         }

//         const overIndex = column.tasks.findIndex(task => task.id === over.id);
//         if (overIndex !== -1) {
//           destColumn = column;
//           destIndex = overIndex;
//         }

//         if (!destColumn && column.id === over.id) {
//           destColumn = column;
//           destIndex = column.tasks.length;
//         }
//       }

//       if (sourceColumn && destColumn && sourceIndex !== -1) {
//         const newColumns = projectData.columns.map(column => ({
//           ...column,
//           tasks: [...column.tasks]
//         }));

//         const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
//         const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

//         if (sourceColumn.id === destColumn.id) {
//           newColumns[sourceColIndex].tasks = arrayMove(
//             newColumns[sourceColIndex].tasks,
//             sourceIndex,
//             destIndex
//           );
//         } else {
//           const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
//           newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
//         }

//         setProjectData({
//           ...projectData,
//           columns: newColumns
//         });
//       }
//     }
//   };

//   const handleTaskClick = (task: Task) => {
//     console.log("Tarea seleccionada:", task);
//   };

//   const handleAddColumn = () => {
//     if (newColumnName.trim()) {
//       const newColumn: Column = {
//         id: `col-${Date.now()}`,
//         name: newColumnName,
//         tasks: []
//       };

//       setProjectData({
//         ...projectData,
//         columns: [...projectData.columns, newColumn]
//       });

//       setNewColumnName('');
//       setNewColumnDialog(false);
//     }
//   };

//   const handleAddTask = (columnId: string) => {
//     setSelectedColumnId(columnId);
//     setNewTaskData({
//       title: '',
//       description: '',
//       priority: 'media',
//       dueDate: new Date().toISOString().split('T')[0],
//     });
//     setNewTaskDialog(true);
//   };

//   const handleSaveTask = (taskData: Partial<Task>) => {
//     if (taskData.title?.trim()) {
//       const newTask: Task = {
//         id: `task-${Date.now()}`,
//         title: taskData.title || '',
//         description: taskData.description || '',
//         priority: taskData.priority || 'media',
//         dueDate: taskData.dueDate || new Date().toISOString(),
//         tags: []
//       };

//       const newColumns = projectData.columns.map(column => {
//         if (column.id === selectedColumnId) {
//           return {
//             ...column,
//             tasks: [...column.tasks, newTask]
//           };
//         }
//         return column;
//       });

//       setProjectData({
//         ...projectData,
//         columns: newColumns
//       });

//       setNewTaskDialog(false);
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
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
//             <SortableContext items={projectData.columns.map(c => c.id)} strategy={verticalListSortingStrategy}>
//               {projectData.columns.map((column) => (
//                 <SortableColumn
//                   key={column.id}
//                   column={column}
//                   onTaskClick={handleTaskClick}
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
//                 cursor: 'pointer'
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
//               <TaskCard task={activeTask} onClick={() => {}} isDragging={true} />
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

//       <AddTaskDialog
//         open={newTaskDialog}
//         onClose={() => setNewTaskDialog(false)}
//         onSave={handleSaveTask}
//         taskData={newTaskData}
//         onTaskDataChange={setNewTaskData}
//       />
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Box,
  Paper,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { ProjectData, Task, Column } from '@/types/types';
import { ProjectHeader } from '../dashboardGeneral/ProjectHeader';
import { SortableColumn } from '../dashboardGeneral/Column/SortableColumn';
import { TaskCard } from '../dashboardGeneral/Task/TaskCard';
import { AddColumnDialog } from '../dashboardGeneral/Dialogs/AddColumnDialog';
import { AddTaskDialog } from '../dashboardGeneral/Dialogs/AddTaskDialog';

interface TrelloBoardProps {
  data: { data: ProjectData };
}

export const TrelloBoard: React.FC<TrelloBoardProps> = ({ data }) => {
  const [projectData, setProjectData] = useState<ProjectData>(data.data);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newColumnDialog, setNewColumnDialog] = useState(false);
  const [newTaskDialog, setNewTaskDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newTaskData, setNewTaskData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'media',
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // Buscar la tarea activa de manera segura
    let foundTask: Task | null = null;
    for (const column of projectData.columns) {
      const task = column.tasks.find(t => t.id === active.id);
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
        let sourceIndex: number = -1, destIndex: number = -1;

        // Encontrar columnas de origen y destino
        for (const column of projectData.columns) {
          // Buscar tarea activa
          const taskIndex = column.tasks.findIndex(task => task.id === active.id);
          if (taskIndex !== -1) {
            sourceColumn = column;
            sourceIndex = taskIndex;
          }

          // Buscar sobre qué se está soltando
          const overTaskIndex = column.tasks.findIndex(task => task.id === over.id);
          if (overTaskIndex !== -1) {
            destColumn = column;
            destIndex = overTaskIndex;
          }

          // Si no se encontró una tarea, verificar si es sobre la columna
          if (!destColumn && column.id === over.id) {
            destColumn = column;
            destIndex = column.tasks.length; // Agregar al final
          }
        }

        if (sourceColumn && destColumn && sourceIndex !== -1) {
          const newColumns = projectData.columns.map(column => ({
            ...column,
            tasks: [...column.tasks]
          }));

          const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id);
          const destColIndex = newColumns.findIndex(col => col.id === destColumn!.id);

          if (sourceColumn.id === destColumn.id) {
            // Mover dentro de la misma columna
            newColumns[sourceColIndex].tasks = arrayMove(
              newColumns[sourceColIndex].tasks,
              sourceIndex,
              destIndex
            );
          } else {
            // Mover entre columnas
            const [movedTask] = newColumns[sourceColIndex].tasks.splice(sourceIndex, 1);
            newColumns[destColIndex].tasks.splice(destIndex, 0, movedTask);
          }

          setProjectData({
            ...projectData,
            columns: newColumns
          });
        }
      }
    } catch (error) {
      console.error('Error en drag and drop:', error);
    }
  };

  const handleTaskClick = (task: Task) => {
    console.log("Tarea seleccionada:", task);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: Column = {
        id: `col-${Date.now()}`,
        name: newColumnName.trim(),
        tasks: []
      };

      setProjectData(prevData => ({
        ...prevData,
        columns: [...prevData.columns, newColumn]
      }));

      setNewColumnName('');
      setNewColumnDialog(false);
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setNewTaskData({
      title: '',
      description: '',
      priority: 'media',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setNewTaskDialog(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.title?.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title.trim() || '',
        description: taskData.description || '',
        priority: taskData.priority || 'media',
        dueDate: taskData.dueDate || new Date().toISOString(),
        tags: taskData.tags || []
      };

      setProjectData(prevData => ({
        ...prevData,
        columns: prevData.columns.map(column => {
          if (column.id === selectedColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, newTask]
            };
          }
          return column;
        })
      }));

      setNewTaskDialog(false);
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'grey.200', minHeight: '100vh' }}>
      <ProjectHeader project={projectData.project} stats={projectData.stats} />

      <Box sx={{ overflowX: 'auto', pb: 2 }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 'max-content' }}>
            <SortableContext 
              items={projectData.columns.map(c => c.id)} 
              strategy={verticalListSortingStrategy}
            >
              {projectData.columns.map((column) => (
                <SortableColumn
                  key={column.id}
                  column={column}
                  onTaskClick={handleTaskClick}
                  onAddTask={() => handleAddTask(column.id)}
                />
              ))}
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
            {activeTask ? (
              <Box sx={{ maxWidth: 300, opacity: 0.8 }}>
                <TaskCard 
                  task={activeTask} 
                  onClick={() => {}} 
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

      <AddTaskDialog
        open={newTaskDialog}
        onClose={() => setNewTaskDialog(false)}
        onSave={handleSaveTask}
        taskData={newTaskData}
        onTaskDataChange={setNewTaskData}
      />
    </Box>
  );
};

export default TrelloBoard;