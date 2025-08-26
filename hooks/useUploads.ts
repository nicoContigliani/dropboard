// // // // hooks/useUploads.ts
// // // import { useCallback } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { 
// // //   fetchUploads, 
// // //   fetchUploadById, 
// // //   createUpload, 
// // //   updateUpload, 
// // //   deleteUpload,
// // //   clearError,
// // //   setCurrentUpload,
// // //   clearUploads,
// // //   UploadData
// // // } from '../lib/features/uploads/uploadsSlice';
// // // import { AppDispatch, RootState } from '../lib/store';

// // // export const useUploads = () => {
// // //   const dispatch = useDispatch<AppDispatch>();
// // //   const { 
// // //     uploads,  
// // //     currentUpload, 
// // //     isLoading, 
// // //     error 
// // //   } = useSelector((state: RootState) => state.uploads);

// // //   const getUploads = useCallback(() => {
// // //     console.log("getUploads customhook");
// // //     return dispatch(fetchUploads());
// // //   }, [dispatch]);

// // //   const getUploadById = useCallback((id: string) => {
// // //     return dispatch(fetchUploadById(id));
// // //   }, [dispatch]);

// // //   const uploadFile = useCallback(async (file: File | null, jsonText: string = ''): Promise<UploadData> => {
// // //     let formData: FormData | { jsonText: string };
    
// // //     if (file) {
// // //       formData = new FormData();
// // //       formData.append('file', file);
// // //     } else if (jsonText) {
// // //       formData = { jsonText };
// // //     } else {
// // //       throw new Error('Debes subir un archivo o ingresar JSON');
// // //     }

// // //     const result = await dispatch(createUpload(formData));
// // //     return result.payload as UploadData;
// // //   }, [dispatch]);

// // //   const modifyUpload = useCallback(async (id: string, data: Partial<UploadData>): Promise<UploadData> => {
// // //     const result = await dispatch(updateUpload({ id, data }));
// // //     return result.payload as UploadData;
// // //   }, [dispatch]);

// // //   const removeUpload = useCallback(async (id: string): Promise<string> => {
// // //     const result = await dispatch(deleteUpload(id));
// // //     return result.payload as string;
// // //   }, [dispatch]);

// // //   const clearUploadError = useCallback(() => {
// // //     dispatch(clearError());
// // //   }, [dispatch]);

// // //   const selectUpload = useCallback((upload: UploadData | null) => {
// // //     dispatch(setCurrentUpload(upload));
// // //   }, [dispatch]);

// // //   const resetUploads = useCallback(() => {
// // //     dispatch(clearUploads());
// // //   }, [dispatch]);

// // //   return {
// // //     // State
// // //     uploads,
// // //     currentUpload,
// // //     isLoading,
// // //     error,
    
// // //     // Actions
// // //     getUploads,
// // //     getUploadById,
// // //     uploadFile,
// // //     modifyUpload,
// // //     removeUpload,
// // //     clearUploadError,
// // //     selectUpload,
// // //     resetUploads,
// // //   };
// // // };



// // // hooks/useUploads.ts
// // import { useState, useCallback } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from '@/lib/store';
// // import { 
// //   fetchUploads, 
// //   fetchUploadById, 
// //   createUpload, 
// //   updateUpload, 
// //   deleteUpload,
// //   clearError,
// //   setCurrentUpload
// // } from '@/lib/features/uploads/uploadsSlice';

// // export const useUploads = () => {
// //   const dispatch = useDispatch();
// //   const { uploads, currentUpload, isLoading, error } = useSelector((state: RootState) => state.uploads);

// //   const getUploads = useCallback(async () => {
// //     try {
// //       await dispatch(fetchUploads() as any);
// //     } catch (err) {
// //       console.error('Error fetching uploads:', err);
// //     }
// //   }, [dispatch]);

// //   const getUploadById = useCallback(async (id: string) => {
// //     try {
// //       await dispatch(fetchUploadById(id) as any);
// //     } catch (err) {
// //       console.error('Error fetching upload by id:', err);
// //     }
// //   }, [dispatch]);

// //   const modifyUpload = useCallback(async (id: string, data: any) => {
// //     try {
// //       await dispatch(updateUpload({ id, data }) as any);
// //     } catch (err) {
// //       console.error('Error updating upload:', err);
// //       throw err;
// //     }
// //   }, [dispatch]);

// //   const createNewUpload = useCallback(async (uploadData: FormData | { jsonText: string }) => {
// //     try {
// //       await dispatch(createUpload(uploadData) as any);
// //     } catch (err) {
// //       console.error('Error creating upload:', err);
// //       throw err;
// //     }
// //   }, [dispatch]);

// //   const removeUpload = useCallback(async (id: string) => {
// //     try {
// //       await dispatch(deleteUpload(id) as any);
// //     } catch (err) {
// //       console.error('Error deleting upload:', err);
// //       throw err;
// //     }
// //   }, [dispatch]);

// //   const clearUploadError = useCallback(() => {
// //     dispatch(clearError());
// //   }, [dispatch]);

// //   return {
// //     uploads,
// //     currentUpload,
// //     isLoading,
// //     error,
// //     getUploads,
// //     getUploadById,
// //     modifyUpload,
// //     createUpload: createNewUpload,
// //     deleteUpload: removeUpload,
// //     clearUploadError,
// //     setCurrentUpload: (upload: any) => dispatch(setCurrentUpload(upload))
// //   };
// // };


// // lib/features/uploads/uploadsSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '@/lib/store';

// export interface UploadData {
//   _id?: string;
//   data: any;
//   metadata: {
//     originalFilename?: string;
//     mimetype?: string;
//     size?: number;
//     source?: string;
//   };
//   owner: {
//     id: string;
//     email: string;
//   };
//   group: any[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface UploadsState {
//   uploads: UploadData[];
//   currentUpload: UploadData | null;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: UploadsState = {
//   uploads: [],
//   currentUpload: null,
//   isLoading: false,
//   error: null,
// };

// // Helper function to get token with error handling
// const getAuthToken = (): string => {
//   try {
//     const authData = localStorage.getItem('auth');
//     if (!authData) {
//       throw new Error('No authentication data found in localStorage');
//     }

//     const parsedAuth = JSON.parse(authData);
//     const token = parsedAuth?.token;

//     if (!token) {
//       throw new Error('No token found in auth data');
//     }

//     return token;
//   } catch (error) {
//     console.error('Error getting auth token:', error);
//     throw new Error('Failed to retrieve authentication token');
//   }
// };

// // Async Thunks
// export const fetchUploads = createAsyncThunk(
//   'uploads/fetchUploads',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();

//       console.log('📡 Fetching uploads with token:', token ? 'Present' : 'Missing');

//       const response = await fetch('/api/upload', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log('📊 Uploads response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Failed to fetch uploads:', response.status, errorText);
        
//         // Si es un error de autenticación, limpiamos el localStorage
//         if (response.status === 401) {
//           localStorage.removeItem('auth');
//         }
        
//         throw new Error(`Failed to fetch uploads: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('✅ Uploads fetched successfully:', data.length, 'items');
//       return data;

//     } catch (error) {
//       console.error('💥 Error in fetchUploads:', error);
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// export const fetchUploadById = createAsyncThunk(
//   'uploads/fetchUploadById',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();

//       console.log('📡 Fetching upload with ID:', id);
//       console.log('🔐 Token present:', !!token);

//       const response = await fetch(`/api/upload/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log('📊 Upload response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Failed to fetch upload:', response.status, errorText);

//         if (response.status === 401) {
//           // Limpiar localStorage en caso de error de autenticación
//           localStorage.removeItem('auth');
//           throw new Error('Authentication failed: Please login again');
//         } else if (response.status === 404) {
//           throw new Error('Upload not found');
//         } else {
//           throw new Error(`Failed to fetch upload: ${response.status} ${response.statusText}`);
//         }
//       }

//       const data = await response.json();
//       console.log('✅ Upload fetched successfully:', data._id);
//       return data;

//     } catch (error) {
//       console.error('💥 Error in fetchUploadById:', error);
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// export const createUpload = createAsyncThunk(
//   'uploads/createUpload',
//   async (uploadData: FormData | { jsonText: string }, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();

//       const headers: HeadersInit = {
//         'Authorization': `Bearer ${token}`
//       };

//       let body: any = uploadData;

//       if (!(uploadData instanceof FormData)) {
//         headers['Content-Type'] = 'application/json';
//         body = JSON.stringify(uploadData);
//       }

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         headers,
//         body,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create upload');
//       }

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// export const updateUpload = createAsyncThunk(
//   'uploads/updateUpload',
//   async ({ id, data }: { id: string; data: Partial<UploadData> }, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();

//       console.log('💾 Updating upload:', id, 'with data:', data);

//       const response = await fetch(`/api/upload/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(data),
//       });

//       console.log('📊 Update response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Failed to update upload:', response.status, errorText);
        
//         // Si es un error de autenticación, limpiamos el localStorage
//         if (response.status === 401) {
//           localStorage.removeItem('auth');
//         }
        
//         throw new Error(`Failed to update upload: ${response.status} ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log('✅ Upload updated successfully:', result._id);
//       return result;

//     } catch (error) {
//       console.error('💥 Error in updateUpload:', error);
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// export const deleteUpload = createAsyncThunk(
//   'uploads/deleteUpload',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();

//       const response = await fetch(`/api/upload/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete upload');
//       }

//       return id;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// const uploadsSlice = createSlice({
//   name: 'uploads',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setCurrentUpload: (state, action: PayloadAction<UploadData | null>) => {
//       state.currentUpload = action.payload;
//     },
//     clearUploads: (state) => {
//       state.uploads = [];
//       state.currentUpload = null;
//       state.error = null;
//     },
//     resetUploadState: (state) => {
//       state.uploads = [];
//       state.currentUpload = null;
//       state.isLoading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Uploads
//       .addCase(fetchUploads.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchUploads.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.uploads = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchUploads.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//         state.currentUpload = null;
//       })
//       // Fetch Upload by ID
//       .addCase(fetchUploadById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchUploadById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUpload = action.payload;
//         state.error = null;

//         // Update the upload in the list if it exists
//         const index = state.uploads.findIndex(upload => upload._id === action.payload._id);
//         if (index !== -1) {
//           state.uploads[index] = action.payload;
//         } else {
//           // Si no existe, lo añadimos a la lista
//           state.uploads.push(action.payload);
//         }
//       })
//       .addCase(fetchUploadById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//         state.currentUpload = null;
//       })
//       // Create Upload
//       .addCase(createUpload.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createUpload.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.uploads.push(action.payload);
//         state.currentUpload = action.payload;
//         state.error = null;
//       })
//       .addCase(createUpload.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       // Update Upload
//       .addCase(updateUpload.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateUpload.fulfilled, (state, action) => {
//         state.isLoading = false;

//         // Update in uploads array
//         const index = state.uploads.findIndex(upload => upload._id === action.payload._id);
//         if (index !== -1) {
//           state.uploads[index] = action.payload;
//         }

//         // Update currentUpload if it's the one being updated
//         if (state.currentUpload && state.currentUpload._id === action.payload._id) {
//           state.currentUpload = action.payload;
//         }

//         state.error = null;
//       })
//       .addCase(updateUpload.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       // Delete Upload
//       .addCase(deleteUpload.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteUpload.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.uploads = state.uploads.filter(upload => upload._id !== action.payload);
//         if (state.currentUpload && state.currentUpload._id === action.payload) {
//           state.currentUpload = null;
//         }
//         state.error = null;
//       })
//       .addCase(deleteUpload.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearError, setCurrentUpload, clearUploads, resetUploadState } = uploadsSlice.actions;
// export default uploadsSlice.reducer;

// // Selectors
// export const selectUploads = (state: RootState) => state.uploads.uploads;
// export const selectCurrentUpload = (state: RootState) => state.uploads.currentUpload;
// export const selectUploadsLoading = (state: RootState) => state.uploads.isLoading;
// export const selectUploadsError = (state: RootState) => state.uploads.error;
// export const selectUploadById = (id: string) => (state: RootState) =>
//   state.uploads.uploads.find(upload => upload._id === id);






// lib/hooks/useUploads.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store';
import {
  fetchUploads,
  createUpload,
  updateUpload,
  deleteUpload,
  clearError,
  selectUploads,
  selectUploadsLoading,
  selectUploadsError
} from '@/lib/features/uploads/uploadsSlice';

// Definir hooks personalizados
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export const useUploads = () => {
  const dispatch = useAppDispatch();
  const uploads = useAppSelector(selectUploads);
  const isLoading = useAppSelector(selectUploadsLoading);
  const error = useAppSelector(selectUploadsError);

  const getUploads = useCallback(() => {
    return dispatch(fetchUploads());
  }, [dispatch]);

  const addUpload = useCallback((uploadData: FormData | { jsonText: string }) => {
    return dispatch(createUpload(uploadData));
  }, [dispatch]);

  const editUpload = useCallback((id: string, data: any) => {
    return dispatch(updateUpload({ id, data }));
  }, [dispatch]);

  const removeUpload = useCallback((id: string) => {
    return dispatch(deleteUpload(id));
  }, [dispatch]);

  const clearUploadError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    uploads,
    isLoading,
    error,
    getUploads,
    addUpload,
    editUpload,
    removeUpload,
    clearError: clearUploadError
  };
};