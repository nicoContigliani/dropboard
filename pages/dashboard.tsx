// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../lib/store';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Avatar,
//   Button,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Divider,
//   Chip,
//   Stack,
//   ListItemButton,
//   CircularProgress,
//   Alert,
//   Tabs,
//   Tab,
  
// } from '@mui/material';

// import PostAddIcon from '@mui/icons-material/PostAdd';

// import {
//   Description as FileIcon,
//   CloudUpload as UploadIcon,
//   ExitToApp as LogoutIcon,
//   Api as ApiIcon,
//   Refresh as RefreshIcon,
//   Dashboard as DashboardIcon,
//   Storage as FilesIcon,
// } from '@mui/icons-material';
// import { useUploads } from '../hooks/useUploads';
// import { UploadData } from '../lib/features/uploads/uploadsSlice';
// import VirtualList, { ColumnConfig, ListItem as VirtualListItem } from '@/components/ResponsiveList/ResponsiveList';

// interface AuthData {
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   token: string;
// }

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel({ children, value, index, ...other }: TabPanelProps) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`dashboard-tabpanel-${index}`}
//       aria-labelledby={`dashboard-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// // --- Utilidades ---
// const formatFileSize = (bytes?: number): string => {
//   if (!bytes) return '0 B';
//   const sizes = ['B', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
// };

// const formatDate = (dateString?: string): string => {
//   if (!dateString) return 'Fecha desconocida';
//   return new Date(dateString).toLocaleDateString('es-ES', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// const getFileName = (upload: UploadData): string => {
//   if (upload.metadata?.originalFilename) return upload.metadata.originalFilename;
//   if (upload.data?.project?.name) return upload.data.project.name;
//   return 'Archivo sin nombre';
// };

// // --- Página principal ---
// const DashboardPage = () => {
//   const { user: reduxUser } = useSelector((state: RootState) => state.auth);
//   const [localUser, setLocalUser] = useState<any>(null);
//   const { uploads, isLoading, error, getUploads } = useUploads();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState(0);
//   const [recentUploads, setRecentUploads] = useState<UploadData[]>([]);

//   const user = reduxUser || localUser;

//   // Cargar usuario desde localStorage
//   useEffect(() => {
//     const authData = localStorage.getItem('auth');
//     if (authData) {
//       try {
//         const parsedAuth: AuthData = JSON.parse(authData);
//         setLocalUser(parsedAuth?.user);
//       } catch {
//         localStorage.removeItem('auth');
//         router.push('/login');
//       }
//     }
//   }, [router]);

//   // Cargar uploads si hay usuario
//   useEffect(() => {
//     if (user) getUploads();
//   }, [user, getUploads]);

//   // Archivos recientes
//   useEffect(() => {
//     if (uploads?.length > 0) {
//       const sorted = [...uploads].sort(
//         (a, b) =>
//           new Date(b.createdAt || '').getTime() -
//           new Date(a.createdAt || '').getTime()
//       );
//       setRecentUploads(sorted.slice(0, 5));
//     }
//   }, [uploads]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth');
//     router.push('/');
//   };

//   const virtualListItems: VirtualListItem[] = (uploads || []).map((upload) => {
//     let fileType = 'Desconocido';
//     if (upload.metadata?.mimetype) {
//       const [_, subtype] = upload.metadata.mimetype.split('/');
//       fileType = subtype?.toUpperCase() || upload.metadata.mimetype.toUpperCase();
//     } else if (upload.metadata?.source === 'text-input') {
//       fileType = 'JSON';
//     }
//     return {
//       id: upload._id || Math.random().toString(),
//       filename: getFileName(upload),
//       size: upload.metadata?.size || 0,
//       type: fileType,
//       uploadDate: upload.createdAt || '',
//       rawData: upload,
//     };
//   });

//   const fileColumns: ColumnConfig[] = [
//     {
//       id: 'filename',
//       label: 'Nombre del Archivo',
//       width: '40%',
//       minWidth: 200,
//       render: (item) => (
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <FileIcon color="primary" />
//           <Typography variant="body2" noWrap title={item.filename}>
//             {item.filename}
//           </Typography>
//         </Stack>
//       ),
//     },
//     {
//       id: 'size',
//       label: 'Tamaño',
//       width: '15%',
//       minWidth: 100,
//       align: 'right',
//       render: (item) => (
//         <Typography variant="body2" color="text.secondary">
//           {formatFileSize(item.size)}
//         </Typography>
//       ),
//     },
//     {
//       id: 'type',
//       label: 'Tipo',
//       width: '15%',
//       minWidth: 100,
//       render: (item) => (
//         <Chip
//           size="small"
//           label={item.type}
//           color={item.rawData?.metadata?.source === 'file-upload' ? 'primary' : 'secondary'}
//         />
//       ),
//     },
//     {
//       id: 'date',
//       label: 'Fecha de Subida',
//       width: '30%',
//       minWidth: 150,
//       render: (item) => (
//         <Typography variant="body2" color="text.secondary">
//           {formatDate(item.uploadDate)}
//         </Typography>
//       ),
//     },
//   ];

//   // Si no hay sesión
//   if (!user) {
//     return (
//       <Container maxWidth="md" sx={{ textAlign: 'center', py: 6 }}>
//         <Typography variant="h6" color="error">
//           Debes iniciar sesión para acceder a esta página
//         </Typography>
//         <Button variant="contained" sx={{ mt: 3 }} onClick={() => router.push('/login')}>
//           Ir a Iniciar Sesión
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header */}
//       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Typography variant="h4" gutterBottom>
//               Panel de Control
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               Bienvenido, {user.name}
//             </Typography>
//           </Box>
//           <Chip
//             avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
//             label={user.email}
//             variant="outlined"
//             sx={{
//               '& .MuiChip-avatar': {
//                 bgcolor: 'primary.main',
//                 color: 'primary.contrastText',
//               },
//             }}
//           />
//         </Stack>
//       </Paper>

//       <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
//         {/* Sidebar */}
//         <Paper elevation={2} sx={{ p: 2, width: { md: 250 }, flexShrink: 0 }}>
//           <List>
//             {[
//               { label: 'Resumen', icon: <DashboardIcon />, tab: 0 },
//               { label: 'Mis Tableros', icon: <FilesIcon />, tab: 1 },
//               { label: 'Crear Tableros', icon: <FilesIcon />, tab: 2 },
//             ].map(({ label, icon, tab }) => (
//               <ListItem key={label} disablePadding>
//                 <ListItemButton selected={activeTab === tab} onClick={() => setActiveTab(tab)}>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main' }}>{icon}</Avatar>
//                   </ListItemAvatar>
//                   <ListItemText primary={label} />
//                 </ListItemButton>
//               </ListItem>
//             ))}

//             <ListItem disablePadding>
//               <ListItemButton component={Link} href="/upload">
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'success.main' }}>
//                     <UploadIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary="Subir Archivos" />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton component="a" href="/api/swagger" target="_blank">
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'info.main' }}>
//                     <ApiIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary="API Docs" />
//               </ListItemButton>
//             </ListItem>

//             <Divider sx={{ my: 2 }} />

//             <ListItem disablePadding>
//               <ListItemButton onClick={handleLogout}>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'error.main' }}>
//                     <LogoutIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary="Cerrar Sesión" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Paper>

//         {/* Contenido principal */}
//         <Box sx={{ flexGrow: 1 }}>
//           <Paper elevation={2} sx={{ p: 4 }}>
//             <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
//               <Tab icon={<DashboardIcon />} iconPosition="start" label="Resumen" />
//               <Tab icon={<FilesIcon />} iconPosition="start" label="Mis Tableros" />
//               <Tab icon={<PostAddIcon />} iconPosition="start" label="Crear Tableros" />
//             </Tabs>

//             {/* Panel Resumen */}
//             <TabPanel value={activeTab} index={0}>
//               {/* Stats */}
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
//                 <Paper sx={{ p: 3, flex: 1 }}>
//                   <Typography variant="h6" color="text.secondary">
//                     Archivos Procesados
//                   </Typography>
//                   {isLoading ? (
//                     <CircularProgress sx={{ mt: 2 }} />
//                   ) : (
//                     <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
//                       {uploads?.length || 0}
//                     </Typography>
//                   )}
//                 </Paper>
//                 <Paper sx={{ p: 3, flex: 1 }}>
//                   <Typography variant="h6" color="text.secondary">
//                     Última Actividad
//                   </Typography>
//                   {isLoading ? (
//                     <CircularProgress sx={{ mt: 2 }} />
//                   ) : uploads?.length ? (
//                     <Typography variant="h6" sx={{ mt: 1 }}>
//                       {formatDate(uploads[0]?.createdAt)}
//                     </Typography>
//                   ) : (
//                     <Typography variant="body1" sx={{ mt: 1 }}>
//                       No hay actividad reciente
//                     </Typography>
//                   )}
//                 </Paper>
//               </Stack>

//               {/* Archivos recientes */}
//               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6">Archivos Recientes</Typography>
//                 <Button startIcon={<RefreshIcon />} onClick={getUploads} disabled={isLoading}>
//                   Actualizar
//                 </Button>
//               </Stack>

//               {isLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : recentUploads.length ? (
//                 <Paper elevation={1}>
//                   <List>
//                     {recentUploads.map((upload, i) => (
//                       <React.Fragment key={upload._id || i}>
//                         <ListItem>
//                           <ListItemAvatar>
//                             <Avatar sx={{ bgcolor: 'primary.main' }}>
//                               <FileIcon />
//                             </Avatar>
//                           </ListItemAvatar>
//                           <ListItemText
//                             primary={getFileName(upload)}
//                             secondary={`Creado: ${formatDate(upload.createdAt)}`}
//                           />
//                         </ListItem>
//                         {i < recentUploads.length - 1 && <Divider component="li" />}
//                       </React.Fragment>
//                     ))}
//                   </List>
//                 </Paper>
//               ) : (
//                 <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
//                   <Typography>No hay archivos subidos aún</Typography>
//                   <Button
//                     variant="contained"
//                     startIcon={<UploadIcon />}
//                     component={Link}
//                     href="/upload"
//                     sx={{ mt: 2 }}
//                   >
//                     Subir primer archivo
//                   </Button>
//                 </Paper>
//               )}

//               {/* Acciones rápidas */}
//               <Typography variant="h6" sx={{ mt: 4 }}>
//                 Acciones Rápidas
//               </Typography>
//               <Stack direction="row" spacing={2} flexWrap="wrap" mt={2}>
//                 <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
//                   Subir Archivo
//                 </Button>
//                 <Button variant="outlined" startIcon={<FileIcon />} onClick={() => setActiveTab(1)}>
//                   Ver Todos los Archivos
//                 </Button>
//                 <Button variant="outlined" startIcon={<ApiIcon />} component="a" href="/api/swagger" target="_blank">
//                   Ver API Docs
//                 </Button>
//               </Stack>

//               {/* Datos usuario */}
//               <Typography variant="h6" sx={{ mt: 4 }}>
//                 Tus Datos
//               </Typography>
//               <Paper sx={{ p: 2, mt: 2 }}>
//                 <List>
//                   <ListItem>
//                     <ListItemText primary="Nombre" secondary={user.name} />
//                   </ListItem>
//                   <Divider />
//                   <ListItem>
//                     <ListItemText primary="Email" secondary={user.email} />
//                   </ListItem>
//                   <Divider />
//                   <ListItem>
//                     <ListItemText primary="Total de archivos" secondary={uploads?.length || 0} />
//                   </ListItem>
//                 </List>
//               </Paper>
//             </TabPanel>

//             {/* Panel Archivos */}
//             <TabPanel value={activeTab} index={1}>
//               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                 <Typography variant="h5">Mis Tableros</Typography>
//                 <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
//                   Subir Nuevo Archivo
//                 </Button>
//               </Stack>

//               {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//               {isLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <VirtualList
//                   items={virtualListItems}
//                   columns={fileColumns}
//                   loading={isLoading}
//                   title={`Total: ${uploads?.length || 0} archivos`}
//                   enableSearch
//                   enableViewToggle
//                   enablePagination
//                   emptyState={
//                     <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
//                       <Typography variant="h6" gutterBottom>
//                         No hay archivos subidos aún
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                         Comienza subiendo tu primer archivo para procesar tus datos
//                       </Typography>
//                       <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
//                         Subir primer archivo
//                       </Button>
//                     </Paper>
//                   }
//                 />
//               )}
//             </TabPanel>
//           </Paper>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default DashboardPage;




'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../lib/store'; // Importa AppDispatch
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Stack,
  ListItemButton,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Description as FileIcon,
  CloudUpload as UploadIcon,
  ExitToApp as LogoutIcon,
  Api as ApiIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
  Storage as FilesIcon,
  Label,
} from '@mui/icons-material';
import { useUploads } from '../hooks/useUploads';
import { UploadData, deleteUpload, createUpload } from '../lib/features/uploads/uploadsSlice';
import VirtualList, { ColumnConfig, ListItem as VirtualListItem } from '@/components/ResponsiveList/ResponsiveList';
import UniversalFormDialog, { FormConfig, FormField } from '@/components/ResponsiveUniversalFormDialog/UniversalFormDialog';

interface AuthData {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// --- Utilidades ---
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Fecha desconocida';
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getFileName = (upload: UploadData): string => {
  if (upload.metadata?.originalFilename) return upload.metadata.originalFilename;
  if (upload.data?.project?.name) return upload.data.project.name;
  return 'Archivo sin nombre';
};

// Configuración del formulario para crear tableros
const createBoardFormConfig: FormConfig = {
  title: 'Crear Nuevo Tablero',
  fields: [
    {
      name: 'name',
      label: 'Nombre del Tablero',
      type: 'text',
      required: true,
      placeholder: 'Ingresa el nombre del tablero',
      validation: {
        minLength: {
          value: 3,
          message: 'El nombre debe tener al menos 3 caracteres'
        }
      }
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      required: false,
      placeholder: 'Describe el propósito de este tablero',
      rows: 3
    },
    {
      name: 'type',
      label: 'Tipo de Tablero',
      type: 'select',
      required: true,
      options: [
        { label: 'Proyecto', value: 'project' },
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Reporte', value: 'report' },
        { label: 'Análisis', value: 'analysis' }
      ]
    },
    {
      name: 'visibility',
      label: 'Visibilidad',
      type: 'radio',
      required: true,
      defaultValue: 'private',
      options: [
        { label: 'Privado', value: 'private' },
        { label: 'Público', value: 'public' },
        { label: 'Compartido', value: 'shared' }
      ]
    },
    {
      name: 'tags',
      label: 'Etiquetas',
      type: 'autocomplete',
      required: false,
      multiple: true,
      freeSolo: true,
      options: [
        { label: 'Importante', value: 'important' },
        { label: 'Urgente', value: 'urgent' },
        { label: 'En Progreso', value: 'in-progress' },
        { label: 'Completado', value: 'completed' }
      ]
    }
  ],
  submitLabel: 'Crear Tablero'
};

// --- Página principal ---
const DashboardPage = () => {
  const { user: reduxUser } = useSelector((state: RootState) => state.auth);
  const [localUser, setLocalUser] = useState<any>(null);
  const { uploads, isLoading, error, getUploads } = useUploads();
  const dispatch = useDispatch<AppDispatch>(); // Usa AppDispatch tipado
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [recentUploads, setRecentUploads] = useState<UploadData[]>([]);
  const [createBoardDialogOpen, setCreateBoardDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [uploadToDelete, setUploadToDelete] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const user = reduxUser || localUser;

  // Cargar usuario desde localStorage
  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsedAuth: AuthData = JSON.parse(authData);
        setLocalUser(parsedAuth?.user);
      } catch {
        localStorage.removeItem('auth');
        router.push('/login');
      }
    }
  }, [router]);

  // Cargar uploads si hay usuario
  useEffect(() => {
    if (user) getUploads();
  }, [user, getUploads]);

  // Archivos recientes
  useEffect(() => {
    if (uploads?.length > 0) {
      const sorted = [...uploads].sort(
        (a, b) =>
          new Date(b.createdAt || '').getTime() -
          new Date(a.createdAt || '').getTime()
      );
      setRecentUploads(sorted.slice(0, 5));
    }
  }, [uploads]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/');
  };

  const handleCreateBoard = async (formData: any) => {
    setIsFormLoading(true);
    setFormError(null);
    setFormSuccess(null);
    
    try {
      // Crear el objeto del tablero
      const boardData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        visibility: formData.visibility,
        tags: formData.tags,
        createdAt: new Date().toISOString(),
        createdBy: user._id
      };
      
      // Crear FormData para enviar
      const jsonData = JSON.stringify({
        jsonText: JSON.stringify({
          project: boardData,
          metadata: {
            source: 'board-creation',
            originalFilename: `board-${formData.name}-${Date.now()}`,
            mimetype: 'application/json'
          }
        })
      });
      
      // @ts-ignore - El tipo espera FormData pero también acepta { jsonText: string }
      const result = await dispatch(createUpload(jsonData));
      
      if (createUpload.fulfilled.match(result)) {
        setFormSuccess('Tablero creado exitosamente');
        setTimeout(() => {
          setCreateBoardDialogOpen(false);
          setFormSuccess(null);
          getUploads(); // Recargar la lista
        }, 1500);
      } else {
        throw new Error(result.payload as string || 'Error al crear el tablero');
      }
    } catch (error: any) {
      setFormError(error.message || 'Error al crear el tablero');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteUpload = (id: string) => {
    setUploadToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (uploadToDelete) {
      try {
        await dispatch(deleteUpload(uploadToDelete)).unwrap();
        getUploads(); // Recargar la lista
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
    setDeleteConfirmOpen(false);
    setUploadToDelete(null);
  };

  const virtualListItems: VirtualListItem[] = (uploads || []).map((upload) => {
    let fileType = 'Desconocido';
    if (upload.metadata?.mimetype) {
      const [_, subtype] = upload.metadata.mimetype.split('/');
      fileType = subtype?.toUpperCase() || upload.metadata.mimetype.toUpperCase();
    } else if (upload.metadata?.source === 'text-input') {
      fileType = 'JSON';
    } else if (upload.metadata?.source === 'board-creation') {
      fileType = 'TABLERO';
    }
    return {
      id: upload._id || Math.random().toString(),
      filename: getFileName(upload),
      size: upload.metadata?.size || 0,
      type: fileType,
      uploadDate: upload.createdAt || '',
      rawData: upload,
    };
  });

  const fileColumns: ColumnConfig[] = [
    {
      id: 'filename',
      label: 'Nombre del Archivo',
      width: '40%',
      minWidth: 200,
      render: (item) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <FileIcon color="primary" />
          <Typography variant="body2" noWrap title={item.filename}>
            {item.filename}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'size',
      label: 'Tamaño',
      width: '15%',
      minWidth: 100,
      align: 'right',
      render: (item) => (
        <Typography variant="body2" color="text.secondary">
          {formatFileSize(item.size)}
        </Typography>
      ),
    },
    {
      id: 'type',
      label: 'Tipo',
      width: '15%',
      minWidth: 100,
      render: (item) => (
        <Chip
          size="small"
          label={item.type}
          color={
            item.rawData?.metadata?.source === 'file-upload' 
              ? 'primary' 
              : item.rawData?.metadata?.source === 'board-creation'
                ? 'success'
                : 'secondary'
          }
        />
      ),
    },
    {
      id: 'date',
      label: 'Fecha de Subida',
      width: '20%',
      minWidth: 150,
      render: (item) => (
        <Typography variant="body2" color="text.secondary">
          {formatDate(item.uploadDate)}
        </Typography>
      ),
    },
    {
      id: 'actions',
      label: 'Acciones',
      width: '10%',
      minWidth: 100,
      align: 'right',
      render: (item:any) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDeleteUpload(item.id)}
          title="Eliminar tablero"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // Si no hay sesión
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="error">
          Debes iniciar sesión para acceder a esta página
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => router.push('/login')}>
          Ir a Iniciar Sesión
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" gutterBottom>
              Panel de Control
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Bienvenido, {user.name}
            </Typography>
          </Box>
          <Chip
            avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
            label={user.email}
            variant="outlined"
            sx={{
              '& .MuiChip-avatar': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          />
        </Stack>
      </Paper>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Sidebar */}
        <Paper elevation={2} sx={{ p: 2, width: { md: 250 }, flexShrink: 0 }}>
          <List>
            {[
              { label: 'Resumen', icon: <DashboardIcon />, tab: 0 },
              { label: 'Mis Tableros', icon: <FilesIcon />, tab: 1 },
              { label: 'Crear Tableros', icon: <PostAddIcon />, tab: 2 },
            ].map(({ label, icon, tab }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton selected={activeTab === tab} onClick={() => setActiveTab(tab)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{icon}</Avatar>
                  </ListItemAvatar>
                  {/* <ListItemText primary={Label} /> */}
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding>
              <ListItemButton component={Link} href="/upload">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <UploadIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Subir Archivos" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component="a" href="/api/swagger" target="_blank">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <ApiIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="API Docs" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 2 }} />

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.main' }}>
                    <LogoutIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cerrar Sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1 }}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
              <Tab icon={<DashboardIcon />} iconPosition="start" label="Resumen" />
              <Tab icon={<FilesIcon />} iconPosition="start" label="Mis Tableros" />
              <Tab icon={<PostAddIcon />} iconPosition="start" label="Crear Tableros" />
            </Tabs>

            {/* Panel Resumen */}
            <TabPanel value={activeTab} index={0}>
              {/* Stats */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Paper sx={{ p: 3, flex: 1 }}>
                  <Typography variant="h6" color="text.secondary">
                    Archivos Procesados
                  </Typography>
                  {isLoading ? (
                    <CircularProgress sx={{ mt: 2 }} />
                  ) : (
                    <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
                      {uploads?.length || 0}
                    </Typography>
                  )}
                </Paper>
                <Paper sx={{ p: 3, flex: 1 }}>
                  <Typography variant="h6" color="text.secondary">
                    Última Actividad
                  </Typography>
                  {isLoading ? (
                    <CircularProgress sx={{ mt: 2 }} />
                  ) : uploads?.length ? (
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {formatDate(uploads[0]?.createdAt)}
                    </Typography>
                  ) : (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      No hay actividad reciente
                    </Typography>
                  )}
                </Paper>
              </Stack>

              {/* Archivos recientes */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Archivos Recientes</Typography>
                <Button startIcon={<RefreshIcon />} onClick={getUploads} disabled={isLoading}>
                  Actualizar
                </Button>
              </Stack>

              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : recentUploads.length ? (
                <Paper elevation={1}>
                  <List>
                    {recentUploads.map((upload, i) => (
                      <React.Fragment key={upload._id || i}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <FileIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={getFileName(upload)}
                            secondary={`Creado: ${formatDate(upload.createdAt)}`}
                          />
                        </ListItem>
                        {i < recentUploads.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <Typography>No hay archivos subidos aún</Typography>
                  <Button
                    variant="contained"
                    startIcon={<UploadIcon />}
                    component={Link}
                    href="/upload"
                    sx={{ mt: 2 }}
                  >
                    Subir primer archivo
                  </Button>
                </Paper>
              )}

              {/* Acciones rápidas */}
              <Typography variant="h6" sx={{ mt: 4 }}>
                Acciones Rápidas
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" mt={2}>
                <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
                  Subir Archivo
                </Button>
                <Button variant="outlined" startIcon={<FileIcon />} onClick={() => setActiveTab(1)}>
                  Ver Todos los Archivos
                </Button>
                <Button variant="outlined" startIcon={<PostAddIcon />} onClick={() => setActiveTab(2)}>
                  Crear Tablero
                </Button>
                <Button variant="outlined" startIcon={<ApiIcon />} component="a" href="/api/swagger" target="_blank">
                  Ver API Docs
                </Button>
              </Stack>

              {/* Datos usuario */}
              <Typography variant="h6" sx={{ mt: 4 }}>
                Tus Datos
              </Typography>
              <Paper sx={{ p: 2, mt: 2 }}>
                <List>
                  <ListItem>
                    <ListItemText primary="Nombre" secondary={user.name} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Email" secondary={user.email} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Total de archivos" secondary={uploads?.length || 0} />
                  </ListItem>
                </List>
              </Paper>
            </TabPanel>

            {/* Panel Archivos */}
            <TabPanel value={activeTab} index={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5">Mis Tableros</Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" startIcon={<RefreshIcon />} onClick={getUploads} disabled={isLoading}>
                    Actualizar
                  </Button>
                  <Button variant="contained" startIcon={<PostAddIcon />} onClick={() => setCreateBoardDialogOpen(true)}>
                    Crear Tablero
                  </Button>
                </Stack>
              </Stack>

              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <VirtualList
                  items={virtualListItems}
                  columns={fileColumns}
                  loading={isLoading}
                  title={`Total: ${uploads?.length || 0} archivos`}
                  enableSearch
                  enableViewToggle
                  enablePagination
                  emptyState={
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom>
                        No hay archivos subidos aún
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Comienza subiendo tu primer archivo o creando un tablero
                      </Typography>
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
                          Subir archivo
                        </Button>
                        <Button variant="outlined" startIcon={<PostAddIcon />} onClick={() => setCreateBoardDialogOpen(true)}>
                          Crear tablero
                        </Button>
                      </Stack>
                    </Paper>
                  }
                />
              )}
            </TabPanel>

            {/* Panel Crear Tableros */}
            <TabPanel value={activeTab} index={2}>
              <Stack spacing={3}>
                <Typography variant="h5">Crear Nuevo Tablero</Typography>
                <Typography variant="body1" color="text.secondary">
                  Utiliza el siguiente formulario para crear un nuevo tablero. Los tableros te ayudarán a organizar y visualizar tus datos de manera efectiva.
                </Typography>

                <Paper elevation={2} sx={{ p: 3 }}>
                  <UniversalFormDialog
                    open={createBoardDialogOpen}
                    onClose={() => setCreateBoardDialogOpen(false)}
                    onSubmit={handleCreateBoard}
                    config={createBoardFormConfig}
                    isLoading={isFormLoading}
                    error={formError}
                    success={formSuccess}
                  />

                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <PostAddIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      ¿Listo para crear tu primer tablero?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Completa el formulario para comenzar a organizar tus proyectos y datos de manera visual.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PostAddIcon />}
                      onClick={() => setCreateBoardDialogOpen(true)}
                    >
                      Crear Nuevo Tablero
                    </Button>
                  </Box>
                </Paper>

                <Paper elevation={1} sx={{ p: 3, bgcolor: 'info.light' }}>
                  <Typography variant="h6" gutterBottom>
                    Tipos de Tableros Disponibles
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Proyecto</Typography>
                      <Typography variant="body2">Ideal para seguimiento de proyectos con múltiples tareas y hitos.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Dashboard</Typography>
                      <Typography variant="body2">Perfecto para visualizar métricas y KPIs importantes.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Reporte</Typography>
                      <Typography variant="body2">Diseñado para presentar informes detallados y análisis.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Análisis</Typography>
                      <Typography variant="body2">Optimizado para análisis de datos y toma de decisiones.</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </TabPanel>
          </Paper>
        </Box>
      </Box>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;