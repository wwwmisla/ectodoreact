import { useMemo } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PriorityHighRounded } from "@mui/icons-material";

const COLORS = ["#EF5350", "#FF9800", "#2196F3", "#4CAF50"]; 

export default function PriorityChart({ tarefas }) {
    const priorityData = useMemo(() => {
        const data = [
            { name: "Urgente", value: tarefas.filter(t => t.prioridade === "urgente").length, color: COLORS[0] },
            { name: "Alta", value: tarefas.filter(t => t.prioridade === "alta").length, color: COLORS[1] },
            { name: "Média", value: tarefas.filter(t => t.prioridade === "media").length, color: COLORS[2] },
            { name: "Baixa", value: tarefas.filter(t => t.prioridade === "baixa").length, color: COLORS[3] },
        ];
        return data.filter(item => item.value > 0);
    }, [tarefas]);

    if (priorityData.length === 0) {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <PriorityHighRounded color="action" />
                        <Typography variant="h6">Prioridade</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 250 }}>
                        <Typography color="text.secondary">Nenhuma tarefa encontrada.</Typography>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <PriorityHighRounded color="error" />
                    <Typography variant="h6">Prioridade</Typography>
                </Box>
                <ResponsiveContainer width="100%" height={290}>
                    <PieChart>
                        <Tooltip formatter={(value, name) => [`${value} tarefas`, name]} />
                        <Legend iconType="circle" />
                        <Pie
                            data={priorityData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                            {priorityData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}