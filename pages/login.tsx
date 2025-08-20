import LoginForm from '../components/auth/LoginForm';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <LoginForm />
        <Typography sx={{ mt: 2 }}>
          ¿No tienes cuenta?{' '}
          <Link href="/register" passHref>
            <MuiLink>Regístrate aquí</MuiLink>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;