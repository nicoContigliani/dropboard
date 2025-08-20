// // import React, { useEffect, useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../lib/store';
// // import { useRouter } from 'next/router';
// // import { 
// //   Container,
// //   Typography,
// //   Box,
// //   Paper,
// //   Avatar,
// //   Button,
// //   List,
// //   ListItem,
// //   ListItemAvatar,
// //   ListItemText,
// //   Divider,
// //   Chip,
// //   Stack,
// //   ListItemButton,
// //   CircularProgress,
// //   Alert,
// //   Tabs,
// //   Tab
// // } from '@mui/material';
// // import {
// //   Description as FileIcon,
// //   CloudUpload as UploadIcon,
// //   ExitToApp as LogoutIcon,
// //   AccountCircle as ProfileIcon,
// //   Api as ApiIcon,
// //   Refresh as RefreshIcon,
// //   Dashboard as DashboardIcon,
// //   Storage as FilesIcon
// // } from '@mui/icons-material';
// // import Link from 'next/link';
// // import { useUploads } from '../hooks/useUploads';
// // import { UploadData } from '../lib/features/uploads/uploadsSlice';
// // import VirtualList, { ColumnConfig, ListItem as VirtualListItem } from '@/components/ResponsiveList/ResponsiveList';

// // interface AuthData {
// //   user: {
// //     _id: string;
// //     name: string;
// //     email: string;
// //   };
// //   token: string;
// // }

// // interface TabPanelProps {
// //   children?: React.ReactNode;
// //   index: number;
// //   value: number;
// // }

// // // Extender la interfaz UploadData para incluir propiedades necesarias
// // interface ExtendedUploadData extends UploadData {
// //   id: string;
// //   filename: string;
// //   size: number;
// //   type: string;
// //   uploadDate: string;
// // }

// // function TabPanel(props: TabPanelProps) {
// //   const { children, value, index, ...other } = props;

// //   return (
// //     <div
// //       role="tabpanel"
// //       hidden={value !== index}
// //       id={`dashboard-tabpanel-${index}`}
// //       aria-labelledby={`dashboard-tab-${index}`}
// //       {...other}
// //     >
// //       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
// //     </div>
// //   );
// // }

// // const DashboardPage = () => {
// //   const { user: reduxUser } = useSelector((state: RootState) => state.auth);
// //   const [localUser, setLocalUser] = useState<any>(null);
// //   const { uploads, isLoading, error, getUploads } = useUploads();
// //   const router = useRouter();
// //   const [activeTab, setActiveTab] = useState(0);
// //   const [recentUploads, setRecentUploads] = useState<UploadData[]>([]);

// //   // Obtener usuario del localStorage al cargar el componente
// //   useEffect(() => {
// //     const authData = localStorage.getItem('auth');
// //     if (authData) {
// //       try {
// //         const parsedAuth: AuthData = JSON.parse(authData);
// //         setLocalUser(parsedAuth?.user);
// //       } catch (err) {
// //         console.error('Error parsing auth data from localStorage:', err);
// //         localStorage.removeItem('auth');
// //         router.push('/login');
// //       }
// //     }
// //   }, [router]);

// //   // Determinar qué usuario usar (prioridad: Redux -> localStorage)
// //   const user = reduxUser || localUser;

// //   useEffect(() => {
// //     if (user) {
// //       getUploads();
// //     }
// //   }, [user, getUploads]);

// //   useEffect(() => {
// //     // Obtener los 5 archivos más recientes
// //     if (uploads && uploads.length > 0) {
// //       const sortedUploads = [...uploads].sort((a, b) => {
// //         const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
// //         const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
// //         return dateB - dateA;
// //       });
// //       setRecentUploads(sortedUploads.slice(0, 5));
// //     }
// //   }, [uploads]);

// //   const handleLogout = () => {
// //     // Limpiar localStorage y redirigir
// //     localStorage.removeItem('auth');
// //     router.push('/');
// //   };

// //   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
// //     setActiveTab(newValue);
// //   };

// //   const formatFileSize = (bytes: number | undefined): string => {
// //     if (!bytes) return '0 B';
// //     const sizes = ['B', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(1024));
// //     return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
// //   };

// //   const formatDate = (dateString: string | undefined): string => {
// //     if (!dateString) return 'Fecha desconocida';
// //     return new Date(dateString).toLocaleDateString('es-ES', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   // Función para obtener el nombre del archivo desde la estructura de datos
// //   const getFileName = (upload: UploadData): string => {
// //     // Primero intenta obtener el nombre del metadata
// //     if (upload.metadata?.originalFilename) {
// //       return upload.metadata.originalFilename;
// //     }
    
// //     // Luego intenta obtenerlo de data.project.name si existe
// //     if (upload.data?.project?.name) {
// //       return upload.data.project.name;
// //     }
    
// //     // Si no hay nombre específico, usa un nombre genérico
// //     return 'Archivo sin nombre';
// //   };

// //   // Preparar datos para VirtualList
// //   const virtualListItems: VirtualListItem[] = (uploads || []).map((upload): VirtualListItem => {
// //     // Extraer el tipo de archivo del mimetype o determinar por la fuente
// //     let fileType = 'Desconocido';
// //     if (upload.metadata?.mimetype) {
// //       const parts = upload.metadata.mimetype.split('/');
// //       fileType = parts.length > 1 ? parts[1].toUpperCase() : upload.metadata.mimetype.toUpperCase();
// //     } else if (upload.metadata?.source === 'text-input') {
// //       fileType = 'JSON';
// //     }
    
// //     return {
// //       id: upload._id || Math.random().toString(),
// //       filename: getFileName(upload),
// //       size: upload.metadata?.size || 0,
// //       type: fileType,
// //       uploadDate: upload.createdAt || '',
// //       rawData: upload // Mantener los datos originales para referencia
// //     };
// //   });

// //   // Configuración de columnas para VirtualList
// //   const fileColumns: ColumnConfig[] = [
// //     {
// //       id: 'filename',
// //       label: 'Nombre del Archivo',
// //       width: '40%',
// //       minWidth: 200,
// //       render: (item: VirtualListItem) => (
// //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //           <FileIcon sx={{ mr: 1, color: 'primary.main' }} />
// //           <Typography variant="body2" noWrap title={item.filename}>
// //             {item.filename}
// //           </Typography>
// //         </Box>
// //       )
// //     },
// //     {
// //       id: 'size',
// //       label: 'Tamaño',
// //       width: '15%',
// //       minWidth: 100,
// //       align: 'right',
// //       render: (item: VirtualListItem) => (
// //         <Typography variant="body2" color="text.secondary">
// //           {formatFileSize(item.size)}
// //         </Typography>
// //       )
// //     },
// //     {
// //       id: 'type',
// //       label: 'Tipo',
// //       width: '15%',
// //       minWidth: 100,
// //       render: (item: VirtualListItem) => (
// //         <Chip
// //           size="small"
// //           label={item.type}
// //           color={item.rawData?.metadata?.source === 'file-upload' ? 'primary' : 'secondary'}
// //         />
// //       )
// //     },
// //     {
// //       id: 'date',
// //       label: 'Fecha de Subida',
// //       width: '30%',
// //       minWidth: 150,
// //       render: (item: VirtualListItem) => (
// //         <Typography variant="body2" color="text.secondary">
// //           {formatDate(item.uploadDate)}
// //         </Typography>
// //       )
// //     }
// //   ];

// //   // Si no hay usuario en Redux ni en localStorage, mostrar mensaje
// //   if (!user) {
// //     return (
// //       <Container maxWidth="md">
// //         <Typography variant="h6" color="error" sx={{ mt: 4 }}>
// //           Debes iniciar sesión para acceder a esta página
// //         </Typography>
// //         <Button 
// //           variant="contained" 
// //           sx={{ mt: 2 }}
// //           onClick={() => router.push('/login')}
// //         >
// //           Ir a Iniciar Sesión
// //         </Button>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
// //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// //           <Box>
// //             <Typography variant="h4" component="h1" gutterBottom>
// //               Panel de Control
// //             </Typography>
// //             <Typography variant="subtitle1" color="text.secondary">
// //               Bienvenido, {user.name}
// //             </Typography>
// //           </Box>
// //           <Chip 
// //             avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
// //             label={user.email}
// //             variant="outlined"
// //             sx={{ 
// //               '& .MuiChip-avatar': {
// //                 backgroundColor: 'primary.main',
// //                 color: 'primary.contrastText'
// //               }
// //             }}
// //           />
// //         </Stack>
// //       </Paper>

// //       <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
// //         {/* Menú lateral */}
// //         <Paper elevation={2} sx={{ p: 2, width: { md: 250 }, flexShrink: 0 }}>
// //           <List>
// //             <ListItem disablePadding>
// //               <ListItemButton 
// //                 selected={activeTab === 0}
// //                 onClick={() => setActiveTab(0)}
// //               >
// //                 <ListItemAvatar>
// //                   <Avatar sx={{ bgcolor: 'primary.main' }}>
// //                     <DashboardIcon />
// //                   </Avatar>
// //                 </ListItemAvatar>
// //                 <ListItemText primary="Resumen" />
// //               </ListItemButton>
// //             </ListItem>

// //             <ListItem disablePadding>
// //               <ListItemButton 
// //                 selected={activeTab === 1}
// //                 onClick={() => setActiveTab(1)}
// //               >
// //                 <ListItemAvatar>
// //                   <Avatar sx={{ bgcolor: 'secondary.main' }}>
// //                     <FilesIcon />
// //                   </Avatar>
// //                 </ListItemAvatar>
// //                 <ListItemText primary="Mis Archivos" />
// //               </ListItemButton>
// //             </ListItem>

// //             <ListItem disablePadding>
// //               <ListItemButton component={Link} href="/upload">
// //                 <ListItemAvatar>
// //                   <Avatar sx={{ bgcolor: 'success.main' }}>
// //                     <UploadIcon />
// //                   </Avatar>
// //                 </ListItemAvatar>
// //                 <ListItemText primary="Subir Archivos" />
// //               </ListItemButton>
// //             </ListItem>

// //             <ListItem disablePadding>
// //               <ListItemButton component="a" href="/api/swagger" target="_blank">
// //                 <ListItemAvatar>
// //                   <Avatar sx={{ bgcolor: 'info.main' }}>
// //                     <ApiIcon />
// //                   </Avatar>
// //                 </ListItemAvatar>
// //                 <ListItemText primary="API Docs" />
// //               </ListItemButton>
// //             </ListItem>

// //             <Divider sx={{ my: 2 }} />

// //             <ListItem disablePadding>
// //               <ListItemButton onClick={handleLogout}>
// //                 <ListItemAvatar>
// //                   <Avatar sx={{ bgcolor: 'error.main' }}>
// //                     <LogoutIcon />
// //                   </Avatar>
// //                 </ListItemAvatar>
// //                 <ListItemText primary="Cerrar Sesión" />
// //               </ListItemButton>
// //             </ListItem>
// //           </List>
// //         </Paper>

// //         {/* Contenido principal */}
// //         <Box sx={{ flexGrow: 1 }}>
// //           <Paper elevation={2} sx={{ p: 4 }}>
// //             <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
// //               <Tab icon={<DashboardIcon />} iconPosition="start" label="Resumen" />
// //               <Tab icon={<FilesIcon />} iconPosition="start" label="Mis Archivos" />
// //             </Tabs>

// //             <TabPanel value={activeTab} index={0}>
// //               <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
// //                 Resumen de Actividad
// //               </Typography>

// //               {error && (
// //                 <Alert severity="error" sx={{ mb: 3 }}>
// //                   {error}
// //                 </Alert>
// //               )}

// //               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
// //                 <Paper sx={{ p: 3, flex: 1, bgcolor: 'background.paper' }}>
// //                   <Typography variant="h6" color="text.secondary">
// //                     Archivos Procesados
// //                   </Typography>
// //                   {isLoading ? (
// //                     <CircularProgress size={40} sx={{ mt: 1 }} />
// //                   ) : (
// //                     <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
// //                       {uploads?.length || 0}
// //                     </Typography>
// //                   )}
// //                 </Paper>

// //                 <Paper sx={{ p: 3, flex: 1, bgcolor: 'background.paper' }}>
// //                   <Typography variant="h6" color="text.secondary">
// //                     Última Actividad
// //                   </Typography>
// //                   {isLoading ? (
// //                     <CircularProgress size={40} sx={{ mt: 1 }} />
// //                   ) : uploads && uploads.length > 0 ? (
// //                     <Typography variant="h6" sx={{ mt: 1 }}>
// //                       {formatDate(uploads[0]?.createdAt)}
// //                     </Typography>
// //                   ) : (
// //                     <Typography variant="body1" sx={{ mt: 1 }}>
// //                       No hay actividad reciente
// //                     </Typography>
// //                   )}
// //                 </Paper>
// //               </Stack>

// //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                   Tableros Recientes
// //                 </Typography>
// //                 <Button 
// //                   startIcon={<RefreshIcon />} 
// //                   onClick={() => getUploads()}
// //                   disabled={isLoading}
// //                 >
// //                   Actualizar
// //                 </Button>
// //               </Box>
              
// //               {isLoading ? (
// //                 <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// //                   <CircularProgress />
// //                 </Box>
// //               ) : recentUploads && recentUploads.length > 0 ? (
// //                 <Paper elevation={1} sx={{ mt: 1, mb: 4 }}>
// //                   <List>
// //                     {recentUploads.map((upload, index) => (
// //                       <React.Fragment key={upload._id || index}>
// //                         <ListItem>
// //                           <ListItemAvatar>
// //                             <Avatar sx={{ bgcolor: 'primary.main' }}>
// //                               <FileIcon />
// //                             </Avatar>
// //                           </ListItemAvatar>
// //                           <ListItemText 
// //                             primary={getFileName(upload)} 
// //                             secondary={
// //                               <Box>
// //                                 <Typography variant="body2">
// //                                   Creado: {formatDate(upload.createdAt)}
// //                                 </Typography>
                           
// //                               </Box>
// //                             }
// //                           />
// //                         </ListItem>
// //                         {index < recentUploads.length - 1 && <Divider variant="inset" component="li" />}
// //                       </React.Fragment>
// //                     ))}
// //                   </List>
// //                 </Paper>
// //               ) : (
// //                 <Paper elevation={1} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
// //                   <Typography variant="body1" color="text.secondary">
// //                     No hay archivos subidos aún
// //                   </Typography>
// //                   <Button 
// //                     variant="contained" 
// //                     startIcon={<UploadIcon />}
// //                     component={Link}
// //                     href="/upload"
// //                     sx={{ mt: 2 }}
// //                   >
// //                     Subir primer archivo
// //                   </Button>
// //                 </Paper>
// //               )}

// //               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
// //                 Acciones Rápidas
// //               </Typography>
              
// //               <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
// //                 <Button 
// //                   variant="contained" 
// //                   startIcon={<UploadIcon />}
// //                   component={Link}
// //                   href="/upload"
// //                   sx={{ mb: { xs: 2, sm: 0 } }}
// //                 >
// //                   Subir Archivo
// //                 </Button>
                
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<FileIcon />}
// //                   onClick={() => setActiveTab(1)}
// //                   sx={{ mb: { xs: 2, sm: 0 } }}
// //                 >
// //                   Ver Todos los Archivos
// //                 </Button>
                
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<ApiIcon />}
// //                   component="a"
// //                   href="/api/swagger"
// //                   target="_blank"
// //                   sx={{ mb: { xs: 2, sm: 0 } }}
// //                 >
// //                   Ver API Docs
// //                 </Button>
// //               </Stack>

// //               <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
// //                 Tus Datos
// //               </Typography>
              
// //               <Paper elevation={1} sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
// //                 <List>
// //                   <ListItem>
// //                     <ListItemText 
// //                       primary="Nombre" 
// //                       secondary={user.name}
// //                       secondaryTypographyProps={{ color: 'text.primary' }}
// //                     />
// //                   </ListItem>
// //                   <Divider component="li" variant="inset" />
// //                   <ListItem>
// //                     <ListItemText 
// //                       primary="Email" 
// //                       secondary={user.email}
// //                       secondaryTypographyProps={{ color: 'text.primary' }}
// //                     />
// //                   </ListItem>
// //                   <Divider component="li" variant="inset" />
// //                   <ListItem>
// //                     <ListItemText 
// //                       primary="Total de archivos" 
// //                       secondary={uploads?.length || 0}
// //                       secondaryTypographyProps={{ color: 'text.primary' }}
// //                     />
// //                   </ListItem>
// //                 </List>
// //               </Paper>
// //             </TabPanel>

// //             <TabPanel value={activeTab} index={1}>
// //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// //                 <Typography variant="h5" gutterBottom>
// //                   Mis Archivos
// //                 </Typography>
// //                 <Button 
// //                   variant="contained" 
// //                   startIcon={<UploadIcon />}
// //                   component={Link}
// //                   href="/upload"
// //                 >
// //                   Subir Nuevo Archivo
// //                 </Button>
// //               </Box>

// //               {error && (
// //                 <Alert severity="error" sx={{ mb: 3 }}>
// //                   {error}
// //                 </Alert>
// //               )}

// //               {isLoading ? (
// //                 <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// //                   <CircularProgress />
// //                 </Box>
// //               ) : (
// //                 <VirtualList
// //                   items={virtualListItems}
// //                   columns={fileColumns}
// //                   loading={isLoading}
// //                   title={`Total: ${uploads?.length || 0} archivos`}
// //                   enableSearch={true}
// //                   enableFilters={false}
// //                   enableViewToggle={true}
// //                   enablePagination={true}
// //                   emptyState={
// //                     <Paper elevation={1} sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
// //                       <Typography variant="h6" color="text.secondary" gutterBottom>
// //                         No hay archivos subidos aún
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
// //                         Comienza subiendo tu primer archivo para procesar tus datos
// //                       </Typography>
// //                       <Button 
// //                         variant="contained" 
// //                         startIcon={<UploadIcon />}
// //                         component={Link}
// //                         href="/upload"
// //                       >
// //                         Subir primer archivo
// //                       </Button>
// //                     </Paper>
// //                   }
// //                 />
// //               )}
// //             </TabPanel>
// //           </Paper>
// //         </Box>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default DashboardPage;


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



// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../lib/store';
// import { useRouter } from 'next/router';
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
//   Tab
// } from '@mui/material';
// import {
//   Description as FileIcon,
//   CloudUpload as UploadIcon,
//   ExitToApp as LogoutIcon,
//   AccountCircle as ProfileIcon,
//   Api as ApiIcon,
//   Refresh as RefreshIcon,
//   Dashboard as DashboardIcon,
//   Storage as FilesIcon
// } from '@mui/icons-material';
// import Link from 'next/link';
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

// // Extender la interfaz UploadData para incluir propiedades necesarias
// interface ExtendedUploadData extends UploadData {
//   id: string;
//   filename: string;
//   size: number;
//   type: string;
//   uploadDate: string;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

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

// const DashboardPage = () => {
//   const { user: reduxUser } = useSelector((state: RootState) => state.auth);
//   const [localUser, setLocalUser] = useState<any>(null);
//   const { uploads, isLoading, error, getUploads } = useUploads();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState(0);
//   const [recentUploads, setRecentUploads] = useState<UploadData[]>([]);

//   // Obtener usuario del localStorage al cargar el componente
//   useEffect(() => {
//     const authData = localStorage.getItem('auth');
//     if (authData) {
//       try {
//         const parsedAuth: AuthData = JSON.parse(authData);
//         setLocalUser(parsedAuth?.user);
//       } catch (err) {
//         console.error('Error parsing auth data from localStorage:', err);
//         localStorage.removeItem('auth');
//         router.push('/login');
//       }
//     }
//   }, [router]);

//   // Determinar qué usuario usar (prioridad: Redux -> localStorage)
//   const user = reduxUser || localUser;

//   useEffect(() => {
//     if (user) {
//       getUploads();
//     }
//   }, [user, getUploads]);

//   useEffect(() => {
//     // Obtener los 5 archivos más recientes
//     if (uploads && uploads.length > 0) {
//       const sortedUploads = [...uploads].sort((a, b) => {
//         const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//         const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//         return dateB - dateA;
//       });
//       setRecentUploads(sortedUploads.slice(0, 5));
//     }
//   }, [uploads]);

//   const handleLogout = () => {
//     // Limpiar localStorage y redirigir
//     localStorage.removeItem('auth');
//     router.push('/');
//   };

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue);
//   };

//   const formatFileSize = (bytes: number | undefined): string => {
//     if (!bytes) return '0 B';
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
//   };

//   const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return 'Fecha desconocida';
//     return new Date(dateString).toLocaleDateString('es-ES', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Función para obtener el nombre del archivo desde la estructura de datos
//   const getFileName = (upload: UploadData): string => {
//     // Primero intenta obtener el nombre del metadata
//     if (upload.metadata?.originalFilename) {
//       return upload.metadata.originalFilename;
//     }
    
//     // Luego intenta obtenerlo de data.project.name si existe
//     if (upload.data?.project?.name) {
//       return upload.data.project.name;
//     }
    
//     // Si no hay nombre específico, usa un nombre genérico
//     return 'Archivo sin nombre';
//   };

//   // Preparar datos para VirtualList
//   const virtualListItems: VirtualListItem[] = (uploads || []).map((upload): VirtualListItem => {
//     // Extraer el tipo de archivo del mimetype o determinar por la fuente
//     let fileType = 'Desconocido';
//     if (upload.metadata?.mimetype) {
//       const parts = upload.metadata.mimetype.split('/');
//       fileType = parts.length > 1 ? parts[1].toUpperCase() : upload.metadata.mimetype.toUpperCase();
//     } else if (upload.metadata?.source === 'text-input') {
//       fileType = 'JSON';
//     }
    
//     return {
//       id: upload._id || Math.random().toString(),
//       filename: getFileName(upload),
//       size: upload.metadata?.size || 0,
//       type: fileType,
//       uploadDate: upload.createdAt || '',
//       rawData: upload // Mantener los datos originales para referencia
//     };
//   });

//   // Configuración de columnas para VirtualList
//   const fileColumns: ColumnConfig[] = [
//     {
//       id: 'filename',
//       label: 'Nombre del Archivo',
//       width: '40%',
//       minWidth: 200,
//       render: (item: VirtualListItem) => (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <FileIcon sx={{ mr: 1, color: 'primary.main' }} />
//           <Typography variant="body2" noWrap title={item.filename}>
//             {item.filename}
//           </Typography>
//         </Box>
//       )
//     },
//     {
//       id: 'size',
//       label: 'Tamaño',
//       width: '15%',
//       minWidth: 100,
//       align: 'right',
//       render: (item: VirtualListItem) => (
//         <Typography variant="body2" color="text.secondary">
//           {formatFileSize(item.size)}
//         </Typography>
//       )
//     },
//     {
//       id: 'type',
//       label: 'Tipo',
//       width: '15%',
//       minWidth: 100,
//       render: (item: VirtualListItem) => (
//         <Chip
//           size="small"
//           label={item.type}
//           color={item.rawData?.metadata?.source === 'file-upload' ? 'primary' : 'secondary'}
//         />
//       )
//     },
//     {
//       id: 'date',
//       label: 'Fecha de Subida',
//       width: '30%',
//       minWidth: 150,
//       render: (item: VirtualListItem) => (
//         <Typography variant="body2" color="text.secondary">
//           {formatDate(item.uploadDate)}
//         </Typography>
//       )
//     }
//   ];

//   // Si no hay usuario en Redux ni en localStorage, mostrar mensaje
//   if (!user) {
//     return (
//       <Container maxWidth="md">
//         <Typography variant="h6" color="error" sx={{ mt: 4 }}>
//           Debes iniciar sesión para acceder a esta página
//         </Typography>
//         <Button 
//           variant="contained" 
//           sx={{ mt: 2 }}
//           onClick={() => router.push('/login')}
//         >
//           Ir a Iniciar Sesión
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Typography variant="h4" component="h1" gutterBottom>
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
//                 backgroundColor: 'primary.main',
//                 color: 'primary.contrastText'
//               }
//             }}
//           />
//         </Stack>
//       </Paper>

//       <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
//         {/* Menú lateral */}
//         <Paper elevation={2} sx={{ p: 2, width: { md: 250 }, flexShrink: 0 }}>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton 
//                 selected={activeTab === 0}
//                 onClick={() => setActiveTab(0)}
//               >
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main' }}>
//                     <DashboardIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary="Resumen" />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton 
//                 selected={activeTab === 1}
//                 onClick={() => setActiveTab(1)}
//               >
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'secondary.main' }}>
//                     <FilesIcon />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText primary="Mis Archivos" />
//               </ListItemButton>
//             </ListItem>

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
//             <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//               <Tab icon={<DashboardIcon />} iconPosition="start" label="Resumen" />
//               <Tab icon={<FilesIcon />} iconPosition="start" label="Mis Archivos" />
//             </Tabs>

//             <TabPanel value={activeTab} index={0}>
//               <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
//                 Resumen de Actividad
//               </Typography>

//               {error && (
//                 <Alert severity="error" sx={{ mb: 3 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
//                 <Paper sx={{ p: 3, flex: 1, bgcolor: 'background.paper' }}>
//                   <Typography variant="h6" color="text.secondary">
//                     Archivos Procesados
//                   </Typography>
//                   {isLoading ? (
//                     <CircularProgress size={40} sx={{ mt: 1 }} />
//                   ) : (
//                     <Typography variant="h3" sx={{ mt: 1, color: 'primary.main' }}>
//                       {uploads?.length || 0}
//                     </Typography>
//                   )}
//                 </Paper>

//                 <Paper sx={{ p: 3, flex: 1, bgcolor: 'background.paper' }}>
//                   <Typography variant="h6" color="text.secondary">
//                     Última Actividad
//                   </Typography>
//                   {isLoading ? (
//                     <CircularProgress size={40} sx={{ mt: 1 }} />
//                   ) : uploads && uploads.length > 0 ? (
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

//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Tableros Recientes
//                 </Typography>
//                 <Button 
//                   startIcon={<RefreshIcon />} 
//                   onClick={() => getUploads()}
//                   disabled={isLoading}
//                 >
//                   Actualizar
//                 </Button>
//               </Box>
              
//               {isLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : recentUploads && recentUploads.length > 0 ? (
//                 <Paper elevation={1} sx={{ mt: 1, mb: 4 }}>
//                   <List>
//                     {recentUploads.map((upload, index) => (
//                       <React.Fragment key={upload._id || index}>
//                         <ListItem>
//                           <ListItemAvatar>
//                             <Avatar sx={{ bgcolor: 'primary.main' }}>
//                               <FileIcon />
//                             </Avatar>
//                           </ListItemAvatar>
//                           <ListItemText 
//                             primary={getFileName(upload)} 
//                             secondary={
//                               <Box>
//                                 <Typography variant="body2">
//                                   Creado: {formatDate(upload.createdAt)}
//                                 </Typography>
                           
//                               </Box>
//                             }
//                           />
//                         </ListItem>
//                         {index < recentUploads.length - 1 && <Divider variant="inset" component="li" />}
//                       </React.Fragment>
//                     ))}
//                   </List>
//                 </Paper>
//               ) : (
//                 <Paper elevation={1} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
//                   <Typography variant="body1" color="text.secondary">
//                     No hay archivos subidos aún
//                   </Typography>
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

//               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                 Acciones Rápidas
//               </Typography>
              
//               <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
//                 <Button 
//                   variant="contained" 
//                   startIcon={<UploadIcon />}
//                   component={Link}
//                   href="/upload"
//                   sx={{ mb: { xs: 2, sm: 0 } }}
//                 >
//                   Subir Archivo
//                 </Button>
                
//                 <Button 
//                   variant="outlined" 
//                   startIcon={<FileIcon />}
//                   onClick={() => setActiveTab(1)}
//                   sx={{ mb: { xs: 2, sm: 0 } }}
//                 >
//                   Ver Todos los Archivos
//                 </Button>
                
//                 <Button 
//                   variant="outlined" 
//                   startIcon={<ApiIcon />}
//                   component="a"
//                   href="/api/swagger"
//                   target="_blank"
//                   sx={{ mb: { xs: 2, sm: 0 } }}
//                 >
//                   Ver API Docs
//                 </Button>
//               </Stack>

//               <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
//                 Tus Datos
//               </Typography>
              
//               <Paper elevation={1} sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
//                 <List>
//                   <ListItem>
//                     <ListItemText 
//                       primary="Nombre" 
//                       secondary={user.name}
//                       secondaryTypographyProps={{ color: 'text.primary' }}
//                     />
//                   </ListItem>
//                   <Divider component="li" variant="inset" />
//                   <ListItem>
//                     <ListItemText 
//                       primary="Email" 
//                       secondary={user.email}
//                       secondaryTypographyProps={{ color: 'text.primary' }}
//                     />
//                   </ListItem>
//                   <Divider component="li" variant="inset" />
//                   <ListItem>
//                     <ListItemText 
//                       primary="Total de archivos" 
//                       secondary={uploads?.length || 0}
//                       secondaryTypographyProps={{ color: 'text.primary' }}
//                     />
//                   </ListItem>
//                 </List>
//               </Paper>
//             </TabPanel>

//             <TabPanel value={activeTab} index={1}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Typography variant="h5" gutterBottom>
//                   Mis Archivos
//                 </Typography>
//                 <Button 
//                   variant="contained" 
//                   startIcon={<UploadIcon />}
//                   component={Link}
//                   href="/upload"
//                 >
//                   Subir Nuevo Archivo
//                 </Button>
//               </Box>

//               {error && (
//                 <Alert severity="error" sx={{ mb: 3 }}>
//                   {error}
//                 </Alert>
//               )}

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
//                   enableSearch={true}
//                   enableFilters={false}
//                   enableViewToggle={true}
//                   enablePagination={true}
//                   emptyState={
//                     <Paper elevation={1} sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
//                       <Typography variant="h6" color="text.secondary" gutterBottom>
//                         No hay archivos subidos aún
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                         Comienza subiendo tu primer archivo para procesar tus datos
//                       </Typography>
//                       <Button 
//                         variant="contained" 
//                         startIcon={<UploadIcon />}
//                         component={Link}
//                         href="/upload"
//                       >
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
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
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
} from '@mui/material';
import {
  Description as FileIcon,
  CloudUpload as UploadIcon,
  ExitToApp as LogoutIcon,
  Api as ApiIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
  Storage as FilesIcon,
} from '@mui/icons-material';
import { useUploads } from '../hooks/useUploads';
import { UploadData } from '../lib/features/uploads/uploadsSlice';
import VirtualList, { ColumnConfig, ListItem as VirtualListItem } from '@/components/ResponsiveList/ResponsiveList';

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

// --- Página principal ---
const DashboardPage = () => {
  const { user: reduxUser } = useSelector((state: RootState) => state.auth);
  const [localUser, setLocalUser] = useState<any>(null);
  const { uploads, isLoading, error, getUploads } = useUploads();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [recentUploads, setRecentUploads] = useState<UploadData[]>([]);

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

  const virtualListItems: VirtualListItem[] = (uploads || []).map((upload) => {
    let fileType = 'Desconocido';
    if (upload.metadata?.mimetype) {
      const [_, subtype] = upload.metadata.mimetype.split('/');
      fileType = subtype?.toUpperCase() || upload.metadata.mimetype.toUpperCase();
    } else if (upload.metadata?.source === 'text-input') {
      fileType = 'JSON';
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
          color={item.rawData?.metadata?.source === 'file-upload' ? 'primary' : 'secondary'}
        />
      ),
    },
    {
      id: 'date',
      label: 'Fecha de Subida',
      width: '30%',
      minWidth: 150,
      render: (item) => (
        <Typography variant="body2" color="text.secondary">
          {formatDate(item.uploadDate)}
        </Typography>
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
            ].map(({ label, icon, tab }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton selected={activeTab === tab} onClick={() => setActiveTab(tab)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={label} />
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
                <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
                  Subir Nuevo Archivo
                </Button>
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
                        Comienza subiendo tu primer archivo para procesar tus datos
                      </Typography>
                      <Button variant="contained" startIcon={<UploadIcon />} component={Link} href="/upload">
                        Subir primer archivo
                      </Button>
                    </Paper>
                  }
                />
              )}
            </TabPanel>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
