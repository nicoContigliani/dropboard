// components/ResponsiveTable.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Definición de tipos
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string | JSX.Element;
  filterType?: 'text' | 'select' | 'date';
  filterOptions?: { value: string; label: string }[];
}

export interface RowData {
  [key: string]: any;
  id: string | number;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: RowData[];
  title?: string;
  loading?: boolean;
  onEdit?: (row: RowData) => void;
  onDelete?: (row: RowData) => void;
  onFilterChange?: (filters: { [key: string]: string }) => void;
  externalFilterValue?: { [key: string]: string };
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  title,
  loading = false,
  onEdit,
  onDelete,
  onFilterChange,
  externalFilterValue = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: string }>(externalFilterValue);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('');

  // Sincronizar con filtros externos si se proporcionan
  useEffect(() => {
    setFilters(externalFilterValue);
  }, [externalFilterValue]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (columnId: string, value: string) => {
    const newFilters = { ...filters, [columnId]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilter = (columnId: string) => {
    const newFilters = { ...filters };
    delete newFilters[columnId];
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    setFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const openFilterDialog = (columnId: string) => {
    setActiveFilter(columnId);
    setFilterDialogOpen(true);
  };

  const closeFilterDialog = () => {
    setFilterDialogOpen(false);
    setActiveFilter('');
  };

  // Aplicar filtros a los datos
  const filteredData = data.filter(row =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const cellValue = row[key]?.toString().toLowerCase() || '';
      return cellValue.includes(value.toLowerCase());
    })
  );

  // Obtener datos paginados
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Contar filtros activos
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header con título y búsqueda global */}
      <Box sx={{ p: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 2 }}>
        {title && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        )}
        
        <TextField
          placeholder="Buscar..."
          variant="outlined"
          size="small"
          value={filters.globalSearch || ''}
          onChange={(e) => handleFilterChange('globalSearch', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: filters.globalSearch && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => clearFilter('globalSearch')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        <Button
          variant={activeFiltersCount > 0 ? "contained" : "outlined"}
          color="primary"
          startIcon={<FilterIcon />}
          onClick={() => setFilterDialogOpen(true)}
        >
          {isMobile ? `Filtros (${activeFiltersCount})` : `Filtros (${activeFiltersCount})`}
        </Button>
        
        {activeFiltersCount > 0 && (
          <Button variant="text" color="primary" onClick={clearAllFilters}>
            Limpiar
          </Button>
        )}
      </Box>

      {/* Filtros activos (chips) */}
      {activeFiltersCount > 0 && !isMobile && (
        <Box sx={{ px: 2, pb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(filters).map(([key, value]) => {
            if (!value || key === 'globalSearch') return null;
            const column = columns.find(col => col.id === key);
            return (
              <Chip
                key={key}
                label={`${column?.label || key}: ${value}`}
                onDelete={() => clearFilter(key)}
                size="small"
              />
            );
          })}
        </Box>
      )}

      {/* Contenedor de la tabla */}
      <TableContainer sx={{ maxHeight: 600 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader aria-label="responsive table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span>{column.label}</span>
                      <IconButton 
                        size="small" 
                        onClick={() => openFilterDialog(column.id)}
                        sx={{ ml: 1 }}
                      >
                        <FilterIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell align="center" style={{ minWidth: 100 }}>
                    Acciones
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    {(onEdit || onDelete) && (
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          {onEdit && (
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => onEdit(row)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          {onDelete && (
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => onDelete(row)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} align="center">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
      />

      {/* Diálogo de filtros */}
      <Dialog open={filterDialogOpen} onClose={closeFilterDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Filtrar por {columns.find(c => c.id === activeFilter)?.label || activeFilter}</DialogTitle>
        <DialogContent>
          {activeFilter && (
            <Box sx={{ mt: 2 }}>
              {(() => {
                const column = columns.find(c => c.id === activeFilter);
                if (!column) return null;
                
                if (column.filterType === 'select' && column.filterOptions) {
                  return (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Seleccionar opción</InputLabel>
                      <Select
                        value={filters[activeFilter] || ''}
                        onChange={(e: SelectChangeEvent) => handleFilterChange(activeFilter, e.target.value)}
                        label="Seleccionar opción"
                      >
                        <MenuItem value="">
                          <em>Todas</em>
                        </MenuItem>
                        {column.filterOptions.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }
                
                return (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={`Filtrar por ${column.label}`}
                    value={filters[activeFilter] || ''}
                    onChange={(e) => handleFilterChange(activeFilter, e.target.value)}
                    InputProps={{
                      endAdornment: filters[activeFilter] && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => clearFilter(activeFilter)}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                );
              })()}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFilterDialog}>Cerrar</Button>
          <Button 
            onClick={() => {
              closeFilterDialog();
              clearFilter(activeFilter);
            }}
            color="secondary"
          >
            Limpiar filtro
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ResponsiveTable;