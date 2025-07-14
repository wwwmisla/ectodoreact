import {
    Dialog, DialogTitle, DialogContent, Box, Typography, IconButton,
    Divider, Chip, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import {
    Close as CloseIcon, CalendarToday, School, Category, Label, Notes,
    CheckCircle, RadioButtonUnchecked
} from '@mui/icons-material';

const DetailItem = ({ icon, primary, secondary }) => (
    <ListItem sx={{ px: 0 }}>
        <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>{icon}</ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} primaryTypographyProps={{ fontWeight: 'medium' }} />
    </ListItem>
);

export default function TaskDetailDialog({ tarefa, open, onClose }) {
    if (!tarefa) return null;

    const priorityMap = {
        urgente: { label: 'Urgente', color: 'error' },
        alta: { label: 'Alta', color: 'warning' },
        media: { label: 'Média', color: 'info' },
        baixa: { label: 'Baixa', color: 'default' },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 4 } }}
        >
            <DialogTitle sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">Detalhes da Tarefa</Typography>
                <IconButton onClick={onClose} aria-label="Fechar">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />

            <DialogContent sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>{tarefa.titulo}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip
                        icon={tarefa.completa ? <CheckCircle /> : <RadioButtonUnchecked />}
                        label={tarefa.completa ? 'Concluída' : 'Pendente'}
                        color={tarefa.completa ? 'success' : 'default'}
                        variant="outlined"
                        size="small"
                    />
                    <Chip
                        label={priorityMap[tarefa.prioridade]?.label || 'N/A'}
                        color={priorityMap[tarefa.prioridade]?.color || 'default'}
                        variant="outlined"
                        size="small"
                    />
                </Box>

                <List dense>
                    <DetailItem
                        icon={<School />}
                        primary="Disciplina"
                        secondary={tarefa.disciplina || 'Não especificada'}
                    />
                    <DetailItem
                        icon={<Category />}
                        primary="Categoria"
                        secondary={tarefa.categoria || 'Não especificada'}
                    />
                    <DetailItem
                        icon={<CalendarToday />}
                        primary="Data de Entrega"
                        secondary={new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    />
                </List>

                <Divider sx={{ my: 2 }} />

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Descrição</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', lineHeight: 1.7 }}>
                        {tarefa.descricao || 'Nenhuma descrição fornecida.'}
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
}