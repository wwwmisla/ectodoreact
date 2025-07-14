import { Box, Typography, Button, useTheme, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import illustration from "../assets/avatar.png";
import SchoolIcon from '@mui/icons-material/School';

export default function Welcome() {
    const navigate = useNavigate();
    const theme = useTheme();

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
                    right: "-100px",
                },
                "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.1),
                    bottom: "-50px",
                    left: "-50px",
                },
            }}
        >
            {/* Texto com animação de entrada da esquerda */}
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
                    textAlign: { xs: "center", md: "left" },
                    zIndex: 1,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: 'primary.main',
                        fontWeight: "bold",
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                    }}
                >
                    <SchoolIcon sx={{ fontSize: "inherit" }} />
                    ECTo Do
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        mb: 4,
                        maxWidth: 500,
                        color: 'text.secondary',
                        fontWeight: 300,
                        lineHeight: 1.6,
                    }}
                >
                    Organize seus estudos, registre seu progresso e acompanhe suas metas com clareza e eficiência.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/login")}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: "12px",
                                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Começar Agora
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: "12px",
                                transition: "all 0.3s ease",
                                cursor: "not-allowed",
                                opacity: 0.7
                            }}
                        >
                            Saiba Mais
                        </Button>
                    </motion.div>
                </Box>
            </Box>

            {/* Imagem com fade e entrada da direita */}
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
                <Box
                    sx={{
                        position: "relative",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "24px",
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.5)})`,
                            transform: "rotate(5deg)",
                            zIndex: -1,
                            top: 0,
                            left: 0,
                        },
                    }}
                >
                    <motion.img
                        src={illustration}
                        alt="Avatar ECTo Do"
                        initial={{ scale: 1 }}
                        animate={{
                            scale: [1, 1.03, 1],
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            height: "auto",
                            borderRadius: "24px",
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}