// ===== Charts Module - Updated =====

let categoryChartInstance = null;
let areaChartInstance = null;
let statusChartInstance = null;

// Update all charts
function atualizarGraficos(stats) {
    updateCategoryChart(stats);
    updateAreaChart(stats.fornecedores.porArea);
    updateStatusChart(stats);
}

// Category Distribution Chart (Pie)
function updateCategoryChart(stats) {
    const ctx = document.getElementById('categoryChart').getContext('2d');

    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    const data = [
        stats.fornecedores.total,
        stats.prestadores.total,
        stats.contratos.total,
        stats.memorandos.total,
        stats.parcerias.total
    ];

    const colors = ['#A0682A', '#10b981', '#E07B39', '#D4A574', '#B8935F'];

    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fornecedores', 'Prestadores', 'Contratos', 'Memorandos', 'Parcerias'],
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12, weight: '500' },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Area Distribution Chart (Bar)
function updateAreaChart(porArea) {
    const ctx = document.getElementById('areaChart').getContext('2d');

    if (areaChartInstance) {
        areaChartInstance.destroy();
    }

    const sortedAreas = Object.entries(porArea)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labels = sortedAreas.map(([area]) => area);
    const data = sortedAreas.map(([, count]) => count);

    const colors = [
        '#A0682A', '#E07B39', '#D4A574', '#704D1F', '#B8935F',
        '#C86A2E', '#8B5A2B', '#F5A962', '#9B7653', '#D9A566'
    ];

    areaChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Fornecedores',
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, font: { size: 11 } },
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Status Chart (Mixed)
function updateStatusChart(stats) {
    const ctx = document.getElementById('statusChart').getContext('2d');

    if (statusChartInstance) {
        statusChartInstance.destroy();
    }

    statusChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Fornecedores', 'Prestadores', 'Parcerias'],
            datasets: [{
                label: 'Ativos/Correntes',
                data: [
                    stats.fornecedores.correntes,
                    stats.prestadores.ativos,
                    stats.parcerias.ativas
                ],
                backgroundColor: '#10b981',
                borderRadius: 8
            }, {
                label: 'Inativos/Não Correntes',
                data: [
                    stats.fornecedores.naoCorrentes,
                    stats.prestadores.total - stats.prestadores.ativos,
                    stats.parcerias.total - stats.parcerias.ativas
                ],
                backgroundColor: '#E07B39',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12, weight: '500' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}
