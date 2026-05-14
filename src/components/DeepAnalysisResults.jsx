import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/DeepAnalysisResults.css';

export default function DeepAnalysisResults({ deepAnalysisData, isLoading }) {
  return (
    <div className="deep-analysis-results">
      <div className="results-card deep-card">
        <h2>🩺 Análise Clínica Profunda</h2>
        <p className="subtitle">Insights médicos, correlações e recomendações</p>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner large"></div>
            <p>Processando análise profunda com IA...</p>
          </div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{deepAnalysisData}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
