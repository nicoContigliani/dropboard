// components/KanbanBoard.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Card,
    CardContent,
    IconButton,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    useMediaQuery,
    Chip,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    DragIndicator as DragIndicatorIcon,
    MoreVert as MoreVertIcon,
    Flag as FlagIcon
} from '@mui/icons-material';

// Interfaces TypeScript
export interface Tag {
    name: string;
    color?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'alta' | 'media' | 'baja';
    dueDate: string;
    tags: Tag[];
}

export interface Column {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    deadline: string;
    progress: number;
}

export interface KanbanData {
    project: Project;
    columns: Column[];
    stats: {
        totalTasks: number;
        completedTasks: number;
        inProgressTasks: number;
        overdueTasks: number;
        completionPercentage: number;
    };
}

interface KanbanBoardProps {
    data: KanbanData;
    onUpdateData: (data: KanbanData) => void;
}

// Componente para las Cards (Tasks)
const TaskCard: React.FC<{
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onDragStart: (e: React.DragEvent, task: Task) => void;
}> = ({ task, onEdit, onDelete, onDragStart }) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const priorityColors = {
        alta: '#f44336',
        media: '#ff9800',
        baja: '#4caf50'
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEdit = () => {
        onEdit(task);
        handleMenuClose();
    };

    const handleDelete = () => {
        onDelete(task.id);
        handleMenuClose();
    };

    return (
        <Card
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            sx={{
                mb: 2,
                position: 'relative',
                cursor: 'grab',
                transition: 'all 0.2s ease',
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <CardContent sx={{ pb: 1, pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <DragIndicatorIcon sx={{ color: 'action.active', mr: 1 }} />
                        <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 0 }}>
                            {task.title}
                        </Typography>
                    </Box>

                    <IconButton size="small" onClick={handleMenuOpen}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>

                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MenuItem onClick={handleEdit}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, ml: 4 }}>
                    {task.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 4 }}>
                    <FlagIcon sx={{
                        fontSize: 16,
                        mr: 1,
                        color: priorityColors[task.priority]
                    }} />
                    <Typography variant="caption" textTransform="capitalize">
                        {task.priority} priority
                    </Typography>
                </Box>

                {task.dueDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 4 }}>
                        <Typography variant="caption">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                )}

                {task.tags && task.tags.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1, ml: 4 }}>
                        {task.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag.name}
                                size="small"
                                sx={{
                                    height: 20,
                                    '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                                }}
                            />
                        ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

// Componente para las Columnas
const KanbanColumn: React.FC<{
    column: Column;
    onEditColumn: (column: Column) => void;
    onDeleteColumn: (columnId: string) => void;
    onAddTask: (columnId: string) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
    onDragStart: (e: React.DragEvent, task: Task) => void;
    onDrop: (e: React.DragEvent, columnId: string) => void;
    onDragOver: (e: React.DragEvent) => void;
}> = ({
    column,
    onEditColumn,
    onDeleteColumn,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onDragStart,
    onDrop,
    onDragOver
}) => {
        const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

        const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
            setMenuAnchor(event.currentTarget);
        };

        const handleMenuClose = () => {
            setMenuAnchor(null);
        };

        const handleEditColumn = () => {
            onEditColumn(column);
            handleMenuClose();
        };

        const handleDeleteColumn = () => {
            onDeleteColumn(column.id);
            handleMenuClose();
        };

        return (
            <Paper
                onDrop={(e) => onDrop(e, column.id)}
                onDragOver={onDragOver}
                sx={{
                    width: 300,
                    minWidth: 300,
                    maxHeight: '80vh',
                    overflow: 'auto',
                    p: 2,
                    mx: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                    }}
                >
                    <Typography
                        variant="h6"
                        onClick={handleEditColumn}
                        sx={{
                            cursor: 'pointer',
                            flexGrow: 1,
                            fontWeight: 'bold',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        {column.name}
                    </Typography>

                    <Box>
                        <IconButton
                            size="small"
                            onClick={handleMenuOpen}
                        >
                            <MoreVertIcon fontSize="small" />
                        </IconButton>

                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleEditColumn}>
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleDeleteColumn}>
                                <ListItemIcon>
                                    <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, minHeight: '100px' }}>
                    {column.tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onDragStart={onDragStart}
                        />
                    ))}
                </Box>

                <Button
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => onAddTask(column.id)}
                    sx={{ mt: 1 }}
                >
                    Add Task
                </Button>
            </Paper>
        );
    };

// Componente Principal del Tablero Kanban
const KanbanBoard: React.FC<KanbanBoardProps> = ({ data, onUpdateData }) => {
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editingColumn, setEditingColumn] = useState<Column | null>(null);
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
    const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');
    const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Funciones para modificar el estado
    const updateColumn = (columnId: string, updates: Partial<Column>) => {
        const newColumns = data.columns.map(column =>
            column.id === columnId ? { ...column, ...updates } : column
        );
        onUpdateData({ ...data, columns: newColumns });
    };

    // Funciones CRUD para Columnas
    const addColumn = () => {
        const newColumn: Column = {
            id: `col-${Date.now()}`,
            name: newColumnName || 'New Column',
            tasks: []
        };

        onUpdateData({
            ...data,
            columns: [...data.columns, newColumn]
        });

        setNewColumnName('');
        setIsColumnDialogOpen(false);
    };

    const editColumn = (column: Column) => {
        setEditingColumn(column);
        setNewColumnName(column.name);
        setIsColumnDialogOpen(true);
    };

    const updateColumnName = () => {
        if (!editingColumn) return;

        const newColumns = data.columns.map(col =>
            col.id === editingColumn.id
                ? { ...col, name: newColumnName }
                : col
        );

        onUpdateData({ ...data, columns: newColumns });
        setIsColumnDialogOpen(false);
        setEditingColumn(null);
        setNewColumnName('');
    };

    const deleteColumn = (columnId: string) => {
        const newColumns = data.columns.filter(column => column.id !== columnId);
        onUpdateData({ ...data, columns: newColumns });
    };

    // Funciones CRUD para Tasks
    const addTask = (columnId: string) => {
        setActiveColumnId(columnId);
        setEditingTask({
            id: `task-${Date.now()}`,
            title: '',
            description: '',
            priority: 'media',
            dueDate: new Date().toISOString().split('T')[0],
            tags: []
        });
        setIsTaskDialogOpen(true);
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
        setIsTaskDialogOpen(true);
    };

    const saveTask = () => {
        if (!editingTask) return;

        const columnId = activeColumnId || findColumnByTaskId(editingTask.id)?.id;
        if (!columnId) return;

        // Si es una nueva tarea
        if (!findTask(editingTask.id)) {
            const newColumns = data.columns.map(column =>
                column.id === columnId
                    ? { ...column, tasks: [...column.tasks, editingTask] }
                    : column
            );
            onUpdateData({ ...data, columns: newColumns });
        } else {
            // Si es una tarea existente
            const newColumns = data.columns.map(column => ({
                ...column,
                tasks: column.tasks.map(task =>
                    task.id === editingTask.id ? editingTask : task
                )
            }));
            onUpdateData({ ...data, columns: newColumns });
        }

        setIsTaskDialogOpen(false);
        setEditingTask(null);
        setActiveColumnId(null);
    };

    const deleteTask = (taskId: string) => {
        const newColumns = data.columns.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
        }));
        onUpdateData({ ...data, columns: newColumns });
    };

    // Funciones auxiliares para encontrar elementos
    const findTask = (id: string): Task | undefined => {
        for (const column of data.columns) {
            const task = column.tasks.find(task => task.id === id);
            if (task) return task;
        }
        return undefined;
    };

    const findColumnByTaskId = (taskId: string): Column | undefined => {
        return data.columns.find(column =>
            column.tasks.some(task => task.id === taskId)
        );
    };

    // Handlers para Drag & Drop
    const handleDragStart = (e: React.DragEvent, task: Task) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.effectAllowed = 'move';
        setDraggedTask(task);

        // Efecto visual al arrastrar
        const card = e.currentTarget as HTMLElement;
        card.style.opacity = '0.5';
    };
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Efecto visual al pasar sobre una columna
        const column = e.currentTarget as HTMLElement;
        column.style.backgroundColor = theme.palette.action.hover;
    };

    const handleDragLeave = (e: React.DragEvent) => {
        // Quitar efecto visual al salir de una columna
        const column = e.currentTarget as HTMLElement;
        column.style.backgroundColor = '';
    };

    const handleDrop = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();

        // Quitar efecto visual
        const column = e.currentTarget as HTMLElement;
        column.style.backgroundColor = '';

        const taskId = e.dataTransfer.getData('taskId');
        const task = findTask(taskId);

        if (!task) return;

        // Remover la tarea de su columna actual
        const sourceColumns = data.columns.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
        }));

        // Agregar la tarea a la nueva columna
        const newColumns = sourceColumns.map(column =>
            column.id === columnId
                ? { ...column, tasks: [...column.tasks, task] }
                : column
        );

        onUpdateData({ ...data, columns: newColumns });
        setDraggedTask(null);
    };

    // Restaurar opacidad de las tarjetas después de arrastrar
    useEffect(() => {
        const cards = document.querySelectorAll('.MuiCard-root');
        cards.forEach(card => {
            (card as HTMLElement).style.opacity = '1';
        });
    }, [data]);

    return (
        <Box sx={{ p: isMobile ? 1 : 2 }}>
            {/* Header del Proyecto */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {data.project.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {data.project.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
                    <Chip
                        avatar={<Avatar>{data.project.progress}%</Avatar>}
                        label="Progress"
                        variant="outlined"
                    />
                    <Typography variant="body2">
                        Start: {new Date(data.project.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        Deadline: {new Date(data.project.deadline).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        Tasks: {data.stats.totalTasks} (Completed: {data.stats.completedTasks})
                    </Typography>
                </Box>
            </Box>

            {/* Botón para agregar columna */}
            <Button
                startIcon={<AddIcon />}
                onClick={() => {
                    setEditingColumn(null);
                    setNewColumnName('');
                    setIsColumnDialogOpen(true);
                }}
                sx={{ mb: 2 }}
            >
                Add Column
            </Button>

            {/* Tablero Kanban */}
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    pb: 2,
                    minHeight: '500px',
                    alignItems: 'flex-start'
                }}
            >
                {data.columns.map(column => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        onEditColumn={editColumn}
                        onDeleteColumn={deleteColumn}
                        onAddTask={addTask}
                        onEditTask={editTask}
                        onDeleteTask={deleteTask}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    />
                ))}
            </Box>

            {/* Diálogo para agregar/editar columna */}
            <Dialog
                open={isColumnDialogOpen}
                onClose={() => setIsColumnDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {editingColumn ? 'Edit Column' : 'Add New Column'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Column Name"
                        fullWidth
                        variant="outlined"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                editingColumn ? updateColumnName() : addColumn();
                            }
                        }}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsColumnDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={editingColumn ? updateColumnName : addColumn}
                        disabled={!newColumnName.trim()}
                        variant="contained"
                    >
                        {editingColumn ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para agregar/editar tarea */}
            <Dialog
                open={isTaskDialogOpen}
                onClose={() => setIsTaskDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {editingTask && editingTask.title ? 'Edit Task' : 'Add New Task'}
                </DialogTitle>
                <DialogContent>
                    {editingTask && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Title"
                                fullWidth
                                variant="outlined"
                                value={editingTask.title}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, title: e.target.value })
                                }
                                sx={{ mb: 2, mt: 2 }}
                            />
                            <TextField
                                margin="dense"
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                value={editingTask.description}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, description: e.target.value })
                                }
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <TextField
                                    margin="dense"
                                    label="Due Date"
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    value={editingTask.dueDate}
                                    onChange={(e) =>
                                        setEditingTask({ ...editingTask, dueDate: e.target.value })
                                    }
                                />
                                <TextField
                                    margin="dense"
                                    label="Priority"
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={editingTask.priority}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            priority: e.target.value as 'alta' | 'media' | 'baja'
                                        })
                                    }
                                    SelectProps={{
                                        native: true
                                    }}
                                >
                                    <option value="alta">High</option>
                                    <option value="media">Medium</option>
                                    <option value="baja">Low</option>
                                </TextField>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsTaskDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={saveTask}
                        disabled={!editingTask?.title.trim()}
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default KanbanBoard;