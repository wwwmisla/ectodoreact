// Gerenciar todas as requisições da aplicação (tarefas e disciplinas)

const LOCAL_URL = "http://localhost:3001";
const PROD_URL = window.location.origin;
const BASE_URL = window.location.hostname === "localhost" ? LOCAL_URL : PROD_URL;

const API_URL_TAREFAS = `${BASE_URL}/tarefas`;
const API_URL_DISCIPLINAS = `${BASE_URL}/disciplinas`;

/* TAREFAS */

// GET todas as tarefas
export async function lerTarefas() {
    const res = await fetch(API_URL_TAREFAS);
    if (!res.ok) throw new Error("Erro ao buscar tarefas");
    return await res.json();
}

// GET tarefa por ID
export async function lerTarefa(id) {
    const res = await fetch(`${API_URL_TAREFAS}/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar tarefa");
    return await res.json();
}

// POST criar nova tarefa
export async function criarTarefa(dados) {
    const res = await fetch(API_URL_TAREFAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    if (!res.ok) throw new Error("Erro ao criar tarefa");
    return await res.json();
}

// PUT atualizar tarefa (inteira)
export async function atualizarTarefa(id, dadosAtualizados) {
    const res = await fetch(`${API_URL_TAREFAS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
    });
    if (!res.ok) throw new Error("Erro ao atualizar tarefa");
    return await res.json();
}

// PATCH atualizar status
export async function atualizarStatusTarefa(id, status) {
    const res = await fetch(`${API_URL_TAREFAS}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completa: status }),
    });
    if (!res.ok) throw new Error("Erro ao atualizar status");
    return await res.json();
}

// DELETE excluir tarefa
export async function deletarTarefa(id) {
    const res = await fetch(`${API_URL_TAREFAS}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Erro ao deletar tarefa");
    return true;
}

/* DISCIPLINAS */

// GET todas as disciplinas
export async function lerDisciplinas() {
    const res = await fetch(API_URL_DISCIPLINAS);
    if (!res.ok) throw new Error("Erro ao buscar disciplinas");
    return await res.json();
}

// GET disciplina por ID
export async function lerDisciplina(id) {
    const res = await fetch(`${API_URL_DISCIPLINAS}/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar disciplina");
    return await res.json();
}

/* DASHBOARD */

export async function carregarDadosDashboard() {
    const tarefas = await lerTarefas();
    const disciplinas = await lerDisciplinas();

    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    
    const tarefasSemana = new Array(7).fill(0);
    const tarefasGeral = new Array(7).fill(0);

    const hoje = new Date();
    const dataLimite = new Date(Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth(), hoje.getUTCDate() - 6));

    const tarefasCompletas = tarefas.filter(t => t.completa && t.dataEntrega);

    tarefasCompletas.forEach(tarefa => {
        const [ano, mes, dia] = tarefa.dataEntrega.split('-').map(Number);
        
        const dataDaTarefa = new Date(Date.UTC(ano, mes - 1, dia));
        
        const diaDaSemanaIndex = dataDaTarefa.getUTCDay();
        
        tarefasGeral[diaDaSemanaIndex]++;

        if (dataDaTarefa >= dataLimite && dataDaTarefa <= hoje) {
            tarefasSemana[diaDaSemanaIndex]++;
        }
    });

    const desempenhoFinal = diasDaSemana.map((dia, index) => ({
        dia: dia,
        semana: tarefasSemana[index],
        geral: tarefasGeral[index],
    }));

    return { tarefas, disciplinas, desempenhoSemanal: desempenhoFinal };
}