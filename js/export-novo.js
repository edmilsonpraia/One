// ===== Export Module =====

function exportAllToExcel() {
    const wb = XLSX.utils.book_new();

    // Export each module
    exportModuleSheet(wb, 'fornecedores', 'Fornecedores');
    exportModuleSheet(wb, 'prestadores', 'Prestadores');
    exportModuleSheet(wb, 'contratos', 'Contratos');
    exportModuleSheet(wb, 'memorandos', 'Memorandos');
    exportModuleSheet(wb, 'parcerias', 'Parcerias');

    // Generate filename
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const filename = `Sistema_Gestao_Comercial_${dateStr}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    mostrarNotificacao('Dados exportados com sucesso!', 'success');
}

function exportModuleSheet(workbook, modulo, sheetName) {
    const dados = obterDados(modulo);

    if (dados.length === 0) return;

    let exportData;

    switch(modulo) {
        case 'fornecedores':
            exportData = dados.map(f => ({
                'Código': f.codigo,
                'Tipo': f.tipo,
                'Nome': f.nome,
                'NIF': f.nif || '',
                'Telefone': f.telefone || '',
                'Email': f.email || '',
                'Status': f.corrente,
                'Departamento/Área': f.area,
                'Produto/Serviço': f.produto,
                'Frequência': f.frequencia,
                'Valor': f.valor || '',
                'Moeda': f.moeda,
                'Condições Pagamento': f.condicoes_pagamento || '',
                'Forma de Pagamento': f.pagamento,
                'Banco': f.banco || '',
                'NIB/IBAN': f.nib || '',
                'Total Pago': f.total_pago || '0',
                'Total em Dívida': f.total_divida || '0',
                'Data Início': f.data_inicio || '',
                'Data Última Fatura': f.data_ultima_fatura || '',
                'Próximo Pagamento': f.proximo_pagamento || '',
                'Responsável': f.responsavel,
                'Status': f.status || '',
                'Avaliação': f.avaliacao || '',
                'Observações': f.observacoes || ''
            }));
            break;

        case 'prestadores':
            exportData = dados.map(p => ({
                'Código': p.codigo,
                'Nome/Empresa': p.nome,
                'Tipo de Serviço': p.tipo_servico,
                'Área': p.area,
                'Contrato': p.contrato || '',
                'Valor': p.valor || '',
                'Moeda': p.moeda,
                'Periodicidade': p.periodicidade,
                'Data Início': p.data_inicio || '',
                'Data Término': p.data_termino || '',
                'Responsável': p.responsavel,
                'Status': p.status,
                'Observações': p.observacoes || ''
            }));
            break;

        case 'contratos':
            exportData = dados.map(c => ({
                'Código': c.codigo,
                'Tipo': c.tipo,
                'Entidade': c.entidade,
                'Objeto': c.objeto,
                'Data Assinatura': c.data_assinatura || '',
                'Data Início': c.data_inicio || '',
                'Data Fim': c.data_fim || '',
                'Valor': c.valor || '',
                'Moeda': c.moeda,
                'Condições Pagamento': c.condicoes_pagamento || '',
                'Responsável': c.responsavel,
                'Status': c.status || '',
                'Observações': c.observacoes || ''
            }));
            break;

        case 'memorandos':
            exportData = dados.map(m => ({
                'Nº': m.numero,
                'Empresa': m.empresa,
                'Data': m.data || '',
                'Área Origem': m.area_origem,
                'Destinatário': m.destinatario,
                'Tipo': m.tipo,
                'Objeto': m.objeto,
                'Duração': m.duracao || '',
                'Descrição': m.descricao || '',
                'Documento': m.documento || '',
                'Responsável': m.responsavel,
                'Observações': m.observacoes || ''
            }));
            break;

        case 'parcerias':
            exportData = dados.map(p => ({
                'Entidade': p.entidade,
                'Tipo': p.tipo,
                'Área Atuação': p.area_atuacao,
                'Tipo Parceria': p.tipo_parceria,
                'Benefícios': p.beneficios,
                'Valor/Quota': p.valor || '',
                'Moeda': p.moeda,
                'Periodicidade': p.periodicidade,
                'Data Início': p.data_inicio || '',
                'Renovação': p.renovacao || '',
                'Jóia': p.joia || '',
                'Responsável': p.responsavel,
                'Status': p.status,
                'Observações': p.observacoes || ''
            }));
            break;
    }

    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = exportData.length > 0
        ? Object.keys(exportData[0]).map(() => ({ wch: 20 }))
        : [];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(workbook, ws, sheetName);
}

// Export single module
function exportModuleToExcel(modulo) {
    const wb = XLSX.utils.book_new();
    const sheetNames = {
        'fornecedores': 'Fornecedores',
        'prestadores': 'Prestadores',
        'contratos': 'Contratos',
        'memorandos': 'Memorandos',
        'parcerias': 'Parcerias'
    };

    exportModuleSheet(wb, modulo, sheetNames[modulo]);

    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const filename = `${sheetNames[modulo]}_${dateStr}.xlsx`;

    XLSX.writeFile(wb, filename);

    mostrarNotificacao(`${sheetNames[modulo]} exportados com sucesso!`, 'success');
}

// Specific export functions for each module
function exportarMemorandos() {
    exportModuleToExcel('memorandos');
}

function exportarFornecedores() {
    exportModuleToExcel('fornecedores');
}

function exportarPrestadores() {
    exportModuleToExcel('prestadores');
}

function exportarContratos() {
    exportModuleToExcel('contratos');
}

function exportarParcerias() {
    exportModuleToExcel('parcerias');
}
