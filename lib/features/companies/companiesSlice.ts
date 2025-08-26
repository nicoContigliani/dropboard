// lib/features/companies/companiesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '@/lib/store'; // Importa los tipos

export interface Company {
  _id?: string;
  name: string;
  url?: string;
  phone?: string;
  email: string;
  corporate?: string;
  headquarters?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompaniesState {
  companies: Company[];
  currentCompany: Company | null;
  loading: boolean;
  error: string | null;
  searchResults: Company[];
}

const initialState: CompaniesState = {
  companies: [],
  currentCompany: null,
  loading: false,
  error: null,
  searchResults: [],
};

// Async thunks con tipado completo
export const searchCompanies = createAsyncThunk<
  Company[], // Tipo de retorno
  string,     // Tipo del argumento
  {           // Tipo de configuración
    state: RootState;
    rejectValue: string;
  }
>('companies/search', async (searchTerm: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/companies?search=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Error searching companies');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchCompanyById = createAsyncThunk<
  Company,
  string,
  {
    state: RootState;
    rejectValue: string;
  }
>('companies/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/companies/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching company');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createCompany = createAsyncThunk<
  Company,
  Omit<Company, '_id'>,
  {
    state: RootState;
    rejectValue: string;
  }
>('companies/create', async (companyData: Omit<Company, '_id'>, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData),
    });
    if (!response.ok) {
      throw new Error('Error creating company');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateCompany = createAsyncThunk<
  Company,
  { id: string; data: Partial<Company> },
  {
    state: RootState;
    rejectValue: string;
  }
>('companies/update', async ({ id, data }: { id: string; data: Partial<Company> }, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error updating company');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteCompany = createAsyncThunk<
  string, // Retorna el ID eliminado
  string, // Argumento: ID a eliminar
  {
    state: RootState;
    rejectValue: string;
  }
>('companies/delete', async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/companies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting company');
    }
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setCurrentCompany: (state, action: PayloadAction<Company | null>) => {
      state.currentCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search companies
      .addCase(searchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch company by ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
        state.currentCompany = action.payload;
        state.searchResults = [action.payload, ...state.searchResults];
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.companies.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
        if (state.currentCompany?._id === action.payload._id) {
          state.currentCompany = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete company
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(c => c._id !== action.payload);
        if (state.currentCompany?._id === action.payload) {
          state.currentCompany = null;
        }
        state.searchResults = state.searchResults.filter(c => c._id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSearchResults, setCurrentCompany } = companiesSlice.actions;

// Selectors con tipado correcto
export const selectCompanies = (state: RootState) => state.companies.companies;
export const selectCurrentCompany = (state: RootState) => state.companies.currentCompany;
export const selectCompaniesLoading = (state: RootState) => state.companies.loading;
export const selectCompaniesError = (state: RootState) => state.companies.error;
export const selectSearchResults = (state: RootState) => state.companies.searchResults;

export default companiesSlice.reducer;