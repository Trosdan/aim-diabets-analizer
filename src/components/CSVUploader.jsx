import { useState } from 'react';
import Papa from 'papaparse';
import { analyzeCSVData, setApiKey } from '../services/aiService';
import '../styles/CSVUploader.css';

export default function CSVUploader({ onAnalysisComplete, onApiKeyChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiKey, setApiKeyState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKeyState(newApiKey);
    if (onApiKeyChange) {
      onApiKeyChange(newApiKey);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Por favor, selecione um arquivo CSV válido');
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!apiKey || apiKey.trim() === '') {
      setError('Por favor, insira a chave de API do Google Gemini');
      return;
    }

    if (!selectedFile) {
      setError('Por favor, selecione um arquivo CSV');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Definir a API key antes de processar
      setApiKey(apiKey);

      // Parse CSV usando Papa Parse
      Papa.parse(selectedFile, {
        header: true,
        complete: async (results) => {
          try {
            // Validar dados
            if (!results.data || results.data.length === 0) {
              throw new Error('O arquivo CSV está vazio');
            }

            // Remover linhas vazias
            const cleanData = results.data.filter(row =>
              Object.values(row).some(val => val !== null && val !== '')
            );

            if (cleanData.length === 0) {
              throw new Error('Nenhum dado válido encontrado no CSV');
            }

            // Chamar análise de IA
            const analysis = await analyzeCSVData(cleanData);

            // Passar dados e análise para o componente pai
            onAnalysisComplete({
              csvData: cleanData,
              firstAnalysis: analysis,
            });
          } catch (err) {
            setError(`Erro ao processar dados: ${err.message}`);
            setIsLoading(false);
          }
        },
        error: (error) => {
          setError(`Erro ao fazer parse do CSV: ${error.message}`);
          setIsLoading(false);
        },
      });
    } catch (err) {
      setError(`Erro ao analisar arquivo: ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="csv-uploader">
      <div className="uploader-card">
        <h2>📊 Analisador de Dados de Diabetes</h2>
        <p className="subtitle">Carregue um arquivo CSV com dados de pacientes</p>

        <div className="api-key-input-wrapper">
          <label htmlFor="api-key-input" className="api-key-label">
            🔑 Chave de API do Google Gemini
          </label>
          <input
            type="password"
            id="api-key-input"
            className="api-key-input"
            placeholder="Insira sua chave de API (ex: AIza...)"
            value={apiKey}
            onChange={handleApiKeyChange}
            disabled={isLoading}
          />
          <small className="api-key-hint">Obtenha sua chave em: https://aistudio.google.com/app/apikey</small>
        </div>

        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
            id="csv-file-input"
          />
          <label htmlFor="csv-file-input" className="file-label">
            {selectedFile ? `✓ ${selectedFile.name}` : 'Escolher arquivo CSV'}
          </label>
        </div>

        {error && <div className="error-message">❌ {error}</div>}

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isLoading}
          className="analyze-button"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Processando...
            </>
          ) : (
            '🔍 Processar e Analisar'
          )}
        </button>

        <div className="info-box">
          <p>
            <strong>Colunas esperadas no CSV:</strong> Pregnancies, Glucose,
            BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction,
            Age, Outcome
          </p>
        </div>
      </div>
    </div>
  );
}
