import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Slider,
  Rating,
  Autocomplete,
  Chip,
  FormHelperText,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

// Tipos para los campos del formulario
export type FieldType = 
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'slider'
  | 'rating'
  | 'autocomplete'
  | 'date'
  | 'datetime'
  | 'time'
  | 'file';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  multiple?: boolean;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
    validate?: (value: any) => boolean | string;
  };
  // Para autocomplete
  freeSolo?: boolean;
  // Para archivos
  accept?: string;
}

export interface FormConfig {
  title: string;
  fields: FormField[];
  defaultValues?: Record<string, any>;
  mode?: 'create' | 'edit' | 'view';
  submitLabel?: string;
  deleteLabel?: string;
}

interface UniversalFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  onDelete?: (id?: string) => Promise<void>;
  config: FormConfig;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
  data?: any; // Datos existentes para editar/ver
}

const UniversalFormDialog: React.FC<UniversalFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  onDelete,
  config,
  isLoading = false,
  error = null,
  success = null,
  data,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode = 'create', title, fields, defaultValues, submitLabel, deleteLabel } = config;
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});

  const methods = useForm({
    defaultValues: data || defaultValues || {},
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
    setValue,
    clearErrors,
  } = methods;

  // Resetear formulario cuando cambian los datos o se abre/cierra
  useEffect(() => {
    if (open) {
      reset(data || defaultValues || {});
      setFilePreviews({});
    }
  }, [open, data, defaultValues, reset]);

  const handleClose = () => {
    if (!isLoading) {
      reset();
      setFilePreviews({});
      onClose();
    }
  };

  const onFormSubmit = async (formData: any) => {
    await onSubmit(formData);
  };

  const handleDelete = async () => {
    if (onDelete && data?.id) {
      await onDelete(data.id);
    }
  };

  // Manejar carga de archivos
  const handleFileChange = (fieldName: string, file: File | null) => {
    if (file) {
      setValue(fieldName, file);
      clearErrors(fieldName);
      
      // Crear vista previa para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews(prev => ({
            ...prev,
            [fieldName]: e.target?.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setValue(fieldName, null);
      setFilePreviews(prev => {
        const newPreviews = {...prev};
        delete newPreviews[fieldName];
        return newPreviews;
      });
    }
  };

  // Renderizar campo según su tipo
  const renderField = (field: FormField) => {
    const commonProps = {
      fullWidth: true,
      label: field.label,
      disabled: isLoading || field.disabled || isViewMode,
      placeholder: field.placeholder,
      error: !!errors[field.name],
      helperText: errors[field.name]?.message?.toString() || field.helperText,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
              ...field.validation,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                {...commonProps}
                type={field.type}
              />
            )}
          />
        );

      case 'number':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
              ...field.validation,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                {...commonProps}
                type="number"
                inputProps={{
                  min: field.min,
                  max: field.max,
                  step: field.step,
                }}
              />
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
              ...field.validation,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                {...commonProps}
                multiline
                rows={field.rows || 4}
              />
            )}
          />
        );

      case 'select':
      case 'multiselect':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
            }}
            render={({ field: controllerField }) => (
              <FormControl fullWidth error={!!errors[field.name]} disabled={commonProps.disabled}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  {...controllerField}
                  multiple={field.type === 'multiselect'}
                  label={field.label}
                  renderValue={field.type === 'multiselect' ? 
                    (selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as any[]).map((value) => {
                          const selectedOption = field.options?.find(opt => opt.value === value);
                          return (
                            <Chip 
                              key={value} 
                              label={selectedOption?.label || value} 
                              size="small" 
                            />
                          );
                        })}
                      </Box>
                    ) : undefined
                  }
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors[field.name]?.message?.toString() || field.helperText}</FormHelperText>
              </FormControl>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
            }}
            render={({ field: controllerField }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...controllerField}
                    checked={!!controllerField.value}
                    disabled={commonProps.disabled}
                  />
                }
                label={field.label}
              />
            )}
          />
        );

      case 'switch':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...controllerField}
                    checked={!!controllerField.value}
                    disabled={commonProps.disabled}
                  />
                }
                label={field.label}
              />
            )}
          />
        );

      case 'radio':
        return (
          <FormControl component="fieldset" error={!!errors[field.name]} fullWidth>
            <FormLabel component="legend">{field.label}{field.required && ' *'}</FormLabel>
            <Controller
              name={field.name}
              control={control}
              rules={{
                required: field.required ? `${field.label} es requerido` : false,
              }}
              render={({ field: controllerField }) => (
                <RadioGroup {...controllerField} row>
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio disabled={commonProps.disabled} />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors[field.name]?.message?.toString()}</FormHelperText>
          </FormControl>
        );

      case 'slider':
        return (
          <Box sx={{ mt: 2, mb: 1, width: '100%' }}>
            <Typography gutterBottom>
              {field.label}{field.required && ' *'}
              {watch(field.name) !== undefined && `: ${watch(field.name)}`}
            </Typography>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <Slider
                  {...controllerField}
                  valueLabelDisplay="auto"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  disabled={commonProps.disabled}
                  marks
                />
              )}
            />
          </Box>
        );

      case 'rating':
        return (
          <Box sx={{ mt: 2, mb: 1, width: '100%' }}>
            <Typography component="legend">{field.label}{field.required && ' *'}</Typography>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <Rating
                  {...controllerField}
                  disabled={commonProps.disabled}
                  size="large"
                />
              )}
            />
            {watch(field.name) > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Seleccionado: {watch(field.name)} estrella(s)
              </Typography>
            )}
          </Box>
        );

      case 'autocomplete':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
            }}
            render={({ field: controllerField }) => (
              <Autocomplete
                {...controllerField}
                multiple={field.multiple}
                freeSolo={field.freeSolo}
                options={field.options || []}
                getOptionLabel={(option) => 
                  typeof option === 'string' ? option : option.label || option.value
                }
                isOptionEqualToValue={(option, value) => {
                  if (typeof option === 'object' && typeof value === 'object') {
                    return option.value === value?.value;
                  }
                  return option === value;
                }}
                onChange={(_, value) => controllerField.onChange(value)}
                disabled={commonProps.disabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message?.toString() || field.helperText}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={typeof option === 'string' ? option : option.label}
                      {...getTagProps({ index })}
                      size="small"
                    />
                  ))
                }
              />
            )}
          />
        );

      case 'date':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                {...commonProps}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        );

      case 'datetime':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                {...commonProps}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        );

      case 'time':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required ? `${field.label} es requerido` : false,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                {...commonProps}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        );

      case 'file':
        return (
          <Box>
            <Controller
              name={field.name}
              control={control}
              rules={{
                required: field.required ? `${field.label} es requerido` : false,
              }}
              render={({ field: controllerField }) => (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    disabled={commonProps.disabled}
                    sx={{ mb: 1 }}
                  >
                    Subir {field.label}
                    <input
                      type="file"
                      hidden
                      accept={field.accept}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileChange(field.name, file);
                      }}
                    />
                  </Button>
                  {controllerField.value && (
                    <Typography variant="body2">
                      Archivo seleccionado: {controllerField.value.name}
                    </Typography>
                  )}
                </>
              )}
            />
            {filePreviews[field.name] && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img 
                  src={filePreviews[field.name]} 
                  alt="Vista previa" 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                />
              </Box>
            )}
            {errors[field.name] && (
              <FormHelperText error>
                {errors[field.name]?.message?.toString()}
              </FormHelperText>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 2,
          backgroundImage: 'none',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: theme.palette.mode === 'light' 
            ? theme.palette.grey[50] 
            : theme.palette.grey[900],
        }}
      >
        <Typography variant="h6" component="span">
          {title}
        </Typography>
        <IconButton
          onClick={handleClose}
          disabled={isLoading}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <DialogContent sx={{ py: 3, px: 3, overflowY: 'auto' }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {fields.map((field) => (
                <Box key={field.name}>
                  {renderField(field)}
                </Box>
              ))}
            </Box>
          </DialogContent>

          <DialogActions sx={{ py: 2, px: 3, gap: 1, borderTop: 1, borderColor: 'divider' }}>
            {onDelete && isEditMode && (
              <Button
                onClick={handleDelete}
                disabled={isLoading}
                color="error"
                startIcon={<DeleteIcon />}
                sx={{ mr: 'auto' }}
              >
                {deleteLabel || 'Eliminar'}
              </Button>
            )}

            <Button
              onClick={handleClose}
              disabled={isLoading}
            >
              {isViewMode ? 'Cerrar' : 'Cancelar'}
            </Button>

            {!isViewMode && (
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || (isEditMode && !isDirty)}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    isEditMode ? <SaveIcon /> : <AddIcon />
                  )
                }
              >
                {isLoading 
                  ? 'Procesando...' 
                  : submitLabel || (isEditMode ? 'Actualizar' : 'Crear')
                }
              </Button>
            )}
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default UniversalFormDialog;