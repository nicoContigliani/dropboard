import { GetServerSideProps, NextPage } from 'next';
import { useUploads } from '@/hooks/useUploads';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import TrelloBoard from '@/components/ResponsiveDND/DND';
import { Home, Info, Settings, Notifications, AccountCircle } from '@mui/icons-material';
import Navbar from '@/components/ResponsiveNavbar/ResponsiveNavbar';

import {

    Menu,
    Close,
    Person,
    Email,
    Code,
    ContentCopy
} from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material';


interface PageProps {
    id: string;
}

interface QueryParams {
    id: string;
}

const DynamicPage: NextPage<PageProps> = ({ id }) => {
    const { getUploadById, modifyUpload, currentUpload, isLoading, error, clearUploadError } = useUploads();
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    // Obtener datos del usuario desde localStorage
    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

    console.log("🚀 ~ DynamicPage ~ currentUpload:", currentUpload)

    useEffect(() => {
        // Obtener datos del usuario desde localStorage
        const authData = localStorage.getItem('auth');
        if (authData) {
            try {
                const parsedAuth = JSON.parse(authData);
                if (parsedAuth.user) {
                    setUserData(parsedAuth.user);
                }
            } catch (err) {
                console.error('Error parsing auth data:', err);
            }
        }

        const fetchUpload = async () => {
            if (!id) return;

            setLocalLoading(true);
            setLocalError(null);

            try {
                await getUploadById(id);
            } catch (err) {
                setLocalError('Error al cargar el upload');
            } finally {
                setLocalLoading(false);
            }
        };

        fetchUpload();
    }, [id, getUploadById]);

    // Configuración del navbar
    const navItems = [
        {
            label: 'Inicio',
            icon: <Home />,
            onClick: () => console.log('Ir a inicio')
        },
        {
            label: 'Información',
            icon: <Info />,
            onClick: () => console.log('Ir a información')
        },
    ];

    const actions = [
        {
            icon: <Notifications />,
            onClick: () => console.log('Notificaciones'),
            label: 'Notificaciones'
        },
        {
            icon: <Settings />,
            onClick: () => console.log('Configuración'),
            label: 'Configuración'
        },
        {
            icon: <AccountCircle />,
            onClick: () => console.log('Perfil'),
            label: 'Perfil de usuario'
        },
    ];

    // Función para manejar la actualización de datos
    const handleUpdateData = async (updatedData: any) => {
        try {
            if (!currentUpload?._id) {
                throw new Error('No hay ID de upload disponible');
            }

            await modifyUpload(currentUpload._id, {
                data: updatedData
            });

            console.log('Datos actualizados correctamente');
        } catch (err) {
            console.error('Error al actualizar datos:', err);
            throw err;
        }
    };

    const handleRetry = () => {
        if (id) {
            getUploadById(id);
        }
    };

    const loading = isLoading || localLoading;
    const errorMessage = error || localError;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500 text-lg mb-4">Error: {errorMessage}</div>
                <button
                    onClick={handleRetry}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Agregar el navbar aquí */}
            <Navbar
                title="Mi App"
                navItems={navItems}
                actions={actions}
                color="default"
                backgroundColor="rgba(255, 255, 255, 0.95)"
                textColor="#2c3e50"
                hideOnScroll={true}
                sx={{
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                }}
            />

            <div className="container mx-auto p-4" style={{ paddingTop: '70px' }}>
         

                <Card
                    elevation={1}
                    sx={{
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        overflow: 'visible',
                        mb: 3,
                        mx:4
                    }}
                >
                    <CardHeader
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Code sx={{ mr: 1.5, color: 'primary.main' }} />
                                <Typography variant="h5" component="h5" fontWeight="600">
                                    ID: {id}
                                </Typography>
                                <IconButton
                                    size="small"
                                    sx={{ ml: 1 }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(id);
                                    }}
                                >
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </Box>
                        }
                        sx={{
                            pb: 1,
                            borderBottom: userData ? '1px solid rgba(0, 0, 0, 0.06)' : 'none'
                        }}
                    />

                    {userData && (
                        <CardContent sx={{ pt: 2, pb: 3 }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                gap: 2
                            }}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                                    <Person />
                                </Avatar>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                        <Typography variant="h6" component="h3" fontWeight="500">
                                            {userData.name}
                                        </Typography>
                                        <Chip
                                            label="Usuario"
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Email sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body1" color="text.secondary">
                                            {userData.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    )}
                </Card>


                {currentUpload ? (
                    <div className="bg-white shadow-md rounded p-4">                   
                        <TrelloBoard data={currentUpload} />
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        No se encontró el upload con ID: {id}
                    </div>
                )}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as unknown as QueryParams;

    return {
        props: {
            id,
        },
    };
};

export default DynamicPage;