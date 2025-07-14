import { useEffect, useState, useMemo, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { lerTarefas, lerDisciplinas, deletarTarefa, atualizarStatusTarefa } from '../api/api';
import TasksHeader from '../components/ui/tasks/TasksHeader';
import TasksTable from '../components/ui/tasks/TasksTable';
import TaskDetailDialog from '../components/ui/tasks/TaskDetailDialog';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const sortData = (data, config) => {
    const { key, direction } = config;
    if (!key) return data; 

    return [...data].sort((a, b) => {
        const valA = a[key] ?? ''; 
        const valB = b[key] ?? '';

        switch (key) {
            case 'dataEntrega': {
                const dateA = new Date(valA || 0);
                const dateB = new Date(valB || 0);
                return direction === 'asc' ? dateA - dateB : dateB - dateA;
            }

            case 'prioridade': {
                const priorityOrder = { urgente: 0, alta: 1, media: 2, baixa: 3, '': 4 };
                return direction === 'asc'
                    ? priorityOrder[valA] - priorityOrder[valB]
                    : priorityOrder[valB] - priorityOrder[valA];
            }

            case 'completa': { 
                return direction === 'asc'
                    ? Number(valA) - Number(valB) 
                    : Number(valB) - Number(valA); 
            }
            
            default: {
                return direction === 'asc'
                    ? valA.toString().localeCompare(valB.toString())
                    : valB.toString().localeCompare(valA.toString());
            }
        }
    });
};

export default function Tasks() {
    const [tarefas, setTarefas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [tasksToDelete, settasksToDelete] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [taskInDrawer, setTaskInDrawer] = useState(null);

    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const [sortConfig, setSortConfig] = useState(() => {
        const savedConfig = localStorage.getItem('tasksSortConfig');
        return savedConfig ? JSON.parse(savedConfig) : { key: 'dataEntrega', direction: 'asc' };
    });

    useEffect(() => {
        localStorage.setItem('tasksSortConfig', JSON.stringify(sortConfig));
    }, [sortConfig]);

    const carregarDados = useCallback(async () => {
        try {
            const [dadosTarefas, dadosDisciplinas] = await Promise.all([
                lerTarefas(),
                lerDisciplinas()
            ]);
            setTarefas(dadosTarefas);
            setDisciplinas(dadosDisciplinas);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        carregarDados();
        const handleDataUpdate = () => carregarDados();
        socket.on('data-updated', handleDataUpdate);
        return () => socket.off('data-updated', handleDataUpdate);
    }, [carregarDados]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const handleStatusChange = async (id, novoStatus) => {
        try {
            setTarefas(prev => prev.map(t =>
                t.id === id ? { ...t, completa: novoStatus } : t
            ));
            await atualizarStatusTarefa(id, novoStatus);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            carregarDados();
        }
    };

    const handleSelectClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleSelectAll = (event, tarefasDaPagina) => {
        if (event.target.checked) {
            const newSelecteds = tarefasDaPagina.map((t) => t.id);
            setSelected(prevSelected => [...new Set([...prevSelected, ...newSelecteds])]);
            return;
        }
        const idsDaPagina = tarefasDaPagina.map((t) => t.id);
        setSelected(prevSelected => prevSelected.filter((id) => !idsDaPagina.includes(id)));
    };

    const openDeleteDialog = (ids) => {
        settasksToDelete(Array.isArray(ids) ? ids : [ids]);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        settasksToDelete([]);
    };

    const confirmDelete = async () => {
        if (tasksToDelete && tasksToDelete.length > 0) {
            try {
                await Promise.all(tasksToDelete.map(id => deletarTarefa(id)));
                setSelected(prev => prev.filter(id => !tasksToDelete.includes(id)));
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
            }
        }
        closeDeleteDialog();
    };

    const handleToggleCompleteSelected = async () => {
        const tarefasSelecionadas = tarefas.filter(t => selected.includes(t.id));
        const pendentesCount = tarefasSelecionadas.filter(t => !t.completa).length;
        const novoStatus = pendentesCount > tarefasSelecionadas.length / 2;

        try {
            await Promise.all(tarefasSelecionadas.map(t => handleStatusChange(t.id, novoStatus)));
        } catch (error) {
            console.error("Erro ao alterar status das tarefas selecionadas:", error);
        }
    };

    const handleRowClick = (tarefa) => {
        setTaskInDrawer(tarefa);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setTimeout(() => setTaskInDrawer(null), 300); 
    };


    const tarefasFiltradasEOrdenadas = useMemo(() => {
        const tarefasFiltradas = tarefas.filter(tarefa =>
            (tarefa.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (tarefa.disciplina || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
        return sortData(tarefasFiltradas, sortConfig);
    }, [tarefas, searchTerm, sortConfig]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <TasksHeader
                numSelected={selected.length}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onAddTask={() => navigate('/tasks/new')}
                onDeleteSelected={() => openDeleteDialog(selected)}
                onCompleteSelected={handleToggleCompleteSelected}
            />
            <TasksTable
                tarefas={tarefasFiltradasEOrdenadas}
                sortConfig={sortConfig}
                onSort={handleSort}
                onStatusChange={handleStatusChange}
                onDelete={openDeleteDialog}
                onEdit={(id) => navigate(`/tasks/edit/${id}`)}
                selected={selected}
                onSelectAll={handleSelectAll}
                onSelectClick={handleSelectClick}
                onRowClick={handleRowClick}
            />

            <Outlet context={{ disciplinas }} />

            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir permanentemente {(tasksToDelete && tasksToDelete.length > 1) ? `${tasksToDelete.length} tarefas` : 'esta tarefa'}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancelar</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>Confirmar</Button>
                </DialogActions>
            </Dialog>

            <TaskDetailDialog
                tarefa={taskInDrawer}
                open={drawerOpen}
                onClose={handleCloseDrawer}
            />
        </Box>
    );
}