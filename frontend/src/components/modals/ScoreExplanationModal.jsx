import { useEffect } from 'react';

/**
 * Modal popup pour expliquer les scores de manière contextuelle
 */
const ScoreExplanationModal = ({ isOpen, onClose, metricType, score, responseData, promptText }) => {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Générer le contenu selon la métrique
  const getContent = () => {
    switch (metricType) {
      case 'relevance':
        return {
          title: 'Relevance Score (BM25)',
          score: score,
          howItWorks: (
            <>
              <p className="mb-2">
                <strong>BM25 (Best Matching 25)</strong> is a ranking algorithm used by search engines like Elasticsearch.
              </p>
              <p className="mb-2">It analyzes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Term Frequency (TF)</strong>: How often words from your question appear in the response</li>
                <li><strong>Document Length</strong>: Normalizes scores based on response length</li>
                <li><strong>Inverse Document Frequency (IDF)</strong>: Prioritizes rare/important terms</li>
              </ul>
            </>
          ),
          whyThisScore: (
            <>
              <p className="mb-2">Your question: <em>"{promptText?.substring(0, 100)}{promptText?.length > 100 ? '...' : ''}"</em></p>
              <div className="bg-sand-50 p-3 rounded border border-sand-300">
                <p className="text-sm mb-2"><strong>Analysis:</strong></p>
                <ul className="text-sm space-y-1">
                  <li>Response length: {responseData.nlpAnalysis?.wordCount || 0} words</li>
                  <li>Key terms from your question were found in the response</li>
                  <li>BM25 algorithm calculated the match quality: <strong>{score}/100</strong></li>
                </ul>
              </div>
            </>
          ),
          interpretation: (
            <>
              <div className={`p-3 rounded ${score >= 70 ? 'bg-green-50 border border-green-300' : score >= 40 ? 'bg-yellow-50 border border-yellow-300' : 'bg-red-50 border border-red-300'}`}>
                <p className="font-semibold mb-1">
                  {score >= 70 ? 'EXCELLENT' : score >= 40 ? 'GOOD' : 'MODERATE'}
                </p>
                <p className="text-sm">
                  {score >= 70
                    ? 'The response is highly relevant and directly addresses your question with strong term matching.'
                    : score >= 40
                    ? 'The response addresses your question adequately with moderate term matching.'
                    : 'The response may be tangential or lacks strong term matching with your question.'}
                </p>
              </div>
            </>
          ),
          reference: 'Robertson & Zaragoza (2009) - "The Probabilistic Relevance Framework: BM25 and Beyond"'
        };

      case 'similarity':
        return {
          title: 'Similarity Score (TF-IDF Cosine)',
          score: score,
          howItWorks: (
            <>
              <p className="mb-2">
                <strong>Cosine Similarity with TF-IDF</strong> measures how similar this response is to other AI responses.
              </p>
              <p className="mb-2">It works by:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>TF-IDF Vectorization</strong>: Converting text into numerical vectors</li>
                <li><strong>Cosine Similarity</strong>: Calculating the angle between response vectors</li>
                <li><strong>Consensus Measurement</strong>: High similarity = models agree on the answer</li>
              </ul>
            </>
          ),
          whyThisScore: (
            <>
              <div className="bg-sand-50 p-3 rounded border border-sand-300">
                <p className="text-sm mb-2"><strong>Analysis:</strong></p>
                <ul className="text-sm space-y-1">
                  <li>This response was compared to {responseData.comparedWith || 'other'} AI model(s)</li>
                  <li>Similarity score: <strong>{score}/100</strong></li>
                  <li>Higher scores indicate stronger consensus between models</li>
                </ul>
              </div>
            </>
          ),
          interpretation: (
            <>
              <div className={`p-3 rounded ${score >= 70 ? 'bg-green-50 border border-green-300' : score >= 40 ? 'bg-yellow-50 border border-yellow-300' : 'bg-red-50 border border-red-300'}`}>
                <p className="font-semibold mb-1">
                  {score >= 70 ? 'HIGH CONSENSUS' : score >= 40 ? 'MODERATE CONSENSUS' : 'LOW CONSENSUS'}
                </p>
                <p className="text-sm">
                  {score >= 70
                    ? 'Multiple AI models agree on this answer, suggesting high reliability.'
                    : score >= 40
                    ? 'Models show moderate agreement, which is common for complex questions.'
                    : 'Models diverge significantly, suggesting different interpretations.'}
                </p>
              </div>
            </>
          ),
          reference: 'Salton & McGill (1983) - "Introduction to Modern Information Retrieval"'
        };

      case 'sovereignty':
        return {
          title: 'Data Sovereignty Score',
          score: score,
          howItWorks: (
            <>
              <p className="mb-2">
                <strong>Data Sovereignty</strong> measures data privacy, GDPR compliance, and server location.
              </p>
              <p className="mb-2">Scoring criteria:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Server Location</strong>: EU (90) &gt; USA (60) &gt; Other (40)</li>
                <li><strong>GDPR Compliance</strong>: Full compliance gets bonus points</li>
                <li><strong>Data Retention</strong>: Shorter retention = better privacy</li>
              </ul>
            </>
          ),
          whyThisScore: (
            <>
              <div className="bg-sand-50 p-3 rounded border border-sand-300">
                <p className="text-sm mb-2"><strong>This model:</strong></p>
                <ul className="text-sm space-y-1">
                  <li>Location: <strong>{responseData.scores?.sovereignty?.serverLocation || 'Unknown'}</strong></li>
                  <li>GDPR Compliant: <strong>{responseData.scores?.sovereignty?.rgpdCompliant ? 'Yes' : 'Partial'}</strong></li>
                  <li>Cloud Provider: {responseData.scores?.sovereignty?.cloudProvider || 'N/A'}</li>
                  <li>Final Score: <strong>{score}/100</strong></li>
                </ul>
              </div>
            </>
          ),
          interpretation: (
            <>
              <div className={`p-3 rounded ${score >= 80 ? 'bg-green-50 border border-green-300' : score >= 50 ? 'bg-yellow-50 border border-yellow-300' : 'bg-red-50 border border-red-300'}`}>
                <p className="font-semibold mb-1">
                  {score >= 80 ? 'HIGH PRIVACY' : score >= 50 ? 'MODERATE PRIVACY' : 'LIMITED PRIVACY'}
                </p>
                <p className="text-sm">
                  {score >= 80
                    ? 'EU-based servers with full GDPR compliance ensure strong data protection.'
                    : score >= 50
                    ? 'USA-based with partial GDPR compliance. Privacy Shield framework applies.'
                    : 'Limited privacy guarantees. Consider data sensitivity before use.'}
                </p>
              </div>
            </>
          ),
          reference: 'IT for Green & GDPR Compliance Framework'
        };

      case 'speed':
        return {
          title: 'Speed Score',
          score: score,
          howItWorks: (
            <>
              <p className="mb-2">
                <strong>Speed Score</strong> measures response time efficiency normalized across all models.
              </p>
              <p className="mb-2">Calculation:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Fastest Response</strong>: Gets 100 points</li>
                <li><strong>Slowest Response</strong>: Gets 0 points</li>
                <li><strong>Linear Scaling</strong>: Other responses scaled proportionally</li>
              </ul>
            </>
          ),
          whyThisScore: (
            <>
              <div className="bg-sand-50 p-3 rounded border border-sand-300">
                <p className="text-sm mb-2"><strong>Performance:</strong></p>
                <ul className="text-sm space-y-1">
                  <li>Response time: <strong>{responseData.responseTime}ms</strong> ({(responseData.responseTime / 1000).toFixed(1)}s)</li>
                  <li>Normalized speed score: <strong>{score}/100</strong></li>
                  <li>Faster responses improve user experience and reduce energy consumption</li>
                </ul>
              </div>
            </>
          ),
          interpretation: (
            <>
              <div className={`p-3 rounded ${score >= 70 ? 'bg-green-50 border border-green-300' : score >= 40 ? 'bg-yellow-50 border border-yellow-300' : 'bg-red-50 border border-red-300'}`}>
                <p className="font-semibold mb-1">
                  {score >= 70 ? 'FAST' : score >= 40 ? 'MODERATE' : 'SLOW'}
                </p>
                <p className="text-sm">
                  {score >= 70
                    ? 'Very fast response time. Excellent user experience and energy efficiency.'
                    : score >= 40
                    ? 'Acceptable response time for most use cases.'
                    : 'Slower response. May impact user experience for real-time applications.'}
                </p>
              </div>
            </>
          ),
          reference: 'Green Computing & User Experience Principles'
        };

      case 'rouge':
        return {
          title: 'ROUGE Quality Scores',
          score: null,
          howItWorks: (
            <>
              <p className="mb-2">
                <strong>ROUGE</strong> (Recall-Oriented Understudy for Gisting Evaluation) measures text quality.
              </p>
              <p className="mb-2">Three metrics:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>ROUGE-1</strong>: Unigram (single word) overlap with your question</li>
                <li><strong>ROUGE-2</strong>: Bigram (two-word phrase) overlap</li>
                <li><strong>ROUGE-L</strong>: Longest Common Subsequence (LCS)</li>
              </ul>
            </>
          ),
          whyThisScore: (
            <>
              <div className="bg-sand-50 p-3 rounded border border-sand-300">
                <p className="text-sm mb-2"><strong>Scores for this response:</strong></p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">{((responseData.scores?.rouge?.rouge1 || 0) * 100).toFixed(1)}%</p>
                    <p className="text-xs">ROUGE-1</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{((responseData.scores?.rouge?.rouge2 || 0) * 100).toFixed(1)}%</p>
                    <p className="text-xs">ROUGE-2</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{((responseData.scores?.rouge?.rougeL || 0) * 100).toFixed(1)}%</p>
                    <p className="text-xs">ROUGE-L</p>
                  </div>
                </div>
              </div>
            </>
          ),
          interpretation: (
            <>
              <div className="p-3 rounded bg-blue-50 border border-blue-300">
                <p className="font-semibold mb-1">ACADEMIC METRIC</p>
                <p className="text-sm">
                  ROUGE scores are typically low (1-5%) when comparing responses to short questions.
                  Higher scores indicate the response directly echoes your question's wording.
                  Used primarily in academic NLP research for summarization evaluation.
                </p>
              </div>
            </>
          ),
          reference: 'Lin (2004) - "ROUGE: A Package for Automatic Evaluation of Summaries"'
        };

      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-ink-900 text-sand-50 px-6 py-4 flex items-center justify-between rounded-t-lg">
            <div>
              <h2 className="text-xl font-bold">{content.title}</h2>
              {content.score !== null && (
                <p className="text-sm text-sand-400">Score: {content.score}/100</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-sand-50 hover:text-sand-300 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* How It Works */}
            <div>
              <h3 className="text-sm font-semibold text-ink-900 uppercase mb-2 border-b border-sand-300 pb-1">
                How It Works
              </h3>
              <div className="text-sm text-ink-700">
                {content.howItWorks}
              </div>
            </div>

            {/* Why This Score */}
            <div>
              <h3 className="text-sm font-semibold text-ink-900 uppercase mb-2 border-b border-sand-300 pb-1">
                Why This Score
              </h3>
              <div className="text-sm text-ink-700">
                {content.whyThisScore}
              </div>
            </div>

            {/* Interpretation */}
            <div>
              <h3 className="text-sm font-semibold text-ink-900 uppercase mb-2 border-b border-sand-300 pb-1">
                Interpretation
              </h3>
              <div className="text-sm text-ink-700">
                {content.interpretation}
              </div>
            </div>

            {/* Reference */}
            <div className="text-xs text-ink-600 bg-sand-50 p-3 border-l-4 border-sand-400 rounded">
              <p className="font-semibold mb-1">Academic Reference:</p>
              <p>{content.reference}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-sand-50 px-6 py-4 border-t border-sand-300 rounded-b-lg">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-ink-900 text-sand-50 rounded hover:bg-ink-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreExplanationModal;
