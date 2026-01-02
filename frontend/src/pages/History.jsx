import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { promptsAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import { exportToJSON, exportToCSV, exportToPDF } from '../services/exportService';
import ResponseCard from '../components/results/ResponseCard';
import ComparisonSummary from '../components/results/ComparisonSummary';

const History = () => {
  const { isAuthenticated } = useAuthStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [viewingDetails, setViewingDetails] = useState(false);

  useEffect(() => {
    fetchHistory();

    // Check if there's a prompt ID in query params
    const promptId = searchParams.get('prompt');
    if (promptId) {
      viewPromptDetails(promptId);
    }
  }, [searchParams]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await promptsAPI.getPrompts({ limit: 50 });
      setPrompts(response.prompts || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const viewPromptDetails = async (promptId) => {
    try {
      const response = await promptsAPI.getPromptById(promptId);
      setSelectedPrompt(response);
      setViewingDetails(true);
    } catch (err) {
      console.error('Error fetching prompt details:', err);
      alert('Failed to load prompt details');
    }
  };

  const handleExport = (format) => {
    if (!selectedPrompt) return;

    const filename = `ai-aggregator-${selectedPrompt.prompt?.id || Date.now()}`;

    switch (format) {
      case 'json':
        exportToJSON(selectedPrompt, filename);
        break;
      case 'csv':
        exportToCSV(selectedPrompt, filename);
        break;
      case 'pdf':
        exportToPDF(selectedPrompt, filename);
        break;
      default:
        console.error('Unknown export format:', format);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
    return statusStyles[status] || statusStyles.completed;
  };

  if (viewingDetails && selectedPrompt) {
    return (
      <main className="container-custom py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setViewingDetails(false);
              navigate('/history');
            }}
            className="text-ink-600 hover:text-ink-900 text-sm flex items-center gap-2"
          >
            ← Back to History
          </button>
        </div>

        <div className="card mb-6">
          <h2 className="text-2xl font-semibold text-ink-900 mb-4">
            Prompt Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-ink-600 mb-1">PROMPT</p>
              <p className="text-ink-900">{selectedPrompt.prompt.promptText}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-ink-600 mb-1">MODELS USED</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPrompt.prompt.aiModels?.map((model) => (
                    <span key={model} className="badge badge-dark text-xs">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-ink-600 mb-1">DATE</p>
                <p className="text-sm text-ink-900">
                  {formatDate(selectedPrompt.prompt.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="card bg-sand-100 border-sand-400 mb-6">
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

        {/* Comparison Summary */}
        {selectedPrompt.summary && (
          <section className="mb-6">
            <ComparisonSummary summary={selectedPrompt.summary} />
          </section>
        )}

        {/* Responses */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-ink-900">
            Responses ({selectedPrompt.responses?.length || 0})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedPrompt.responses?.map((response, index) => (
              <ResponseCard
                key={response.id || index}
                response={response}
                isFirst={index === 0}
                promptText={selectedPrompt.prompt?.promptText}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container-custom py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink-900 mb-2">
          Prompt History
        </h1>
        <p className="text-ink-600">
          View and manage your past prompts and AI responses
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card text-center py-12">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-ink-900" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-lg font-medium text-ink-900">Loading history...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && prompts.length === 0 && (
        <div className="card text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-sand-200 border border-sand-400 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-ink-900 mb-2">
              No prompts yet
            </h3>
            <p className="text-sm text-ink-600 mb-4">
              Start by creating your first prompt on the home page
            </p>
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>
          </div>
        </div>
      )}

      {/* History List */}
      {!loading && !error && prompts.length > 0 && (
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div
              key={prompt._id}
              className="card hover:border-ink-900 transition-colors cursor-pointer"
              onClick={() => viewPromptDetails(prompt._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs px-2 py-1 border ${getStatusBadge(
                        prompt.status
                      )}`}
                    >
                      {prompt.status}
                    </span>
                    <span className="text-xs text-ink-600">
                      {formatDate(prompt.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-ink-900 mb-2 line-clamp-2">
                    {prompt.promptText}
                  </h3>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-ink-600">Models:</span>
                      <div className="flex flex-wrap gap-1">
                        {prompt.aiModels?.map((model) => (
                          <span
                            key={model}
                            className="text-xs px-2 py-0.5 bg-sand-100 text-ink-900 border border-sand-300"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    {prompt.metadata && (
                      <div className="text-ink-600">
                        <span className="font-medium text-ink-900">
                          {prompt.metadata.successfulResponses}
                        </span>
                        /{prompt.metadata.totalResponses} successful
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right ml-4">
                  <button className="text-sm text-ink-600 hover:text-ink-900">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Not Authenticated Notice */}
      {!isAuthenticated && prompts.length > 0 && (
        <div className="card bg-sand-100 border-sand-400 mt-6">
          <p className="text-sm text-ink-700">
            <span className="font-semibold">Note:</span> You're viewing anonymous
            prompts. <Link to="/login" className="text-ink-900 hover:underline">Log in</Link> to save and view your personal prompt history.
          </p>
        </div>
      )}
    </main>
  );
};

export default History;
