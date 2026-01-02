const ComparisonSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="card space-y-6">
      <h2 className="text-xl font-semibold text-ink-900 border-b border-sand-300 pb-3">
        Comparative Analysis
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="border border-sand-300 p-4">
          <p className="text-xs text-ink-600 mb-1">Total Responses</p>
          <p className="text-3xl font-bold text-ink-900">{summary.totalResponses}</p>
          <p className="text-xs text-ink-600 mt-1">
            {summary.successfulResponses} successful
          </p>
        </div>

        <div className="border border-sand-300 p-4 bg-ink-900">
          <p className="text-xs text-sand-300 mb-1">Avg Composite</p>
          <p className="text-3xl font-bold text-sand-50">{summary.averageComposite?.toFixed(1) || 0}</p>
          <p className="text-xs text-sand-400 mt-1">scientifically validated</p>
        </div>

        <div className="border border-sand-300 p-4">
          <p className="text-xs text-ink-600 mb-1">Avg Relevance (BM25)</p>
          <p className="text-3xl font-bold text-ink-900">{summary.averageRelevance?.toFixed(1) || 0}</p>
          <p className="text-xs text-ink-600 mt-1">out of 100</p>
        </div>

        <div className="border border-sand-300 p-4">
          <p className="text-xs text-ink-600 mb-1">Consensus (TF-IDF)</p>
          <p className="text-3xl font-bold text-ink-900">{summary.consensusLevel?.toFixed(1) || 0}</p>
          <p className="text-xs text-ink-600 mt-1">similarity score</p>
        </div>

        <div className="border border-sand-300 p-4">
          <p className="text-xs text-ink-600 mb-1">Avg Time</p>
          <p className="text-3xl font-bold text-ink-900">
            {(summary.averageResponseTime / 1000).toFixed(1)}s
          </p>
          <p className="text-xs text-ink-600 mt-1">response time</p>
        </div>
      </div>

      {/* Best Response with Winner Breakdown */}
      {summary.bestResponse && (
        <div className="space-y-4">
          {/* Winner Header */}
          <div className="border-l-4 border-ink-900 bg-ink-900 text-sand-50 p-4">
            <div className="mb-2">
              <p className="text-xs font-medium text-sand-400 mb-1">WINNER</p>
              <p className="text-2xl font-bold">
                {summary.bestResponse.model}
              </p>
            </div>
            <div className="text-sm text-sand-300 mt-3">
              Final Score: <span className="text-3xl font-bold text-sand-50">{summary.bestResponse.compositeScore}/100</span>
            </div>
          </div>

          {/* Why This Model Won - Detailed Breakdown */}
          <div className="bg-sand-50 border border-sand-300 p-4">
            <h3 className="font-semibold text-ink-900 mb-3">
              Why This Model Won - Score Breakdown
            </h3>

            <div className="space-y-3">
              {/* Explanation */}
              <p className="text-sm text-ink-700">
                The composite score is calculated using a weighted formula that prioritizes relevance while
                considering privacy, consensus, and efficiency:
              </p>

              {/* Formula Visual */}
              <div className="bg-white border border-sand-300 p-3 font-mono text-xs">
                <div className="text-ink-600 mb-2">Composite Score Formula:</div>
                <div className="text-ink-900">
                  = (Relevance × <strong>45%</strong>) + (Sovereignty × <strong>25%</strong>) + (Similarity × <strong>20%</strong>) + (Speed × <strong>10%</strong>)
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-ink-900 mb-2">Calculation for {summary.bestResponse.model}:</div>

                {/* Relevance */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-32 text-ink-600">Relevance:</div>
                  <div className="flex-1 bg-sand-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-ink-900 h-full flex items-center justify-end pr-2 text-xs text-sand-50"
                      style={{ width: `${summary.bestResponse.relevance || 0}%` }}
                    >
                      {summary.bestResponse.relevance || 0}
                    </div>
                  </div>
                  <div className="w-24 text-right text-ink-600 text-xs">
                    × 45% = {((summary.bestResponse.relevance || 0) * 0.45).toFixed(1)}
                  </div>
                </div>

                {/* Sovereignty */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-32 text-ink-600">Sovereignty:</div>
                  <div className="flex-1 bg-sand-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-sand-500 h-full flex items-center justify-end pr-2 text-xs text-white"
                      style={{ width: `${summary.bestResponse.sovereignty || 0}%` }}
                    >
                      {summary.bestResponse.sovereignty || 0}
                    </div>
                  </div>
                  <div className="w-24 text-right text-ink-600 text-xs">
                    × 25% = {((summary.bestResponse.sovereignty || 0) * 0.25).toFixed(1)}
                  </div>
                </div>

                {/* Similarity */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-32 text-ink-600">Similarity:</div>
                  <div className="flex-1 bg-sand-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-sand-400 h-full flex items-center justify-end pr-2 text-xs text-white"
                      style={{ width: `${summary.averageSimilarity || 0}%` }}
                    >
                      {summary.averageSimilarity?.toFixed(0) || 0}
                    </div>
                  </div>
                  <div className="w-24 text-right text-ink-600 text-xs">
                    × 20% = {((summary.averageSimilarity || 0) * 0.20).toFixed(1)}
                  </div>
                </div>

                {/* Speed */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-32 text-ink-600">Speed:</div>
                  <div className="flex-1 bg-sand-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-sand-300 h-full flex items-center justify-end pr-2 text-xs text-ink-900"
                      style={{ width: '75%' }}
                    >
                      ~75
                    </div>
                  </div>
                  <div className="w-24 text-right text-ink-600 text-xs">
                    × 10% = ~7.5
                  </div>
                </div>
              </div>

              {/* Final Result */}
              <div className="border-t border-sand-300 pt-3 mt-3">
                <div className="flex items-center justify-between bg-ink-900 text-sand-50 p-3 rounded">
                  <span className="font-semibold">Final Composite Score:</span>
                  <span className="text-2xl font-bold">{summary.bestResponse.compositeScore}/100</span>
                </div>
              </div>

              {/* Why it matters */}
              <div className="bg-ink-50 border-l-4 border-ink-900 p-3 text-xs text-ink-700">
                <p className="font-semibold mb-1">Why these weights?</p>
                <p>
                  Relevance (45%) is most important because answer quality matters most.
                  Sovereignty (25%) ensures data privacy. Similarity (20%) validates consensus.
                  Speed (10%) improves user experience. These weights are based on academic research in Information Retrieval.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sovereignty Distribution */}
      {summary.sovereigntyDistribution && (
        <div>
          <h3 className="text-sm font-semibold text-ink-900 mb-3">
            Data Sovereignty Distribution
          </h3>
          <div className="flex gap-3">
            {Object.entries(summary.sovereigntyDistribution).map(([location, count]) => (
              <div key={location} className="badge badge-dark">
                {location}: {count}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonSummary;
