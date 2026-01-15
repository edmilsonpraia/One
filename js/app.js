// ===== Main Application Module =====

// Global variables
let currentTab = 'dashboard';
let currentPage = 1;
let itemsPerPage = 10;
let filteredData = [];
let sortColumn = '';
let sortDirection = 'asc';
let editingCodigo = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load data
    loadData();

    // Initialize dashboard
    updateDashboard();

    // Initialize table
    populateFilters();
    displayTable();

    // Setup search
    document.getElementById('search-input').addEventListener('input', handleSearch);

    // Setup form
    document.getElementById('fornecedor-form').addEventListener('submit', handleFormSubmit);
}

// Tab Management
function showTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.tab-btn').classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');

    // Refresh content if needed
    if (tabName === 'dashboard') {
        updateDashboard();
    } else if (tabName === 'fornecedores') {
        displayTable();
    }
}

// Dashboard Functions
function updateDashboard() {
    const stats = getStatistics();

    // Update stat cards
    document.getElementById('total-fornecedores').textContent = stats.total;
    document.getElementById('total-correntes').textContent = stats.correntes;
    document.getElementById('total-nao-correntes').textContent = stats.naoCorrentes;
    document.getElementById('total-areas').textContent = stats.totalAreas;

    // Update charts
    updateCharts(stats);
}

// Populate filter dropdowns
function populateFilters() {
    const areas = getUniqueAreas();
    const areaSelect = document.getElementById('filter-area');

    areaSelect.innerHTML = '<option value="">Todas as Áreas</option>';
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
    });
}

// Search Function
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    applyFilters(searchTerm);
}

// Apply Filters
function applyFilters(searchTerm = null) {
    if (searchTerm === null) {
        searchTerm = document.getElementById('search-input').value.toLowerCase();
    }

    const correnteFilter = document.getElementById('filter-corrente').value;
    const areaFilter = document.getElementById('filter-area').value;
    const frequenciaFilter = document.getElementById('filter-frequencia').value;

    filteredData = getAllFornecedores().filter(fornecedor => {
        // Search filter
        const matchSearch = searchTerm === '' ||
            fornecedor.codigo.toLowerCase().includes(searchTerm) ||
            fornecedor.nome.toLowerCase().includes(searchTerm) ||
            fornecedor.produto.toLowerCase().includes(searchTerm) ||
            fornecedor.area.toLowerCase().includes(searchTerm) ||
            fornecedor.responsavel.toLowerCase().includes(searchTerm);

        // Status filter
        const matchCorrente = correnteFilter === '' || fornecedor.corrente === correnteFilter;

        // Area filter
        const matchArea = areaFilter === '' || fornecedor.area === areaFilter;

        // Frequency filter
        const matchFrequencia = frequenciaFilter === '' || fornecedor.frequencia === frequenciaFilter;

        return matchSearch && matchCorrente && matchArea && matchFrequencia;
    });

    currentPage = 1;
    displayTable();
}

// Clear Filters
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-corrente').value = '';
    document.getElementById('filter-area').value = '';
    document.getElementById('filter-frequencia').value = '';
    applyFilters();
}

// Sort Table
function sortTable(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }

    displayTable();
}

// Display Table
function displayTable() {
    const data = filteredData.length > 0 ? filteredData : getAllFornecedores();

    // Apply sorting
    let sortedData = [...data];
    if (sortColumn) {
        sortedData.sort((a, b) => {
            let aVal = a[sortColumn] || '';
            let bVal = b[sortColumn] || '';

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    }

    // Calculate pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = sortedData.slice(startIndex, endIndex);

    // Display table rows
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">Nenhum fornecedor encontrado</td></tr>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    pageData.forEach(fornecedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${fornecedor.codigo}</strong></td>
            <td>${fornecedor.nome}</td>
            <td>
                <span class="status-badge ${fornecedor.corrente === 'corrente' ? 'status-corrente' : 'status-nao-corrente'}">
                    ${fornecedor.corrente === 'corrente' ? 'Corrente' : 'Não Corrente'}
                </span>
            </td>
            <td>${fornecedor.area}</td>
            <td>${fornecedor.produto}</td>
            <td>${capitalizeFirst(fornecedor.frequencia)}</td>
            <td>${fornecedor.responsavel}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit" onclick="openEditModal('${fornecedor.codigo}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="confirmDelete('${fornecedor.codigo}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Display pagination
    displayPagination(totalPages);
}

// Display Pagination
function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = i === currentPage ? 'active' : '';
            pageBtn.onclick = () => changePage(i);
            pagination.appendChild(pageBtn);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.padding = '0 0.5rem';
            pagination.appendChild(dots);
        }
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Próximo';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextBtn);
}

// Change Page
function changePage(page) {
    currentPage = page;
    displayTable();
}

// Modal Functions
function openAddModal() {
    editingCodigo = null;
    document.getElementById('modal-title').textContent = 'Novo Fornecedor';
    document.getElementById('fornecedor-form').reset();
    document.getElementById('codigo').removeAttribute('readonly');
    document.getElementById('fornecedor-modal').classList.add('active');
}

function openEditModal(codigo) {
    editingCodigo = codigo;
    const fornecedor = getFornecedorByCodigo(codigo);

    if (!fornecedor) return;

    document.getElementById('modal-title').textContent = 'Editar Fornecedor';

    // Fill form
    document.getElementById('codigo').value = fornecedor.codigo;
    document.getElementById('codigo').setAttribute('readonly', 'readonly');
    document.getElementById('tipo').value = fornecedor.tipo;
    document.getElementById('nome').value = fornecedor.nome;
    document.getElementById('corrente').value = fornecedor.corrente;
    document.getElementById('area').value = fornecedor.area;
    document.getElementById('produto').value = fornecedor.produto;
    document.getElementById('frequencia').value = fornecedor.frequencia;
    document.getElementById('valor').value = fornecedor.valor || '';
    document.getElementById('moeda').value = fornecedor.moeda;
    document.getElementById('pagamento').value = fornecedor.pagamento;
    document.getElementById('responsavel').value = fornecedor.responsavel;
    document.getElementById('data_inicio').value = fornecedor.data_inicio || '';
    document.getElementById('status').value = fornecedor.status || '';
    document.getElementById('observacoes').value = fornecedor.observacoes || '';

    document.getElementById('fornecedor-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('fornecedor-modal').classList.remove('active');
    editingCodigo = null;
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();

    const fornecedor = {
        codigo: document.getElementById('codigo').value,
        tipo: document.getElementById('tipo').value,
        nome: document.getElementById('nome').value,
        corrente: document.getElementById('corrente').value,
        area: document.getElementById('area').value,
        produto: document.getElementById('produto').value,
        frequencia: document.getElementById('frequencia').value,
        valor: document.getElementById('valor').value || null,
        moeda: document.getElementById('moeda').value,
        pagamento: document.getElementById('pagamento').value,
        responsavel: document.getElementById('responsavel').value,
        data_inicio: document.getElementById('data_inicio').value || null,
        status: document.getElementById('status').value || '',
        observacoes: document.getElementById('observacoes').value || ''
    };

    if (editingCodigo) {
        // Update existing
        updateFornecedor(editingCodigo, fornecedor);
        showNotification('Fornecedor atualizado com sucesso!', 'success');
    } else {
        // Check if codigo already exists
        if (getFornecedorByCodigo(fornecedor.codigo)) {
            showNotification('Código já existe! Use um código diferente.', 'error');
            return;
        }
        // Add new
        addFornecedor(fornecedor);
        showNotification('Fornecedor adicionado com sucesso!', 'success');
    }

    closeModal();
    populateFilters();
    displayTable();
    updateDashboard();
}

// Delete Fornecedor
function confirmDelete(codigo) {
    const fornecedor = getFornecedorByCodigo(codigo);
    if (!fornecedor) return;

    if (confirm(`Tem certeza que deseja excluir o fornecedor "${fornecedor.nome}"?`)) {
        deleteFornecedor(codigo);
        showNotification('Fornecedor excluído com sucesso!', 'success');
        displayTable();
        updateDashboard();
        populateFilters();
    }
}

// Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility function
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('fornecedor-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
