// ===== Forms Generator =====

function renderForm(tipo, data = null) {
    const forms = {
        fornecedor: renderFornecedorForm(data),
        prestador: renderPrestadorForm(data),
        contrato: renderContratoForm(data),
        memorando: renderMemorandoForm(data),
        parceria: renderParceriaForm(data)
    };

    return forms[tipo] || '';
}

function renderFornecedorForm(data) {
    return `
        <form class="modal-form" onsubmit="salvarFornecedor(event)">
            <h3 style="margin: 0 0 1rem 0; color: #A0682A; border-bottom: 2px solid #E07B39; padding-bottom: 0.5rem;">Informações Básicas</h3>
            <div class="form-group">
                <label>Código *</label>
                <input type="text" name="codigo" value="${data?.codigo || ''}" ${data ? 'readonly' : ''} required>
            </div>
            <div class="form-group">
                <label>Tipo *</label>
                <select name="tipo" required>
                    <option value="Original" ${data?.tipo === 'Original' ? 'selected' : ''}>Original</option>
                    <option value="Novo" ${data?.tipo === 'Novo' ? 'selected' : ''}>Novo</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Nome do Fornecedor *</label>
                <input type="text" name="nome" value="${data?.nome || ''}" required>
            </div>
            <div class="form-group">
                <label>NIF (Número de Identificação Fiscal)</label>
                <input type="text" name="nif" value="${data?.nif || ''}" placeholder="000000000">
            </div>
            <div class="form-group">
                <label>Telefone</label>
                <input type="tel" name="telefone" value="${data?.telefone || ''}" placeholder="+244 900 000 000">
            </div>
            <div class="form-group full">
                <label>Email</label>
                <input type="email" name="email" value="${data?.email || ''}" placeholder="fornecedor@exemplo.com">
            </div>
            <div class="form-group">
                <label>Corrente/Não Corrente *</label>
                <select name="corrente" required>
                    <option value="corrente" ${data?.corrente === 'corrente' ? 'selected' : ''}>Corrente</option>
                    <option value="não corrente" ${data?.corrente === 'não corrente' ? 'selected' : ''}>Não Corrente</option>
                </select>
            </div>
            <div class="form-group">
                <label>Área/Departamento *</label>
                <input type="text" name="area" value="${data?.area || ''}" required>
            </div>
            <div class="form-group full">
                <label>Produto ou Serviço *</label>
                <input type="text" name="produto" value="${data?.produto || ''}" required>
            </div>

            <h3 style="margin: 1.5rem 0 1rem 0; color: #A0682A; border-bottom: 2px solid #E07B39; padding-bottom: 0.5rem;">Informações Financeiras</h3>
            <div class="form-group">
                <label>Valor Estimado/Fixo</label>
                <input type="number" name="valor" value="${data?.valor || ''}" step="0.01" placeholder="0.00">
            </div>
            <div class="form-group">
                <label>Moeda *</label>
                <select name="moeda" required>
                    <option value="AOA" ${!data || data?.moeda === 'AOA' ? 'selected' : ''}>AOA - Kwanza</option>
                    <option value="USD" ${data?.moeda === 'USD' ? 'selected' : ''}>USD - Dólar</option>
                    <option value="EUR" ${data?.moeda === 'EUR' ? 'selected' : ''}>EUR - Euro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Frequência *</label>
                <select name="frequencia" required>
                    <option value="mensal" ${data?.frequencia === 'mensal' ? 'selected' : ''}>Mensal</option>
                    <option value="trimestral" ${data?.frequencia === 'trimestral' ? 'selected' : ''}>Trimestral</option>
                    <option value="semestral" ${data?.frequencia === 'semestral' ? 'selected' : ''}>Semestral</option>
                    <option value="anual" ${data?.frequencia === 'anual' ? 'selected' : ''}>Anual</option>
                    <option value="pontual" ${data?.frequencia === 'pontual' ? 'selected' : ''}>Pontual</option>
                </select>
            </div>
            <div class="form-group">
                <label>Condições de Pagamento *</label>
                <select name="condicoes_pagamento" required>
                    <option value="pronto" ${data?.condicoes_pagamento === 'pronto' ? 'selected' : ''}>Pronto Pagamento</option>
                    <option value="30dias" ${!data || data?.condicoes_pagamento === '30dias' ? 'selected' : ''}>30 Dias</option>
                    <option value="60dias" ${data?.condicoes_pagamento === '60dias' ? 'selected' : ''}>60 Dias</option>
                    <option value="90dias" ${data?.condicoes_pagamento === '90dias' ? 'selected' : ''}>90 Dias</option>
                </select>
            </div>
            <div class="form-group">
                <label>Forma de Pagamento *</label>
                <select name="pagamento" required>
                    <option value="Transferência" ${!data || data?.pagamento === 'Transferência' || data?.pagamento === 'Transferencia' ? 'selected' : ''}>Transferência Bancária</option>
                    <option value="Cheque" ${data?.pagamento === 'Cheque' ? 'selected' : ''}>Cheque</option>
                    <option value="Numerário" ${data?.pagamento === 'Numerário' ? 'selected' : ''}>Numerário</option>
                    <option value="Multicaixa" ${data?.pagamento === 'Multicaixa' ? 'selected' : ''}>Multicaixa</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Banco</label>
                <input type="text" name="banco" value="${data?.banco || ''}" placeholder="Ex: BAI, BFA, BIC, etc.">
            </div>
            <div class="form-group full">
                <label>NIB/IBAN</label>
                <input type="text" name="nib" value="${data?.nib || ''}" placeholder="AO06 0000 0000 0000 0000 0000 0">
            </div>
            <div class="form-group">
                <label>Total Pago (Acumulado)</label>
                <input type="number" name="total_pago" value="${data?.total_pago || '0'}" step="0.01" placeholder="0.00">
            </div>
            <div class="form-group">
                <label>Total em Dívida</label>
                <input type="number" name="total_divida" value="${data?.total_divida || '0'}" step="0.01" placeholder="0.00">
            </div>

            <h3 style="margin: 1.5rem 0 1rem 0; color: #A0682A; border-bottom: 2px solid #E07B39; padding-bottom: 0.5rem;">Gestão e Controle</h3>
            <div class="form-group">
                <label>Responsável Interno *</label>
                <input type="text" name="responsavel" value="${data?.responsavel || ''}" required>
            </div>
            <div class="form-group">
                <label>Data de Início</label>
                <input type="date" name="data_inicio" value="${data?.data_inicio || ''}">
            </div>
            <div class="form-group">
                <label>Data Última Fatura</label>
                <input type="date" name="data_ultima_fatura" value="${data?.data_ultima_fatura || ''}">
            </div>
            <div class="form-group">
                <label>Próximo Pagamento</label>
                <input type="date" name="proximo_pagamento" value="${data?.proximo_pagamento || ''}">
            </div>
            <div class="form-group">
                <label>Status *</label>
                <select name="status" required>
                    <option value="Ativo" ${!data || data?.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Inativo" ${data?.status === 'Inativo' ? 'selected' : ''}>Inativo</option>
                    <option value="Pendente" ${data?.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                    <option value="Suspenso" ${data?.status === 'Suspenso' ? 'selected' : ''}>Suspenso</option>
                </select>
            </div>
            <div class="form-group">
                <label>Avaliação (1-5)</label>
                <select name="avaliacao">
                    <option value="">Sem avaliação</option>
                    <option value="1" ${data?.avaliacao === '1' ? 'selected' : ''}>⭐ 1 - Muito Fraco</option>
                    <option value="2" ${data?.avaliacao === '2' ? 'selected' : ''}>⭐⭐ 2 - Fraco</option>
                    <option value="3" ${data?.avaliacao === '3' ? 'selected' : ''}>⭐⭐⭐ 3 - Bom</option>
                    <option value="4" ${data?.avaliacao === '4' ? 'selected' : ''}>⭐⭐⭐⭐ 4 - Muito Bom</option>
                    <option value="5" ${data?.avaliacao === '5' ? 'selected' : ''}>⭐⭐⭐⭐⭐ 5 - Excelente</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Observações</label>
                <textarea name="observacoes" rows="3">${data?.observacoes || ''}</textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    `;
}

function renderPrestadorForm(data) {
    return `
        <form class="modal-form" onsubmit="salvarPrestador(event)">
            <div class="form-group">
                <label>Código *</label>
                <input type="text" name="codigo" value="${data?.codigo || ''}" ${data ? 'readonly' : ''} required>
            </div>
            <div class="form-group full">
                <label>Nome/Empresa *</label>
                <input type="text" name="nome" value="${data?.nome || ''}" required>
            </div>
            <div class="form-group">
                <label>Tipo de Serviço *</label>
                <input type="text" name="tipo_servico" value="${data?.tipo_servico || ''}" required>
            </div>
            <div class="form-group">
                <label>Área Atendida *</label>
                <input type="text" name="area" value="${data?.area || ''}" required>
            </div>
            <div class="form-group">
                <label>Contrato Associado</label>
                <input type="text" name="contrato" value="${data?.contrato || ''}">
            </div>
            <div class="form-group">
                <label>Valor do Serviço</label>
                <input type="number" name="valor" value="${data?.valor || ''}" step="0.01">
            </div>
            <div class="form-group">
                <label>Moeda</label>
                <select name="moeda">
                    <option value="AOA" ${!data || data?.moeda === 'AOA' ? 'selected' : ''}>AOA</option>
                    <option value="USD" ${data?.moeda === 'USD' ? 'selected' : ''}>USD</option>
                    <option value="EUR" ${data?.moeda === 'EUR' ? 'selected' : ''}>EUR</option>
                </select>
            </div>
            <div class="form-group">
                <label>Periodicidade *</label>
                <select name="periodicidade" required>
                    <option value="mensal" ${data?.periodicidade === 'mensal' ? 'selected' : ''}>Mensal</option>
                    <option value="trimestral" ${data?.periodicidade === 'trimestral' ? 'selected' : ''}>Trimestral</option>
                    <option value="anual" ${data?.periodicidade === 'anual' ? 'selected' : ''}>Anual</option>
                </select>
            </div>
            <div class="form-group">
                <label>Data de Início</label>
                <input type="date" name="data_inicio" value="${data?.data_inicio || ''}">
            </div>
            <div class="form-group">
                <label>Data de Término</label>
                <input type="date" name="data_termino" value="${data?.data_termino || ''}">
            </div>
            <div class="form-group">
                <label>Responsável *</label>
                <input type="text" name="responsavel" value="${data?.responsavel || ''}" required>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select name="status">
                    <option value="Ativo" ${!data || data?.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Inativo" ${data?.status === 'Inativo' ? 'selected' : ''}>Inativo</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Observações</label>
                <textarea name="observacoes">${data?.observacoes || ''}</textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    `;
}

function renderContratoForm(data) {
    return `
        <form class="modal-form" onsubmit="salvarContrato(event)">
            <div class="form-group">
                <label>Código do Contrato *</label>
                <input type="text" name="codigo" value="${data?.codigo || ''}" ${data ? 'readonly' : ''} required>
            </div>
            <div class="form-group">
                <label>Tipo de Contrato *</label>
                <input type="text" name="tipo" value="${data?.tipo || ''}" required>
            </div>
            <div class="form-group full">
                <label>Entidade Envolvida *</label>
                <input type="text" name="entidade" value="${data?.entidade || ''}" required>
            </div>
            <div class="form-group full">
                <label>Objeto do Contrato *</label>
                <input type="text" name="objeto" value="${data?.objeto || ''}" required>
            </div>
            <div class="form-group">
                <label>Data Assinatura</label>
                <input type="date" name="data_assinatura" value="${data?.data_assinatura || ''}">
            </div>
            <div class="form-group">
                <label>Data Início</label>
                <input type="date" name="data_inicio" value="${data?.data_inicio || ''}">
            </div>
            <div class="form-group">
                <label>Data Fim</label>
                <input type="date" name="data_fim" value="${data?.data_fim || ''}">
            </div>
            <div class="form-group">
                <label>Data do Contrato</label>
                <input type="date" name="data_contrato" value="${data?.data_contrato || ''}">
            </div>
            <div class="form-group">
                <label>Valor Total</label>
                <input type="number" name="valor" value="${data?.valor || ''}" step="0.01">
            </div>
            <div class="form-group">
                <label>Moeda</label>
                <select name="moeda">
                    <option value="AOA" ${!data || data?.moeda === 'AOA' ? 'selected' : ''}>AOA</option>
                    <option value="USD" ${data?.moeda === 'USD' ? 'selected' : ''}>USD</option>
                    <option value="EUR" ${data?.moeda === 'EUR' ? 'selected' : ''}>EUR</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Condições de Pagamento</label>
                <input type="text" name="condicoes_pagamento" value="${data?.condicoes_pagamento || ''}">
            </div>
            <div class="form-group">
                <label>Importância</label>
                <select name="importancia">
                    <option value="">Selecionar...</option>
                    <option value="Baixa" ${data?.importancia === 'Baixa' ? 'selected' : ''}>Baixa</option>
                    <option value="Média" ${data?.importancia === 'Média' ? 'selected' : ''}>Média</option>
                    <option value="Alta" ${data?.importancia === 'Alta' ? 'selected' : ''}>Alta</option>
                    <option value="Crítica" ${data?.importancia === 'Crítica' ? 'selected' : ''}>Crítica</option>
                </select>
            </div>
            <div class="form-group">
                <label>Avaliação (1-5)</label>
                <select name="avaliacao">
                    <option value="">Sem avaliação</option>
                    <option value="1" ${data?.avaliacao === '1' ? 'selected' : ''}>⭐ 1 - Muito Fraco</option>
                    <option value="2" ${data?.avaliacao === '2' ? 'selected' : ''}>⭐⭐ 2 - Fraco</option>
                    <option value="3" ${data?.avaliacao === '3' ? 'selected' : ''}>⭐⭐⭐ 3 - Bom</option>
                    <option value="4" ${data?.avaliacao === '4' ? 'selected' : ''}>⭐⭐⭐⭐ 4 - Muito Bom</option>
                    <option value="5" ${data?.avaliacao === '5' ? 'selected' : ''}>⭐⭐⭐⭐⭐ 5 - Excelente</option>
                </select>
            </div>
            <div class="form-group">
                <label>Responsável *</label>
                <input type="text" name="responsavel" value="${data?.responsavel || ''}" required>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select name="status">
                    <option value="">Selecionar...</option>
                    <option value="Ativo" ${data?.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Vigente" ${data?.status === 'Vigente' ? 'selected' : ''}>Vigente</option>
                    <option value="Pendente" ${data?.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                    <option value="Encerrado" ${data?.status === 'Encerrado' ? 'selected' : ''}>Encerrado</option>
                    <option value="Cancelado" ${data?.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Observações</label>
                <textarea name="observacoes">${data?.observacoes || ''}</textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    `;
}

function renderMemorandoForm(data) {
    return `
        <form class="modal-form" onsubmit="salvarMemorando(event)">
            <div class="form-group">
                <label>Nº Memorando *</label>
                <input type="text" name="numero" value="${data?.numero || ''}" ${data ? 'readonly' : ''} required>
            </div>
            <div class="form-group">
                <label>Empresa *</label>
                <input type="text" name="empresa" value="${data?.empresa || ''}" required>
            </div>
            <div class="form-group">
                <label>Data</label>
                <input type="date" name="data" value="${data?.data || ''}">
            </div>
            <div class="form-group">
                <label>Área Origem *</label>
                <input type="text" name="area_origem" value="${data?.area_origem || ''}" required>
            </div>
            <div class="form-group">
                <label>Destinatário *</label>
                <input type="text" name="destinatario" value="${data?.destinatario || ''}" required>
            </div>
            <div class="form-group">
                <label>Tipo</label>
                <input type="text" name="tipo" value="${data?.tipo || ''}">
            </div>
            <div class="form-group full">
                <label>Objeto do Memorando *</label>
                <input type="text" name="objeto" value="${data?.objeto || ''}" required>
            </div>
            <div class="form-group">
                <label>Duração</label>
                <input type="text" name="duracao" value="${data?.duracao || ''}">
            </div>
            <div class="form-group">
                <label>Documento Relacionado</label>
                <input type="text" name="documento" value="${data?.documento || ''}">
            </div>
            <div class="form-group full">
                <label>Descrição Resumida</label>
                <textarea name="descricao">${data?.descricao || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Responsável *</label>
                <input type="text" name="responsavel" value="${data?.responsavel || ''}" required>
            </div>
            <div class="form-group full">
                <label>Observações</label>
                <textarea name="observacoes">${data?.observacoes || ''}</textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    `;
}

function renderParceriaForm(data) {
    return `
        <form class="modal-form" onsubmit="salvarParceria(event)">
            <div class="form-group full">
                <label>Nome da Entidade *</label>
                <input type="text" name="entidade" value="${data?.entidade || ''}" ${data ? 'readonly' : ''} required>
            </div>
            <div class="form-group">
                <label>Tipo *</label>
                <input type="text" name="tipo" value="${data?.tipo || ''}" required>
            </div>
            <div class="form-group">
                <label>Área Atuação *</label>
                <input type="text" name="area_atuacao" value="${data?.area_atuacao || ''}" required>
            </div>
            <div class="form-group">
                <label>Tipo de Parceria *</label>
                <input type="text" name="tipo_parceria" value="${data?.tipo_parceria || ''}" required>
            </div>
            <div class="form-group full">
                <label>Benefícios</label>
                <textarea name="beneficios">${data?.beneficios || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Valor/Quota</label>
                <input type="number" name="valor" value="${data?.valor || ''}" step="0.01">
            </div>
            <div class="form-group">
                <label>Moeda</label>
                <select name="moeda">
                    <option value="AOA" ${!data || data?.moeda === 'AOA' ? 'selected' : ''}>AOA</option>
                    <option value="USD" ${data?.moeda === 'USD' ? 'selected' : ''}>USD</option>
                    <option value="EUR" ${data?.moeda === 'EUR' ? 'selected' : ''}>EUR</option>
                </select>
            </div>
            <div class="form-group">
                <label>Periodicidade</label>
                <input type="text" name="periodicidade" value="${data?.periodicidade || ''}">
            </div>
            <div class="form-group">
                <label>Data Início</label>
                <input type="date" name="data_inicio" value="${data?.data_inicio || ''}">
            </div>
            <div class="form-group">
                <label>Renovação</label>
                <input type="text" name="renovacao" value="${data?.renovacao || ''}">
            </div>
            <div class="form-group">
                <label>Jóia</label>
                <input type="text" name="joia" value="${data?.joia || ''}">
            </div>
            <div class="form-group">
                <label>Responsável *</label>
                <input type="text" name="responsavel" value="${data?.responsavel || ''}" required>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select name="status">
                    <option value="Ativo" ${!data || data?.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Inativo" ${data?.status === 'Inativo' ? 'selected' : ''}>Inativo</option>
                </select>
            </div>
            <div class="form-group full">
                <label>Observações</label>
                <textarea name="observacoes">${data?.observacoes || ''}</textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    `;
}

// Form Submit Handlers
function salvarFornecedor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editingId) {
        atualizarItem('fornecedores', editingId, data);
        mostrarNotificacao('Fornecedor atualizado com sucesso!', 'success');
    } else {
        if (obterPorId('fornecedores', data.codigo)) {
            mostrarNotificacao('Código já existe!', 'error');
            return;
        }
        adicionarItem('fornecedores', data);
        mostrarNotificacao('Fornecedor adicionado com sucesso!', 'success');
    }

    closeModal();
    renderTable('fornecedores');
    atualizarDashboard();
}

function salvarPrestador(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editingId) {
        atualizarItem('prestadores', editingId, data);
        mostrarNotificacao('Prestador atualizado com sucesso!', 'success');
    } else {
        adicionarItem('prestadores', data);
        mostrarNotificacao('Prestador adicionado com sucesso!', 'success');
    }

    closeModal();
    renderTable('prestadores');
    atualizarDashboard();
}

function salvarContrato(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editingId) {
        atualizarItem('contratos', editingId, data);
        mostrarNotificacao('Contrato atualizado com sucesso!', 'success');
    } else {
        adicionarItem('contratos', data);
        mostrarNotificacao('Contrato adicionado com sucesso!', 'success');
    }

    closeModal();
    renderTable('contratos');
    atualizarDashboard();
}

function salvarMemorando(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editingId) {
        atualizarItem('memorandos', editingId, data, 'numero');
        mostrarNotificacao('Memorando atualizado com sucesso!', 'success');
    } else {
        adicionarItem('memorandos', data);
        mostrarNotificacao('Memorando adicionado com sucesso!', 'success');
    }

    closeModal();
    renderTable('memorandos');
    atualizarDashboard();
}

function salvarParceria(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editingId) {
        atualizarItem('parcerias', editingId, data, 'entidade');
        mostrarNotificacao('Parceria atualizada com sucesso!', 'success');
    } else {
        adicionarItem('parcerias', data);
        mostrarNotificacao('Parceria adicionada com sucesso!', 'success');
    }

    closeModal();
    renderTable('parcerias');
    atualizarDashboard();
}
