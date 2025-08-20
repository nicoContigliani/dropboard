// // // components/VirtualList.tsx
// // 'use client';

// // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   TextField,
// //   InputAdornment,
// //   IconButton,
// //   Pagination,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Chip,
// //   Button,
// //   CircularProgress,
// //   useTheme,
// //   useMediaQuery,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   SelectChangeEvent,
// //   Checkbox,
// //   ListItemText,
// //   OutlinedInput
// // } from '@mui/material';
// // import {
// //   Search as SearchIcon,
// //   FilterList as FilterIcon,
// //   Clear as ClearIcon,
// //   ViewList as ViewListIcon,
// //   GridOn as GridIcon
// // } from '@mui/icons-material';

// // // Definición de tipos
// // export interface ListItem {
// //   id: string | number;
// //   [key: string]: any;
// // }

// // export interface ColumnConfig {
// //   id: string;
// //   label: string;
// //   width?: number | string;
// //   minWidth?: number;
// //   align?: 'right' | 'left' | 'center';
// //   sortable?: boolean;
// //   filterable?: boolean;
// //   render?: (item: ListItem) => React.ReactNode;
// // }

// // export interface FilterConfig {
// //   key: string;
// //   label: string;
// //   type: 'text' | 'select' | 'multiselect' | 'date' | 'number';
// //   options?: Array<{ value: string | number; label: string }>;
// // }

// // export interface SortConfig {
// //   key: string;
// //   direction: 'asc' | 'desc';
// // }

// // export interface ViewConfig {
// //   type: 'list' | 'grid';
// //   itemsPerPage: number;
// //   gridColumns?: number;
// // }

// // export interface VirtualListProps {
// //   items: ListItem[];
// //   columns: ColumnConfig[];
// //   filters?: FilterConfig[];
// //   loading?: boolean;
// //   totalCount?: number;
// //   onPageChange?: (page: number) => void;
// //   onSortChange?: (sort: SortConfig | null) => void;
// //   onFilterChange?: (filters: { [key: string]: any }) => void;
// //   onViewChange?: (view: ViewConfig) => void;
// //   externalSort?: SortConfig | null;
// //   externalFilters?: { [key: string]: any };
// //   externalView?: ViewConfig;
// //   title?: string;
// //   enablePagination?: boolean;
// //   enableSearch?: boolean;
// //   enableFilters?: boolean;
// //   enableViewToggle?: boolean;
// //   defaultView?: ViewConfig;
// //   emptyState?: React.ReactNode;
// // }

// // const VirtualList: React.FC<VirtualListProps> = ({
// //   items,
// //   columns,
// //   filters = [],
// //   loading = false,
// //   totalCount,
// //   onPageChange,
// //   onSortChange,
// //   onFilterChange,
// //   onViewChange,
// //   externalSort = null,
// //   externalFilters = {},
// //   externalView,
// //   title,
// //   enablePagination = true,
// //   enableSearch = true,
// //   enableFilters = true,
// //   enableViewToggle = true,
// //   defaultView = { type: 'list', itemsPerPage: 10 },
// //   emptyState
// // }) => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

// //   // Estados internos
// //   const [internalPage, setInternalPage] = useState(1);
// //   const [internalSort, setInternalSort] = useState<SortConfig | null>(null);
// //   const [internalFilters, setInternalFilters] = useState<{ [key: string]: any }>({});
// //   const [internalView, setInternalView] = useState<ViewConfig>(defaultView);
// //   const [filterDialogOpen, setFilterDialogOpen] = useState(false);
// //   const [activeFilter, setActiveFilter] = useState<string>('');

// //   // Determinar si el control es interno o externo
// //   const isControlled = typeof onPageChange !== 'undefined' && 
// //                       typeof onSortChange !== 'undefined' && 
// //                       typeof onFilterChange !== 'undefined' &&
// //                       typeof onViewChange !== 'undefined' &&
// //                       typeof totalCount !== 'undefined';

// //   // Sincronizar con controles externos si se proporcionan
// //   useEffect(() => {
// //     if (externalSort !== undefined) {
// //       setInternalSort(externalSort);
// //     }
// //   }, [externalSort]);

// //   useEffect(() => {
// //     if (externalFilters !== undefined) {
// //       setInternalFilters(externalFilters);
// //     }
// //   }, [externalFilters]);

// //   useEffect(() => {
// //     if (externalView !== undefined) {
// //       setInternalView(externalView);
// //     }
// //   }, [externalView]);

// //   // Calcular el número total de elementos
// //   const computedTotalCount = useMemo(() => {
// //     return isControlled ? totalCount! : items.length;
// //   }, [isControlled, totalCount, items.length]);

// //   // Calcular el número total de páginas
// //   const pageCount = useMemo(() => {
// //     const itemsPerPage = internalView.itemsPerPage;
// //     return Math.ceil(computedTotalCount / itemsPerPage);
// //   }, [computedTotalCount, internalView.itemsPerPage]);

// //   // Obtener la página actual
// //   const currentPage = useMemo(() => {
// //     return isControlled ? internalPage : 1;
// //   }, [isControlled, internalPage]);

// //   // Manejar cambio de página
// //   const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
// //     if (isControlled) {
// //       onPageChange!(value);
// //     } else {
// //       setInternalPage(value);
// //     }
// //   }, [isControlled, onPageChange]);

// //   // Manejar cambio de ordenamiento
// //   const handleSortChange = useCallback((key: string) => {
// //     let newSort: SortConfig | null = null;
    
// //     if (internalSort?.key === key) {
// //       if (internalSort.direction === 'asc') {
// //         newSort = { key, direction: 'desc' };
// //       } else {
// //         newSort = null;
// //       }
// //     } else {
// //       newSort = { key, direction: 'asc' };
// //     }
    
// //     if (isControlled) {
// //       onSortChange!(newSort);
// //     } else {
// //       setInternalSort(newSort);
// //     }
// //   }, [internalSort, isControlled, onSortChange]);

// //   // Manejar cambio de filtros
// //   const handleFilterChange = useCallback((key: string, value: any) => {
// //     const newFilters = { ...internalFilters, [key]: value };
    
// //     if (isControlled) {
// //       onFilterChange!(newFilters);
// //     } else {
// //       setInternalFilters(newFilters);
// //     }
// //   }, [internalFilters, isControlled, onFilterChange]);

// //   // Limpiar un filtro específico
// //   const clearFilter = useCallback((key: string) => {
// //     const newFilters = { ...internalFilters };
// //     delete newFilters[key];
    
// //     if (isControlled) {
// //       onFilterChange!(newFilters);
// //     } else {
// //       setInternalFilters(newFilters);
// //     }
// //   }, [internalFilters, isControlled, onFilterChange]);

// //   // Limpiar todos los filtros
// //   const clearAllFilters = useCallback(() => {
// //     if (isControlled) {
// //       onFilterChange!({});
// //     } else {
// //       setInternalFilters({});
// //     }
// //   }, [isControlled, onFilterChange]);

// //   // Manejar cambio de vista
// //   const handleViewChange = useCallback((newView: ViewConfig) => {
// //     if (isControlled) {
// //       onViewChange!(newView);
// //     } else {
// //       setInternalView(newView);
// //     }
// //   }, [isControlled, onViewChange]);

// //   // Alternar entre vista de lista y grid
// //   const toggleView = useCallback(() => {
// //     const newViewType = internalView.type === 'list' ? 'grid' : 'list';
// //     const newView: ViewConfig = {
// //       type: newViewType,
// //       itemsPerPage: internalView.itemsPerPage,
// //       gridColumns: newViewType === 'grid' ? (isMobile ? 1 : isTablet ? 2 : 3) : undefined
// //     };
    
// //     handleViewChange(newView);
// //   }, [internalView, isMobile, isTablet, handleViewChange]);

// //   // Abrir diálogo de filtro
// //   const openFilterDialog = useCallback((filterKey: string) => {
// //     setActiveFilter(filterKey);
// //     setFilterDialogOpen(true);
// //   }, []);

// //   // Cerrar diálogo de filtro
// //   const closeFilterDialog = useCallback(() => {
// //     setFilterDialogOpen(false);
// //     setActiveFilter('');
// //   }, []);

// //   // Aplicar filtro desde el diálogo
// //   const applyFilter = useCallback((value: any) => {
// //     if (activeFilter) {
// //       handleFilterChange(activeFilter, value);
// //     }
// //     closeFilterDialog();
// //   }, [activeFilter, handleFilterChange, closeFilterDialog]);

// //   // Obtener datos paginados (solo para modo no controlado)
// //   const paginatedItems = useMemo(() => {
// //     if (isControlled) {
// //       return items;
// //     }
    
// //     const startIndex = (currentPage - 1) * internalView.itemsPerPage;
// //     const endIndex = startIndex + internalView.itemsPerPage;
    
// //     return items.slice(startIndex, endIndex);
// //   }, [isControlled, items, currentPage, internalView.itemsPerPage]);

// //   // Contar filtros activos
// //   const activeFiltersCount = useMemo(() => {
// //     return Object.keys(internalFilters).filter(key => {
// //       const value = internalFilters[key];
// //       return value !== null && value !== undefined && value !== '' && 
// //             (!Array.isArray(value) || value.length > 0);
// //     }).length;
// //   }, [internalFilters]);

// //   // Renderizar elemento de la lista
// //   const renderItem = useCallback((item: ListItem, index: number) => {
// //     if (internalView.type === 'grid') {
// //       return (
// //         <Box 
// //           key={item.id} 
// //           sx={{ 
// //             p: 1,
// //             width: `calc(100% / ${internalView.gridColumns || 3})`,
// //             [theme.breakpoints.down('sm')]: {
// //               width: '100%'
// //             },
// //             [theme.breakpoints.down('md')]: {
// //               width: internalView.gridColumns && internalView.gridColumns > 1 ? '50%' : '100%'
// //             }
// //           }}
// //         >
// //           <Paper sx={{ p: 2, height: '100%' }}>
// //             {columns.map(column => (
// //               <Box key={column.id} sx={{ mb: 1 }}>
// //                 <Typography variant="caption" color="textSecondary">
// //                   {column.label}:
// //                 </Typography>
// //                 <Typography variant="body2">
// //                   {column.render ? column.render(item) : item[column.id]}
// //                 </Typography>
// //               </Box>
// //             ))}
// //           </Paper>
// //         </Box>
// //       );
// //     }

// //     // Vista de lista
// //     return (
// //       <Box 
// //         key={item.id} 
// //         component={Paper} 
// //         sx={{ 
// //           p: 2, 
// //           mb: 1,
// //           display: 'flex',
// //           flexDirection: isMobile ? 'column' : 'row',
// //           alignItems: isMobile ? 'flex-start' : 'center'
// //         }}
// //       >
// //         {columns.map(column => (
// //           <Box 
// //             key={column.id} 
// //             sx={{ 
// //               flex: column.width || 1,
// //               minWidth: column.minWidth,
// //               textAlign: column.align || 'left',
// //               mb: isMobile ? 1 : 0,
// //               ...(isMobile ? { width: '100%' } : {})
// //             }}
// //           >
// //             <Typography variant="body2">
// //               {column.render ? column.render(item) : item[column.id]}
// //             </Typography>
// //           </Box>
// //         ))}
// //       </Box>
// //     );
// //   }, [internalView, columns, isMobile, theme]);

// //   // Renderizar controles de filtro
// //   const renderFilterControl = useCallback((filter: FilterConfig) => {
// //     const value = internalFilters[filter.key] || '';

// //     switch (filter.type) {
// //       case 'text':
// //         return (
// //           <TextField
// //             fullWidth
// //             size="small"
// //             label={filter.label}
// //             value={value}
// //             onChange={(e) => handleFilterChange(filter.key, e.target.value)}
// //             InputProps={{
// //               endAdornment: value && (
// //                 <InputAdornment position="end">
// //                   <IconButton size="small" onClick={() => clearFilter(filter.key)}>
// //                     <ClearIcon />
// //                   </IconButton>
// //                 </InputAdornment>
// //               )
// //             }}
// //           />
// //         );
      
// //       case 'select':
// //         return (
// //           <FormControl fullWidth size="small">
// //             <InputLabel>{filter.label}</InputLabel>
// //             <Select
// //               value={value || ''}
// //               label={filter.label}
// //               onChange={(e) => handleFilterChange(filter.key, e.target.value)}
// //             >
// //               <MenuItem value="">
// //                 <em>Todos</em>
// //               </MenuItem>
// //               {filter.options?.map(option => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         );
      
// //       case 'multiselect':
// //         return (
// //           <FormControl fullWidth size="small">
// //             <InputLabel>{filter.label}</InputLabel>
// //             <Select
// //               multiple
// //               value={value || []}
// //               onChange={(e) => handleFilterChange(filter.key, e.target.value)}
// //               input={<OutlinedInput label={filter.label} />}
// //               renderValue={(selected) => (
// //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// //                   {(selected as string[]).map((value) => {
// //                     const option = filter.options?.find(opt => opt.value === value);
// //                     return option ? (
// //                       <Chip key={value} size="small" label={option.label} />
// //                     ) : null;
// //                   })}
// //                 </Box>
// //               )}
// //             >
// //               {filter.options?.map(option => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   <Checkbox checked={(value || []).includes(option.value)} />
// //                   <ListItemText primary={option.label} />
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         );
      
// //       case 'number':
// //         return (
// //           <TextField
// //             fullWidth
// //             size="small"
// //             type="number"
// //             label={filter.label}
// //             value={value}
// //             onChange={(e) => handleFilterChange(filter.key, e.target.value)}
// //             InputProps={{
// //               endAdornment: value && (
// //                 <InputAdornment position="end">
// //                   <IconButton size="small" onClick={() => clearFilter(filter.key)}>
// //                     <ClearIcon />
// //                   </IconButton>
// //                 </InputAdornment>
// //               )
// //             }}
// //           />
// //         );
      
// //       default:
// //         return null;
// //     }
// //   }, [internalFilters, handleFilterChange, clearFilter]);

// //   // Renderizar diálogo de filtro
// //   const renderFilterDialog = useCallback(() => {
// //     const filter = filters.find(f => f.key === activeFilter);
// //     if (!filter) return null;

// //     return (
// //       <Dialog open={filterDialogOpen} onClose={closeFilterDialog} maxWidth="sm" fullWidth>
// //         <DialogTitle>Filtrar por {filter.label}</DialogTitle>
// //         <DialogContent sx={{ mt: 2 }}>
// //           {renderFilterControl(filter)}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={closeFilterDialog}>Cancelar</Button>
// //           <Button 
// //             onClick={() => applyFilter(internalFilters[filter.key] || '')}
// //             variant="contained"
// //           >
// //             Aplicar
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     );
// //   }, [filterDialogOpen, activeFilter, filters, internalFilters, closeFilterDialog, renderFilterControl, applyFilter]);

// //   return (
// //     <Box sx={{ width: '100%' }}>
// //       {/* Header con controles */}
// //       <Box sx={{ 
// //         display: 'flex', 
// //         flexDirection: isMobile ? 'column' : 'row', 
// //         alignItems: 'center', 
// //         gap: 2, 
// //         mb: 2,
// //         p: 2,
// //         bgcolor: 'background.paper',
// //         borderRadius: 1
// //       }}>
// //         {title && (
// //           <Typography variant="h6" sx={{ flexGrow: 1 }}>
// //             {title}
// //           </Typography>
// //         )}
        
// //         {/* Búsqueda global */}
// //         {enableSearch && (
// //           <TextField
// //             placeholder="Buscar..."
// //             size="small"
// //             value={internalFilters.globalSearch || ''}
// //             onChange={(e) => handleFilterChange('globalSearch', e.target.value)}
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <SearchIcon />
// //                 </InputAdornment>
// //               ),
// //               endAdornment: internalFilters.globalSearch && (
// //                 <InputAdornment position="end">
// //                   <IconButton size="small" onClick={() => clearFilter('globalSearch')}>
// //                     <ClearIcon />
// //                   </IconButton>
// //                 </InputAdornment>
// //               )
// //             }}
// //             sx={{ minWidth: isMobile ? '100%' : 250 }}
// //           />
// //         )}
        
// //         {/* Botón de filtros */}
// //         {enableFilters && filters.length > 0 && (
// //           <Button
// //             variant={activeFiltersCount > 0 ? "contained" : "outlined"}
// //             color="primary"
// //             startIcon={<FilterIcon />}
// //             onClick={() => openFilterDialog(filters[0].key)}
// //           >
// //             {isMobile ? `Filtros` : `Filtros (${activeFiltersCount})`}
// //           </Button>
// //         )}
        
// //         {/* Alternar vista */}
// //         {enableViewToggle && (
// //           <IconButton onClick={toggleView} color="primary">
// //             {internalView.type === 'list' ? <GridIcon /> : <ViewListIcon />}
// //           </IconButton>
// //         )}
        
// //         {/* Limpiar filtros */}
// //         {activeFiltersCount > 0 && (
// //           <Button variant="text" color="primary" onClick={clearAllFilters}>
// //             Limpiar
// //           </Button>
// //         )}
// //       </Box>

// //       {/* Filtros activos */}
// //       {activeFiltersCount > 0 && !isMobile && (
// //         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
// //           {Object.entries(internalFilters).map(([key, value]) => {
// //             if (!value || (Array.isArray(value) && value.length === 0)) return null;
            
// //             const filter = filters.find(f => f.key === key) || { key, label: key, type: 'text' };
// //             let label = '';
            
// //             if (Array.isArray(value)) {
// //               const selectedOptions = filter.options?.filter(opt => value.includes(opt.value));
// //               label = selectedOptions?.map(opt => opt.label).join(', ') || value.join(', ');
// //             } else if (filter.options) {
// //               const option = filter.options.find(opt => opt.value === value);
// //               label = option ? option.label : value;
// //             } else {
// //               label = value.toString();
// //             }
            
// //             return (
// //               <Chip
// //                 key={key}
// //                 label={`${filter.label}: ${label}`}
// //                 onDelete={() => clearFilter(key)}
// //                 size="small"
// //               />
// //             );
// //           })}
// //         </Box>
// //       )}

// //       {/* Contenedor de la lista */}
// //       <Box sx={{ 
// //         minHeight: 400,
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         ...(loading ? {} : { display: 'block' })
// //       }}>
// //         {loading ? (
// //           <CircularProgress />
// //         ) : paginatedItems.length === 0 ? (
// //           emptyState || (
// //             <Box sx={{ textAlign: 'center', p: 4 }}>
// //               <Typography variant="h6" color="textSecondary">
// //                 No se encontraron resultados
// //               </Typography>
// //               {activeFiltersCount > 0 && (
// //                 <Button onClick={clearAllFilters} sx={{ mt: 1 }}>
// //                   Limpiar filtros
// //                 </Button>
// //               )}
// //             </Box>
// //           )
// //         ) : (
// //           <Box sx={{ 
// //             display: internalView.type === 'grid' ? 'flex' : 'block',
// //             flexWrap: 'wrap',
// //             gap: internalView.type === 'grid' ? 1 : 0
// //           }}>
// //             {paginatedItems.map(renderItem)}
// //           </Box>
// //         )}
// //       </Box>

// //       {/* Paginación */}
// //       {enablePagination && pageCount > 1 && (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
// //           <Pagination
// //             count={pageCount}
// //             page={currentPage}
// //             onChange={handlePageChange}
// //             color="primary"
// //             size={isMobile ? "small" : "medium"}
// //           />
// //         </Box>
// //       )}

// //       {/* Diálogo de filtros */}
// //       {renderFilterDialog()}
// //     </Box>
// //   );
// // };

// // export default VirtualList;


// // components/VirtualList.tsx
// 'use client';

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Pagination,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Button,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   SelectChangeEvent,
//   Checkbox,
//   ListItemText,
//   OutlinedInput
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   Clear as ClearIcon,
//   ViewList as ViewListIcon,
//   GridOn as GridIcon
// } from '@mui/icons-material';

// // Definición de tipos
// export interface ListItem {
//   id: string | number;
//   [key: string]: any;
// }

// export interface ColumnConfig {
//   id: string;
//   label: string;
//   width?: number | string;
//   minWidth?: number;
//   align?: 'right' | 'left' | 'center';
//   sortable?: boolean;
//   filterable?: boolean;
//   render?: (item: ListItem) => React.ReactNode;
// }

// export interface FilterConfig {
//   key: string;
//   label: string;
//   type: 'text' | 'select' | 'multiselect' | 'date' | 'number';
//   options?: Array<{ value: string | number; label: string }>;
// }

// export interface SortConfig {
//   key: string;
//   direction: 'asc' | 'desc';
// }

// export interface ViewConfig {
//   type: 'list' | 'grid';
//   itemsPerPage: number;
//   gridColumns?: number;
// }

// export interface VirtualListProps {
//   items: ListItem[];
//   columns: ColumnConfig[];
//   filters?: FilterConfig[];
//   loading?: boolean;
//   totalCount?: number;
//   onPageChange?: (page: number) => void;
//   onSortChange?: (sort: SortConfig | null) => void;
//   onFilterChange?: (filters: { [key: string]: any }) => void;
//   onViewChange?: (view: ViewConfig) => void;
//   externalSort?: SortConfig | null;
//   externalFilters?: { [key: string]: any };
//   externalView?: ViewConfig;
//   title?: string;
//   enablePagination?: boolean;
//   enableSearch?: boolean;
//   enableFilters?: boolean;
//   enableViewToggle?: boolean;
//   defaultView?: ViewConfig;
//   emptyState?: React.ReactNode;
// }

// const VirtualList: React.FC<VirtualListProps> = ({
//   items,
//   columns,
//   filters = [],
//   loading = false,
//   totalCount,
//   onPageChange,
//   onSortChange,
//   onFilterChange,
//   onViewChange,
//   externalSort = null,
//   externalFilters = {},
//   externalView,
//   title,
//   enablePagination = true,
//   enableSearch = true,
//   enableFilters = true,
//   enableViewToggle = true,
//   defaultView = { type: 'list', itemsPerPage: 10 },
//   emptyState
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   // Estados internos
//   const [internalPage, setInternalPage] = useState(1);
//   const [internalSort, setInternalSort] = useState<SortConfig | null>(null);
//   const [internalFilters, setInternalFilters] = useState<{ [key: string]: any }>({});
//   const [internalView, setInternalView] = useState<ViewConfig>(defaultView);
//   const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//   const [activeFilter, setActiveFilter] = useState<string>('');

//   // Determinar si el control es interno o externo
//   const isControlled = typeof onPageChange !== 'undefined' && 
//                       typeof onSortChange !== 'undefined' && 
//                       typeof onFilterChange !== 'undefined' &&
//                       typeof onViewChange !== 'undefined' &&
//                       typeof totalCount !== 'undefined';

//   // Sincronizar con controles externos si se proporcionan
//   useEffect(() => {
//     if (externalSort !== undefined) {
//       setInternalSort(externalSort);
//     }
//   }, [externalSort]);

//   useEffect(() => {
//     if (externalFilters !== undefined) {
//       // Solo actualizar si los filtros externos son realmente diferentes
//       // para evitar ciclos de actualización innecesarios
//       const currentFiltersStr = JSON.stringify(internalFilters);
//       const externalFiltersStr = JSON.stringify(externalFilters);
      
//       if (currentFiltersStr !== externalFiltersStr) {
//         setInternalFilters(externalFilters);
//       }
//     }
//   }, [externalFilters]); // Removí internalFilters de las dependencias

//   useEffect(() => {
//     if (externalView !== undefined) {
//       setInternalView(externalView);
//     }
//   }, [externalView]);

//   // Calcular el número total de elementos
//   const computedTotalCount = useMemo(() => {
//     return isControlled ? totalCount! : items.length;
//   }, [isControlled, totalCount, items.length]);

//   // Calcular el número total de páginas
//   const pageCount = useMemo(() => {
//     const itemsPerPage = internalView.itemsPerPage;
//     return Math.ceil(computedTotalCount / itemsPerPage);
//   }, [computedTotalCount, internalView.itemsPerPage]);

//   // Obtener la página actual
//   const currentPage = useMemo(() => {
//     return isControlled ? internalPage : 1;
//   }, [isControlled, internalPage]);

//   // Manejar cambio de página
//   const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
//     if (isControlled) {
//       onPageChange!(value);
//     } else {
//       setInternalPage(value);
//     }
//   }, [isControlled, onPageChange]);

//   // Manejar cambio de ordenamiento
//   const handleSortChange = useCallback((key: string) => {
//     let newSort: SortConfig | null = null;
    
//     if (internalSort?.key === key) {
//       if (internalSort.direction === 'asc') {
//         newSort = { key, direction: 'desc' };
//       } else {
//         newSort = null;
//       }
//     } else {
//       newSort = { key, direction: 'asc' };
//     }
    
//     if (isControlled) {
//       onSortChange!(newSort);
//     } else {
//       setInternalSort(newSort);
//     }
//   }, [internalSort, isControlled, onSortChange]);

//   // Manejar cambio de filtros
//   const handleFilterChange = useCallback((key: string, value: any) => {
//     const newFilters = { ...internalFilters, [key]: value };
    
//     if (isControlled) {
//       onFilterChange!(newFilters);
//     } else {
//       setInternalFilters(newFilters);
//     }
//   }, [internalFilters, isControlled, onFilterChange]);

//   // Limpiar un filtro específico
//   const clearFilter = useCallback((key: string) => {
//     const newFilters = { ...internalFilters };
//     delete newFilters[key];
    
//     if (isControlled) {
//       onFilterChange!(newFilters);
//     } else {
//       setInternalFilters(newFilters);
//     }
//   }, [internalFilters, isControlled, onFilterChange]);

//   // Limpiar todos los filtros
//   const clearAllFilters = useCallback(() => {
//     if (isControlled) {
//       onFilterChange!({});
//     } else {
//       setInternalFilters({});
//     }
//   }, [isControlled, onFilterChange]);

//   // Manejar cambio de vista
//   const handleViewChange = useCallback((newView: ViewConfig) => {
//     if (isControlled) {
//       onViewChange!(newView);
//     } else {
//       setInternalView(newView);
//     }
//   }, [isControlled, onViewChange]);

//   // Alternar entre vista de lista y grid
//   const toggleView = useCallback(() => {
//     const newViewType = internalView.type === 'list' ? 'grid' : 'list';
//     const newView: ViewConfig = {
//       type: newViewType,
//       itemsPerPage: internalView.itemsPerPage,
//       gridColumns: newViewType === 'grid' ? (isMobile ? 1 : isTablet ? 2 : 3) : undefined
//     };
    
//     handleViewChange(newView);
//   }, [internalView, isMobile, isTablet, handleViewChange]);

//   // Abrir diálogo de filtro
//   const openFilterDialog = useCallback((filterKey: string) => {
//     setActiveFilter(filterKey);
//     setFilterDialogOpen(true);
//   }, []);

//   // Cerrar diálogo de filtro
//   const closeFilterDialog = useCallback(() => {
//     setFilterDialogOpen(false);
//     setActiveFilter('');
//   }, []);

//   // Aplicar filtro desde el diálogo
//   const applyFilter = useCallback((value: any) => {
//     if (activeFilter) {
//       handleFilterChange(activeFilter, value);
//     }
//     closeFilterDialog();
//   }, [activeFilter, handleFilterChange, closeFilterDialog]);

//   // Obtener datos paginados (solo para modo no controlado)
//   const paginatedItems = useMemo(() => {
//     if (isControlled) {
//       return items;
//     }
    
//     const startIndex = (currentPage - 1) * internalView.itemsPerPage;
//     const endIndex = startIndex + internalView.itemsPerPage;
    
//     return items.slice(startIndex, endIndex);
//   }, [isControlled, items, currentPage, internalView.itemsPerPage]);

//   // Contar filtros activos
//   const activeFiltersCount = useMemo(() => {
//     return Object.keys(internalFilters).filter(key => {
//       const value = internalFilters[key];
//       return value !== null && value !== undefined && value !== '' && 
//             (!Array.isArray(value) || value.length > 0);
//     }).length;
//   }, [internalFilters]);

//   // Renderizar elemento de la lista
//   const renderItem = useCallback((item: ListItem, index: number) => {
//     if (internalView.type === 'grid') {
//       return (
//         <Box 
//           key={item.id} 
//           sx={{ 
//             p: 1,
//             width: `calc(100% / ${internalView.gridColumns || 3})`,
//             [theme.breakpoints.down('sm')]: {
//               width: '100%'
//             },
//             [theme.breakpoints.down('md')]: {
//               width: internalView.gridColumns && internalView.gridColumns > 1 ? '50%' : '100%'
//             }
//           }}
//         >
//           <Paper sx={{ p: 2, height: '100%' }}>
//             {columns.map(column => (
//               <Box key={column.id} sx={{ mb: 1 }}>
//                 <Typography variant="caption" color="textSecondary">
//                   {column.label}:
//                 </Typography>
//                 <Typography variant="body2">
//                   {column.render ? column.render(item) : item[column.id]}
//                 </Typography>
//               </Box>
//             ))}
//           </Paper>
//         </Box>
//       );
//     }

//     // Vista de lista
//     return (
//       <Box 
//         key={item.id} 
//         component={Paper} 
//         sx={{ 
//           p: 2, 
//           mb: 1,
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           alignItems: isMobile ? 'flex-start' : 'center'
//         }}
//       >
//         {columns.map(column => (
//           <Box 
//             key={column.id} 
//             sx={{ 
//               flex: column.width || 1,
//               minWidth: column.minWidth,
//               textAlign: column.align || 'left',
//               mb: isMobile ? 1 : 0,
//               ...(isMobile ? { width: '100%' } : {})
//             }}
//           >
//             <Typography variant="body2">
//               {column.render ? column.render(item) : item[column.id]}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     );
//   }, [internalView, columns, isMobile, theme]);

//   // Renderizar controles de filtro
//   const renderFilterControl = useCallback((filter: FilterConfig) => {
//     const value = internalFilters[filter.key] || '';

//     switch (filter.type) {
//       case 'text':
//         return (
//           <TextField
//             fullWidth
//             size="small"
//             label={filter.label}
//             value={value}
//             onChange={(e) => handleFilterChange(filter.key, e.target.value)}
//             InputProps={{
//               endAdornment: value && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={() => clearFilter(filter.key)}>
//                     <ClearIcon />
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//           />
//         );
      
//       case 'select':
//         return (
//           <FormControl fullWidth size="small">
//             <InputLabel>{filter.label}</InputLabel>
//             <Select
//               value={value || ''}
//               label={filter.label}
//               onChange={(e) => handleFilterChange(filter.key, e.target.value)}
//             >
//               <MenuItem value="">
//                 <em>Todos</em>
//               </MenuItem>
//               {filter.options?.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );
      
//       case 'multiselect':
//         return (
//           <FormControl fullWidth size="small">
//             <InputLabel>{filter.label}</InputLabel>
//             <Select
//               multiple
//               value={value || []}
//               onChange={(e) => handleFilterChange(filter.key, e.target.value)}
//               input={<OutlinedInput label={filter.label} />}
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {(selected as string[]).map((value) => {
//                     const option = filter.options?.find(opt => opt.value === value);
//                     return option ? (
//                       <Chip key={value} size="small" label={option.label} />
//                     ) : null;
//                   })}
//                 </Box>
//               )}
//             >
//               {filter.options?.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   <Checkbox checked={(value || []).includes(option.value)} />
//                   <ListItemText primary={option.label} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );
      
//       case 'number':
//         return (
//           <TextField
//             fullWidth
//             size="small"
//             type="number"
//             label={filter.label}
//             value={value}
//             onChange={(e) => handleFilterChange(filter.key, e.target.value)}
//             InputProps={{
//               endAdornment: value && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={() => clearFilter(filter.key)}>
//                     <ClearIcon />
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//           />
//         );
      
//       default:
//         return null;
//     }
//   }, [internalFilters, handleFilterChange, clearFilter]);

//   // Renderizar diálogo de filtro
//   const renderFilterDialog = useCallback(() => {
//     const filter = filters.find(f => f.key === activeFilter);
//     if (!filter) return null;

//     return (
//       <Dialog open={filterDialogOpen} onClose={closeFilterDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>Filtrar por {filter.label}</DialogTitle>
//         <DialogContent sx={{ mt: 2 }}>
//           {renderFilterControl(filter)}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeFilterDialog}>Cancelar</Button>
//           <Button 
//             onClick={() => applyFilter(internalFilters[filter.key] || '')}
//             variant="contained"
//           >
//             Aplicar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   }, [filterDialogOpen, activeFilter, filters, internalFilters, closeFilterDialog, renderFilterControl, applyFilter]);

//   return (
//     <Box sx={{ width: '100%' }}>
//       {/* Header con controles */}
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: isMobile ? 'column' : 'row', 
//         alignItems: 'center', 
//         gap: 2, 
//         mb: 2,
//         p: 2,
//         bgcolor: 'background.paper',
//         borderRadius: 1
//       }}>
//         {title && (
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             {title}
//           </Typography>
//         )}
        
//         {/* Búsqueda global */}
//         {enableSearch && (
//           <TextField
//             placeholder="Buscar..."
//             size="small"
//             value={internalFilters.globalSearch || ''}
//             onChange={(e) => handleFilterChange('globalSearch', e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: internalFilters.globalSearch && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={() => clearFilter('globalSearch')}>
//                     <ClearIcon />
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//             sx={{ minWidth: isMobile ? '100%' : 250 }}
//           />
//         )}
        
//         {/* Botón de filtros */}
//         {enableFilters && filters.length > 0 && (
//           <Button
//             variant={activeFiltersCount > 0 ? "contained" : "outlined"}
//             color="primary"
//             startIcon={<FilterIcon />}
//             onClick={() => openFilterDialog(filters[0].key)}
//           >
//             {isMobile ? `Filtros` : `Filtros (${activeFiltersCount})`}
//           </Button>
//         )}
        
//         {/* Alternar vista */}
//         {enableViewToggle && (
//           <IconButton onClick={toggleView} color="primary">
//             {internalView.type === 'list' ? <GridIcon /> : <ViewListIcon />}
//           </IconButton>
//         )}
        
//         {/* Limpiar filtros */}
//         {activeFiltersCount > 0 && (
//           <Button variant="text" color="primary" onClick={clearAllFilters}>
//             Limpiar
//           </Button>
//         )}
//       </Box>

//       {/* Filtros activos */}
//       {activeFiltersCount > 0 && !isMobile && (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//           {Object.entries(internalFilters).map(([key, value]) => {
//             if (!value || (Array.isArray(value) && value.length === 0)) return null;
            
//             const filter = filters.find(f => f.key === key) || { key, label: key, type: 'text' };
//             let label = '';
            
//             if (Array.isArray(value)) {
//               const selectedOptions = filter.options?.filter(opt => value.includes(opt.value));
//               label = selectedOptions?.map(opt => opt.label).join(', ') || value.join(', ');
//             } else if (filter.options) {
//               const option = filter.options.find(opt => opt.value === value);
//               label = option ? option.label : value;
//             } else {
//               label = value.toString();
//             }
            
//             return (
//               <Chip
//                 key={key}
//                 label={`${filter.label}: ${label}`}
//                 onDelete={() => clearFilter(key)}
//                 size="small"
//               />
//             );
//           })}
//         </Box>
//       )}

//       {/* Contenedor de la lista */}
//       <Box sx={{ 
//         minHeight: 400,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...(loading ? {} : { display: 'block' })
//       }}>
//         {loading ? (
//           <CircularProgress />
//         ) : paginatedItems.length === 0 ? (
//           emptyState || (
//             <Box sx={{ textAlign: 'center', p: 4 }}>
//               <Typography variant="h6" color="textSecondary">
//                 No se encontraron resultados
//               </Typography>
//               {activeFiltersCount > 0 && (
//                 <Button onClick={clearAllFilters} sx={{ mt: 1 }}>
//                   Limpiar filtros
//                 </Button>
//               )}
//             </Box>
//           )
//         ) : (
//           <Box sx={{ 
//             display: internalView.type === 'grid' ? 'flex' : 'block',
//             flexWrap: 'wrap',
//             gap: internalView.type === 'grid' ? 1 : 0
//           }}>
//             {paginatedItems.map(renderItem)}
//           </Box>
//         )}
//       </Box>

//       {/* Paginación */}
//       {enablePagination && pageCount > 1 && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//           <Pagination
//             count={pageCount}
//             page={currentPage}
//             onChange={handlePageChange}
//             color="primary"
//             size={isMobile ? "small" : "medium"}
//           />
//         </Box>
//       )}

//       {/* Diálogo de filtros */}
//       {renderFilterDialog()}
//     </Box>
//   );
// };

// export default VirtualList;



'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ViewList as ViewListIcon,
  GridOn as GridIcon
} from '@mui/icons-material';

// Definición de tipos
export interface ListItem {
  id: string | number;
  [key: string]: any;
}

export interface ColumnConfig {
  id: string;
  label: string;
  width?: number | string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  sortable?: boolean;
  filterable?: boolean;
  render?: (item: ListItem) => React.ReactNode;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number';
  options?: Array<{ value: string | number; label: string }>;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface ViewConfig {
  type: 'list' | 'grid';
  itemsPerPage: number;
  gridColumns?: number;
}

export interface VirtualListProps {
  items: ListItem[];
  columns: ColumnConfig[];
  filters?: FilterConfig[];
  loading?: boolean;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sort: SortConfig | null) => void;
  onFilterChange?: (filters: { [key: string]: any }) => void;
  onViewChange?: (view: ViewConfig) => void;
  onRowClick?: (id: string | number) => void;
  externalSort?: SortConfig | null;
  externalFilters?: { [key: string]: any };
  externalView?: ViewConfig;
  title?: string;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableFilters?: boolean;
  enableViewToggle?: boolean;
  defaultView?: ViewConfig;
  emptyState?: React.ReactNode;
}

const VirtualList: React.FC<VirtualListProps> = ({
  items,
  columns,
  filters = [],
  loading = false,
  totalCount,
  onPageChange,
  onSortChange,
  onFilterChange,
  onViewChange,
  onRowClick,
  externalSort = null,
  externalFilters = {},
  externalView,
  title,
  enablePagination = true,
  enableSearch = true,
  enableFilters = true,
  enableViewToggle = true,
  defaultView = { type: 'list', itemsPerPage: 10 },
  emptyState
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // Estados internos
  const [internalPage, setInternalPage] = useState(1);
  const [internalSort, setInternalSort] = useState<SortConfig | null>(null);
  const [internalFilters, setInternalFilters] = useState<{ [key: string]: any }>({});
  const [internalView, setInternalView] = useState<ViewConfig>(defaultView);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('');

  // Determinar si el control es interno o externo
  const isControlled = typeof onPageChange !== 'undefined' && 
                      typeof onSortChange !== 'undefined' && 
                      typeof onFilterChange !== 'undefined' &&
                      typeof onViewChange !== 'undefined' &&
                      typeof totalCount !== 'undefined';

  // Sincronizar con controles externos si se proporcionan
  useEffect(() => {
    if (externalSort !== undefined) {
      setInternalSort(externalSort);
    }
  }, [externalSort]);

  useEffect(() => {
    if (externalFilters !== undefined) {
      // Solo actualizar si los filtros externos son realmente diferentes
      // para evitar ciclos de actualización innecesarios
      const currentFiltersStr = JSON.stringify(internalFilters);
      const externalFiltersStr = JSON.stringify(externalFilters);
      
      if (currentFiltersStr !== externalFiltersStr) {
        setInternalFilters(externalFilters);
      }
    }
  }, [externalFilters]);

  useEffect(() => {
    if (externalView !== undefined) {
      setInternalView(externalView);
    }
  }, [externalView]);

  // Calcular el número total de elementos
  const computedTotalCount = useMemo(() => {
    return isControlled ? totalCount! : items.length;
  }, [isControlled, totalCount, items.length]);

  // Calcular el número total de páginas
  const pageCount = useMemo(() => {
    const itemsPerPage = internalView.itemsPerPage;
    return Math.ceil(computedTotalCount / itemsPerPage);
  }, [computedTotalCount, internalView.itemsPerPage]);

  // Obtener la página actual
  const currentPage = useMemo(() => {
    return isControlled ? internalPage : 1;
  }, [isControlled, internalPage]);

  // Manejar clic en una fila
  const handleRowClick = useCallback((id: string | number) => {
    if (onRowClick) {
      onRowClick(id);
    } else {
      // Redirección por defecto si no se proporciona un manejador personalizado
      router.push(`/dashboard/${id}`);
    }
  }, [onRowClick, router]);

  // Manejar cambio de página
  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    if (isControlled) {
      onPageChange!(value);
    } else {
      setInternalPage(value);
    }
  }, [isControlled, onPageChange]);

  // Manejar cambio de ordenamiento
  const handleSortChange = useCallback((key: string) => {
    let newSort: SortConfig | null = null;
    
    if (internalSort?.key === key) {
      if (internalSort.direction === 'asc') {
        newSort = { key, direction: 'desc' };
      } else {
        newSort = null;
      }
    } else {
      newSort = { key, direction: 'asc' };
    }
    
    if (isControlled) {
      onSortChange!(newSort);
    } else {
      setInternalSort(newSort);
    }
  }, [internalSort, isControlled, onSortChange]);

  // Manejar cambio de filtros
  const handleFilterChange = useCallback((key: string, value: any) => {
    const newFilters = { ...internalFilters, [key]: value };
    
    if (isControlled) {
      onFilterChange!(newFilters);
    } else {
      setInternalFilters(newFilters);
    }
  }, [internalFilters, isControlled, onFilterChange]);

  // Limpiar un filtro específico
  const clearFilter = useCallback((key: string) => {
    const newFilters = { ...internalFilters };
    delete newFilters[key];
    
    if (isControlled) {
      onFilterChange!(newFilters);
    } else {
      setInternalFilters(newFilters);
    }
  }, [internalFilters, isControlled, onFilterChange]);

  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    if (isControlled) {
      onFilterChange!({});
    } else {
      setInternalFilters({});
    }
  }, [isControlled, onFilterChange]);

  // Manejar cambio de vista
  const handleViewChange = useCallback((newView: ViewConfig) => {
    if (isControlled) {
      onViewChange!(newView);
    } else {
      setInternalView(newView);
    }
  }, [isControlled, onViewChange]);

  // Alternar entre vista de lista y grid
  const toggleView = useCallback(() => {
    const newViewType = internalView.type === 'list' ? 'grid' : 'list';
    const newView: ViewConfig = {
      type: newViewType,
      itemsPerPage: internalView.itemsPerPage,
      gridColumns: newViewType === 'grid' ? (isMobile ? 1 : isTablet ? 2 : 3) : undefined
    };
    
    handleViewChange(newView);
  }, [internalView, isMobile, isTablet, handleViewChange]);

  // Abrir diálogo de filtro
  const openFilterDialog = useCallback((filterKey: string) => {
    setActiveFilter(filterKey);
    setFilterDialogOpen(true);
  }, []);

  // Cerrar diálogo de filtro
  const closeFilterDialog = useCallback(() => {
    setFilterDialogOpen(false);
    setActiveFilter('');
  }, []);

  // Aplicar filtro desde el diálogo
  const applyFilter = useCallback((value: any) => {
    if (activeFilter) {
      handleFilterChange(activeFilter, value);
    }
    closeFilterDialog();
  }, [activeFilter, handleFilterChange, closeFilterDialog]);

  // Obtener datos paginados (solo para modo no controlado)
  const paginatedItems = useMemo(() => {
    if (isControlled) {
      return items;
    }
    
    const startIndex = (currentPage - 1) * internalView.itemsPerPage;
    const endIndex = startIndex + internalView.itemsPerPage;
    
    return items.slice(startIndex, endIndex);
  }, [isControlled, items, currentPage, internalView.itemsPerPage]);

  // Contar filtros activos
  const activeFiltersCount = useMemo(() => {
    return Object.keys(internalFilters).filter(key => {
      const value = internalFilters[key];
      return value !== null && value !== undefined && value !== '' && 
            (!Array.isArray(value) || value.length > 0);
    }).length;
  }, [internalFilters]);

  // Renderizar elemento de la lista
  const renderItem = useCallback((item: ListItem, index: number) => {
    if (internalView.type === 'grid') {
      return (
        <Box 
          key={item.id} 
          sx={{ 
            p: 1,
            width: `calc(100% / ${internalView.gridColumns || 3})`,
            [theme.breakpoints.down('sm')]: {
              width: '100%'
            },
            [theme.breakpoints.down('md')]: {
              width: internalView.gridColumns && internalView.gridColumns > 1 ? '50%' : '100%'
            }
          }}
        >
          <Paper 
            sx={{ 
              p: 2, 
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4]
              }
            }}
            onClick={() => handleRowClick(item.id)}
          >
            {columns.map(column => (
              <Box key={column.id} sx={{ mb: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  {column.label}:
                </Typography>
                <Typography variant="body2">
                  {column.render ? column.render(item) : item[column.id]}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      );
    }

    // Vista de lista
    return (
      <Box 
        key={item.id} 
        component={Paper} 
        sx={{ 
          p: 2, 
          mb: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateX(4px)',
            boxShadow: theme.shadows[4]
          }
        }}
        onClick={() => handleRowClick(item.id)}
      >
        {columns.map(column => (
          <Box 
            key={column.id} 
            sx={{ 
              flex: column.width || 1,
              minWidth: column.minWidth,
              textAlign: column.align || 'left',
              mb: isMobile ? 1 : 0,
              ...(isMobile ? { width: '100%' } : {})
            }}
          >
            <Typography variant="body2">
              {column.render ? column.render(item) : item[column.id]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }, [internalView, columns, isMobile, theme, handleRowClick]);

  // Renderizar controles de filtro
  const renderFilterControl = useCallback((filter: FilterConfig) => {
    const value = internalFilters[filter.key] || '';

    switch (filter.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            size="small"
            label={filter.label}
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            InputProps={{
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => clearFilter(filter.key)}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        );
      
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={value || ''}
              label={filter.label}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {filter.options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'multiselect':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{filter.label}</InputLabel>
            <Select
              multiple
              value={value || []}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              input={<OutlinedInput label={filter.label} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const option = filter.options?.find(opt => opt.value === value);
                    return option ? (
                      <Chip key={value} size="small" label={option.label} />
                    ) : null;
                  })}
                </Box>
              )}
            >
              {filter.options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={(value || []).includes(option.value)} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'number':
        return (
          <TextField
            fullWidth
            size="small"
            type="number"
            label={filter.label}
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            InputProps={{
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => clearFilter(filter.key)}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        );
      
      default:
        return null;
    }
  }, [internalFilters, handleFilterChange, clearFilter]);

  // Renderizar diálogo de filtro
  const renderFilterDialog = useCallback(() => {
    const filter = filters.find(f => f.key === activeFilter);
    if (!filter) return null;

    return (
      <Dialog open={filterDialogOpen} onClose={closeFilterDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Filtrar por {filter.label}</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {renderFilterControl(filter)}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFilterDialog}>Cancelar</Button>
          <Button 
            onClick={() => applyFilter(internalFilters[filter.key] || '')}
            variant="contained"
          >
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [filterDialogOpen, activeFilter, filters, internalFilters, closeFilterDialog, renderFilterControl, applyFilter]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header con controles */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        alignItems: 'center', 
        gap: 2, 
        mb: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1
      }}>
        {title && (
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        )}
        
        {/* Búsqueda global */}
        {enableSearch && (
          <TextField
            placeholder="Buscar..."
            size="small"
            value={internalFilters.globalSearch || ''}
            onChange={(e) => handleFilterChange('globalSearch', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: internalFilters.globalSearch && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => clearFilter('globalSearch')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ minWidth: isMobile ? '100%' : 250 }}
          />
        )}
        
        {/* Botón de filtros */}
        {enableFilters && filters.length > 0 && (
          <Button
            variant={activeFiltersCount > 0 ? "contained" : "outlined"}
            color="primary"
            startIcon={<FilterIcon />}
            onClick={() => openFilterDialog(filters[0].key)}
          >
            {isMobile ? `Filtros` : `Filtros (${activeFiltersCount})`}
          </Button>
        )}
        
        {/* Alternar vista */}
        {enableViewToggle && (
          <IconButton onClick={toggleView} color="primary">
            {internalView.type === 'list' ? <GridIcon /> : <ViewListIcon />}
          </IconButton>
        )}
        
        {/* Limpiar filtros */}
        {activeFiltersCount > 0 && (
          <Button variant="text" color="primary" onClick={clearAllFilters}>
            Limpiar
          </Button>
        )}
      </Box>

      {/* Filtros activos */}
      {activeFiltersCount > 0 && !isMobile && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {Object.entries(internalFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            
            const filter = filters.find(f => f.key === key) || { key, label: key, type: 'text' };
            let label = '';
            
            if (Array.isArray(value)) {
              const selectedOptions = filter.options?.filter(opt => value.includes(opt.value));
              label = selectedOptions?.map(opt => opt.label).join(', ') || value.join(', ');
            } else if (filter.options) {
              const option = filter.options.find(opt => opt.value === value);
              label = option ? option.label : value;
            } else {
              label = value.toString();
            }
            
            return (
              <Chip
                key={key}
                label={`${filter.label}: ${label}`}
                onDelete={() => clearFilter(key)}
                size="small"
              />
            );
          })}
        </Box>
      )}

      {/* Contenedor de la lista */}
      <Box sx={{ 
        minHeight: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(loading ? {} : { display: 'block' })
      }}>
        {loading ? (
          <CircularProgress />
        ) : paginatedItems.length === 0 ? (
          emptyState || (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No se encontraron resultados
              </Typography>
              {activeFiltersCount > 0 && (
                <Button onClick={clearAllFilters} sx={{ mt: 1 }}>
                  Limpiar filtros
                </Button>
              )}
            </Box>
          )
        ) : (
          <Box sx={{ 
            display: internalView.type === 'grid' ? 'flex' : 'block',
            flexWrap: 'wrap',
            gap: internalView.type === 'grid' ? 1 : 0
          }}>
            {paginatedItems.map(renderItem)}
          </Box>
        )}
      </Box>

      {/* Paginación */}
      {enablePagination && pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      )}

      {/* Diálogo de filtros */}
      {renderFilterDialog()}
    </Box>
  );
};

export default VirtualList;