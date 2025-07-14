import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Grid, Divider, CircularProgress, Button } from "@mui/material";
import { ChecklistRounded, PendingActionsRounded, AssignmentRounded, MenuBookRounded, BarChartRounded, TrendingUpRounded } from "@mui/icons-material";
import io from 'socket.io-client';

import { useAuth } from "../context/AuthContext";
import { carregarDadosDashboard } from "../api/api";
import MotivationalAlert from "../components/MotivationalAlert";
import StatsCard from "../components/ui/charts/StatsCard";
import ProgressChart from "../components/ui/charts/ProgressChart";
import PriorityChart from "../components/ui/charts/PriorityChart";
import DisciplinaChart from "../components/ui/charts/DisciplinaChart";
import CategoryChart from "../components/ui/charts/CategoryChart";
import DeadlineChart from "../components/ui/charts/DeadlineChart";
import MateriasRadarChart from "../components/ui/charts/RadarChart";

const socket = io('http://localhost:3001');

export default function Dashboard() {
    const { usuario } = useAuth();
    const [tarefas, setTarefas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [desempenhoSemanal, setDesempenhoSemanal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { total, completas, pendentes } = useMemo(() => {
        const totalTarefas = tarefas.length;
        const completasTarefas = tarefas.filter((t) => t.completa).length;
        return {
            total: totalTarefas,
            completas: completasTarefas,
            pendentes: totalTarefas - completasTarefas,
        };
    }, [tarefas]);

    const fetchData = useCallback(async () => {
        setError(null);
        try {
            const dados = await carregarDadosDashboard();
            setTarefas(dados.tarefas);
            setDisciplinas(dados.disciplinas);
            setDesempenhoSemanal(dados.desempenhoSemanal);
        } catch (err) {
            setError("Não foi possível carregar os dados. Verifique sua conexão e tente novamente.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const handleDataUpdate = () => fetchData();
        socket.on('connect', () => {});
        socket.on('data-updated', handleDataUpdate);
        return () => {
            socket.off('connect');
            socket.off('data-updated', handleDataUpdate);
        };
    }, [fetchData]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', textAlign: 'center', p: 2 }}>
                <Typography variant="h6" color="error.main" gutterBottom>Ocorreu um Erro</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{error}</Typography>
                <Button variant="contained" onClick={() => { setLoading(true); fetchData(); }}>Tentar Novamente</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" gutterBottom>
                Olá, {usuario?.nome?.split(' ')[0] || ''} 👋
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Hoje é {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
            </Typography>
            <MotivationalAlert />

            <Grid container spacing={{ xs: 2, md: 3 }} mt={1} mb={4}>
                <Grid size={{ xs: 6, md: 3 }}><StatsCard titulo="Total de Tarefas" valor={total} color="#1976D2" icon={<AssignmentRounded />} /></Grid>
                <Grid size={{ xs: 6, md: 3 }}><StatsCard titulo="Pendentes" valor={pendentes} color="#D32F2F" icon={<PendingActionsRounded />} /></Grid>
                <Grid size={{ xs: 6, md: 3 }}><StatsCard titulo="Concluídas" valor={completas} color="#388E3C" icon={<ChecklistRounded />} /></Grid>
                <Grid size={{ xs: 12, md: 3 }}><StatsCard titulo="Disciplinas" valor={disciplinas.length} color="#6A1B9A" icon={<MenuBookRounded />} /></Grid>
            </Grid>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <BarChartRounded color="primary" />
                    <Typography variant="h6">Análises por Tarefa</Typography>
                </Box>
                
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid size={{ xs: 12, md: 6 }}><PriorityChart tarefas={tarefas} /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><CategoryChart tarefas={tarefas} /></Grid>
                    <Grid size={{ xs: 12, md: 12 }}><DisciplinaChart tarefas={tarefas} disciplinas={disciplinas} /></Grid>
                    <Grid size={{ xs: 12, md: 12 }}><DeadlineChart tarefas={tarefas} /></Grid>
                </Grid>
            </Box>

            <Box sx={{ width: "100%", mt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <TrendingUpRounded color="success" />
                    <Typography variant="h6">Visão Geral do Desempenho</Typography>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid size={12}><MateriasRadarChart tarefas={tarefas} /></Grid>
                    <Grid size={12}><ProgressChart desempenhoSemanal={desempenhoSemanal} /></Grid>
                </Grid>
            </Box>
        </Box>
    );
}