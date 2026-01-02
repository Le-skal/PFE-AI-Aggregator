import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { promptsAPI } from '../../services/api';

const HistorySidebar = ({ refreshTrigger = 0 }) => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPrompts();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  const fetchRecentPrompts = async () => {
    try {
      const response = await promptsAPI.getPrompts({ limit: 5 });
      setPrompts(response.prompts || []);
    } catch (err) {
      console.error('Error fetching recent prompts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const viewDetails = (promptId) => {
    navigate(`/history?prompt=${promptId}`);
  };

  if (loading) {
    return (
      <aside className="w-80 border border-sand-300 bg-sand-50 p-4">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">Recent Prompts</h3>
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin h-6 w-6 text-ink-900" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </aside>
    );
  }

  if (prompts.length === 0) {
    return (
      <aside className="w-80 border border-sand-300 bg-sand-50 p-4">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">Recent Prompts</h3>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-sand-200 border border-sand-400 mx-auto mb-3"></div>
          <p className="text-xs text-ink-600">No prompts yet</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border border-sand-300 bg-sand-50 p-4 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-ink-900 mb-4">Recent Prompts</h3>

      {/* Prompts List */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {prompts.map((prompt) => (
          <div
            key={prompt._id}
            className="border border-sand-300 bg-white p-3 hover:border-ink-900 transition-colors cursor-pointer"
            onClick={() => viewDetails(prompt._id)}
          >
            {/* Date */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ink-600">
                {formatDate(prompt.createdAt)}
              </span>
              <span className={`text-xs px-1.5 py-0.5 border ${
                prompt.status === 'completed'
                  ? 'bg-green-50 text-green-700 border-green-300'
                  : 'bg-red-50 text-red-700 border-red-300'
              }`}>
                {prompt.status}
              </span>
            </div>

            {/* Prompt Text */}
            <p className="text-xs text-ink-900 mb-2 line-clamp-2">
              {truncateText(prompt.promptText)}
            </p>

            {/* Winner Badge */}
            {prompt.summary?.bestResponse && (
              <div className="bg-ink-900 text-sand-50 p-2 rounded mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-sand-400">WINNER</p>
                    <p className="text-xs font-semibold">{prompt.summary.bestResponse.model}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{prompt.summary.bestResponse.compositeScore}</p>
                    <p className="text-[9px] text-sand-400">/100</p>
                  </div>
                </div>
              </div>
            )}

            {/* Models */}
            <div className="flex flex-wrap gap-1 mb-2">
              {prompt.aiModels?.slice(0, 3).map((model) => (
                <span
                  key={model}
                  className="text-xs px-1.5 py-0.5 bg-sand-100 text-ink-700 border border-sand-300"
                >
                  {model}
                </span>
              ))}
              {prompt.aiModels?.length > 3 && (
                <span className="text-xs text-ink-600">
                  +{prompt.aiModels.length - 3}
                </span>
              )}
            </div>

            {/* View Details Button */}
            <button
              className="text-xs text-ink-600 hover:text-ink-900 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                viewDetails(prompt._id);
              }}
            >
              View Details →
            </button>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="pt-4 mt-4 border-t border-sand-300">
        <Link
          to="/history"
          className="block w-full text-center px-4 py-2 border border-ink-900 text-ink-900 text-sm hover:bg-ink-900 hover:text-sand-50 transition-colors"
        >
          View More
        </Link>
      </div>
    </aside>
  );
};

export default HistorySidebar;
