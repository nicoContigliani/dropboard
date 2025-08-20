// // import React, { useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { useRouter } from 'next/router';
// // import { registerStart, registerSuccess, registerFailure } from '../../lib/features/auth/authSlice';
// // import { 
// //   TextField, 
// //   Button, 
// //   Box, 
// //   Typography,
// //   CircularProgress
// // } from '@mui/material';

// // const RegisterForm = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     dispatch(registerStart());

// //     try {
// //       const response = await fetch('/api/auth/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ name, email, password }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || 'Registration failed');
// //       }

// //       dispatch(registerSuccess());
// //       router.push('/login');
// //     } catch (error) {
// //       dispatch(registerFailure(error instanceof Error ? error.message : 'Registration failed'));
// //     }
// //   };

// //   return (
// //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
// //       <TextField
// //         label="Nombre"
// //         fullWidth
// //         margin="normal"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         required
// //       />
// //       <TextField
// //         label="Email"
// //         type="email"
// //         fullWidth
// //         margin="normal"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //         required
// //       />
// //       <TextField
// //         label="Contraseña"
// //         type="password"
// //         fullWidth
// //         margin="normal"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         required
// //       />
// //       <Button
// //         type="submit"
// //         variant="contained"
// //         fullWidth
// //         sx={{ mt: 3, mb: 2 }}
// //       >
// //         Registrarse
// //       </Button>
// //     </Box>
// //   );
// // };

// // export default RegisterForm;




// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { registerStart, registerSuccess, registerFailure, loginSuccess } from '../../lib/features/auth/authSlice';
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   CircularProgress,
//   Container,
//   Paper,
//   Alert
// } from '@mui/material';

// const RegisterForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     dispatch(registerStart());

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       // Guardar en localStorage para mantener coherencia con el login
//       localStorage.setItem('auth', JSON.stringify({
//         user: data.user,
//         token: data.token
//       }));
//       dispatch(registerSuccess())
//       dispatch(loginSuccess({ user: data.user, token: data.token }));
//       router.push('/dashboard');
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Registration failed';
//       setError(errorMessage);
//       dispatch(registerFailure(errorMessage));

//       // Limpiar el error después de 5 segundos
//       setTimeout(() => {
//         setError('');
//         dispatch(registerFailure(''));
//       }, 5000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
//         <Typography variant="h4" component="h1" gutterBottom align="center">
//           Registro
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <TextField
//             label="Nombre"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             disabled={isLoading}
//           />
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={isLoading}
//           />
//           <TextField
//             label="Contraseña"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             disabled={isLoading}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 3, mb: 2 }}
//             disabled={isLoading}
//           >
//             {isLoading ? <CircularProgress size={24} /> : 'Registrarse'}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default RegisterForm;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { registerStart, registerSuccess, registerFailure, loginSuccess } from '../../lib/features/auth/authSlice';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Alert
} from '@mui/material';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    dispatch(registerStart());

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Guardar en localStorage para mantener coherencia con el login
      localStorage.setItem('auth', JSON.stringify({
        user: data.user,
        token: data.token
      }));
      
      // CORRECCIÓN: Pasar los datos al registerSuccess
      dispatch(registerSuccess({ user: data.user, token: data.token }));
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      dispatch(registerFailure(errorMessage));

      // Limpiar el error después de 5 segundos
      setTimeout(() => {
        setError('');
        dispatch(registerFailure(''));
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Registro
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Registrarse'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;