// ===== Financial Analysis Module =====

// Calculate financial data for the Contabilidade tab
function atualizarContabilidade() {
    const fornecedores = obterTodos('fornecedores');
    const prestadores = obterTodos('prestadores');
    const contratos = obterTodos('contratos');

    // Calculate totals
    const totals = calcularTotaisFinanceiros(fornecedores, prestadores, contratos);

    // Update summary cards
    atualizarCardsFinanceiros(totals);

    // Update departmental analysis table
    atualizarTabelaDepartamentos(fornecedores, prestadores, contratos);

    // Update top suppliers table
    atualizarTopFornecedores(fornecedores);

    // Update charts
    atualizarGraficosContabilidade(fornecedores, prestadores, contratos);
}

function calcularTotaisFinanceiros(fornecedores, prestadores, contratos) {
    let totalDespesas = 0;
    let totalPago = 0;
    let totalDivida = 0;
    let totalReceitas = 0;

    // Sum fornecedores
    fornecedores.forEach(f => {
        const valor = parseFloat(f.valor) || 0;
        const pago = parseFloat(f.total_pago) || 0;
        const divida = parseFloat(f.total_divida) || 0;

        // Convert to AOA if needed (simplified - assuming 1:1 for now)
        totalDespesas += valor;
        totalPago += pago;
        totalDivida += divida;
    });

    // Sum prestadores
    prestadores.forEach(p => {
        const valor = parseFloat(p.valor) || 0;
        totalDespesas += valor;
    });

    // Sum contratos (as receitas)
    contratos.forEach(c => {
        const valor = parseFloat(c.valor) || 0;
        totalReceitas += valor;
    });

    const saldoLiquido = totalReceitas - totalDespesas;

    return {
        totalDespesas,
        totalPago,
        totalDivida,
        totalReceitas,
        saldoLiquido
    };
}

function atualizarCardsFinanceiros(totals) {
    document.getElementById('total-receitas').textContent = formatarMoeda(totals.totalReceitas);
    document.getElementById('total-despesas').textContent = formatarMoeda(totals.totalDespesas);
    document.getElementById('total-dividas').textContent = formatarMoeda(totals.totalDivida);

    const saldoElement = document.getElementById('saldo-liquido');
    saldoElement.textContent = formatarMoeda(totals.saldoLiquido);

    // Color code based on positive/negative
    if (totals.saldoLiquido >= 0) {
        saldoElement.style.color = '#10b981';
    } else {
        saldoElement.style.color = '#ef4444';
    }
}

function atualizarTabelaDepartamentos(fornecedores, prestadores, contratos) {
    const departamentos = {};

    // Group fornecedores by departamento
    fornecedores.forEach(f => {
        const dept = f.area || 'Não Especificado';
        if (!departamentos[dept]) {
            departamentos[dept] = {
                fornecedores: 0,
                prestadores: 0,
                contratos: 0,
                totalDespesas: 0,
                totalPago: 0,
                totalDivida: 0
            };
        }
        departamentos[dept].fornecedores++;
        departamentos[dept].totalDespesas += parseFloat(f.valor) || 0;
        departamentos[dept].totalPago += parseFloat(f.total_pago) || 0;
        departamentos[dept].totalDivida += parseFloat(f.total_divida) || 0;
    });

    // Group prestadores by area
    prestadores.forEach(p => {
        const dept = p.area || 'Não Especificado';
        if (!departamentos[dept]) {
            departamentos[dept] = {
                fornecedores: 0,
                prestadores: 0,
                contratos: 0,
                totalDespesas: 0,
                totalPago: 0,
                totalDivida: 0
            };
        }
        departamentos[dept].prestadores++;
        departamentos[dept].totalDespesas += parseFloat(p.valor) || 0;
    });

    // Group contratos by entidade (simplified - could be improved)
    contratos.forEach(c => {
        // Try to match with departamento
        const dept = 'Contratos'; // Simplified
        if (!departamentos[dept]) {
            departamentos[dept] = {
                fornecedores: 0,
                prestadores: 0,
                contratos: 0,
                totalDespesas: 0,
                totalPago: 0,
                totalDivida: 0
            };
        }
        departamentos[dept].contratos++;
        departamentos[dept].totalDespesas += parseFloat(c.valor) || 0;
    });

    // Calculate totals
    let totalFornecedores = 0;
    let totalPrestadores = 0;
    let totalContratos = 0;
    let totalDespesasGeral = 0;
    let totalPagoGeral = 0;
    let totalDividaGeral = 0;

    Object.values(departamentos).forEach(d => {
        totalFornecedores += d.fornecedores;
        totalPrestadores += d.prestadores;
        totalContratos += d.contratos;
        totalDespesasGeral += d.totalDespesas;
        totalPagoGeral += d.totalPago;
        totalDividaGeral += d.totalDivida;
    });

    // Render table
    const tbody = document.getElementById('departamentos-financeiro-tbody');
    tbody.innerHTML = '';

    // Sort by totalDespesas descending
    const sortedDepts = Object.entries(departamentos).sort((a, b) => b[1].totalDespesas - a[1].totalDespesas);

    sortedDepts.forEach(([dept, data]) => {
        const percentual = totalDespesasGeral > 0 ? (data.totalDespesas / totalDespesasGeral * 100).toFixed(1) : 0;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${dept}</strong></td>
            <td>${data.fornecedores}</td>
            <td>${data.prestadores}</td>
            <td>${data.contratos}</td>
            <td>${formatarMoeda(data.totalDespesas)}</td>
            <td>${formatarMoeda(data.totalPago)}</td>
            <td style="color: ${data.totalDivida > 0 ? '#ef4444' : '#10b981'}">
                ${formatarMoeda(data.totalDivida)}
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span>${percentual}%</span>
                    <div style="flex: 1; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #E07B39; height: 100%; width: ${percentual}%;"></div>
                    </div>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update footer totals
    document.getElementById('total-fornecedores-geral').textContent = totalFornecedores;
    document.getElementById('total-prestadores-geral').textContent = totalPrestadores;
    document.getElementById('total-contratos-geral').textContent = totalContratos;
    document.getElementById('total-despesas-geral').textContent = formatarMoeda(totalDespesasGeral);
    document.getElementById('total-pago-geral').textContent = formatarMoeda(totalPagoGeral);
    document.getElementById('total-divida-geral').textContent = formatarMoeda(totalDividaGeral);
}

function atualizarTopFornecedores(fornecedores) {
    // Sort by valor descending
    const sorted = [...fornecedores]
        .filter(f => parseFloat(f.valor) > 0)
        .sort((a, b) => (parseFloat(b.valor) || 0) - (parseFloat(a.valor) || 0))
        .slice(0, 10);

    const tbody = document.getElementById('top-fornecedores-tbody');
    tbody.innerHTML = '';

    sorted.forEach((f, index) => {
        const avaliacaoStars = f.avaliacao ? '⭐'.repeat(parseInt(f.avaliacao)) : '-';
        const medalIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${medalIcon} ${index + 1}</strong></td>
            <td>${f.codigo}</td>
            <td>${f.nome}</td>
            <td>${f.area || '-'}</td>
            <td>${f.produto || '-'}</td>
            <td><strong>${formatarMoeda(parseFloat(f.valor))}</strong></td>
            <td>${(f.frequencia || '-').toUpperCase()}</td>
            <td>${avaliacaoStars}</td>
        `;
        tbody.appendChild(row);
    });
}

function atualizarGraficosContabilidade(fornecedores, prestadores, contratos) {
    // Chart 1: Despesas por Departamento
    const departamentos = {};

    fornecedores.forEach(f => {
        const dept = f.area || 'Não Especificado';
        departamentos[dept] = (departamentos[dept] || 0) + (parseFloat(f.valor) || 0);
    });

    prestadores.forEach(p => {
        const dept = p.area || 'Não Especificado';
        departamentos[dept] = (departamentos[dept] || 0) + (parseFloat(p.valor) || 0);
    });

    const sortedDepts = Object.entries(departamentos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8); // Top 8 departamentos

    const ctx1 = document.getElementById('despesas-departamento-chart');
    if (window.despesasDeptChart) {
        window.despesasDeptChart.destroy();
    }

    window.despesasDeptChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: sortedDepts.map(d => d[0]),
            datasets: [{
                label: 'Despesas (AOA)',
                data: sortedDepts.map(d => d[1]),
                backgroundColor: [
                    'rgba(160, 104, 42, 0.8)',
                    'rgba(224, 123, 57, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(100, 116, 139, 0.8)'
                ],
                borderColor: [
                    'rgba(160, 104, 42, 1)',
                    'rgba(224, 123, 57, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(100, 116, 139, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Kz ' + value.toLocaleString('pt-AO');
                        }
                    }
                }
            }
        }
    });

    // Chart 2: Receitas vs Despesas (Simplified Monthly View)
    const ctx2 = document.getElementById('receitas-despesas-chart');
    if (window.receitasDespesasChart) {
        window.receitasDespesasChart.destroy();
    }

    // Calculate monthly estimates based on frequency
    const calcularMensal = (items) => {
        let total = 0;
        items.forEach(item => {
            const valor = parseFloat(item.valor) || 0;
            const freq = item.frequencia || 'mensal';

            if (freq === 'mensal') total += valor;
            else if (freq === 'trimestral') total += valor / 3;
            else if (freq === 'semestral') total += valor / 6;
            else if (freq === 'anual') total += valor / 12;
        });
        return total;
    };

    const despesasMensal = calcularMensal(fornecedores) + calcularMensal(prestadores);
    const receitasMensal = calcularMensal(contratos);

    window.receitasDespesasChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Receitas Estimadas',
                    data: Array(12).fill(receitasMensal),
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Despesas Estimadas',
                    data: Array(12).fill(despesasMensal),
                    borderColor: 'rgba(239, 68, 68, 1)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Kz ' + value.toLocaleString('pt-AO');
                        }
                    }
                }
            }
        }
    });
}

function formatarMoeda(valor) {
    const num = parseFloat(valor) || 0;
    return 'Kz ' + num.toLocaleString('pt-AO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function exportarRelatorioFinanceiro() {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Resumo Geral
    const resumoData = [
        ['RELATÓRIO FINANCEIRO - COPIA GROUP OF COMPANIES, SA'],
        ['Data de Geração:', new Date().toLocaleDateString('pt-AO')],
        [],
        ['RESUMO GERAL'],
        ['Total Receitas Estimadas:', document.getElementById('total-receitas').textContent],
        ['Total Despesas:', document.getElementById('total-despesas').textContent],
        ['Saldo Líquido:', document.getElementById('saldo-liquido').textContent],
        ['Total em Dívida:', document.getElementById('total-dividas').textContent]
    ];
    const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo Geral');

    // Sheet 2: Análise por Departamento
    const deptTable = document.getElementById('departamentos-financeiro-table');
    const wsDept = XLSX.utils.table_to_sheet(deptTable);
    XLSX.utils.book_append_sheet(wb, wsDept, 'Por Departamento');

    // Sheet 3: Top Fornecedores
    const topTable = document.getElementById('top-fornecedores-table');
    const wsTop = XLSX.utils.table_to_sheet(topTable);
    XLSX.utils.book_append_sheet(wb, wsTop, 'Top Fornecedores');

    // Export
    const filename = `Relatorio_Financeiro_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);

    mostrarNotificacao('Relatório financeiro exportado com sucesso!', 'success');
}
