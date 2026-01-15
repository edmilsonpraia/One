import pandas as pd
import json

# Read Excel file
df = pd.read_excel('Cópia de MP.CGC.01.DCO - Base Comercial (Fornecedores Prestadores Memorandos Contratos).xlsx',
                   sheet_name=0, header=1)

# Fill NaN values
df = df.fillna('')

# Convert to list of dictionaries
result = []
for _, row in df.iterrows():
    fornecedor = {
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
    }
    result.append(fornecedor)

# Write to JSON file
with open('data/fornecedores.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Convertidos {len(result)} fornecedores para JSON com sucesso!")
