import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
    Label
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { EventBusyRounded } from "@mui/icons-material";

const truncateText = (text = "", length = 15) => {
    return text.length <= length ? text : text.substring(0, length) + "...";
};

const legendItems = [
    { label: 'Hoje', color: '#AD1457' },
    { label: 'Urgente', color: '#EF5350' },
    { label: 'Próximo', color: '#FFC107' },
    { label: 'Longe', color: '#4CAF50' },
];

const CustomLegend = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 2.5 }}>
        {legendItems.map((item) => (
            <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: '50%' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {item.label}
                </Typography>
            </Box>
        ))}
    </Box>
);


export default function DeadlineChart({ tarefas }) {
    const data = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return tarefas
            .filter(t => !t.completa && t.dataEntrega)
            .map(t => {
                const deadline = new Date(t.dataEntrega + 'T00:00:00');
                if (isNaN(deadline.getTime())) return null;
                const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return {
                    titulo: t.titulo,
                    tituloTruncado: truncateText(t.titulo, 10),
                    diasRestantes: daysLeft,
                    displayValue: daysLeft === 0 ? 0.5 : daysLeft
                };
            })
            .filter(t => t && t.diasRestantes >= 0)
            .sort((a, b) => a.diasRestantes - b.diasRestantes)
            .slice(0, 5);
    }, [tarefas]);

    if (!data || data.length === 0) {
        return (
            <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <EventBusyRounded color="action" />
                        <Typography variant="h6" fontWeight="bold">Próximos Prazos</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography color="text.secondary">Nenhuma tarefa com prazo futuro encontrada.</Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <EventBusyRounded color="action" />
                    <Typography variant="h6" fontWeight="bold">Próximos Prazos</Typography>
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis dataKey="tituloTruncado" interval={0} tick={{ fontSize: 12 }}>
                            <Label
                                value="Tarefas"
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
                                value="Dias Restantes"
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
                            formatter={(value, name, props) => {
                                const originalDias = props.payload.diasRestantes;
                                const label = originalDias === 0 ? 'Entrega hoje!' : `${originalDias} dias restantes`;
                                return [label, props.payload.titulo];
                            }}
                            cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
                        />

                        <Bar dataKey="displayValue">
                            {data.map((entry, index) => {
                                const { diasRestantes } = entry;
                                let color;
                                if (diasRestantes === 0) color = "#AD1457";
                                else if (diasRestantes <= 3) color = "#EF5350";
                                else if (diasRestantes <= 7) color = "#FFC107";
                                else color = "#4CAF50";
                                return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <CustomLegend />
            </CardContent>
        </Card>
    );
};