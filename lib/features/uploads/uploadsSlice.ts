// lib/features/uploads/uploadsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface UploadData {
  _id?: string;
  data: any;
  metadata: {
    originalFilename?: string;
    mimetype?: string;
    size?: number;
    source?: string;
  };
  owner: {
    id: string;
    email: string;
  };
  group: any[];
  createdAt?: string;
  updatedAt?: string;
}

interface UploadsState {
  uploads: UploadData[];
  currentUpload: UploadData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UploadsState = {
  uploads: [],
  currentUpload: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchUploads = createAsyncThunk(
  'uploads/fetchUploads',
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem('auth');
      console.log("🚀 ~ authData:", authData)
      const token = authData ? JSON.parse(authData).token : null;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/upload', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch uploads');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchUploadById = createAsyncThunk(
  'uploads/fetchUploadById',
  async (id: string, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem('auth');
      const token = authData ? JSON.parse(authData).token : null;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/upload/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch upload');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const createUpload = createAsyncThunk(
  'uploads/createUpload',
  async (uploadData: FormData | { jsonText: string }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem('auth');
      const token = authData ? JSON.parse(authData).token : null;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
      };

      let body: any = uploadData;
      
      if (!(uploadData instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(uploadData);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create upload');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateUpload = createAsyncThunk(
  'uploads/updateUpload',
  async ({ id, data }: { id: string; data: Partial<UploadData> }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem('auth');
      const token = authData ? JSON.parse(authData).token : null;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/upload/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update upload');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteUpload = createAsyncThunk(
  'uploads/deleteUpload',
  async (id: string, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem('auth');
      const token = authData ? JSON.parse(authData).token : null;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/upload/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete upload');
      }

      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const uploadsSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentUpload: (state, action: PayloadAction<UploadData | null>) => {
      state.currentUpload = action.payload;
    },
    clearUploads: (state) => {
      state.uploads = [];
      state.currentUpload = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Uploads
      .addCase(fetchUploads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUploads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploads = action.payload;
      })
      .addCase(fetchUploads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Upload by ID
      .addCase(fetchUploadById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUploadById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUpload = action.payload;
      })
      .addCase(fetchUploadById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Upload
      .addCase(createUpload.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploads.push(action.payload);
        state.currentUpload = action.payload;
      })
      .addCase(createUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Upload
      .addCase(updateUpload.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.uploads.findIndex(upload => upload._id === action.payload._id);
        if (index !== -1) {
          state.uploads[index] = action.payload;
        }
        if (state.currentUpload && state.currentUpload._id === action.payload._id) {
          state.currentUpload = action.payload;
        }
      })
      .addCase(updateUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Upload
      .addCase(deleteUpload.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploads = state.uploads.filter(upload => upload._id !== action.payload);
        if (state.currentUpload && state.currentUpload._id === action.payload) {
          state.currentUpload = null;
        }
      })
      .addCase(deleteUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentUpload, clearUploads } = uploadsSlice.actions;
export default uploadsSlice.reducer;

// Selectors
export const selectUploads = (state: RootState) => state.uploads.uploads;
export const selectCurrentUpload = (state: RootState) => state.uploads.currentUpload;
export const selectUploadsLoading = (state: RootState) => state.uploads.isLoading;
export const selectUploadsError = (state: RootState) => state.uploads.error;