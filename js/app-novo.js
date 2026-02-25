// ===== Application Main Controller =====

let currentTab = 'dashboard';
let currentModule = '';
let editingId = null;

// Helper function to convert plural to singular
function toSingular(plural) {
    const conversions = {
        'fornecedores': 'fornecedor',
        'prestadores': 'prestador',
        'contratos': 'contrato',
        'memorandos': 'memorando',
        'parcerias': 'parceria',
        'avaliacoes': 'avaliacao'
    };
    return conversions[plural] || plural;
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize data
    initializeData();

    // Populate filters
    popularFiltros();

    // Update dashboard
    atualizarDashboard();

    // Setup event listeners
    setupEventListeners();

    // Load tables
    carregarTodasTabelas();
}

function popularFiltros() {
    // Populate area filter for fornecedores
    const areas = obterValoresUnicos('fornecedores', 'area');
    const areaSelect = document.getElementById('filter-fornecedor-area');

    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
    });

    // Add filter event listeners
    const filterStatus = document.getElementById('filter-fornecedor-status');
    if (filterStatus) {
        filterStatus.addEventListener('change', () => renderTable('fornecedores'));
    }

    if (areaSelect) {
        areaSelect.addEventListener('change', () => renderTable('fornecedores'));
    }
}

function setupEventListeners() {
    // Search inputs
    document.getElementById('search-fornecedores').addEventListener('input', () => renderTable('fornecedores'));
    document.getElementById('search-prestadores').addEventListener('input', () => renderTable('prestadores'));
    document.getElementById('search-contratos').addEventListener('input', () => renderTable('contratos'));
    document.getElementById('search-memorandos').addEventListener('input', () => renderTable('memorandos'));
    document.getElementById('search-parcerias').addEventListener('input', () => renderTable('parcerias'));
    document.getElementById('search-avaliacoes').addEventListener('input', () => renderTable('avaliacoes'));

    // Avaliação result filter
    const filterResultado = document.getElementById('filter-avaliacao-resultado');
    if (filterResultado) {
        filterResultado.addEventListener('change', () => renderTable('avaliacoes'));
    }

    // Dynamic add button
    document.getElementById('add-button').addEventListener('click', () => {
        if (currentTab !== 'dashboard') {
            openModal(toSingular(currentTab));
        }
    });
}

// Tab Management
function showTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');

    // Update add button text
    const addBtn = document.getElementById('add-button');
    const btnTexts = {
        'fornecedores': 'Novo Fornecedor',
        'prestadores': 'Novo Prestador',
        'contratos': 'Novo Contrato',
        'memorandos': 'Novo Memorando',
        'parcerias': 'Nova Parceria',
        'avaliacoes': 'Nova Avaliação'
    };
    addBtn.innerHTML = `<i class="fas fa-plus"></i> ${btnTexts[tabName] || 'Novo'}`;
    addBtn.style.display = (tabName === 'dashboard' || tabName === 'contabilidade') ? 'none' : 'flex';

    // Update avaliações summary when switching to that tab
    if (tabName === 'avaliacoes') {
        atualizarResumoAvaliacoes();
    }

    // Refresh content
    if (tabName === 'dashboard') {
        atualizarDashboard();
    } else if (tabName === 'contabilidade') {
        atualizarContabilidade();
    } else {
        renderTable(tabName);
    }
}

// Dashboard
function atualizarDashboard() {
    const stats = obterEstatisticas();

    document.getElementById('total-fornecedores').textContent = stats.fornecedores.total;
    document.getElementById('total-prestadores').textContent = stats.prestadores.total;
    document.getElementById('total-contratos').textContent = stats.contratos.total;
    document.getElementById('total-memorandos').textContent = stats.memorandos.total;
    document.getElementById('total-parcerias').textContent = stats.parcerias.total;
    document.getElementById('total-geral').textContent = stats.totalGeral;

    // Update charts
    atualizarGraficos(stats);
}

// Load all tables
function carregarTodasTabelas() {
    renderTable('fornecedores');
    renderTable('prestadores');
    renderTable('contratos');
    renderTable('memorandos');
    renderTable('parcerias');
    renderTable('avaliacoes');
}

// Render Table
function renderTable(modulo) {
    const tbody = document.getElementById(`${modulo}-tbody`);
    const searchInput = document.getElementById(`search-${modulo}`);
    const termo = searchInput ? searchInput.value : '';

    // Get filtered data
    let dados = filtrarDados(modulo, termo);

    // Apply additional filters
    if (modulo === 'avaliacoes') {
        const resultadoFilter = document.getElementById('filter-avaliacao-resultado');
        if (resultadoFilter && resultadoFilter.value) {
            dados = dados.filter(a => a.resultado === resultadoFilter.value);
        }
    }
    if (modulo === 'fornecedores') {
        const statusFilter = document.getElementById('filter-fornecedor-status').value;
        const areaFilter = document.getElementById('filter-fornecedor-area').value;
        if (statusFilter) dados = dados.filter(f => f.corrente === statusFilter);
        if (areaFilter) dados = dados.filter(f => f.area === areaFilter);
    }

    tbody.innerHTML = '';

    if (dados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>Nenhum registro encontrado</h3>
                    <p>Adicione um novo registro para começar</p>
                </td>
            </tr>
        `;
        return;
    }

    dados.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = renderTableRow(modulo, item);
        tbody.appendChild(row);
    });
}

// Render Table Row based on module
function renderTableRow(modulo, item) {
    switch(modulo) {
        case 'fornecedores':
            const avaliacaoStarsFornecedor = item.avaliacao ? '⭐'.repeat(parseInt(item.avaliacao)) : '-';
            return `
                <td><strong>${item.codigo}</strong></td>
                <td>${item.nome}</td>
                <td><span class="status-badge ${item.corrente === 'corrente' ? 'status-corrente' : 'status-nao-corrente'}">
                    ${item.corrente === 'corrente' ? 'Corrente' : 'Não Corrente'}
                </span></td>
                <td>${item.area}</td>
                <td>${item.produto}</td>
                <td>${item.valor ? new Intl.NumberFormat('pt-AO', {style: 'currency', currency: item.moeda || 'AOA'}).format(item.valor) : '-'}</td>
                <td>${avaliacaoStarsFornecedor}</td>
                <td>${item.responsavel}</td>
                <td class="action-buttons">
                    <button class="btn-icon" style="color: #10b981;" onclick="gerarFaturaFornecedor('${item.codigo}')" title="Gerar Fatura">
                        <i class="fas fa-file-invoice"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editarItem('fornecedores', '${item.codigo}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmarDelete('fornecedores', '${item.codigo}', '${item.nome}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        case 'prestadores':
            return `
                <td><strong>${item.codigo}</strong></td>
                <td>${item.nome}</td>
                <td>${item.tipo_servico}</td>
                <td>${item.area}</td>
                <td>${item.periodicidade}</td>
                <td><span class="info-badge">${item.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon edit" onclick="editarItem('prestadores', '${item.codigo}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmarDelete('prestadores', '${item.codigo}', '${item.nome}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        case 'contratos':
            const importanciaBadge = item.importancia ?
                `<span class="importancia-badge ${item.importancia.toLowerCase()}">${item.importancia}</span>` : '-';

            const avaliacaoStars = item.avaliacao ?
                '⭐'.repeat(parseInt(item.avaliacao)) : '-';

            return `
                <td><strong>${item.codigo}</strong></td>
                <td>${item.tipo}</td>
                <td>${item.entidade}</td>
                <td>${item.objeto}</td>
                <td>${item.data_contrato || item.data_inicio || '-'}</td>
                <td>${importanciaBadge}</td>
                <td>${avaliacaoStars}</td>
                <td><span class="info-badge">${item.status || 'Pendente'}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon" style="color: #10b981;" onclick="gerarFactura('${item.codigo}')" title="Gerar Fatura">
                        <i class="fas fa-file-invoice"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editarItem('contratos', '${item.codigo}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmarDelete('contratos', '${item.codigo}', '${item.entidade}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        case 'memorandos':
            return `
                <td><strong>${item.numero}</strong></td>
                <td>${item.empresa}</td>
                <td>${item.data || '-'}</td>
                <td>${item.area_origem}</td>
                <td>${item.destinatario}</td>
                <td><span class="info-badge">${item.tipo || '-'}</span></td>
                <td title="${item.objeto}">${item.objeto ? (item.objeto.length > 40 ? item.objeto.substring(0, 40) + '...' : item.objeto) : '-'}</td>
                <td>${item.duracao || '-'}</td>
                <td title="${item.descricao || ''}">${item.descricao ? (item.descricao.length > 30 ? item.descricao.substring(0, 30) + '...' : item.descricao) : '-'}</td>
                <td>${item.documento || '-'}</td>
                <td>${item.responsavel}</td>
                <td class="action-buttons">
                    <button class="btn-icon edit" onclick="editarItem('memorandos', '${item.numero}', 'numero')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmarDelete('memorandos', '${item.numero}', '${item.empresa}', 'numero')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        case 'parcerias':
            return `
                <td><strong>${item.entidade}</strong></td>
                <td>${item.tipo}</td>
                <td>${item.area_atuacao}</td>
                <td>${item.tipo_parceria}</td>
                <td>${item.periodicidade}</td>
                <td><span class="info-badge">${item.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon edit" onclick="editarItem('parcerias', '${item.entidade}', 'entidade')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmarDelete('parcerias', '${item.entidade}', '${item.entidade}', 'entidade')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        case 'avaliacoes':
            const notaGlobal = item.nota_global ? parseFloat(item.nota_global) : 0;
            const notaColor = notaGlobal >= 4 ? '#10b981' : notaGlobal >= 3 ? '#f59e0b' : '#ef4444';
            const resultadoClass = item.resultado === 'Aprovado' ? 'status-corrente' :
                                   item.resultado === 'Reprovado' ? 'status-nao-corrente' : 'info-badge';
            const renderNota = (val) => val ? '⭐'.repeat(parseInt(val)) : '-';
            return `
                <td><strong>${item.codigo}</strong></td>
                <td>${item.nome_fornecedor || item.codigo_fornecedor || '-'}</td>
                <td>${item.data_avaliacao || '-'}</td>
                <td>${renderNota(item.qualidade)}</td>
                <td>${renderNota(item.prazo_entrega)}</td>
                <td>${renderNota(item.custo_beneficio)}</td>
                <td>${renderNota(item.atendimento)}</td>
                <td>${renderNota(item.conformidade)}</td>
                <td><strong style="color: ${notaColor}; font-size: 1.1em;">${item.nota_global || '-'}</strong></td>
                <td><span class="status-badge ${resultadoClass}">${item.resultado || '-'}</span></td>
                <td>${item.avaliador || '-'}</td>
                <td class="action-buttons">
                    <button class="btn-icon edit" onclick="editarItem('avaliacoes', '${item.codigo}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmarDelete('avaliacoes', '${item.codigo}', '${item.nome_fornecedor || item.codigo}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
    }
}

// Modal Management
function openModal(tipo) {
    currentModule = tipo;
    editingId = null;

    const modal = document.getElementById('universal-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const titles = {
        'fornecedor': 'Novo Fornecedor',
        'prestador': 'Novo Prestador',
        'contrato': 'Novo Contrato',
        'memorando': 'Novo Memorando',
        'parceria': 'Nova Parceria',
        'avaliacao': 'Nova Avaliação de Fornecedor'
    };

    modalTitle.textContent = titles[tipo] || 'Novo';
    modalBody.innerHTML = renderForm(tipo);

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('universal-modal').classList.remove('active');
    currentModule = '';
    editingId = null;
}

// Edit Item
function editarItem(modulo, id, campo = 'codigo') {
    const item = obterPorId(modulo, id, campo);
    if (!item) return;

    editingId = id;
    currentModule = modulo;

    const modal = document.getElementById('universal-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const tipo = toSingular(modulo);
    const titles = {
        'fornecedor': 'Editar Fornecedor',
        'prestador': 'Editar Prestador',
        'contrato': 'Editar Contrato',
        'memorando': 'Editar Memorando',
        'parceria': 'Editar Parceria',
        'avaliacao': 'Editar Avaliação de Fornecedor'
    };

    modalTitle.textContent = titles[tipo] || 'Editar';
    modalBody.innerHTML = renderForm(tipo, item);

    modal.classList.add('active');
}

// Delete Item
function confirmarDelete(modulo, id, nome, campo = 'codigo') {
    if (confirm(`Tem certeza que deseja excluir "${nome}"?`)) {
        if (deletarItem(modulo, id, campo)) {
            mostrarNotificacao('Registro excluído com sucesso!', 'success');
            renderTable(modulo);
            atualizarDashboard();
        }
    }
}

// Notifications
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 48px;
        right: 12px;
        background: ${tipo === 'success' ? '#10b981' : tipo === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 6px 14px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        animation: slideIn 0.2s ease;
        max-width: 300px;
    `;
    notification.textContent = mensagem;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Avaliações Summary
function atualizarResumoAvaliacoes() {
    const avaliacoes = obterDados('avaliacoes');

    // Total
    const totalEl = document.getElementById('total-avaliacoes');
    if (totalEl) totalEl.textContent = avaliacoes.length;

    // Média global
    const mediaEl = document.getElementById('media-global-avaliacoes');
    if (mediaEl) {
        if (avaliacoes.length > 0) {
            const somaNotas = avaliacoes.reduce((acc, a) => acc + (parseFloat(a.nota_global) || 0), 0);
            mediaEl.textContent = (somaNotas / avaliacoes.length).toFixed(1);
        } else {
            mediaEl.textContent = '0.0';
        }
    }

    // Aprovados
    const aprovadosEl = document.getElementById('total-aprovados');
    if (aprovadosEl) {
        aprovadosEl.textContent = avaliacoes.filter(a => a.resultado === 'Aprovado').length;
    }

    // Reprovados
    const reprovadosEl = document.getElementById('total-reprovados');
    if (reprovadosEl) {
        reprovadosEl.textContent = avaliacoes.filter(a => a.resultado === 'Reprovado').length;
    }
}

// Exportar Avaliações para Excel
function exportarAvaliacoes() {
    const avaliacoes = obterDados('avaliacoes');
    if (avaliacoes.length === 0) {
        mostrarNotificacao('Nenhuma avaliação para exportar!', 'error');
        return;
    }

    const dados = avaliacoes.map(a => ({
        'Código': a.codigo,
        'Cód. Fornecedor': a.codigo_fornecedor,
        'Nome Fornecedor': a.nome_fornecedor,
        'Data Avaliação': a.data_avaliacao,
        'Período': a.periodo,
        'Qualidade': a.qualidade,
        'Prazo Entrega': a.prazo_entrega,
        'Custo-Benefício': a.custo_beneficio,
        'Atendimento': a.atendimento,
        'Conformidade': a.conformidade,
        'Nota Global': a.nota_global,
        'Resultado': a.resultado,
        'Avaliador': a.avaliador,
        'Pontos Fortes': a.pontos_fortes,
        'Pontos a Melhorar': a.pontos_melhorar,
        'Observações': a.observacoes
    }));

    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Avaliações');
    XLSX.writeFile(wb, 'avaliacoes_fornecedores.xlsx');
    mostrarNotificacao('Avaliações exportadas com sucesso!', 'success');
}

// Close modal on click outside
window.onclick = function(event) {
    const modal = document.getElementById('universal-modal');
    if (event.target === modal) {
        closeModal();
    }
}
