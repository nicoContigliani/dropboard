import RegisterForm from '@/components/auth/RegisterForm';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Cuenta
        </Typography>
        <RegisterForm />
        <Typography sx={{ mt: 2 }}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" passHref>
            <MuiLink>Inicia sesión aquí</MuiLink>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;