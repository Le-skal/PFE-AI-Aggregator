import { useState } from 'react';
import PromptInput from '../components/prompt/PromptInput';
import ResponseCard from '../components/results/ResponseCard';
import ComparisonSummary from '../components/results/ComparisonSummary';
import ScoresChart from '../components/visualization/ScoresChart';
import SimilarityMatrix from '../components/visualization/SimilarityMatrix';
import PerformanceRadar from '../components/visualization/PerformanceRadar';
import WordCloud from '../components/visualization/WordCloud';
import HistorySidebar from '../components/history/HistorySidebar';
import ScoringGuide from '../components/help/ScoringGuide';
import { promptsAPI } from '../services/api';
import { exportToJSON, exportToCSV, exportToPDF } from '../services/exportService';

function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await promptsAPI.createPrompt(data);
      setResults(response);
      console.log('✅ Results:', response);

      // Trigger history sidebar refresh
      setHistoryRefresh(prev => prev + 1);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.response?.data?.message || 'Failed to process prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    if (!results) return;

    const filename = `ai-aggregator-${results.prompt?.id || Date.now()}`;

    switch (format) {
      case 'json':
        exportToJSON(results, filename);
        break;
      case 'csv':
        exportToCSV(results, filename);
        break;
      case 'pdf':
        exportToPDF(results, filename);
        break;
      default:
        console.error('Unknown export format:', format);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 py-8 px-4">
          <div className="space-y-8">
      {/* Prompt Input Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-ink-900">
            AI Response Aggregator
          </h2>
          <p className="text-sm text-ink-600 mt-1">
            Compare responses from multiple AI models and analyze their performance
          </p>
        </div>

        {/* Scientific Scoring Guide */}
        <ScoringGuide />

        <PromptInput onSubmit={handleSubmit} loading={loading} />
      </section>

      {/* Error Message */}
      {error && (
        <div className="border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="card text-center py-12">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-ink-900" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-lg font-medium text-ink-900">
              Aggregating responses from {results?.responses?.length || 'multiple'} AI models...
            </p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && !loading && (
        <>
          {/* Comparison Summary */}
          {results.summary && (
            <section>
              <ComparisonSummary summary={results.summary} />
            </section>
          )}

          {/* Export Section */}
          <section>
            <div className="card bg-sand-100 border-sand-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-ink-900 mb-1">
                    Export Results
                  </h3>
                  <p className="text-xs text-ink-600">
                    Download this analysis in your preferred format
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExport('json')}
                    className="px-4 py-2 border border-ink-900 text-ink-900 text-sm hover:bg-ink-900 hover:text-sand-50 transition-colors"
                    title="Export as JSON"
                  >
                    JSON
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="px-4 py-2 border border-ink-900 text-ink-900 text-sm hover:bg-ink-900 hover:text-sand-50 transition-colors"
                    title="Export as CSV"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="px-4 py-2 bg-ink-900 text-sand-50 text-sm hover:bg-ink-700 transition-colors"
                    title="Export as PDF"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Data Visualization */}
          {results.responses && results.responses.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-ink-900 mb-4">
                Data Visualization
              </h2>

              <div className="space-y-6">
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ScoresChart responses={results.responses} />
                  <PerformanceRadar responses={results.responses} />
                </div>

                {/* Similarity Matrix */}
                {results.summary?.similarityMatrix && (
                  <SimilarityMatrix
                    matrix={results.summary.similarityMatrix}
                    responses={results.responses}
                  />
                )}

                {/* Word Cloud */}
                <WordCloud responses={results.responses} />
              </div>
            </section>
          )}

          {/* Responses */}
          {results.responses && results.responses.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-ink-900 mb-4">
                Responses ({results.responses.length})
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {results.responses.map((response, index) => (
                  <ResponseCard
                    key={response.id || index}
                    response={response}
                    isFirst={index === 0}
                    promptText={results.prompt?.promptText}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Metadata */}
          {results.metadata && (
            <section>
              <div className="card bg-sand-100 border-sand-400">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-ink-600">Processing time:</span>
                    <span className="ml-2 font-medium text-ink-900">
                      {(results.metadata.processingTime / 1000).toFixed(2)}s
                    </span>
                  </div>
                  <div>
                    <span className="text-ink-600">Prompt ID:</span>
                    <span className="ml-2 font-mono text-xs text-ink-900">
                      {results.prompt?.id}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Empty State */}
      {!results && !loading && (
        <div className="card text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-sand-200 border border-sand-400 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-ink-900 mb-2">
              Ready to compare AI responses
            </h3>
            <p className="text-sm text-ink-600">
              Enter a prompt above and select AI models to get started with comparative analysis
            </p>
          </div>
        </div>
      )}
          </div>
        </main>

        {/* Right Sidebar - History */}
        <HistorySidebar refreshTrigger={historyRefresh} />
      </div>
    </div>
  );
}

export default Home;
