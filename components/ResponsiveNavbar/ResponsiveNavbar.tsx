import React, { useState, ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useScrollTrigger,
  Slide,
  Box,
  useTheme,
  useMediaQuery,
  AppBarProps,
  Theme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Definición de tipos para las props
interface NavItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface ActionItem {
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

interface NavbarProps {
  logo?: ReactNode;
  title?: string;
  position?: AppBarProps['position'];
  elevation?: number;
  navItems?: NavItem[];
  actions?: ActionItem[];
  drawerWidth?: number;
  menuIcon?: ReactNode;
  closeIcon?: ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent';
  backgroundColor?: string;
  textColor?: string;
  hideOnScroll?: boolean;
  sx?: object;
}

// Componente para ocultar el navbar al hacer scroll
const HideOnScroll: React.FC<{ children: React.ReactElement; hideOnScroll: boolean }> = ({ 
  children, 
  hideOnScroll 
}) => {
  if (!hideOnScroll) return children;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

// Navbar principal
const Navbar: React.FC<NavbarProps> = ({
  logo = null,
  title = "Mi App",
  position = "fixed",
  elevation = 1,
  navItems = [],
  actions = [],
  drawerWidth = 240,
  menuIcon = <MenuIcon />,
  closeIcon = <CloseIcon />,
  color = "primary",
  backgroundColor,
  textColor,
  hideOnScroll = false,
  sx = {}
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer para versión móvil
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        {logo || <Typography variant="h6" sx={{ my: 2 }}>{title}</Typography>}
        <IconButton onClick={handleDrawerToggle}>
          {closeIcon}
        </IconButton>
      </Box>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.icon && (
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll hideOnScroll={hideOnScroll}>
        <AppBar 
          position={position}
          elevation={elevation}
          color={color}
          sx={{
            backgroundColor: backgroundColor || undefined,
            color: textColor || undefined,
            backdropFilter: backgroundColor?.includes('rgba') ? 'blur(10px)' : undefined,
            ...sx
          }}
        >
          <Toolbar>
            {/* Icono de menú para móvil */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              {menuIcon}
            </IconButton>

            {/* Logo o título */}
            {logo || (
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: { xs: 1, sm: 0 }, mr: { sm: 4 } }}
              >
                {title}
              </Typography>
            )}

            {/* Items de navegación para desktop */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  onClick={item.onClick}
                  startIcon={item.icon}
                  disabled={item.disabled}
                  sx={{ mx: 0.5 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Acciones/buttons adicionales */}
            <Box sx={{ display: 'flex' }}>
              {actions.map((action, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  aria-label={action.label || `action-${index}`}
                >
                  {action.icon}
                </IconButton>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Drawer para móvil */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en móvil
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;