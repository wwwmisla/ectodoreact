import { TableRow, TableCell, Checkbox, IconButton, Tooltip } from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircleRounded as CheckCircleRoundedIcon,
    RadioButtonUncheckedRounded as RadioButtonUncheckedRoundedIcon
} from '@mui/icons-material';
import PriorityChip from './PriorityChip';
import StatusChip from './StatusChip';

export default function TaskTableRow({
    tarefa,
    onStatusChange,
    onDelete,
    onEdit,
    isSelected,
    onSelectClick,
    onRowClick
}) {
    const handleActionClick = (e) => {
        e.stopPropagation();
    };

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            selected={isSelected}
            onClick={() => onRowClick(tarefa)}
            sx={{
                cursor: "pointer",
                '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    '&:hover': {
                        bgcolor: 'action.hover',
                    }
                },
                '& > *': { borderBottom: '1px solid rgba(224, 224, 224, 0.7)' }
            }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isSelected}
                    onChange={(event) => onSelectClick(event, tarefa.id)}
                    inputProps={{ 'aria-labelledby': `task-checkbox-${tarefa.id}` }}
                    onClick={handleActionClick}
                />
            </TableCell>

            <TableCell component="th" id={`task-checkbox-${tarefa.id}`} scope="row">
                {tarefa.titulo}
            </TableCell>

            <TableCell>{tarefa.disciplina}</TableCell>

            <TableCell><PriorityChip prioridade={tarefa.prioridade} /></TableCell>

            <TableCell>{new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>

            <TableCell onClick={handleActionClick}> 
                <Tooltip title={tarefa.completa ? "Marcar como pendente" : "Marcar como concluída"}>
                    <IconButton onClick={() => onStatusChange(tarefa.id, !tarefa.completa)}>
                        {tarefa.completa
                            ? <CheckCircleRoundedIcon color="success" />
                            : <RadioButtonUncheckedRoundedIcon color="action" />
                        }
                    </IconButton>
                </Tooltip>
            </TableCell>

            <TableCell align="right" onClick={handleActionClick}>
                <Tooltip title="Editar Tarefa">
                    <IconButton size="small" color="primary" onClick={() => onEdit(tarefa.id)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir Tarefa">
                    <IconButton size="small" color="error" onClick={() => onDelete(tarefa.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}