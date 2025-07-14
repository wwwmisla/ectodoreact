import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
    ListSubheader,
    Tooltip,
    useMediaQuery,
    styled,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Home } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SchoolIcon from '@mui/icons-material/School';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Logout from '@mui/icons-material/Logout';
import profilePic from '../../assets/eu.png';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

const drawerWidth = 240;
const collapsedWidth = 70;

const NAVIGATION = [
    {
        group: 'Geral',
        items: [
            { label: 'Home', path: '/home', icon: <Home /> },
            { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
            { label: 'Tarefas', path: '/tasks', icon: <FormatListBulletedIcon /> },
        ],
    },
];

const listVariants = {
    open: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    closed: {
        y: 20,
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
};

const CustomNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    display: 'block',
    color: theme.palette.text.secondary,
    position: 'relative',

    '& .MuiListItemButton-root': {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },

    '&.active': {
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
        '& .MuiListItemButton-root': {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.25),
            },
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '70%',
            width: '4px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '0 4px 4px 0',
        }
    },
}));

export default function AppLayout(props) {
    const { window } = props;
    const theme = useTheme();
    const navigate = useNavigate();
    const { mode, toggleTheme } = useContext(ThemeContext);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const stored = localStorage.getItem('sidebarOpen');
        return stored !== null ? JSON.parse(stored) : isDesktop;
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const isProfileMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleProfileMenuClose();
        navigate('/');
    };

    const handleSidebarToggle = () => {
        const newState = !sidebarOpen;
        setSidebarOpen(newState);
        localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {isMobile && (
                <Toolbar sx={{ minHeight: '64px !important', borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon sx={{ mr: 1 }} />
                            <Typography variant="h6">ECTo Do</Typography>
                        </Box>
                        <IconButton onClick={() => setSidebarOpen(false)}>
                            <MenuOpenIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            )}

            <Box component={motion.div} sx={{ overflow: 'hidden', padding: '8px 0' }}>
                {NAVIGATION.map((section) => (
                    <motion.div key={section.group} variants={listVariants} initial="closed" animate="open">
                        <List sx={{ p: 0 }}>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <ListSubheader component="div" sx={{ bgcolor: 'inherit', lineHeight: '36px', px: 2.5, pt: 2, pb: 1 }}>
                                            {section.group}
                                        </ListSubheader>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {section.items.map(({ label, path, icon }) => (
                                <Box key={path} sx={{ padding: '4px 8px' }}>
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, x: sidebarOpen ? 2 : 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <Tooltip title={!sidebarOpen ? label : ''} placement="right" disableHoverListener={sidebarOpen || isMobile}>
                                            <CustomNavLink to={path}>
                                                <ListItemButton sx={{ pl: 2.5, pr: 2, minHeight: 48, justifyContent: sidebarOpen ? 'initial' : 'center', borderRadius: 1.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 0, mr: sidebarOpen ? 2 : 'auto', justifyContent: 'center' }}>
                                                        {icon}
                                                    </ListItemIcon>
                                                    <AnimatePresence>
                                                        {sidebarOpen && (
                                                            <ListItemText
                                                                primary={label}
                                                                primaryTypographyProps={{
                                                                    component: motion.div,
                                                                    initial: { opacity: 0 },
                                                                    animate: { opacity: 1, transition: { delay: 0.1 } },
                                                                    exit: { opacity: 0 },
                                                                }}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </ListItemButton>
                                            </CustomNavLink>
                                        </Tooltip>
                                    </motion.div>
                                </Box>
                            ))}
                        </List>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />

            <AppBar position="fixed" elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '64px !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={handleSidebarToggle} edge="start" sx={{ mr: 2 }}>
                            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                        <SchoolIcon />
                        <Typography variant="h6" noWrap sx={{ ml: 1 }}>
                            ECTo Do
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton color="inherit" onClick={toggleTheme} aria-label="Mudar tema">
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <IconButton color="inherit" onClick={handleProfileMenuOpen} aria-label="Menu de perfil">
                            <Avatar sx={{ width: 32, height: 32 }} src={profilePic} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={isProfileMenuOpen}
                onClose={handleProfileMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        mt: 1.5,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }} src={profilePic} />
                    <Box>
                        <Typography fontWeight="bold">Misla Wislaine</Typography>
                        <Typography variant="body2" color="text.secondary">misla.wislaine.alves.710@ufrn.edu.br</Typography>
                    </Box>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ m: 1, borderRadius: 1 }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>

            <Drawer
                container={container}
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? sidebarOpen : true}
                onClose={() => setSidebarOpen(false)}
                ModalProps={{ keepMounted: true }}
                PaperProps={{ elevation: 2 }}
                sx={{
                    zIndex: theme.zIndex.drawer,
                    '& .MuiDrawer-paper': {
                        bgcolor: 'background.default',
                        width: sidebarOpen ? drawerWidth : collapsedWidth,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        top: isMobile ? 0 : '64px',
                        height: isMobile ? '100%' : 'calc(100% - 64px)',
                        borderRight: 'none',
                        transition: `width ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`,
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: isMobile ? 2 : 3,
                    paddingTop: '80px',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    width: '100%',
                    marginLeft: isMobile ? 0 : `${sidebarOpen ? drawerWidth : collapsedWidth}px`,
                    transition: `margin ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

AppLayout.propTypes = {
    window: PropTypes.func,
};