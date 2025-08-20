// // import React, { useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { useRouter } from 'next/router';
// // import { loginStart, loginSuccess, loginFailure } from '../../lib/features/auth/authSlice';
// // import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

// // const LoginForm: React.FC = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     dispatch(loginStart());

// //     try {
// //       const response = await fetch('/api/auth/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || 'Login failed');
// //       }

// //       dispatch(loginSuccess({ user: data.user, token: data.token }));
// //       router.push('/dashboard');
// //     } catch (error) {
// //       dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm">
// //       <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
// //         <Typography variant="h4" component="h1" gutterBottom align="center">
// //           Login
// //         </Typography>
// //         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
// //           <TextField
// //             label="Email"
// //             type="email"
// //             fullWidth
// //             margin="normal"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <TextField
// //             label="Password"
// //             type="password"
// //             fullWidth
// //             margin="normal"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             fullWidth
// //             sx={{ mt: 3, mb: 2 }}
// //           >
// //             Login
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default LoginForm;




// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { loginStart, loginSuccess, loginFailure } from '../../lib/features/auth/authSlice';
// import { TextField, Button, Box, Typography, Container, Paper, Alert, CircularProgress } from '@mui/material';

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     dispatch(loginStart());

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       // Guardar en localStorage para persistencia
//       localStorage.setItem('auth', JSON.stringify({
//         user: data.user,
//         token: data.token
//       }));

//       dispatch(loginSuccess({ user: data.user, token: data.token }));
//       router.push('/dashboard');
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Login failed';
//       dispatch(loginFailure(errorMessage));
      
//       // Mostrar error temporalmente
//       setTimeout(() => {
//         dispatch(loginFailure(''));
//       }, 5000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
//         <Typography variant="h4" component="h1" gutterBottom align="center">
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
//             label="Password"
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
//             {isLoading ? <CircularProgress size={24} /> : 'Login'}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginStart, loginSuccess, loginFailure } from '../../lib/features/auth/authSlice';
import { TextField, Button, Box, Typography, Container, Paper, Alert, CircularProgress } from '@mui/material';

const LoginForm: React.FC = () => {
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
    dispatch(loginStart());

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Guardar en localStorage para persistencia
      localStorage.setItem('auth', JSON.stringify({
        user: data.user,
        token: data.token
      }));

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
      
      // Mostrar error temporalmente
      setTimeout(() => {
        setError('');
        dispatch(loginFailure(''));
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            label="Password"
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
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;