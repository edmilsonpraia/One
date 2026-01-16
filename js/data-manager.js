// ===== Data Manager - Gerenciamento Unificado de Dados =====

const STORAGE_KEYS = {
    fornecedores: 'fornecedores_data',
    prestadores: 'prestadores_data',
    contratos: 'contratos_data',
    memorandos: 'memorandos_data',
    parcerias: 'parcerias_data'
};

// Data Objects
let dadosGlobais = {
    fornecedores: [],
    prestadores: [],
    contratos: [],
    memorandos: [],
    parcerias: []
};

// Initialize Data
function initializeData() {
    // Load from localStorage or use default data from JSON
    Object.keys(STORAGE_KEYS).forEach(key => {
        const stored = localStorage.getItem(STORAGE_KEYS[key]);
        if (stored) {
            dadosGlobais[key] = JSON.parse(stored);
        }
    });

    // If no data exists, load from initial JSON file
    if (dadosGlobais.fornecedores.length === 0) {
        carregarDadosIniciais();
    }

    return dadosGlobais;
}

// Load initial data from JSON
async function carregarDadosIniciais() {
    try {
        const response = await fetch('data/dados_completos.json');
        const data = await response.json();

        dadosGlobais = {
            fornecedores: data.fornecedores || [],
            prestadores: data.prestadores || [],
            contratos: data.contratos || [],
            memorandos: data.memorandos || [],
            parcerias: data.parcerias || []
        };

        // Save to localStorage
        salvarTodosDados();
    } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
    }
}

// Save all data
function salvarTodosDados() {
    Object.keys(STORAGE_KEYS).forEach(key => {
        localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(dadosGlobais[key]));
    });
}

// Save specific module data
function salvarDados(modulo) {
    if (STORAGE_KEYS[modulo]) {
        localStorage.setItem(STORAGE_KEYS[modulo], JSON.stringify(dadosGlobais[modulo]));
    }
}

// CRUD Operations
function obterDados(modulo) {
    return dadosGlobais[modulo] || [];
}

function obterPorId(modulo, id, campo = 'codigo') {
    return dadosGlobais[modulo].find(item => item[campo] === id);
}

function adicionarItem(modulo, item) {
    dadosGlobais[modulo].push(item);
    salvarDados(modulo);
}

function atualizarItem(modulo, id, dadosNovos, campo = 'codigo') {
    const index = dadosGlobais[modulo].findIndex(item => item[campo] === id);
    if (index !== -1) {
        dadosGlobais[modulo][index] = { ...dadosGlobais[modulo][index], ...dadosNovos };
        salvarDados(modulo);
        return true;
    }
    return false;
}

function deletarItem(modulo, id, campo = 'codigo') {
    const index = dadosGlobais[modulo].findIndex(item => item[campo] === id);
    if (index !== -1) {
        dadosGlobais[modulo].splice(index, 1);
        salvarDados(modulo);
        return true;
    }
    return false;
}

// Statistics
function obterEstatisticas() {
    const stats = {
        fornecedores: {
            total: dadosGlobais.fornecedores.length,
            correntes: dadosGlobais.fornecedores.filter(f => f.corrente === 'corrente').length,
            naoCorrentes: dadosGlobais.fornecedores.filter(f => f.corrente === 'não corrente').length,
            porArea: {}
        },
        prestadores: {
            total: dadosGlobais.prestadores.length,
            ativos: dadosGlobais.prestadores.filter(p => p.status === 'Ativo').length
        },
        contratos: {
            total: dadosGlobais.contratos.length,
            ativos: dadosGlobais.contratos.filter(c => c.status === 'Ativo' || c.status === 'Vigente').length
        },
        memorandos: {
            total: dadosGlobais.memorandos.length
        },
        parcerias: {
            total: dadosGlobais.parcerias.length,
            ativas: dadosGlobais.parcerias.filter(p => p.status === 'Ativo').length
        }
    };

    // Count fornecedores by area
    dadosGlobais.fornecedores.forEach(f => {
        stats.fornecedores.porArea[f.area] = (stats.fornecedores.porArea[f.area] || 0) + 1;
    });

    stats.totalGeral = stats.fornecedores.total + stats.prestadores.total +
                       stats.contratos.total + stats.memorandos.total + stats.parcerias.total;

    return stats;
}

// Filters
function filtrarDados(modulo, termo, filtros = {}) {
    let dados = dadosGlobais[modulo];

    // Search term
    if (termo) {
        dados = dados.filter(item => {
            return Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(termo.toLowerCase())
            );
        });
    }

    // Additional filters
    Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
            dados = dados.filter(item => item[key] === filtros[key]);
        }
    });

    return dados;
}

// Get unique values for filters
function obterValoresUnicos(modulo, campo) {
    return [...new Set(dadosGlobais[modulo].map(item => item[campo]))].filter(v => v).sort();
}

// Initialize on load
initializeData();
