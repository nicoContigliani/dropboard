import dynamic from 'next/dynamic'

import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store';
import {
  fetchUploadById,
  updateUpload,
  clearError,
  selectCurrentUpload,
  selectUploadsLoading,
  selectUploadsError,
} from '@/lib/features/uploads/uploadsSlice';

// import TrelloBoard from '@/components/ResponsiveDND/DND';

const TrelloBoard = dynamic(() => import('@/components/ResponsiveDND/DND'), {
  loading: () => <div>Loading...</div>,
})

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Alert,
  Container,
} from '@mui/material';
import {
  Refresh,
  ErrorOutline,
  Login
} from '@mui/icons-material';

// Definir hooks personalizados localmente
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

interface PageProps {
  id: string;
}

interface QueryParams {
  id: string;
}

const DynamicPage: NextPage<PageProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const currentUpload = useAppSelector(selectCurrentUpload);
  const isLoading = useAppSelector(selectUploadsLoading);
  const error = useAppSelector(selectUploadsError);
  
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();

  // Función para limpiar errores
  const clearAllErrors = useCallback(() => {
    setLocalError(null);
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    const loadUpload = async () => {
      if (!id) {
        setLocalError('No se proporcionó un ID de proyecto');
        return;
      }

      setLocalLoading(true);
      clearAllErrors();

      try {
        await dispatch(fetchUploadById(id)).unwrap();
      } catch (err: any) {
        console.error('Error fetching upload:', err);
        const errorMessage = err?.message || 'Error al cargar el proyecto';
        setLocalError(errorMessage);
        
        // Si es un error de autenticación, redirigir al login
        if (errorMessage.includes('Authentication failed') || errorMessage.includes('401')) {
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } finally {
        setLocalLoading(false);
      }
    };

    loadUpload();
  }, [id, dispatch, clearAllErrors, router]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleUpdateData = async (updatedData: any) => {
    try {
      if (!currentUpload?._id) {
        throw new Error('No hay ID de proyecto disponible');
      }

      await dispatch(updateUpload({
        id: currentUpload._id,
        data: { data: updatedData }
      })).unwrap();
      
    } catch (err: any) {
      console.error('Error al actualizar datos:', err);
      const errorMessage = err?.message || 'Error al guardar los cambios';
      setLocalError(errorMessage);
      throw err;
    }
  };

  const handleRetry = () => {
    clearAllErrors();
    if (id) {
      dispatch(fetchUploadById(id));
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const loading = isLoading || localLoading;
  const errorMessage = error || localError;

  // Verificar específicamente error 401 (Unauthorized)
  const isUnauthorized = errorMessage?.includes('401') || 
                         errorMessage?.includes('Unauthorized') || 
                         errorMessage?.includes('Authentication failed') ||
                         errorMessage?.includes('No authentication data') ||
                         errorMessage?.includes('No token found');

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ 
              color: 'primary.main',
              mb: 2
            }}
          />
          <Typography variant="h6" color="text.secondary">
            Cargando proyecto...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isUnauthorized) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <Login 
            sx={{ 
              fontSize: 64, 
              color: 'warning.main',
              mb: 2
            }}
          />
          <Typography variant="h5" gutterBottom color="warning.main">
            Sesión expirada
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tu sesión ha expirado o no tienes permisos para acceder a este proyecto.
          </Typography>
          <Button
            variant="contained"
            onClick={handleLoginRedirect}
            startIcon={<Login />}
          >
            Iniciar sesión
          </Button>
        </Paper>
      </Container>
    );
  }

  if (errorMessage && !isUnauthorized) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <ErrorOutline 
            sx={{ 
              fontSize: 64, 
              color: 'error.main',
              mb: 2
            }}
          />
          <Typography variant="h5" gutterBottom color="error">
            Error al cargar el proyecto
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {errorMessage}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={handleRetry}
              startIcon={<Refresh />}
            >
              Reintentar
            </Button>
            <Button
              variant="outlined"
              onClick={clearAllErrors}
            >
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        py: 3, 
        px: { xs: 1, sm: 2, md: 3 },
        backgroundColor: 'background.default',
        minHeight: '100vh'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            mb: 1
          }}
        >
          Gestor de Proyectos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ID del proyecto: {id}
        </Typography>
      </Box>

      {currentUpload ? (
        <Paper
          elevation={2}
          sx={{
            p: 0,
            overflow: 'hidden',
            backgroundColor: 'background.paper'
          }}
        >
          <TrelloBoard 
            data={currentUpload} 
            onUpdateData={handleUpdateData}
          />
        </Paper>
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No se encontró el proyecto con ID: {id}
          </Typography>
          <Button
            variant="contained"
            onClick={handleRetry}
            startIcon={<Refresh />}
            sx={{ mt: 2 }}
          >
            Reintentar
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as unknown as QueryParams;

  if (!id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};

export default DynamicPage;