import { useMemo } from "react";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { RadarRounded } from "@mui/icons-material";

export default function MateriasRadarChart({ tarefas }) {
    const data = useMemo(() => {
        if (!tarefas || tarefas.length === 0) return [];

        const disciplinaCount = tarefas.reduce((acc, tarefa) => {
            const disciplina = tarefa.disciplina || "Outros";
            acc[disciplina] = (acc[disciplina] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(disciplinaCount)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 6)
            .map(([nome, count]) => ({
                subject: nome,
                totalTarefas: count,
            }));
    }, [tarefas]);

    if (data.length < 3) {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <RadarRounded color="action" />
                        <Typography variant="h6" fontWeight="bold">Matérias com Mais Tarefas</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">Dados insuficientes para exibir o gráfico.</Typography>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <RadarRounded color="secondary" />
                    <Typography variant="h6" fontWeight="bold">Matérias com Mais Tarefas</Typography>
                </Box>

                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#e0e0e0" />

                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#555' }} />

                        <PolarRadiusAxis domain={[0, 'dataMax']} tick={false} axisLine={false} />

                        <Radar
                            name="Tarefas"
                            dataKey="totalTarefas"
                            stroke="#6A1B9A"
                            fill="#6A1B9A"
                            fillOpacity={0.6}
                        />

                        <Tooltip />

                        <Legend iconType="circle" iconSize={10} />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};