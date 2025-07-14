import { useState } from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    Checkbox,
    TablePagination,
    Box,
    Typography,
    useTheme
} from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';
import TaskTableRow from './TasksTableRow';

const headCells = [
    { id: 'titulo', label: 'Título' },
    { id: 'disciplina', label: 'Disciplina' },
    { id: 'prioridade', label: 'Prioridade' },
    { id: 'dataEntrega', label: 'Data de Entrega' },
    { id: 'completa', label: 'Status' }, 
];

export default function TasksTable({
    tarefas,
    sortConfig,
    onSort,
    onStatusChange,
    onDelete,
    onEdit,
    selected,
    onSelectAll,
    onSelectClick,
    onRowClick
}) {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const paginatedTarefas = tarefas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const isAllSelectedOnPage = paginatedTarefas.length > 0 && paginatedTarefas.every(t => selected.includes(t.id));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Paper sx={{
            overflow: 'hidden',
            borderRadius: '16px', 
            border: `1px solid ${theme.palette.divider}`
        }}>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-label="tabela de tarefas">
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'action.hover', borderBottom: 'none' } }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isAllSelectedOnPage}
                                    onChange={(e) => onSelectAll(e, paginatedTarefas)} 
                                    inputProps={{ 'aria-label': 'selecionar todas as tarefas nesta página' }}
                                />
                            </TableCell>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    sortDirection={sortConfig.key === headCell.id ? sortConfig.direction : false}
                                    sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === headCell.id}
                                        direction={sortConfig.key === headCell.id ? sortConfig.direction : 'asc'}
                                        onClick={() => onSort(headCell.id)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTarefas.length > 0 ? (
                            paginatedTarefas.map((tarefa) => (
                                <TaskTableRow
                                    key={tarefa.id}
                                    tarefa={tarefa}
                                    onStatusChange={onStatusChange}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                    isSelected={selected.includes(tarefa.id)}
                                    onSelectClick={onSelectClick} 
                                    onRowClick={onRowClick}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headCells.length + 2} align="center" sx={{ py: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                                        <InboxOutlined sx={{ fontSize: 48 }} />
                                        <Typography variant="h6">Nenhuma tarefa encontrada</Typography>
                                        <Typography variant="body2">Tente ajustar sua busca ou adicione uma nova tarefa.</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {tarefas.length > rowsPerPage && (
                <TablePagination
                    component="div"
                    count={tarefas.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage="Tarefas por página:"
                    labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
                />
            )}
        </Paper>
    );
}