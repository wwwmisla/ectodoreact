import { useState } from "react";
import { Box, Typography, Button, useTheme, alpha, TextField, InputAdornment, Link, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import illustration from "../assets/avatar.png";
import SchoolIcon from '@mui/icons-material/School';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const theme = useTheme();
    const { login, showNotification } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !senha) {
            showNotification("Por favor, preencha o email e a senha.", "warning");
            return;
        }
        login(email, senha);
    };

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
            },
            '&:hover fieldset': {
                borderColor: 'primary.main',
            },
        },
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                bgcolor: 'background.default',
                color: 'text.primary',
                overflow: "hidden",
                position: "relative",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.1),
                    top: "-100px",
                    left: "-100px",
                },
                "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.1),
                    bottom: "-50px",
                    right: "-50px",
                },
            }}
        >
            <Box
                component={motion.div}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "flex-start" },
                    px: { xs: 4, md: 8 },
                    zIndex: 1,
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 450, width: '100%', textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: 'primary.main' }}>
                        Acesse sua Conta
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                        Bem-vindo! Organize seus estudos.
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Seu Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Sua Senha"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        sx={textFieldStyles}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Box sx={{ textAlign: 'right', my: 1 }}>
                        <Link variant="body2" sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                            Esqueceu a senha?
                        </Link>
                    </Box>

                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                py: 1.5,
                                mt: 2,
                                fontWeight: "bold",
                                borderRadius: "12px",
                                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Entrar
                        </Button>
                    </motion.div>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3, textAlign: 'center' }}>
                        Não tem uma conta? {" "}
                        <Link fontWeight="bold" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                            Cadastre-se
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/* Imagem e Branding */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    flex: 1,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    zIndex: 1,
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: "bold", mb: 2, display: "flex", alignItems: "center", gap: 2, justifyContent: 'center', fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                        <SchoolIcon sx={{ fontSize: "inherit" }} />
                        ECTo Do
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, maxWidth: 500, color: 'text.secondary', fontWeight: 300, lineHeight: 1.6 }}>
                        Organize seus estudos, registre seu progresso e acompanhe suas metas com clareza e eficiência.
                    </Typography>
                    <Box sx={{ position: "relative", "&:before": { content: '""', position: "absolute", width: "100%", height: "100%", borderRadius: "24px", background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.5)})`, transform: "rotate(-5deg)", zIndex: -1, top: 0, left: 0, } }}>
                        <motion.img
                            src={illustration}
                            alt="Avatar ECTo Do"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.03, 1], y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: "100%", maxWidth: "450px", height: "auto", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}