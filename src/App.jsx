import { useState } from 'react';
import CSVUploader from './components/CSVUploader';
import AnalysisResults from './components/AnalysisResults';
import DeepAnalysisResults from './components/DeepAnalysisResults';
import { deepAnalyzeResults } from './services/aiService';
import './App.css';

function App() {
  const [stage, setStage] = useState('upload'); // upload | analyzed | deep
  const [apiKey, setApiKey] = useState('');
  const [csvData, setCsvData] = useState(null);
  const [firstAnalysis, setFirstAnalysis] = useState(null);
  const [deepAnalysis, setDeepAnalysis] = useState(null);
  const [deepAnalysisLoading, setDeepAnalysisLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
  };

  const handleAnalysisComplete = ({ csvData: data, firstAnalysis: analysis }) => {
    setCsvData(data);
    setFirstAnalysis(analysis);
    setStage('analyzed');
    setError(null);
  };

  const handleDeepAnalyze = async () => {
    setDeepAnalysisLoading(true);
    setError(null);

    try {
      const deepAnalysisResult = await deepAnalyzeResults(firstAnalysis, csvData);
      setDeepAnalysis(deepAnalysisResult);
      setStage('deep');
    } catch (err) {
      setError(`Erro na análise profunda: ${err.message}`);
    } finally {
      setDeepAnalysisLoading(false);
    }
  };

  const handleReset = () => {
    setStage('upload');
    setCsvData(null);
    setFirstAnalysis(null);
    setDeepAnalysis(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏥 Diabetes Data Analyzer</h1>
        <p>Análise inteligente de dados de diabetes com IA Gemini</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="global-error">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Fechar</button>
          </div>
        )}

        {stage === 'upload' && (
          <CSVUploader 
            onAnalysisComplete={handleAnalysisComplete}
            onApiKeyChange={handleApiKeyChange}
          />
        )}

        {stage === 'analyzed' && (
          <>
            <AnalysisResults
              analysisData={firstAnalysis}
              onDeepAnalyze={handleDeepAnalyze}
              isLoading={deepAnalysisLoading}
            />
            <button onClick={handleReset} className="reset-button">
              ← Voltar para Upload
            </button>
          </>
        )}

        {stage === 'deep' && (
          <>
            <DeepAnalysisResults
              deepAnalysisData={deepAnalysis}
              isLoading={deepAnalysisLoading}
            />
            <div className="action-buttons">
              <button onClick={handleReset} className="reset-button">
                ← Novo Arquivo
              </button>
              <button onClick={() => setStage('analyzed')} className="back-button">
                ← Voltar à Análise Inicial
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Desenvolvido com React + Vite + LangChain + Gemini |{' '}
          <strong>Análise de Diabetes 2026</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
