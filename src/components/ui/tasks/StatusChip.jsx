import {
    Chip
} from '@mui/material';

export default function StatusChip({ completa }) {
    return (
        <Chip
            label={completa ? 'Concluída' : 'Pendente'}
            color={completa ? 'success' : 'warning'}
            size="small"
        />
    );
}