import { Card, CardContent, Typography, Avatar } from "@mui/material";

export default function StatsCard({ titulo, valor, icon, color }) {
    return (
        <Card>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                <div>
                    <Typography variant="subtitle2" color="text.secondary">
                        {titulo}
                    </Typography>
                    <Typography variant="h5">{valor}</Typography>
                </div>
            </CardContent>
        </Card>
    );
}
