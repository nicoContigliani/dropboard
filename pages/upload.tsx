// // // import React, { useState } from 'react';
// // // import { useSelector } from 'react-redux';
// // // import { RootState } from '../lib/store';
// // // import { 
// // //   Container, 
// // //   Typography, 
// // //   Box, 
// // //   Paper,
// // //   TextareaAutosize,
// // //   Button,
// // //   CircularProgress,
// // //   Alert
// // // } from '@mui/material';

// // // const UploadPage = () => {
// // //   const [file, setFile] = useState<File | null>(null);
// // //   const [jsonText, setJsonText] = useState('');
// // //   const [result, setResult] = useState<any>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const { user } = useSelector((state: RootState) => state.auth);

// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files) {
// // //       setFile(e.target.files[0]);
// // //     }
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       let formData = new FormData();
      
// // //       if (file) {
// // //         formData.append('file', file);
// // //       } else if (jsonText) {
// // //         formData.append('jsonText', jsonText);
// // //       } else {
// // //         throw new Error('Debes subir un archivo o ingresar JSON');
// // //       }

// // //       const response = await fetch('/api/upload', {
// // //         method: 'POST',
// // //         body: formData,
// // //       });

// // //       const data = await response.json();

// // //       if (!response.ok) {
// // //         throw new Error(data.message || 'Error al procesar archivo');
// // //       }

// // //       setResult(data);
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : 'Error desconocido');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!user) {
// // //     return (
// // //       <Container maxWidth="md">
// // //         <Typography variant="h6" color="error">
// // //           Debes iniciar sesión para acceder a esta página
// // //         </Typography>
// // //       </Container>
// // //     );
// // //   }

// // //   return (
// // //     <Container maxWidth="md">
// // //       <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
// // //         Subir Archivos
// // //       </Typography>
      
// // //       <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
// // //         <Box component="form" onSubmit={handleSubmit}>
// // //           <Typography variant="h6" gutterBottom>
// // //             Subir archivo (Excel, CSV o JSON)
// // //           </Typography>
// // //           <input
// // //             type="file"
// // //             accept=".xlsx,.csv,.json"
// // //             onChange={handleFileChange}
// // //             style={{ marginBottom: 16 }}
// // //           />

// // //           <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
// // //             O pegar JSON directamente
// // //           </Typography>
// // //           <TextareaAutosize
// // //             minRows={6}
// // //             placeholder='Pega tu JSON aquí...'
// // //             style={{ width: '100%', padding: 8 }}
// // //             value={jsonText}
// // //             onChange={(e) => setJsonText(e.target.value)}
// // //           />

// // //           <Button
// // //             type="submit"
// // //             variant="contained"
// // //             disabled={loading}
// // //             sx={{ mt: 3 }}
// // //           >
// // //             {loading ? <CircularProgress size={24} /> : 'Procesar'}
// // //           </Button>
// // //         </Box>

// // //         {error && (
// // //           <Alert severity="error" sx={{ mt: 3 }}>
// // //             {error}
// // //           </Alert>
// // //         )}

// // //         {result && (
// // //           <Box sx={{ mt: 4 }}>
// // //             <Typography variant="h6">Resultado:</Typography>
// // //             <pre style={{ 
// // //               background: '#f5f5f5', 
// // //               padding: 16, 
// // //               borderRadius: 4,
// // //               overflowX: 'auto'
// // //             }}>
// // //               {JSON.stringify(result, null, 2)}
// // //             </pre>
// // //           </Box>
// // //         )}
// // //       </Paper>
// // //     </Container>
// // //   );
// // // };

// // // export default UploadPage;



// // import React, { useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../lib/store';
// // import { 
// //   Container, 
// //   Typography, 
// //   Box, 
// //   Paper,
// //   TextareaAutosize,
// //   Button,
// //   CircularProgress,
// //   Alert
// // } from '@mui/material';

// // const UploadPage = () => {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [jsonText, setJsonText] = useState('');
// //   const [result, setResult] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const { user } = useSelector((state: RootState) => state.auth);

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files) {
// //       setFile(e.target.files[0]);
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       let formData = new FormData();
      
// //       if (file) {
// //         formData.append('file', file);
// //       } else if (jsonText) {
// //         formData.append('jsonText', jsonText);
// //       } else {
// //         throw new Error('Debes subir un archivo o ingresar JSON');
// //       }

// //       // Obtener el token del localStorage
// //       const authData = localStorage.getItem('auth');
// //       const token = authData ? JSON.parse(authData).token : null;
      
// //       if (!token) {
// //         throw new Error('No se encontró token de autenticación');
// //       }

// //       const response = await fetch('/api/upload', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: formData,
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || 'Error al procesar archivo');
// //       }

// //       setResult(data);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Error desconocido');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!user) {
// //     return (
// //       <Container maxWidth="md">
// //         <Typography variant="h6" color="error">
// //           Debes iniciar sesión para acceder a esta página
// //         </Typography>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container maxWidth="md">
// //       <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
// //         Subir Archivos
// //       </Typography>
      
// //       <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
// //         <Box component="form" onSubmit={handleSubmit}>
// //           <Typography variant="h6" gutterBottom>
// //             Subir archivo (Excel, CSV o JSON)
// //           </Typography>
// //           <input
// //             type="file"
// //             accept=".xlsx,.csv,.json"
// //             onChange={handleFileChange}
// //             style={{ marginBottom: 16 }}
// //           />

// //           <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
// //             O pegar JSON directamente
// //           </Typography>
// //           <TextareaAutosize
// //             minRows={6}
// //             placeholder='Pega tu JSON aquí...'
// //             style={{ width: '100%', padding: 8 }}
// //             value={jsonText}
// //             onChange={(e) => setJsonText(e.target.value)}
// //           />

// //           <Button
// //             type="submit"
// //             variant="contained"
// //             disabled={loading}
// //             sx={{ mt: 3 }}
// //           >
// //             {loading ? <CircularProgress size={24} /> : 'Procesar'}
// //           </Button>
// //         </Box>

// //         {error && (
// //           <Alert severity="error" sx={{ mt: 3 }}>
// //             {error}
// //           </Alert>
// //         )}

// //         {result && (
// //           <Box sx={{ mt: 4 }}>
// //             <Typography variant="h6">Resultado:</Typography>
// //             <pre style={{ 
// //               background: '#f5f5f5', 
// //               padding: 16, 
// //               borderRadius: 4,
// //               overflowX: 'auto'
// //             }}>
// //               {JSON.stringify(result, null, 2)}
// //             </pre>
// //           </Box>
// //         )}
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default UploadPage;


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../lib/store';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Paper,
//   TextareaAutosize,
//   Button,
//   CircularProgress,
//   Alert
// } from '@mui/material';

// const UploadPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [jsonText, setJsonText] = useState('');
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { user } = useSelector((state: RootState) => state.auth);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let formData = new FormData();
      
//       if (file) {
//         formData.append('file', file);
//       } else if (jsonText) {
//         formData.append('jsonText', jsonText);
//       } else {
//         throw new Error('Debes subir un archivo o ingresar JSON');
//       }

//       // Obtener el token del localStorage
//       const authData = localStorage.getItem('auth');
//       const token = authData ? JSON.parse(authData).token : null;
      
//       if (!token) {
//         throw new Error('No se encontró token de autenticación');
//       }

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Error al procesar archivo');
//       }

//       setResult(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Error desconocido');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <Container maxWidth="md">
//         <Typography variant="h6" color="error">
//           Debes iniciar sesión para acceder a esta página
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
//         Subir Archivos
//       </Typography>
      
//       <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           <Typography variant="h6" gutterBottom>
//             Subir archivo (Excel, CSV o JSON)
//           </Typography>
//           <input
//             type="file"
//             accept=".xlsx,.csv,.json"
//             onChange={handleFileChange}
//             style={{ marginBottom: 16 }}
//           />

//           <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//             O pegar JSON directamente
//           </Typography>
//           <TextareaAutosize
//             minRows={6}
//             placeholder='Pega tu JSON aquí...'
//             style={{ width: '100%', padding: 8 }}
//             value={jsonText}
//             onChange={(e) => setJsonText(e.target.value)}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Procesar'}
//           </Button>
//         </Box>

//         {error && (
//           <Alert severity="error" sx={{ mt: 3 }}>
//             {error}
//           </Alert>
//         )}

//         {result && (
//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h6">Resultado:</Typography>
//             <pre style={{ 
//               background: '#f5f5f5', 
//               padding: 16, 
//               borderRadius: 4,
//               overflowX: 'auto'
//             }}>
//               {JSON.stringify(result, null, 2)}
//             </pre>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default UploadPage;


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../lib/store';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  TextareaAutosize,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      let formData = new FormData();
      
      if (file) {
        formData.append('file', file);
      } else if (jsonText) {
        formData.append('jsonText', jsonText);
      } else {
        throw new Error('Debes subir un archivo o ingresar JSON');
      }

      // Obtener el token del localStorage
      const authData = localStorage.getItem('auth');
      const token = authData ? JSON.parse(authData).token : null;
      
      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al procesar archivo');
      }

      setResult(data);
      setSuccessMessage('¡Archivo cargado correctamente! Redirigiendo al dashboard...');
      setShowSuccess(true);
      
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  if (!user) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6" color="error">
          Debes iniciar sesión para acceder a esta página
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Subir Archivos
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Subir archivo (Excel, CSV o JSON)
          </Typography>
          <input
            type="file"
            accept=".xlsx,.csv,.json"
            onChange={handleFileChange}
            style={{ marginBottom: 16 }}
            disabled={loading}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            O pegar JSON directamente
          </Typography>
          <TextareaAutosize
            minRows={6}
            placeholder='Pega tu JSON aquí...'
            style={{ 
              width: '100%', 
              padding: 8, 
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical'
            }}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Procesar'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Resultado del procesamiento:
            </Typography>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                bgcolor: '#f5f5f5', 
                overflowX: 'auto',
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {JSON.stringify(result, null, 2)}
              </Typography>
            </Paper>
          </Box>
        )}

        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSuccess} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UploadPage;