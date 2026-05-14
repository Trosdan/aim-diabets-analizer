import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';

let model = null;
let currentApiKey = null;

/**
 * Cria uma instância do modelo Gemini com a API key fornecida
 */
function createModel(apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error(
      'API Key do Google Gemini não foi fornecida. ' +
      'Por favor, insira a chave de API na tela inicial.'
    );
  }

  return new ChatGoogleGenerativeAI({
    apiKey: String(apiKey),
    model: 'gemini-flash-latest',
    temperature: 0.7,
  });
}

/**
 * Define o modelo para usar uma API key específica
 */
export function setApiKey(apiKey) {
  if (apiKey !== currentApiKey) {
    currentApiKey = apiKey;
    model = null; // Reset model para forçar criação com nova chave
  }
}

/**
 * Inicializa o modelo Gemini de forma lazy
 */
function getModel() {
  if (model) return model;

  // Primeiro tentar usar a chave fornecida pelo usuário
  let apiKey = currentApiKey;
  
  // Se não tiver chave do usuário, tentar usar do .env
  if (!apiKey) {
    apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  }

  if (!apiKey) {
    throw new Error(
      'API Key do Google Gemini não foi fornecida. ' +
      'Por favor, insira a chave de API na tela inicial ou configure VITE_GEMINI_API_KEY no .env.'
    );
  }

  model = createModel(apiKey);
  return model;
}

/**
 * Realiza a primeira análise dos dados de diabetes
 * Extrai estatísticas básicas, anomalias e padrões principais
 */
export async function analyzeCSVData(jsonData) {
  try {
    if (!jsonData || jsonData.length === 0) {
      throw new Error('Nenhum dado foi fornecido para análise');
    }

    const model = getModel();

    // Preparar dados resumidos para não exceder token limit
    const summary = createDataSummary(jsonData);

    const prompt = `Você é um especialista em análise de dados de saúde e diabetes. 
Analise os seguintes dados de pacientes com diabetes e forneça:

1. **Estatísticas Básicas**: 
   - Média, mediana e range para cada coluna numérica
   - Distribuição de resultados positivos vs. negativos

2. **Valores Anômalos e Preocupantes**:
   - Identifique valores extremos que necessitem atenção
   - Campos com muitos valores zero (dados faltantes)

3. **Padrões Principais**:
   - Características mais comuns em pacientes com diabetes (Outcome=1)
   - Características mais comuns em pacientes sem diabetes (Outcome=0)

Dados resumidos:
${JSON.stringify(summary, null, 2)}

Forneça a resposta em formato claro, com seções bem definidas. Use markdown para melhor legibilidade.`;

    const response = await model.invoke([
      new HumanMessage(prompt),
    ]);

    return response.content;
  } catch (error) {
    console.error('Erro na análise inicial:', error);
    throw new Error(`Falha na análise inicial: ${error.message}`);
  }
}

/**
 * Realiza uma análise mais profunda dos resultados anteriores
 * Fornece insights clínicos, correlações e recomendações
 */
export async function deepAnalyzeResults(firstAnalysis, jsonData) {
  try {
    const model = getModel();
    const summary = createDataSummary(jsonData);

    const prompt = `Você é um médico e cientista de dados especializado em diabetes.

Com base na seguinte análise inicial e nos dados brutos fornecidos, forneça uma análise clínica mais aprofundada:

## Análise Inicial:
${firstAnalysis}

## Dados Resumidos:
${JSON.stringify(summary, null, 2)}

Agora, forneça:

1. **Insights Clínicos Profundos**:
   - Correlações entre variáveis (ex: Glucose + BMI, Age + Insulin)
   - Grupos de risco identificados
   - Fatores de risco mais significativos para diabetes

2. **Recomendações Médicas**:
   - Intervenções preventivas baseadas nos dados
   - Monitoramento necessário para grupos de risco
   - Estilo de vida e medicações recomendadas

3. **Conclusões e Prognóstico**:
   - Tendências gerais da população analisada
   - Previsões sobre progressão da doença
   - Ações imediatas recomendadas

Forneça a resposta de forma estruturada, em português, com linguagem clara e acessível.`;

    const response = await model.invoke([
      new HumanMessage(prompt),
    ]);

    return response.content;
  } catch (error) {
    console.error('Erro na análise profunda:', error);
    throw new Error(`Falha na análise profunda: ${error.message}`);
  }
}

/**
 * Cria um resumo dos dados para evitar exceder token limit
 */
function createDataSummary(data) {
  const columns = Object.keys(data[0]);
  const summary = {
    totalRecords: data.length,
    positiveOutcome: data.filter(d => d.Outcome === 1 || d.Outcome === '1').length,
    negativeOutcome: data.filter(d => d.Outcome === 0 || d.Outcome === '0').length,
    columns: {},
  };

  columns.forEach(col => {
    const values = data.map(d => parseFloat(d[col])).filter(v => !isNaN(v));

    if (values.length > 0) {
      values.sort((a, b) => a - b);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const median = values[Math.floor(values.length / 2)];
      const min = values[0];
      const max = values[values.length - 1];
      const zeroCount = data.filter(d => d[col] === '0' || d[col] === 0).length;

      summary.columns[col] = {
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        min: min.toFixed(2),
        max: max.toFixed(2),
        zeroCount: zeroCount,
        type: col === 'Outcome' ? 'categorical' : 'numeric',
      };
    }
  });

  return summary;
}
