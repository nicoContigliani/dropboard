// hooks/useUploads.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchUploads, 
  fetchUploadById, 
  createUpload, 
  updateUpload, 
  deleteUpload,
  clearError,
  setCurrentUpload,
  clearUploads,
  UploadData
} from '../lib/features/uploads/uploadsSlice';
import { AppDispatch, RootState } from '../lib/store';

export const useUploads = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    uploads,  
    currentUpload, 
    isLoading, 
    error 
  } = useSelector((state: RootState) => state.uploads);

  const getUploads = useCallback(() => {
    console.log("getUploads customhook");
    return dispatch(fetchUploads());
  }, [dispatch]);

  const getUploadById = useCallback((id: string) => {
    return dispatch(fetchUploadById(id));
  }, [dispatch]);

  const uploadFile = useCallback(async (file: File | null, jsonText: string = ''): Promise<UploadData> => {
    let formData: FormData | { jsonText: string };
    
    if (file) {
      formData = new FormData();
      formData.append('file', file);
    } else if (jsonText) {
      formData = { jsonText };
    } else {
      throw new Error('Debes subir un archivo o ingresar JSON');
    }

    const result = await dispatch(createUpload(formData));
    return result.payload as UploadData;
  }, [dispatch]);

  const modifyUpload = useCallback(async (id: string, data: Partial<UploadData>): Promise<UploadData> => {
    const result = await dispatch(updateUpload({ id, data }));
    return result.payload as UploadData;
  }, [dispatch]);

  const removeUpload = useCallback(async (id: string): Promise<string> => {
    const result = await dispatch(deleteUpload(id));
    return result.payload as string;
  }, [dispatch]);

  const clearUploadError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const selectUpload = useCallback((upload: UploadData | null) => {
    dispatch(setCurrentUpload(upload));
  }, [dispatch]);

  const resetUploads = useCallback(() => {
    dispatch(clearUploads());
  }, [dispatch]);

  return {
    // State
    uploads,
    currentUpload,
    isLoading,
    error,
    
    // Actions
    getUploads,
    getUploadById,
    uploadFile,
    modifyUpload,
    removeUpload,
    clearUploadError,
    selectUpload,
    resetUploads,
  };
};