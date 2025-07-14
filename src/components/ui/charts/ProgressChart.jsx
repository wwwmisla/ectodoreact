import { Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUpRounded } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Label } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 2, boxShadow: 3, border: '1px solid #ddd' }}>
                <Typography variant="subtitle2" gutterBottom>{`Dia: ${label}`}</Typography>
                <Typography variant="body2" sx={{ color: payload[0].stroke }}>
                    {`${payload[0].name}: ${payload[0].value}`}
                </Typography>
                <Typography variant="body2" sx={{ color: payload[1].stroke }}>
                    {`${payload[1].name}: ${payload[1].value}`}
                </Typography>
            </Box>
        );
    }
    return null;
};

export default function ProgressChart({ desempenhoSemanal }) {
    const totalTarefas = desempenhoSemanal?.reduce((acc, dia) => acc + dia.geral, 0) || 0;

    if (!desempenhoSemanal || totalTarefas === 0) {
        return (
            <Card>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <TrendingUpRounded color="action" />
                        <Typography variant="h6" fontWeight="bold">Desempenho</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 250 }}>
                        <Typography color="text.secondary">Nenhuma tarefa concluída encontrada.</Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <TrendingUpRounded color="primary" />
                    <Typography variant="h6" fontWeight="bold">Desempenho por Dia da Semana</Typography>
                </Box>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={desempenhoSemanal} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dia">
                            <Label
                                value="Dia da Semana"
                                position="insideBottom"
                                offset={-10}
                                style={{ textAnchor: 'middle', fill: '#555', fontSize: 13, fontWeight: 500 }}
                            />
                        </XAxis>
                        <YAxis allowDecimals={false} >
                            <Label
                                value="Nº de Tarefas"
                                angle={-90}
                                position="insideLeft"
                                offset={-10}
                                style={{ textAnchor: 'middle', fill: '#555', fontSize: 13, fontWeight: 500 }}
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                            type="monotone"
                            dataKey="semana"
                            name="Últimos 7 dias"
                            stroke="#1976D2" 
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="geral"
                            name="Desempenho Geral"
                            stroke="#b0bec5"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}