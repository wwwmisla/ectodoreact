import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Label,
    Cell
} from "recharts";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { MenuBookRounded } from "@mui/icons-material";

const gerarSigla = (nome = "") => {
    const sigla = nome
        .split(" ")
        .filter(p => p.length > 2 && !["de", "da", "do", "e", "à", "às", "para"].includes(p.toLowerCase()))
        .map(p => p[0].toUpperCase())
        .join("");
    return sigla || nome.substring(0, 3).toUpperCase(); 
};

const cores = ["#6A1B9A", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#1976D2", "#D32F2F", "#388E3C"];

export default function DisciplinaChart({ tarefas }) {
    const data = useMemo(() => {
        const disciplinaCount = tarefas.reduce((acc, tarefa) => {
            const nomeDisciplina = (tarefa.disciplina || "Não definida").trim().toUpperCase(); 
            acc[nomeDisciplina] = (acc[nomeDisciplina] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(disciplinaCount).map(([nome, quantidade]) => ({
            name: gerarSigla(nome),
            value: quantidade,
            fullName: nome
        })).sort((a, b) => b.value - a.value); 
    }, [tarefas]);

    if (data.length === 0) {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <MenuBookRounded color="action" />
                        <Typography variant="h6">Disciplinas</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 250 }}>
                        <Typography color="text.secondary">Nenhuma tarefa encontrada.</Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <MenuBookRounded color="secondary" />
                    <Typography variant="h6">Tarefas por Disciplina</Typography>
                </Box>
                <ResponsiveContainer width="100%" height={290}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }}>
                            <Label
                                value="Disciplinas"
                                position="insideBottom"
                                offset={-10}
                                style={{
                                    textAnchor: 'middle',
                                    fill: '#555',
                                    fontSize: 13,
                                    fontWeight: 500,
                                }}
                            />
                        </XAxis>
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }}>
                            <Label
                                value="Nº de Tarefas"
                                angle={-90}
                                position="insideLeft"
                                offset={-10}
                                style={{
                                    textAnchor: 'middle',
                                    fill: '#555',
                                    fontSize: 13,
                                    fontWeight: 500,
                                }}
                            />
                        </YAxis>
                        <Tooltip
                            cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
                            formatter={(value, name, props) => [`${value} tarefas`, props.payload.fullName]}
                        />
                        <Bar dataKey="value" name="Nº de Tarefas">
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
