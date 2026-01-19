// ===== Invoice/Fatura Generator Module =====

// Function to generate invoice/fatura
async function gerarFactura(codigoContrato) {
    const contrato = obterPorId('contratos', codigoContrato);

    if (!contrato) {
        mostrarNotificacao('Contrato não encontrado!', 'error');
        return;
    }

    // Load jsPDF library if not loaded
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => generatePDF(contrato);
        document.head.appendChild(script);
    } else {
        generatePDF(contrato);
    }
}

function generatePDF(contrato) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Company colors (Copia Group of Companies, SA)
    const primaryColor = [160, 104, 42]; // #A0682A
    const accentColor = [224, 123, 57]; // #E07B39
    const textColor = [61, 40, 23]; // #3D2817

    // Add logo (base64 - will be added from Picture1.png)
    try {
        // You can convert Picture1.png to base64 and add here
        // For now, we'll add company name as header
        addHeader(doc, primaryColor, textColor);
    } catch (error) {
        console.log('Logo not available, using text header');
        addHeader(doc, primaryColor, textColor);
    }

    // Add invoice details
    addInvoiceDetails(doc, contrato, textColor, accentColor);

    // Add footer
    addFooter(doc, primaryColor);

    // Save PDF
    const filename = `Fatura_${contrato.codigo}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    mostrarNotificacao('Fatura gerada com sucesso!', 'success');
}

function addHeader(doc, primaryColor, textColor) {
    // Header background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Copia Group of Companies, SA', 15, 20);

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Sistema de Gestão Comercial', 15, 28);

    // Document title
    doc.setTextColor(...textColor);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('FATURA / INVOICE', 15, 50);

    // Document date
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const today = new Date().toLocaleDateString('pt-AO');
    doc.text(`Data de Emissão: ${today}`, 150, 50);
}

function addInvoiceDetails(doc, contrato, textColor, accentColor) {
    let y = 65;

    // Contract information section
    doc.setFillColor(248, 244, 239);
    doc.rect(15, y, 180, 10, 'F');

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('INFORMAÇÕES DO CONTRATO', 20, y + 7);

    y += 20;

    // Contract details
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Código do Contrato:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(contrato.codigo || '-', 70, y);

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Tipo:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(contrato.tipo || '-', 70, y);

    y += 10;
    doc.setFont(undefined, 'bold');
    doc.text('Entidade:', 20, y);
    doc.setFont(undefined, 'normal');
    const entidadeLines = doc.splitTextToSize(contrato.entidade || '-', 120);
    doc.text(entidadeLines, 70, y);

    y += 7 * entidadeLines.length;
    doc.setFont(undefined, 'bold');
    doc.text('Objeto do Contrato:', 20, y);
    doc.setFont(undefined, 'normal');
    const objetoLines = doc.splitTextToSize(contrato.objeto || '-', 120);
    doc.text(objetoLines, 70, y);

    y += 7 * objetoLines.length + 5;

    // Dates section
    doc.setFillColor(248, 244, 239);
    doc.rect(15, y, 180, 10, 'F');

    doc.setFont(undefined, 'bold');
    doc.text('DATAS', 20, y + 7);

    y += 20;

    doc.setFont(undefined, 'bold');
    doc.text('Data Contrato:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(formatarData(contrato.data_contrato || contrato.data_assinatura) || '-', 70, y);

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Data Início:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(formatarData(contrato.data_inicio) || '-', 70, y);

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Data Fim:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(formatarData(contrato.data_fim) || '-', 70, y);

    y += 15;

    // Financial section
    doc.setFillColor(...accentColor);
    doc.rect(15, y, 180, 10, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('INFORMAÇÕES FINANCEIRAS', 20, y + 7);

    y += 20;

    doc.setTextColor(...textColor);

    // Value box
    doc.setFillColor(255, 245, 235);
    doc.rect(15, y, 180, 25, 'F');

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Valor Total:', 20, y + 10);

    const valorFormatado = contrato.valor
        ? formatarValor(contrato.valor, contrato.moeda || 'AOA')
        : 'A definir';

    doc.setFontSize(18);
    doc.setTextColor(...accentColor);
    doc.text(valorFormatado, 20, y + 20);

    y += 35;

    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Condições de Pagamento:', 20, y);
    doc.setFont(undefined, 'normal');
    const condicoesLines = doc.splitTextToSize(contrato.condicoes_pagamento || 'Conforme acordado', 120);
    doc.text(condicoesLines, 70, y);

    y += 7 * condicoesLines.length + 10;

    // Additional information
    if (contrato.importancia || contrato.avaliacao) {
        doc.setFillColor(248, 244, 239);
        doc.rect(15, y, 180, 10, 'F');

        doc.setFont(undefined, 'bold');
        doc.text('CLASSIFICAÇÃO', 20, y + 7);

        y += 20;

        if (contrato.importancia) {
            doc.setFont(undefined, 'bold');
            doc.text('Importância:', 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(contrato.importancia, 70, y);
            y += 7;
        }

        if (contrato.avaliacao) {
            doc.setFont(undefined, 'bold');
            doc.text('Avaliação:', 20, y);
            doc.setFont(undefined, 'normal');
            doc.text('⭐'.repeat(parseInt(contrato.avaliacao)) + ` (${contrato.avaliacao}/5)`, 70, y);
            y += 7;
        }

        y += 5;
    }

    // Responsible
    doc.setFont(undefined, 'bold');
    doc.text('Responsável:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(contrato.responsavel || '-', 70, y);

    // Status
    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Status:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(contrato.status || 'Pendente', 70, y);

    // Observations
    if (contrato.observacoes) {
        y += 15;
        doc.setFont(undefined, 'bold');
        doc.text('Observações:', 20, y);
        doc.setFont(undefined, 'normal');
        const obsLines = doc.splitTextToSize(contrato.observacoes, 170);
        doc.text(obsLines, 20, y + 7);
    }
}

function addFooter(doc, primaryColor) {
    const pageHeight = doc.internal.pageSize.height;

    // Footer line
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, pageHeight - 25, 195, pageHeight - 25);

    // Footer text
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');

    const footerText = 'Este documento foi gerado automaticamente pelo Sistema de Gestão Comercial Copia Group of Companies, SA';
    doc.text(footerText, 105, pageHeight - 18, { align: 'center' });

    const dateText = `Gerado em: ${new Date().toLocaleString('pt-AO')}`;
    doc.text(dateText, 105, pageHeight - 13, { align: 'center' });
}

// Helper functions
function formatarData(dataStr) {
    if (!dataStr) return null;

    try {
        const data = new Date(dataStr);
        return data.toLocaleDateString('pt-AO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        return dataStr;
    }
}

function formatarValor(valor, moeda) {
    if (!valor) return 'A definir';

    const valorFormatado = parseFloat(valor).toLocaleString('pt-AO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const simbolos = {
        'AOA': 'Kz',
        'USD': '$',
        'EUR': '€'
    };

    return `${simbolos[moeda] || moeda} ${valorFormatado}`;
}

// ===== Fornecedor Invoice Generator =====

async function gerarFaturaFornecedor(codigoFornecedor) {
    const fornecedor = obterPorId('fornecedores', codigoFornecedor);

    if (!fornecedor) {
        mostrarNotificacao('Fornecedor não encontrado!', 'error');
        return;
    }

    // Load jsPDF library if not loaded
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => generateFornecedorPDF(fornecedor);
        document.head.appendChild(script);
    } else {
        generateFornecedorPDF(fornecedor);
    }
}

function generateFornecedorPDF(fornecedor) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Company colors (Copia Group of Companies, SA)
    const primaryColor = [160, 104, 42]; // #A0682A
    const accentColor = [224, 123, 57]; // #E07B39
    const textColor = [61, 40, 23]; // #3D2817

    // Add header
    addHeaderFornecedor(doc, primaryColor, textColor);

    // Add invoice details
    addFornecedorDetails(doc, fornecedor, textColor, accentColor);

    // Add footer
    addFooter(doc, primaryColor);

    // Save PDF
    const filename = `Fatura_Fornecedor_${fornecedor.codigo}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    mostrarNotificacao('Fatura de fornecedor gerada com sucesso!', 'success');
}

function addHeaderFornecedor(doc, primaryColor, textColor) {
    // Header background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Copia Group of Companies, SA', 15, 20);

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Sistema de Gestão Comercial - Fornecedores', 15, 28);

    // Document title
    doc.setTextColor(...textColor);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('FATURA FORNECEDOR / SUPPLIER INVOICE', 15, 50);

    // Invoice number
    const numeroFatura = `FRN-${fornecedor.codigo}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(`Nº: ${numeroFatura}`, 150, 46);

    // Document date
    doc.setFont(undefined, 'normal');
    const today = new Date().toLocaleDateString('pt-AO');
    doc.text(`Data: ${today}`, 150, 52);
}

function addFornecedorDetails(doc, fornecedor, textColor, accentColor) {
    let y = 65;

    // Supplier information section
    doc.setFillColor(248, 244, 239);
    doc.rect(15, y, 180, 10, 'F');

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('DADOS DO FORNECEDOR', 20, y + 7);

    y += 20;

    // Supplier details
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Código:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(fornecedor.codigo || '-', 60, y);

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Nome/Empresa:', 20, y);
    doc.setFont(undefined, 'normal');
    const nomeLines = doc.splitTextToSize(fornecedor.nome || '-', 130);
    doc.text(nomeLines, 60, y);

    y += 7 * nomeLines.length;
    if (fornecedor.nif) {
        doc.setFont(undefined, 'bold');
        doc.text('NIF:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text(fornecedor.nif, 60, y);
        y += 7;
    }

    if (fornecedor.telefone) {
        doc.setFont(undefined, 'bold');
        doc.text('Telefone:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text(fornecedor.telefone, 60, y);
        y += 7;
    }

    if (fornecedor.email) {
        doc.setFont(undefined, 'bold');
        doc.text('Email:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text(fornecedor.email, 60, y);
        y += 7;
    }

    y += 5;

    // Service information
    doc.setFillColor(248, 244, 239);
    doc.rect(15, y, 180, 10, 'F');

    doc.setFont(undefined, 'bold');
    doc.text('INFORMAÇÕES DO SERVIÇO', 20, y + 7);

    y += 20;

    doc.setFont(undefined, 'bold');
    doc.text('Área/Departamento:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(fornecedor.area || '-', 70, y);

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Produto/Serviço:', 20, y);
    doc.setFont(undefined, 'normal');
    const produtoLines = doc.splitTextToSize(fornecedor.produto || '-', 120);
    doc.text(produtoLines, 70, y);

    y += 7 * produtoLines.length;
    doc.setFont(undefined, 'bold');
    doc.text('Frequência:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text((fornecedor.frequencia || '-').toUpperCase(), 70, y);

    y += 15;

    // Financial section
    doc.setFillColor(...accentColor);
    doc.rect(15, y, 180, 10, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('INFORMAÇÕES FINANCEIRAS', 20, y + 7);

    y += 20;

    doc.setTextColor(...textColor);

    // Value box
    doc.setFillColor(255, 245, 235);
    doc.rect(15, y, 85, 30, 'F');
    doc.rect(105, y, 90, 30, 'F');

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Valor do Serviço:', 20, y + 10);

    const valorFormatado = fornecedor.valor
        ? formatarValor(fornecedor.valor, fornecedor.moeda || 'AOA')
        : 'A definir';

    doc.setFontSize(16);
    doc.setTextColor(...accentColor);
    doc.text(valorFormatado, 20, y + 22);

    // Payment info box
    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Forma de Pagamento:', 110, y + 10);

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(fornecedor.pagamento || 'Transferência', 110, y + 17);

    if (fornecedor.condicoes_pagamento) {
        const condicoes = {
            'pronto': 'Pronto Pagamento',
            '30dias': '30 Dias',
            '60dias': '60 Dias',
            '90dias': '90 Dias'
        };
        doc.text(condicoes[fornecedor.condicoes_pagamento] || fornecedor.condicoes_pagamento, 110, y + 24);
    }

    y += 40;

    // Banking details
    if (fornecedor.banco || fornecedor.nib) {
        doc.setFillColor(248, 244, 239);
        doc.rect(15, y, 180, 10, 'F');

        doc.setFont(undefined, 'bold');
        doc.text('DADOS BANCÁRIOS', 20, y + 7);

        y += 20;

        if (fornecedor.banco) {
            doc.setFont(undefined, 'bold');
            doc.text('Banco:', 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(fornecedor.banco, 70, y);
            y += 7;
        }

        if (fornecedor.nib) {
            doc.setFont(undefined, 'bold');
            doc.text('NIB/IBAN:', 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(fornecedor.nib, 70, y);
            y += 7;
        }

        y += 5;
    }

    // Financial summary
    if (fornecedor.total_pago || fornecedor.total_divida) {
        doc.setFillColor(255, 250, 245);
        doc.rect(15, y, 180, 25, 'F');

        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text('RESUMO FINANCEIRO', 20, y + 8);

        y += 16;

        doc.setFontSize(9);
        if (fornecedor.total_pago) {
            doc.text('Total Pago (Acumulado):', 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(formatarValor(fornecedor.total_pago, fornecedor.moeda || 'AOA'), 70, y);
            doc.setFont(undefined, 'bold');
        }

        if (fornecedor.total_divida) {
            doc.text('Total em Dívida:', 120, y);
            doc.setFont(undefined, 'normal');
            const divida = parseFloat(fornecedor.total_divida || 0);
            if (divida > 0) {
                doc.setTextColor(220, 38, 38); // Red for debt
            }
            doc.text(formatarValor(fornecedor.total_divida, fornecedor.moeda || 'AOA'), 155, y);
            doc.setTextColor(...textColor);
        }

        y += 15;
    }

    // Dates section
    doc.setFillColor(248, 244, 239);
    doc.rect(15, y, 180, 10, 'F');

    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('CONTROLE E GESTÃO', 20, y + 7);

    y += 20;

    doc.setFontSize(10);
    if (fornecedor.data_inicio) {
        doc.setFont(undefined, 'bold');
        doc.text('Data de Início:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text(formatarData(fornecedor.data_inicio) || '-', 70, y);
        y += 7;
    }

    if (fornecedor.data_ultima_fatura) {
        doc.setFont(undefined, 'bold');
        doc.text('Última Fatura:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text(formatarData(fornecedor.data_ultima_fatura) || '-', 70, y);
        y += 7;
    }

    if (fornecedor.proximo_pagamento) {
        doc.setFont(undefined, 'bold');
        doc.text('Próximo Pagamento:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text(formatarData(fornecedor.proximo_pagamento) || '-', 70, y);
        y += 7;
    }

    y += 5;

    // Responsible and evaluation
    doc.setFont(undefined, 'bold');
    doc.text('Responsável Interno:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(fornecedor.responsavel || '-', 70, y);

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Status:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(fornecedor.status || 'Ativo', 70, y);

    if (fornecedor.avaliacao) {
        y += 7;
        doc.setFont(undefined, 'bold');
        doc.text('Avaliação:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.text('⭐'.repeat(parseInt(fornecedor.avaliacao)) + ` (${fornecedor.avaliacao}/5)`, 70, y);
    }

    // Observations
    if (fornecedor.observacoes) {
        y += 15;
        doc.setFont(undefined, 'bold');
        doc.text('Observações:', 20, y);
        doc.setFont(undefined, 'normal');
        const obsLines = doc.splitTextToSize(fornecedor.observacoes, 170);
        doc.text(obsLines, 20, y + 7);
    }
}
