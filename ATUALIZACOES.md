# Atualizações de Design - Paleta ALNEZ MS LO

## Alterações Realizadas

### 1. Logo
- Logo ALNEZ MS LO (Picture1.png) adicionado ao navbar
- Tamanho: 55px de altura
- Efeito hover com zoom sutil
- Sombra personalizada para destacar

### 2. Paleta de Cores

#### Cores Principais
- **Primary Color**: `#A0682A` (Bronze/Marrom principal)
- **Primary Dark**: `#704D1F` (Bronze escuro)
- **Primary Light**: `#D4A574` (Bronze claro)
- **Accent Color**: `#E07B39` (Laranja/Bronze)
- **Dark Color**: `#3D2817` (Marrom escuro)
- **Light Color**: `#FFF8F0` (Bege muito claro)
- **Border Color**: `#E8D5C4` (Bege médio)

#### Cores de Status
- **Success**: `#10b981` (Verde mantido)
- **Danger**: `#ef4444` (Vermelho mantido)
- **Warning**: `#E07B39` (Laranja bronze)
- **Info**: `#D4A574` (Bronze claro)

### 3. Componentes Atualizados

#### Navbar
- Gradiente: Bronze (#A0682A) → Bronze Escuro (#704D1F)
- Logo integrado com efeito hover

#### Tabs
- Cor ativa: Bronze (#A0682A)
- Barra inferior com gradiente bronze → laranja
- Espessura: 3px

#### Cards de Estatísticas
- Ícone 1 (Total): Gradiente bronze
- Ícone 2 (Correntes): Verde mantido
- Ícone 3 (Não Correntes): Gradiente laranja
- Ícone 4 (Áreas): Gradiente bronze claro
- Borda superior que aparece no hover (bronze)

#### Cards de Gráficos
- Borda esquerda: 4px bronze
- Efeito hover com elevação
- Título em negrito

#### Gráficos (Chart.js)

**Gráfico de Áreas (Barras)**
```javascript
Cores: ['#A0682A', '#E07B39', '#D4A574', '#704D1F', '#B8935F',
        '#C86A2E', '#8B5A2B', '#F5A962', '#9B7653', '#D9A566']
```

**Gráfico Corrente vs Não Corrente (Rosca)**
```javascript
Cores: ['#10b981' (verde), '#E07B39' (laranja)]
```

**Gráfico de Frequência (Pizza)**
```javascript
Cores: ['#A0682A', '#E07B39', '#D4A574', '#B8935F']
```

#### Tabela
- Hover no cabeçalho: Fundo bege claro (#F5EAE0) + texto bronze
- Hover nas linhas: Fundo bege muito claro (#FFF5EB) + borda esquerda bronze

#### Badges de Status
- **Corrente**: Verde mantido (#d1fae5 fundo, #065f46 texto)
- **Não Corrente**: Laranja claro (#FFE8D6 fundo, #8B4513 texto)

#### Botões
- **Primary**: Bronze (#A0682A)
- **Primary Hover**: Bronze escuro (#704D1F)
- **Success**: Verde mantido
- **Secondary**: Cinza mantido
- **Danger**: Vermelho mantido

#### Seção de Filtros
- Borda superior: 3px bronze claro (#D4A574)

### 4. Efeitos e Animações
- Transições suaves em todos os componentes
- Hover effects com elevação nos cards
- Logo com zoom no hover
- Bordas animadas nos cards

### 5. Background
- Cor de fundo geral: Bege muito claro (#FFF8F0)
- Mantém contraste adequado para legibilidade

## Arquivos Modificados
1. `index.html` - Logo adicionado
2. `css/style.css` - Paleta de cores completa atualizada
3. `js/charts.js` - Cores dos gráficos atualizadas

## Tema Visual
O design agora reflete a identidade visual da ALNEZ MS LO com tons de:
- Bronze/Marrom (tons terrosos e profissionais)
- Laranja (energia e dinamismo)
- Bege claro (elegância e sofisticação)
- Mantém verde para sucesso e vermelho para alertas (padrão universal)

## Compatibilidade
- Mantém responsividade
- Contraste adequado para acessibilidade
- Cores testadas para legibilidade
