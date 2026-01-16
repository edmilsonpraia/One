import pandas as pd
import json

xl_file = 'Cópia de MP.CGC.01.DCO - Base Comercial (Fornecedores Prestadores Memorandos Contratos).xlsx'

# 1. Fornecedores (já existe)
df_fornecedores = pd.read_excel(xl_file, sheet_name='LISTA DE FORNECEDORES ', header=1).fillna('')
fornecedores = []
for _, row in df_fornecedores.iterrows():
    fornecedores.append({
        'codigo': str(row['Código do Fornecedor']),
        'tipo': str(row['Tipo']),
        'nome': str(row['Nome do Fornecedor']),
        'corrente': str(row['Corrente/Não Corrente']),
        'area': str(row['Área que Atende']),
        'produto': str(row['Produto ou Serviço']),
        'frequencia': str(row['Frequência']),
        'valor': None if row['Valor est/ fixo'] == '' else float(row['Valor est/ fixo']),
        'moeda': str(row['Moeda']),
        'pagamento': str(row['Forma de Pagamento']),
        'responsavel': str(row['Responsável Interno']),
        'data_inicio': None if row['Data de Início'] == '' else str(row['Data de Início']),
        'status': str(row['Status']) if row['Status'] != '' else '',
        'observacoes': str(row['Observações']) if row['Observações'] != '' else ''
    })

# 2. Prestadores de Serviços
df_prestadores = pd.read_excel(xl_file, sheet_name='PRESTADORES DE SERVIÇOS').fillna('')
prestadores = []
for _, row in df_prestadores.iterrows():
    prestadores.append({
        'codigo': str(row['Código do Prestador']),
        'nome': str(row['Nome / Empresa']),
        'tipo_servico': str(row['Tipo de Serviço']),
        'area': str(row['Área Atendida']),
        'contrato': str(row['Contrato Associado']),
        'valor': None if row['Valor do Serviço'] == '' else float(row['Valor do Serviço']),
        'moeda': str(row['Moeda']),
        'periodicidade': str(row['Periodicidade']),
        'data_inicio': str(row['Data de Início']) if row['Data de Início'] != '' else '',
        'data_termino': str(row['Data de Término']) if row['Data de Término'] != '' else '',
        'responsavel': str(row['Responsável']),
        'status': str(row['Status']) if row['Status'] != '' else 'Ativo',
        'observacoes': str(row['Observações']) if row['Observações'] != '' else ''
    })

# 3. Contratos
df_contratos = pd.read_excel(xl_file, sheet_name='CONTRATOS').fillna('')
contratos = []
for _, row in df_contratos.iterrows():
    contratos.append({
        'codigo': str(row['Código do Contrato']),
        'tipo': str(row['Tipo de Contrato']),
        'entidade': str(row['Entidade Envolvida']),
        'objeto': str(row['Objecto do Contrato']),
        'data_assinatura': str(row['Data Assinatura']) if row['Data Assinatura'] != '' else '',
        'data_inicio': str(row['Data Início']) if row['Data Início'] != '' else '',
        'data_fim': str(row['Data Fim']) if row['Data Fim'] != '' else '',
        'valor': None if row['Valor Total'] == '' else float(row['Valor Total']),
        'moeda': str(row['Moeda']),
        'condicoes_pagamento': str(row['Condições de Pagamento']),
        'responsavel': str(row['Responsável']),
        'status': str(row['Status']) if row['Status'] != '' else '',
        'observacoes': str(row['Observações']) if row['Observações'] != '' else ''
    })

# 4. Propostas Comerciais (removida - não será incluída no sistema principal)

# 5. Memorandos
df_memorandos = pd.read_excel(xl_file, sheet_name='MEMORANDOS').fillna('')
memorandos = []
for _, row in df_memorandos.iterrows():
    memorandos.append({
        'numero': str(row['Nº Memorando']),
        'empresa': str(row['Empresa']),
        'data': str(row['Data']) if row['Data'] != '' else '',
        'area_origem': str(row['Área Origem']),
        'destinatario': str(row['Destinatário']),
        'tipo': str(row['Tipo']),
        'objeto': str(row['Objecto do Memorando']),
        'duracao': str(row['Duração']),
        'descricao': str(row['Descrição Resumida']),
        'documento': str(row['Documento Relacionado']),
        'responsavel': str(row['Responsável']),
        'observacoes': str(row['Observações']) if row['Observações'] != '' else ''
    })

# 6. Parcerias e Associações
df_parcerias = pd.read_excel(xl_file, sheet_name='PARCERIAS e ASSOCIAÇÕES').fillna('')
parcerias = []
for _, row in df_parcerias.iterrows():
    parcerias.append({
        'entidade': str(row['Nome da Entidade']),
        'tipo': str(row['Tipo']),
        'area_atuacao': str(row['Área Actuação']),
        'tipo_parceria': str(row['Tipo de Parceria']),
        'beneficios': str(row['Benefícios']),
        'valor': None if row['Valor /Quota'] == '' else float(row['Valor /Quota']),
        'moeda': str(row['Moeda']),
        'periodicidade': str(row['Periodicidade']),
        'data_inicio': str(row['Data Início']) if row['Data Início'] != '' else '',
        'renovacao': str(row['Renovação']),
        'joia': str(row['Jóia']),
        'responsavel': str(row['Responsável']),
        'status': str(row['Status']) if row['Status'] != '' else 'Ativo',
        'observacoes': str(row['Observações']) if row['Observações'] != '' else ''
    })

# Salvar todos os dados
data = {
    'fornecedores': fornecedores,
    'prestadores': prestadores,
    'contratos': contratos,
    'memorandos': memorandos,
    'parcerias': parcerias
}

with open('data/dados_completos.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Dados extraidos com sucesso!")
print("- Fornecedores:", len(fornecedores))
print("- Prestadores:", len(prestadores))
print("- Contratos:", len(contratos))
print("- Memorandos:", len(memorandos))
print("- Parcerias:", len(parcerias))
