import {
    Chip
} from '@mui/material';

export default function PriorityChip({ prioridade }) {
    const colorMap = {
        urgente: 'error',
        alta: 'warning',
        media: 'info',
        baixa: 'success',
    };
    return (
        <Chip
            label={prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}
            color={colorMap[prioridade] || 'default'}
            size="small"
        />
    );
};