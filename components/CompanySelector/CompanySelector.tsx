import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  searchCompanies,
  createCompany,
  setCurrentCompany,
  clearSearchResults,
  selectSearchResults,
  selectCompaniesLoading,
  selectCompaniesError,
  Company,
} from '@/lib/features/companies/companiesSlice';
import UniversalFormDialog, { FormConfig, FieldType } from '@/components/ResponsiveUniversalFormDialog/UniversalFormDialog';

interface CompanySelectorProps {
  onCompanySelect: (company: Company | null) => void;
  selectedCompany?: Company | null;
  label?: string;
  required?: boolean;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  onCompanySelect,
  selectedCompany,
  label = 'Company or Group',
  required = false,
}) => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectCompaniesLoading);
  const error = useAppSelector(selectCompaniesError);
  
  const [inputValue, setInputValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Configuración del formulario para crear empresa
  const companyFormConfig: FormConfig = {
    title: 'Create New Company',
    fields: [
      {
        name: 'name',
        label: 'Company Name',
        type: 'text' as FieldType,
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters'
          }
        }
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email' as FieldType,
        required: true,
        validation: {
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
          }
        }
      },
      {
        name: 'url',
        label: 'Website',
        type: 'text' as FieldType,
        placeholder: 'https://example.com'
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text' as FieldType
      },
      {
        name: 'corporate',
        label: 'Corporate Group',
        type: 'text' as FieldType
      },
      {
        name: 'headquarters',
        label: 'Headquarters',
        type: 'text' as FieldType
      }
    ],
    submitLabel: 'Create Company'
  };

  // Buscar empresas cuando el usuario escribe
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.trim().length > 1) {
        dispatch(searchCompanies(inputValue.trim()));
      } else if (inputValue.trim().length === 0) {
        dispatch(clearSearchResults());
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, dispatch]);

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
    setLocalError(null);
  };

  const handleOptionSelect = (event: React.SyntheticEvent, value: Company | null) => {
    onCompanySelect(value);
    if (value) {
      dispatch(setCurrentCompany(value));
    }
  };

  const handleCreateCompany = async (formData: any) => {
    try {
      const result = await dispatch(createCompany(formData)).unwrap();
      onCompanySelect(result);
      dispatch(setCurrentCompany(result));
      setOpenDialog(false);
      setLocalError(null);
    } catch (err: any) {
      setLocalError(err.message || 'Error creating company');
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setLocalError(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLocalError(null);
  };

  return (
    <Box>
      <Box display="flex" alignItems="flex-end" gap={1} mb={1}>
        <Autocomplete
          fullWidth
          options={searchResults}
          getOptionLabel={(option) => 
            `${option.name}${option.corporate ? ` (${option.corporate})` : ''}`
          }
          filterOptions={(x) => x}
          inputValue={inputValue}
          value={selectedCompany || null}
          onInputChange={handleInputChange}
          onChange={handleOptionSelect}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option._id}>
              <Box>
                <Typography variant="body1">{option.name}</Typography>
                {option.corporate && (
                  <Typography variant="body2" color="text.secondary">
                    Corporate: {option.corporate}
                  </Typography>
                )}
                {option.email && (
                  <Typography variant="body2" color="text.secondary">
                    Email: {option.email}
                  </Typography>
                )}
              </Box>
            </li>
          )}
          noOptionsText={inputValue.trim().length > 1 ? "No companies found" : "Type to search companies"}
          loading={loading}
          loadingText="Searching companies..."
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ minWidth: 'auto', height: '56px' }}
        >
          New
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      {localError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {localError}
        </Alert>
      )}

      {selectedCompany && (
        <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Selected Company:
          </Typography>
          <Box>
            <Chip label={selectedCompany.name} sx={{ mr: 1, mb: 1 }} />
            {selectedCompany.corporate && (
              <Chip label={`Corporate: ${selectedCompany.corporate}`} variant="outlined" sx={{ mr: 1, mb: 1 }} />
            )}
            {selectedCompany.email && (
              <Chip label={`Email: ${selectedCompany.email}`} variant="outlined" sx={{ mr: 1, mb: 1 }} />
            )}
          </Box>
        </Paper>
      )}

      <UniversalFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateCompany}
        config={companyFormConfig}
        isLoading={loading}
        error={localError}
      />
    </Box>
  );
};

export default CompanySelector;