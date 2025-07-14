import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
    CircularProgress, Box, Select, MenuItem, FormControl, InputLabel,
    Typography, Divider
} from '@mui/material';
import { AddCircleOutline, CleaningServices, Save } from '@mui/icons-material';
import { lerTarefa, criarTarefa, atualizarTarefa } from '../../../api/api';

const initialState = {
    titulo: '',
    descricao: '',
    disciplina: '',
    categoria: 'Trabalho',
    prioridade: 'baixa',
    dataEntrega: ''
};

export default function TaskForm() {
    const { taskId } = useParams();
    const { disciplinas } = useOutletContext(); 
    const navigate = useNavigate();
    const isEditMode = Boolean(taskId);

    const [tarefa, setTarefa] = useState(initialState);
    const [semestreSelecionado, setSemestreSelecionado] = useState('');
    const [loading, setLoading] = useState(false);

    const semestres = useMemo(() => {
        if (!disciplinas) return [];
        const semestresUnicos = [...new Set(disciplinas.map(d => d.semestre))];
        return semestresUnicos.sort((a, b) => a - b);
    }, [disciplinas]);

    const disciplinasFiltradas = useMemo(() => {
        if (!semestreSelecionado || !disciplinas) return [];
        return disciplinas.filter(d => d.semestre.toString() === semestreSelecionado.toString());
    }, [semestreSelecionado, disciplinas]);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            lerTarefa(taskId)
                .then(dataDaTarefa => {
                    if (dataDaTarefa.dataEntrega) {
                        dataDaTarefa.dataEntrega = dataDaTarefa.dataEntrega.split('T')[0];
                    }
                    setTarefa(dataDaTarefa);

                    if (disciplinas && disciplinas.length > 0) {
                        const disciplinaDaTarefa = disciplinas.find(d => d.nome === dataDaTarefa.disciplina);
                        if (disciplinaDaTarefa) {
                            setSemestreSelecionado(disciplinaDaTarefa.semestre);
                        }
                    }
                })
                .catch(err => console.error("Erro ao buscar tarefa:", err))
                .finally(() => setLoading(false));
        }
    }, [taskId, isEditMode, disciplinas]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'semestre') {
            setSemestreSelecionado(value);
            setTarefa(prev => ({ ...prev, disciplina: '' })); 
        } else {
            setTarefa(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleClear = () => {
        setTarefa(initialState);
        setSemestreSelecionado('');
    };

    const handleClose = () => {
        navigate('/tasks');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dadosParaSalvar = { ...tarefa };
            delete dadosParaSalvar.semestre;

            if (isEditMode) {
                await atualizarTarefa(taskId, dadosParaSalvar);
            } else {
                await criarTarefa({ ...dadosParaSalvar, completa: false });
            }
            handleClose();
        } catch (err) {
            console.error("Erro ao salvar tarefa:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddCircleOutline color="primary" />
                {isEditMode ? 'Editar Tarefa' : 'Nova Tarefa'}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Typography variant="caption" color="text.secondary">* Campos obrigatórios</Typography>
                {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField name="titulo" label="Título" value={tarefa.titulo} onChange={handleChange} required />
                        <TextField name="descricao" label="Descrição" value={tarefa.descricao} onChange={handleChange} multiline rows={3} />
                        
                        <FormControl fullWidth required>
                            <InputLabel>Semestre</InputLabel>
                            <Select name="semestre" value={semestreSelecionado} label="Semestre" onChange={handleChange}>
                                <MenuItem value="" disabled><em>Selecione o semestre</em></MenuItem>
                                {semestres.map(s => <MenuItem key={s} value={s}>{s}º Semestre</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required disabled={!semestreSelecionado}>
                            <InputLabel>Disciplina</InputLabel>
                            <Select name="disciplina" value={tarefa.disciplina} label="Disciplina" onChange={handleChange}>
                                <MenuItem value="" disabled><em>Selecione uma disciplina</em></MenuItem>
                                {disciplinasFiltradas.map(d => <MenuItem key={d.id} value={d.nome}>{d.nome}</MenuItem>)}
                            </Select>
                        </FormControl>
                        
                        <FormControl fullWidth required>
                            <InputLabel>Categoria</InputLabel>
                            <Select name="categoria" value={tarefa.categoria} label="Categoria" onChange={handleChange}>
                                <MenuItem value="Trabalho">Trabalho</MenuItem>
                                <MenuItem value="Estudo">Estudo</MenuItem>
                                <MenuItem value="Prova">Prova</MenuItem>
                                <MenuItem value="Relatório">Relatório</MenuItem>
                                <MenuItem value="Projeto">Projeto</MenuItem>
                                <MenuItem value="Apresentação">Apresentação</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth required>
                            <InputLabel>Prioridade</InputLabel>
                            <Select name="prioridade" value={tarefa.prioridade} label="Prioridade" onChange={handleChange}>
                                <MenuItem value="baixa">Baixa</MenuItem>
                                <MenuItem value="media">Média</MenuItem>
                                <MenuItem value="alta">Alta</MenuItem>
                                <MenuItem value="urgente">Urgente</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField name="dataEntrega" label="Data de Entrega" type="date" value={tarefa.dataEntrega} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                    </Box>
                )}
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
                <Button onClick={handleClear} startIcon={<CleaningServices />} sx={{ color: 'text.secondary' }}>
                    Limpar Formulário
                </Button>
                <Box>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained" startIcon={<Save />} disabled={loading} sx={{ ml: 1 }}>
                        {isEditMode ? 'Salvar Tarefa' : 'Criar Tarefa'}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}