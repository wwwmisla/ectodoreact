import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreen() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                gap: 2,
                background: "linear-gradient(135deg, #6366f120, #8b5cf620)",
            }}
        >
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" color="textSecondary">
                Carregando...
            </Typography>
        </Box>
    );
}