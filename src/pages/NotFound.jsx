import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #93c5fd 100%)",
                color: "#ffffff",
                overflow: "hidden",
                position: "relative",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    top: "-100px",
                    right: "-100px",
                },
                "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    bottom: "-50px",
                    left: "-50px",
                },
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 4,
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "6rem", md: "8rem" },
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                        }}
                    >
                        <ErrorOutlineIcon sx={{ fontSize: "inherit", mr: 2 }} />
                        404
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        Página não encontrada <SentimentVeryDissatisfiedIcon fontSize="inherit" />
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            maxWidth: 500,
                            color: "#e0f2fe",
                            fontWeight: 300,
                            lineHeight: 1.6,
                        }}
                    >
                        Oops! Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate("/")}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    backgroundColor: "#ffffff",
                                    color: "rgba(59, 130, 246, 1)",
                                    fontWeight: "bold",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Voltar para o início
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate(-1)}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderColor: "#ffffff",
                                    color: "#ffffff",
                                    fontWeight: "bold",
                                    borderRadius: "12px",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Voltar à página anterior
                            </Button>
                        </motion.div>
                    </Box>
                </Box>
            </Box>

            {/* Animação de elementos flutuantes */}
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: 0,
                }}
            >
                {[...Array(5)].map((_, i) => (
                    <Box
                        key={i}
                        component={motion.div}
                        initial={{ y: 0, x: Math.random() * 100 }}
                        animate={{
                            y: [0, 100, 0],
                            x: [Math.random() * 100, Math.random() * 100],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        sx={{
                            position: "absolute",
                            width: 10 + Math.random() * 20,
                            height: 10 + Math.random() * 20,
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.2)",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}