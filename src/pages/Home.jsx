import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    useTheme,
    Chip,
    CircularProgress,
} from "@mui/material";
import {
    ChecklistRounded,
    MenuBookRounded,
    TrendingUpRounded,
    AccessTimeFilled,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import illustration from "../assets/avatar_3.png";
import { lerTarefas } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const theme = useTheme();
    const [tarefasHoje, setTarefasHoje] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { usuario } = useAuth();

    const saudacoes = [
        "Bem-vindo de volta!",
        "Que bom te ver por aqui!",
        "Vamos continuar com foco?",
    ];

    const fraseDoDia =
        "Grandes conquistas começam com pequenas tarefas feitas com dedicação.";

    useEffect(() => {
        async function buscarTarefas() {
            try {
                const todas = await lerTarefas();
                const hoje = new Date().toISOString().split("T")[0];
                const tarefasDeHoje = todas.filter(
                    (t) => t.dataEntrega === hoje && !t.completa
                );
                setTarefasHoje(tarefasDeHoje);
            } catch (err) {
                console.error("Erro ao carregar tarefas:", err);
            } finally {
                setCarregando(false);
            }
        }

        buscarTarefas();
    }, []);

    return (
        <Box
            sx={{
                p: { xs: 2, md: 4 },
                minHeight: "100vh",
                bgcolor: "background.default",
                color: "text.primary",
            }}
        >
            {/* Saudação, frase e imagem lado a lado */}
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {saudacoes[Math.floor(Math.random() * saudacoes.length)]} {usuario?.nome?.split(' ')[0]} 👋
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary" mb={3}>
                            {fraseDoDia}
                        </Typography>

                        {carregando ? (
                            <CircularProgress size={24} />
                        ) : tarefasHoje.length > 0 ? (
                            <Chip
                                icon={<AccessTimeFilled color="error" />}
                                label={`Você tem ${tarefasHoje.length} tarefa${tarefasHoje.length > 1 ? "s" : ""} para hoje`}
                                sx={{
                                    bgcolor: "error.light",
                                    color: "error.dark",
                                    mb: 2,
                                    fontWeight: 500
                                }}
                            />
                        ) : (
                            <Chip
                                icon={<AccessTimeFilled color="success" />}
                                label="Nenhuma tarefa para hoje!"
                                sx={{
                                    mb: 2,
                                    bgcolor: "success.light",
                                    color: "success.dark",
                                    fontWeight: 500,
                                }}
                            />
                        )}
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6} textAlign="center">
                    <motion.img
                        src={illustration}
                        alt="Avatar 3D dando boas-vindas"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        style={{
                            maxWidth: "220px",
                            width: "100%",
                            height: "auto",
                        }}
                    />
                </Grid>
            </Grid>

            {/* Divisor estilizado */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Box sx={{ my: 6, textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        O que você pode fazer por aqui
                    </Typography>
                    <Box
                        sx={{
                            width: 80,
                            height: 4,
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 2,
                            mx: "auto",
                            mt: 1,
                        }}
                    />
                </Box>
            </motion.div>

            {/* Cards de funcionalidades */}
            <Grid container spacing={3}>
                {[
                    {
                        icon: <ChecklistRounded color="primary" fontSize="large" />,
                        title: "Organize Tarefas",
                        desc: "Mantenha o controle de tudo que precisa ser feito.",
                    },
                    {
                        icon: <MenuBookRounded color="secondary" fontSize="large" />,
                        title: "Gerencie Disciplinas",
                        desc: "Acompanhe matérias, conteúdos e organização.",
                    },
                    {
                        icon: <TrendingUpRounded color="success" fontSize="large" />,
                        title: "Acompanhe o Progresso",
                        desc: "Visualize gráficos semanais para manter o foco.",
                    },
                ].map((item, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.2 }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor:
                                        theme.palette.mode === "light"
                                            ? "#ffffff"
                                            : "#1e1e1e",
                                    boxShadow: 1,
                                    gap: 2,
                                }}
                            >
                                {item.icon}
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
