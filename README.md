# Sistema de Gestão de Fornecedores

Sistema web completo para gestão de fornecedores, desenvolvido com HTML, CSS e JavaScript puro.

## Funcionalidades

### Dashboard
- Estatísticas em tempo real (total de fornecedores, correntes, não correntes, áreas)
- Gráficos interativos:
  - Fornecedores por área (gráfico de barras)
  - Corrente vs Não Corrente (gráfico de rosca)
  - Frequência de pagamento (gráfico de pizza)

### Gestão de Fornecedores
- Tabela interativa com todos os fornecedores
- Pesquisa em tempo real (por código, nome, produto, área, responsável)
- Filtros múltiplos:
  - Por status (Corrente/Não Corrente)
  - Por área
  - Por frequência de pagamento
- Ordenação por colunas (clique no cabeçalho)
- Paginação (10 itens por página)

### CRUD Completo
- Adicionar novo fornecedor
- Editar fornecedor existente
- Excluir fornecedor (com confirmação)
- Validação de formulários

### Exportação
- Exportar todos os dados para Excel
- Exportar dados filtrados para Excel
- Relatório de estatísticas

## Estrutura do Projeto

```
Yara/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos da aplicação
├── js/
│   ├── data.js            # Gerenciamento de dados (localStorage)
│   ├── app.js             # Lógica principal da aplicação
│   ├── charts.js          # Configuração dos gráficos
│   └── export.js          # Funcionalidades de exportação
├── data/
│   └── fornecedores.json  # Dados dos fornecedores
└── README.md              # Este arquivo
```

## Como Usar

### 1. Abrir o Aplicativo
Simplesmente abra o arquivo `index.html` em um navegador web moderno (Chrome, Firefox, Edge).

### 2. Navegação

#### Dashboard
- Visualize estatísticas gerais
- Analise gráficos interativos
- Passe o mouse sobre os gráficos para ver detalhes

#### Fornecedores
- Veja a lista completa de fornecedores
- Use a barra de pesquisa para encontrar fornecedores
- Aplique filtros para refinar a busca
- Clique nos cabeçalhos das colunas para ordenar

### 3. Adicionar Fornecedor
1. Clique no botão "Novo Fornecedor" no topo da página
2. Preencha o formulário com os dados
3. Clique em "Salvar"

### 4. Editar Fornecedor
1. Na tabela de fornecedores, clique no ícone de lápis (editar)
2. Modifique os dados desejados
3. Clique em "Salvar"

### 5. Excluir Fornecedor
1. Na tabela de fornecedores, clique no ícone de lixeira (excluir)
2. Confirme a exclusão

### 6. Exportar Dados
- Clique em "Exportar Excel" no topo para exportar todos os dados
- O arquivo Excel será baixado automaticamente

## Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Lógica da aplicação
- **Chart.js** - Gráficos interativos
- **SheetJS (XLSX)** - Exportação para Excel
- **LocalStorage** - Armazenamento local dos dados

## Recursos Adicionais

### Armazenamento de Dados
- Os dados são salvos automaticamente no localStorage do navegador
- Não há necessidade de servidor ou banco de dados
- Os dados persistem mesmo após fechar o navegador

### Design Responsivo
- Funciona em desktop, tablet e mobile
- Interface adaptativa para diferentes tamanhos de tela

### Performance
- Aplicação leve e rápida
- Carregamento instantâneo
- Sem dependências de servidor

## Atalhos e Dicas

1. **Pesquisa Rápida**: Digite qualquer parte do código, nome, produto ou área na barra de pesquisa
2. **Ordenação**: Clique no cabeçalho de qualquer coluna para ordenar
3. **Filtros Múltiplos**: Combine vários filtros para busca precisa
4. **Paginação**: Use os botões na parte inferior para navegar entre páginas
5. **Modal**: Clique fora do modal para fechá-lo rapidamente

## Campos do Formulário

### Obrigatórios (*)
- Código do Fornecedor
- Tipo
- Nome do Fornecedor
- Corrente/Não Corrente
- Área que Atende
- Produto ou Serviço
- Frequência
- Moeda
- Forma de Pagamento
- Responsável Interno

### Opcionais
- Valor Estimado/Fixo
- Data de Início
- Status
- Observações

## Backup e Restauração

### Fazer Backup
1. Clique em "Exportar Excel"
2. Guarde o arquivo em local seguro

### Restaurar Dados
Os dados estão salvos no localStorage do navegador. Para transferir para outro computador:
1. Exporte os dados do computador original
2. No novo computador, adicione os fornecedores manualmente ou use a função de importação

## Solução de Problemas

### Os dados desapareceram
- Verifique se está usando o mesmo navegador
- O localStorage é específico de cada navegador
- Limpar cache/cookies pode apagar os dados

### Gráficos não aparecem
- Verifique sua conexão com a internet (Chart.js é carregado via CDN)
- Atualize a página

### Exportação não funciona
- Verifique sua conexão com a internet (XLSX é carregado via CDN)
- Verifique se o navegador permite downloads

## Navegadores Suportados

- Google Chrome (recomendado)
- Microsoft Edge
- Mozilla Firefox
- Safari
- Opera

## Autor

Sistema desenvolvido com Claude Code

## Data

Janeiro 2026
