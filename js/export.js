// ===== Export Module =====

// Export to Excel
function exportToExcel() {
    const data = getAllFornecedores();

    if (data.length === 0) {
        showNotification('Não há dados para exportar!', 'error');
        return;
    }

    // Prepare data for export
    const exportData = data.map(f => ({
        'Código do Fornecedor': f.codigo,
        'Tipo': f.tipo,
        'Nome do Fornecedor': f.nome,
        'Corrente/Não Corrente': f.corrente,
        'Área que Atende': f.area,
        'Produto ou Serviço': f.produto,
        'Frequência': f.frequencia,
        'Valor est/ fixo': f.valor || '',
        'Moeda': f.moeda,
        'Forma de Pagamento': f.pagamento,
        'Responsável Interno': f.responsavel,
        'Data de Início': f.data_inicio || '',
        'Status': f.status || '',
        'Observações': f.observacoes || ''
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
        { wch: 20 },  // Código
        { wch: 12 },  // Tipo
        { wch: 35 },  // Nome
        { wch: 18 },  // Corrente
        { wch: 18 },  // Área
        { wch: 30 },  // Produto
        { wch: 12 },  // Frequência
        { wch: 15 },  // Valor
        { wch: 8 },   // Moeda
        { wch: 18 },  // Pagamento
        { wch: 20 },  // Responsável
        { wch: 15 },  // Data
        { wch: 12 },  // Status
        { wch: 30 }   // Observações
    ];
    ws['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Fornecedores');

    // Generate filename with current date
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const filename = `Fornecedores_${dateStr}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    showNotification('Arquivo Excel exportado com sucesso!', 'success');
}

// Import from Excel (optional feature)
function importFromExcel() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';

    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Get first sheet
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            // Process imported data
            let importCount = 0;
            jsonData.forEach(row => {
                const fornecedor = {
                    codigo: row['Código do Fornecedor'] || '',
                    tipo: row['Tipo'] || 'Original',
                    nome: row['Nome do Fornecedor'] || '',
                    corrente: row['Corrente/Não Corrente'] || 'não corrente',
                    area: row['Área que Atende'] || '',
                    produto: row['Produto ou Serviço'] || '',
                    frequencia: row['Frequência'] || 'mensal',
                    valor: row['Valor est/ fixo'] || null,
                    moeda: row['Moeda'] || 'AOA',
                    pagamento: row['Forma de Pagamento'] || 'Transferencia',
                    responsavel: row['Responsável Interno'] || '',
                    data_inicio: row['Data de Início'] || null,
                    status: row['Status'] || '',
                    observacoes: row['Observações'] || ''
                };

                // Check if fornecedor already exists
                if (!getFornecedorByCodigo(fornecedor.codigo)) {
                    addFornecedor(fornecedor);
                    importCount++;
                }
            });

            if (importCount > 0) {
                showNotification(`${importCount} fornecedor(es) importado(s) com sucesso!`, 'success');
                displayTable();
                updateDashboard();
                populateFilters();
            } else {
                showNotification('Nenhum fornecedor novo foi importado.', 'info');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    input.click();
}

// Export filtered data
function exportFilteredData() {
    const data = filteredData.length > 0 ? filteredData : getAllFornecedores();

    if (data.length === 0) {
        showNotification('Não há dados filtrados para exportar!', 'error');
        return;
    }

    // Prepare data for export
    const exportData = data.map(f => ({
        'Código do Fornecedor': f.codigo,
        'Tipo': f.tipo,
        'Nome do Fornecedor': f.nome,
        'Corrente/Não Corrente': f.corrente,
        'Área que Atende': f.area,
        'Produto ou Serviço': f.produto,
        'Frequência': f.frequencia,
        'Valor est/ fixo': f.valor || '',
        'Moeda': f.moeda,
        'Forma de Pagamento': f.pagamento,
        'Responsável Interno': f.responsavel,
        'Data de Início': f.data_inicio || '',
        'Status': f.status || '',
        'Observações': f.observacoes || ''
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
        { wch: 20 }, { wch: 12 }, { wch: 35 }, { wch: 18 }, { wch: 18 },
        { wch: 30 }, { wch: 12 }, { wch: 15 }, { wch: 8 }, { wch: 18 },
        { wch: 20 }, { wch: 15 }, { wch: 12 }, { wch: 30 }
    ];
    ws['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Fornecedores Filtrados');

    // Generate filename
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const filename = `Fornecedores_Filtrados_${dateStr}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    showNotification('Dados filtrados exportados com sucesso!', 'success');
}

// Export statistics report
function exportStatisticsReport() {
    const stats = getStatistics();

    // Prepare statistics data
    const statsData = [
        { 'Estatística': 'Total de Fornecedores', 'Valor': stats.total },
        { 'Estatística': 'Fornecedores Correntes', 'Valor': stats.correntes },
        { 'Estatística': 'Fornecedores Não Correntes', 'Valor': stats.naoCorrentes },
        { 'Estatística': 'Total de Áreas Atendidas', 'Valor': stats.totalAreas }
    ];

    // Prepare by area data
    const byAreaData = Object.entries(stats.byArea).map(([area, count]) => ({
        'Área': area,
        'Número de Fornecedores': count
    }));

    // Prepare by frequency data
    const byFreqData = Object.entries(stats.byFrequency).map(([freq, count]) => ({
        'Frequência': freq,
        'Número de Fornecedores': count
    }));

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add statistics sheet
    const ws1 = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Estatísticas Gerais');

    // Add by area sheet
    const ws2 = XLSX.utils.json_to_sheet(byAreaData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Por Área');

    // Add by frequency sheet
    const ws3 = XLSX.utils.json_to_sheet(byFreqData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Por Frequência');

    // Generate filename
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const filename = `Relatorio_Estatisticas_${dateStr}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    showNotification('Relatório de estatísticas exportado com sucesso!', 'success');
}
