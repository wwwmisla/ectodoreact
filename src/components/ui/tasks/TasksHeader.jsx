import { Box, Typography, Button, useTheme, TextField, InputAdornment, Tooltip } from '@mui/material';
import { Add as AddIcon, ChecklistRounded as ChecklistIcon, Search as SearchIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

export default function TasksHeader({ numSelected, searchTerm, onSearchChange, onAddTask, onDeleteSelected, onCompleteSelected }) {
    const theme = useTheme();
    const isItemSelected = numSelected > 0;

    const iconAndTextColor = theme.palette.mode === 'dark'
        ? theme.palette.common.light
        : theme.palette.primary.main;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 4,
                bgcolor: isItemSelected ? 'primary.lighter' : 'transparent',
                p: isItemSelected ? 2 : 0,
                borderRadius: isItemSelected ? '12px' : 0,
                transition: 'all 0.2s ease-in-out',
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {isItemSelected ? (
                    <Typography variant="h6" color={iconAndTextColor}>
                        {numSelected} selecionada{numSelected > 1 ? 's' : ''}
                    </Typography>
                ) : (
                    <>
                        <ChecklistIcon sx={{ fontSize: "2.125rem", color: iconAndTextColor }} />
                        <Typography variant="h5" sx={{ color: iconAndTextColor }}>
                            Minhas Tarefas
                        </Typography>
                    </>
                )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
                {isItemSelected ? (
                    <>
                        <Tooltip title="Marcar como Concluídas">
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleIcon />}
                                onClick={onCompleteSelected}
                            >
                                Concluir
                            </Button>
                        </Tooltip>
                        <Tooltip title="Deletar Tarefas Selecionadas">
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={onDeleteSelected}
                            >
                                Deletar
                            </Button>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <TextField
                            placeholder="Buscar por título ou disciplina..."
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={onSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: { xs: '100%', sm: 300 },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    transition: 'border-color 0.2s ease-in-out',
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onAddTask}
                            sx={{
                                py: 1, px: 2.5, borderRadius: '12px', flexShrink: 0,
                                boxShadow: 'none', '&:hover': { boxShadow: '0 2px 8px -2px rgba(25, 118, 210, .5)' }
                            }}
                        >
                            Nova Tarefa
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}