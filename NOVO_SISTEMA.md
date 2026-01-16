# Sistema de Gestão Comercial - Versão Completa

## O que foi criado

Sistema web profissional e minimalista para gestão completa de:
- ✅ **59 Fornecedores**
- ✅ **4 Prestadores de Serviços**
- ✅ **2 Contratos**
- ✅ **17 Memorandos**
- ✅ **4 Parcerias e Associações**

## Arquivos Criados

### HTML
- `index_novo.html` - Nova interface completa com 6 abas

### CSS
- `css/style.css` - Estilos originais (mantidos)
- `css/style-adicional.css` - Estilos novos para módulos adicionais

### JavaScript
- `js/data-manager.js` - Gerenciador unificado de dados
- `js/app-novo.js` - Controller principal da aplicação
- `js/forms.js` - Gerador de formulários para cada módulo
- `js/charts-novo.js` - Gráficos atualizados
- `js/export-novo.js` - Exportação para Excel

### Dados
- `data/dados_completos.json` - Todos os dados extraídos do Excel

### Scripts
- `extract_all_data.py` - Script Python para extrair dados do Excel

## Funcionalidades

### Dashboard
- 6 cards de estatísticas (Fornecedores, Prestadores, Contratos, Memorandos, Parcerias, Total)
- 3 gráficos interativos:
  - Distribuição por Categoria (Rosca)
  - Fornecedores por Área (Barras)
  - Status Geral (Barras agrupadas)

### Módulos (5 abas)

#### 1. Fornecedores
- Tabela com pesquisa e filtros (status, área)
- CRUD completo (Criar, Ler, Atualizar, Deletar)
- Campos: Código, Tipo, Nome, Status, Área, Produto/Serviço, etc.

#### 2. Prestadores de Serviços
- Gestão de prestadores externos
- Campos: Código, Nome/Empresa, Tipo Serviço, Área, Periodicidade, etc.

#### 3. Contratos
- Controle de contratos
- Campos: Código, Tipo, Entidade, Objeto, Datas, Valor, etc.

#### 4. Memorandos
- Gestão de memorandos internos
- Campos: Nº, Empresa, Data, Área Origem, Destinatário, Objeto, etc.

#### 5. Parcerias e Associações
- Controle de parcerias
- Campos: Entidade, Tipo, Área Atuação, Benefícios, Valor/Quota, etc.

### Recursos Gerais
- Pesquisa em tempo real em todos os módulos
- Filtros personalizados por módulo
- Formulários modais para adicionar/editar registros
- Validação de campos obrigatórios
- Notificações de sucesso/erro
- Exportação completa para Excel (todas as abas)
- Design responsivo (funciona em desktop, tablet, mobile)
- Armazenamento local (localStorage)
- Cores personalizadas ALNEZ MS LO (bronze/marrom/laranja)

## Como Ativar o Novo Sistema

### Opção 1: Substituir index.html
```bash
cp index.html index_antigo.html
cp index_novo.html index.html
```

### Opção 2: Abrir direto
Abra o arquivo `index_novo.html` no navegador

## Estrutura de Dados

Todos os dados são salvos no localStorage do navegador:
- `fornecedores_data`
- `prestadores_data`
- `contratos_data`
- `memorandos_data`
- `parcerias_data`

## Design

### Paleta de Cores
- **Primary**: `#A0682A` (Bronze)
- **Accent**: `#E07B39` (Laranja)
- **Success**: `#10b981` (Verde)
- **Info**: `#D4A574` (Bronze claro)

### Tipografia
- Font: Segoe UI, sans-serif
- Design minimalista e profissional
- Ícones: Font Awesome 6.4.0

## Diferenças do Sistema Antigo

### Sistema Antigo
- 2 abas (Dashboard + Fornecedores)
- 59 fornecedores
- 3 gráficos básicos

### Sistema Novo
- 6 abas (Dashboard + 5 módulos)
- 86 registros totais
- Dashboard expandido
- 5 módulos completos com CRUD
- Interface mais moderna e limpa
- Exportação unificada

## Navegadores Suportados
- Chrome/Edge (recomendado)
- Firefox
- Safari
- Opera

## Requisitos
- Navegador moderno
- JavaScript habilitado
- Conexão com internet (para CDNs: Chart.js, XLSX, Font Awesome)

## Próximos Passos Sugeridos
1. Testar o novo sistema abrindo `index_novo.html`
2. Verificar se todos os dados foram importados
3. Fazer backup do sistema antigo
4. Substituir `index.html` por `index_novo.html`
5. Fazer commit no Git

## Observações
- O sistema antigo (`index.html`) foi mantido intacto
- Todos os dados originais estão preservados
- É possível reverter para o sistema antigo a qualquer momento
