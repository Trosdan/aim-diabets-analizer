import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/AnalysisResults.css';

export default function AnalysisResults({ analysisData, onDeepAnalyze, isLoading }) {
  return (
    <div className="analysis-results">
      <div className="results-card">
        <h2>📈 Análise Inicial dos Dados</h2>
        <p className="subtitle">Estatísticas, anomalias e padrões principais identificados</p>

        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisData}</ReactMarkdown>
        </div>

        <button
          onClick={onDeepAnalyze}
          disabled={isLoading}
          className="deep-analyze-button"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Processando análise profunda...
            </>
          ) : (
            '🔬 Análise Clínica Profunda'
          )}
        </button>
      </div>
    </div>
  );
}
