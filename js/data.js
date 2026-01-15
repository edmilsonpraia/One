// ===== Data Management Module =====

// Storage key
const STORAGE_KEY = 'fornecedores_data';

// Initialize data from localStorage or use default data
let fornecedoresData = [];

// Load data from localStorage
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        fornecedoresData = JSON.parse(stored);
    } else {
        // Initialize with default data
        fornecedoresData = getDefaultData();
        saveData();
    }
    return fornecedoresData;
}

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fornecedoresData));
}

// Get all fornecedores
function getAllFornecedores() {
    return fornecedoresData;
}

// Get fornecedor by codigo
function getFornecedorByCodigo(codigo) {
    return fornecedoresData.find(f => f.codigo === codigo);
}

// Add new fornecedor
function addFornecedor(fornecedor) {
    fornecedoresData.push(fornecedor);
    saveData();
}

// Update fornecedor
function updateFornecedor(codigo, updatedData) {
    const index = fornecedoresData.findIndex(f => f.codigo === codigo);
    if (index !== -1) {
        fornecedoresData[index] = { ...fornecedoresData[index], ...updatedData };
        saveData();
        return true;
    }
    return false;
}

// Delete fornecedor
function deleteFornecedor(codigo) {
    const index = fornecedoresData.findIndex(f => f.codigo === codigo);
    if (index !== -1) {
        fornecedoresData.splice(index, 1);
        saveData();
        return true;
    }
    return false;
}

// Get statistics
function getStatistics() {
    const total = fornecedoresData.length;
    const correntes = fornecedoresData.filter(f => f.corrente === 'corrente').length;
    const naoCorrentes = fornecedoresData.filter(f => f.corrente === 'não corrente').length;

    // Count unique areas
    const areas = new Set(fornecedoresData.map(f => f.area));
    const totalAreas = areas.size;

    // Count by area
    const byArea = {};
    fornecedoresData.forEach(f => {
        byArea[f.area] = (byArea[f.area] || 0) + 1;
    });

    // Count by frequency
    const byFrequency = {};
    fornecedoresData.forEach(f => {
        byFrequency[f.frequencia] = (byFrequency[f.frequencia] || 0) + 1;
    });

    return {
        total,
        correntes,
        naoCorrentes,
        totalAreas,
        byArea,
        byFrequency
    };
}

// Get unique values for filters
function getUniqueAreas() {
    return [...new Set(fornecedoresData.map(f => f.area))].sort();
}

function getUniqueResponsaveis() {
    return [...new Set(fornecedoresData.map(f => f.responsavel))].sort();
}

// Default data (initial data from Excel)
function getDefaultData() {
    return [
        {
            codigo: "F007",
            tipo: "Original",
            nome: "PEALZ, LDA",
            corrente: "corrente",
            area: "D. Adminstrativa",
            produto: "Segrança",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F0013",
            tipo: "Original",
            nome: "EPAL",
            corrente: "corrente",
            area: "D. Adminstrativa",
            produto: "Agua",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F020",
            tipo: "Original",
            nome: "ENDE",
            corrente: "corrente",
            area: "D. Adminstrativa",
            produto: "Electricidade",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F072",
            tipo: "Original",
            nome: "LIDERANÇA",
            corrente: "corrente",
            area: "D. Adminstrativa",
            produto: "Desinfestaçao",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F144",
            tipo: "Original",
            nome: "SAFILMA",
            corrente: "não corrente",
            area: "D. Adminstrativa",
            produto: "Prestacao de serviço",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F153",
            tipo: "Original",
            nome: "VISTA WASTE Management, Lda",
            corrente: "corrente",
            area: "D. Adminstrativa",
            produto: "Residios",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F163",
            tipo: "Original",
            nome: "RELVAMAX",
            corrente: "não corrente",
            area: "D. Adminstrativa",
            produto: "Fornecimento de relva",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F169",
            tipo: "Original",
            nome: "AGOALFREDO, LDA",
            corrente: "não corrente",
            area: "D. Adminstrativa",
            produto: "Mobilias",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F178",
            tipo: "Original",
            nome: "FAMA-MAS-COMERCIO GERAL",
            corrente: "não corrente",
            area: "D. Adminstrativa",
            produto: "Materias de escitorios",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F187",
            tipo: "Original",
            nome: "ZAMBA DIALLO",
            corrente: "não corrente",
            area: "D. Adminstrativa",
            produto: "Materias de escitorios",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F016",
            tipo: "Original",
            nome: "LUZOFARMA",
            corrente: "não corrente",
            area: "SAMA",
            produto: "Medicamentos",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F017",
            tipo: "Original",
            nome: "KALEMBATEC, LDA",
            corrente: "corrente",
            area: "TI",
            produto: "Serviço Primavera",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F031",
            tipo: "Original",
            nome: "SINFIC SA",
            corrente: "não corrente",
            area: "TI",
            produto: "Licença de software",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Dangereux Antonio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F042",
            tipo: "Original",
            nome: "NCR",
            corrente: "não corrente",
            area: "TI",
            produto: "Materias informaticos",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F064",
            tipo: "Original",
            nome: "ANBC Tecnologies & Solutions",
            corrente: "não corrente",
            area: "TI",
            produto: "Botas de segurança",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Emanual Oliveira",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F071",
            tipo: "Original",
            nome: "ELIAMA PINTO",
            corrente: "não corrente",
            area: "TI",
            produto: "Comercio Geral",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Pedro Cristovao",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F117",
            tipo: "Original",
            nome: "ZAP Media, S.A",
            corrente: "corrente",
            area: "TI",
            produto: "Comunicaçao e internet",
            frequencia: "trimestral",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F113",
            tipo: "Original",
            nome: "BUREAU VERITAS",
            corrente: "não corrente",
            area: "TI",
            produto: "Sistemas de gestao",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Emanual Oliveira",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F135",
            tipo: "Original",
            nome: "GSAPLATFORM,LDA",
            corrente: "não corrente",
            area: "TI",
            produto: "Consultoria de imagem",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Pedro Cristovao",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F157",
            tipo: "Original",
            nome: "IGJM Comercio Geral, Lda",
            corrente: "não corrente",
            area: "TI",
            produto: "Serviço Primavera",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Bruno Cabenda",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F143",
            tipo: "Original",
            nome: "PRINTONE",
            corrente: "corrente",
            area: "TI",
            produto: "Aluguer de impressora",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Pedro Cristovao",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F155",
            tipo: "Original",
            nome: "GERIVAS GRUPO, LDA",
            corrente: "não corrente",
            area: "TI",
            produto: "Materias informaticos",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Pedro Cristovao",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F036",
            tipo: "Original",
            nome: "LIDER MOBILE COMERCIO VEICULOS",
            corrente: "corrente",
            area: "D. Transportes",
            produto: "Manutençao de Viaturas",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Dangereux Antonio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F091",
            tipo: "Original",
            nome: "Sicomex, LDA",
            corrente: "não corrente",
            area: "D. Transportes",
            produto: "Viaturas",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F152",
            tipo: "Original",
            nome: "ANGOLAUTO, S.A",
            corrente: "não corrente",
            area: "D. Transportes",
            produto: "Manutençao de Viaturas",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Dangereux Antonio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F182",
            tipo: "Original",
            nome: "E.CHABANGO DIAMANTE",
            corrente: "não corrente",
            area: "D. Transportes",
            produto: "Aluguer de Viaturas",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Dangereux Antonio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F190",
            tipo: "Original",
            nome: "MV-GPS- Soluçao Tecnica",
            corrente: "não corrente",
            area: "D. Transportes",
            produto: "Serviço de GPS",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Dangereux Antonio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "FE005",
            tipo: "Original",
            nome: "SOGEPOWER LDA",
            corrente: "não corrente",
            area: "D. Transportes",
            produto: "Viaturas",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Dangereux Antonio",
            data_inicio: null,
            status: "",
            observacoes: ""
        },
        {
            codigo: "F179",
            tipo: "Original",
            nome: "KDG WORLDWIDE",
            corrente: "não corrente",
            area: "D. Transportes",
            produto: "Comercializaçao d. viaturas",
            frequencia: "mensal",
            valor: null,
            moeda: "AOA",
            pagamento: "Transferencia",
            responsavel: "Victorino Ambrosio",
            data_inicio: null,
            status: "",
            observacoes: ""
        }
    ];
}

// Initialize data on load
loadData();
