import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../lib/store';
import { 
  Container, 
  Typography, 
  Button, 
  Paper,
  Card,
  CardContent,
  CardActions,
  Stack
} from '@mui/material';
import Link from 'next/link';

const HomePage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!auth.token; // Verificamos si hay token
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido al Sistema
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary">
          {isAuthenticated ? `Hola, ${auth.user?.name}!` : 'Por favor inicia sesión'}
        </Typography>
      </Paper>

      <Stack spacing={3} sx={{ maxWidth: 500, mx: 'auto' }}>
        {!isAuthenticated ? (
          <>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
                <Typography>Accede con tu cuenta existente</Typography>
              </CardContent>
              <CardActions>
                <Link href="/login" passHref>
                  <Button fullWidth variant="contained" size="large">
                    Login
                  </Button>
                </Link>
              </CardActions>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Registrarse</Typography>
                <Typography>Crea una nueva cuenta</Typography>
              </CardContent>
              <CardActions>
                <Link href="/register" passHref>
                  <Button fullWidth variant="outlined" size="large">
                    Registro
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Subir Archivos</Typography>
                <Typography>Procesa archivos Excel, CSV o JSON</Typography>
              </CardContent>
              <CardActions>
                <Link href="/upload" passHref>
                  <Button fullWidth variant="contained" size="large">
                    Subir Archivos
                  </Button>
                </Link>
              </CardActions>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>API Docs</Typography>
                <Typography>Documentación interactiva de la API</Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  size="large"
                  onClick={() => window.open('/api/swagger', '_blank')}
                >
                  Ver Swagger
                </Button>
              </CardActions>
            </Card>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;