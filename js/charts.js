// ===== Charts Module =====

let areaChartInstance = null;
let correnteChartInstance = null;
let frequenciaChartInstance = null;

// Update all charts
function updateCharts(stats) {
    updateAreaChart(stats.byArea);
    updateCorrenteChart(stats.correntes, stats.naoCorrentes);
    updateFrequenciaChart(stats.byFrequency);
}

// Area Chart - Bar Chart
function updateAreaChart(byArea) {
    const ctx = document.getElementById('areaChart').getContext('2d');

    // Destroy previous chart if exists
    if (areaChartInstance) {
        areaChartInstance.destroy();
    }

    // Sort areas by count
    const sortedAreas = Object.entries(byArea)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Top 10 areas

    const labels = sortedAreas.map(([area]) => area);
    const data = sortedAreas.map(([, count]) => count);

    // Generate colors - bronze/brown palette
    const colors = [
        '#A0682A', '#E07B39', '#D4A574', '#704D1F', '#B8935F',
        '#C86A2E', '#8B5A2B', '#F5A962', '#9B7653', '#D9A566'
    ];

    areaChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Fornecedores',
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
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return `Fornecedores: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: '#e2e8f0'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 11
                        },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Corrente Chart - Doughnut Chart
function updateCorrenteChart(correntes, naoCorrentes) {
    const ctx = document.getElementById('correnteChart').getContext('2d');

    // Destroy previous chart if exists
    if (correnteChartInstance) {
        correnteChartInstance.destroy();
    }

    correnteChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Corrente', 'Não Corrente'],
            datasets: [{
                data: [correntes, naoCorrentes],
                backgroundColor: [
                    '#10b981',
                    '#E07B39'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
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

// Frequencia Chart - Pie Chart
function updateFrequenciaChart(byFrequency) {
    const ctx = document.getElementById('frequenciaChart').getContext('2d');

    // Destroy previous chart if exists
    if (frequenciaChartInstance) {
        frequenciaChartInstance.destroy();
    }

    const labels = Object.keys(byFrequency).map(f => {
        return f.charAt(0).toUpperCase() + f.slice(1);
    });
    const data = Object.values(byFrequency);

    const colors = ['#A0682A', '#E07B39', '#D4A574', '#B8935F'];

    frequenciaChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
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
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
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
