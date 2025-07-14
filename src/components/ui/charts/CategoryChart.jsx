import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { CategoryRounded } from "@mui/icons-material";

const COLORS = ["#EF5350", "#FF9800", "#2196F3", "#4CAF50", "#9575CD"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent * 100 < 5) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function CategoryChart({ tarefas }) {
    const categoryData = useMemo(() => {
        const data = [
            { name: "Trabalho", value: tarefas.filter(t => t.categoria === "Trabalho").length },
            { name: "Estudo", value: tarefas.filter(t => t.categoria === "Estudo").length },
            { name: "Prova", value: tarefas.filter(t => t.categoria === "Prova").length },
            { name: "Projeto", value: tarefas.filter(t => t.categoria === "Projeto").length },
            { name: "Leitura", value: tarefas.filter(t => t.categoria === "Leitura").length },
        ];
        return data.filter(item => item.value > 0);
    }, [tarefas]);

     if (categoryData.length === 0) {
        return (
             <Card sx={{ height: '100%'}}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <CategoryRounded color="action" />
                        <Typography variant="h6">Categoria</Typography>
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
                    <CategoryRounded color="primary" />
                    <Typography variant="h6">Categoria</Typography>
                </Box>
                <ResponsiveContainer width="100%" height={290}>
                    <PieChart>
                        <Tooltip formatter={(value, name) => [`${value} tarefas`, name]} />
                        <Legend iconType="circle" />
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}