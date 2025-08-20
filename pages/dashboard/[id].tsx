// import { GetServerSideProps, NextPage } from 'next';

// interface PageProps {
//   id: string;
// }

// interface QueryParams {
//   id: string;
// }

// const DynamicPage: NextPage<PageProps> = ({ id }) => {
//   return (
//     <div>
//       <h1>ID: {id}</h1>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as unknown as QueryParams;

//   return {
//     props: {
//       id,
//     },
//   };
// };

// export default DynamicPage;



import { GetServerSideProps, NextPage } from 'next';
import { useUploads } from '@/hooks/useUploads';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface PageProps {
    id: string;
}

interface QueryParams {
    id: string;
}

const DynamicPage: NextPage<PageProps> = ({ id }) => {
    const { getUploadById, currentUpload, isLoading, error, clearUploadError } = useUploads();
    console.log("🚀 ~ DynamicPage ~ currentUpload:", currentUpload)
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">ID de la URL: {id}</h1>

            {currentUpload ? (
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-xl font-semibold mb-4">Datos del Upload:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>ID:</strong> {currentUpload._id}</p>
                        <p><strong>Nombre:</strong> {currentUpload.data.fileName}</p>
                        <p><strong>Tipo:</strong> {currentUpload.data.fileType}</p>
                        <p><strong>Tamaño:</strong> {currentUpload.data.fileSize} bytes</p>
                        <p><strong>Creado:</strong> {new Date(currentUpload.data.createdAt).toLocaleString()}</p>
                    </div>


                </div>
            ) : (
                <div className="text-center text-gray-500">
                    No se encontró el upload con ID: {id}
                </div>
            )}
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