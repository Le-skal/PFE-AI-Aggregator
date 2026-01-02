import NLPService from './nlpService.js';

/**
 * Service de scoring et évaluation des réponses IA
 * Utilise des métriques scientifiquement validées:
 * - BM25 pour le relevance scoring (Robertson & Zaragoza, 2009)
 * - ROUGE pour l'évaluation de qualité (Lin, 2004)
 * - Cosine Similarity avec TF-IDF pour la comparaison sémantique
 */
class ScoringService {
  constructor() {
    this.nlpService = new NLPService();

    // Paramètres BM25 (valeurs standards de la littérature)
    this.BM25_K1 = 1.5;  // Contrôle la saturation de fréquence des termes
    this.BM25_B = 0.75;  // Contrôle l'effet de la longueur du document
  }

  /**
   * Calcule tous les scores pour un ensemble de réponses
   * @param {object[]} responses - Tableau de réponses des différentes APIs
   * @param {string} originalPrompt - Le prompt original
   * @returns {object[]} - Réponses avec scores ajoutés
   */
  scoreAllResponses(responses, originalPrompt) {
    // Filtrer les réponses réussies
    const successfulResponses = responses.filter(r => r.status === 'success' && r.responseText);

    if (successfulResponses.length === 0) {
      return responses;
    }

    // Calculer le temps de réponse max pour normaliser le score de vitesse
    const maxResponseTime = Math.max(...responses.map(r => r.responseTime || 0));

    // Calculer les scores pour chaque réponse
    const scoredResponses = responses.map((response, index) => {
      if (response.status !== 'success' || !response.responseText) {
        const emptyAnalysis = this.nlpService.getEmptyAnalysis();
        return {
          ...response,
          scores: {
            relevance: null,
            similarity: null,
            sovereignty: response.sovereignty,
            composite: null
          },
          nlpAnalysis: {
            keywords: emptyAnalysis.keywords,
            sentiment: emptyAnalysis.sentiment.sentiment,
            sentimentScore: emptyAnalysis.sentiment.score,
            topics: emptyAnalysis.topics,
            wordCount: emptyAnalysis.wordCount,
            sentenceCount: emptyAnalysis.sentenceCount
          }
        };
      }

      // Analyse NLP
      const nlpAnalysis = this.nlpService.analyzeText(response.responseText);

      // Score de pertinence (basé sur le prompt)
      const relevanceScore = this.calculateRelevanceScore(
        response.responseText,
        originalPrompt
      );

      // Score de similarité (moyenne avec toutes les autres réponses)
      const similarityScore = this.calculateAverageSimilarity(
        response.responseText,
        successfulResponses.filter((_, i) => i !== index).map(r => r.responseText)
      );

      // Score de vitesse (normalisé inversé - plus rapide = meilleur score)
      const speedScore = this.calculateSpeedScore(response.responseTime, maxResponseTime);

      // Scores ROUGE (qualité de la réponse par rapport au prompt)
      const rougeScores = this.calculateRougeScores(response.responseText, originalPrompt);

      // Score composite (pondéré)
      const compositeScore = this.calculateCompositeScore({
        relevance: relevanceScore,
        similarity: similarityScore,
        sovereignty: response.sovereignty?.score || 0,
        speed: speedScore
      });

      return {
        ...response,
        scores: {
          relevance: relevanceScore,
          similarity: similarityScore,
          sovereignty: response.sovereignty,
          speed: speedScore,
          composite: compositeScore,
          rouge: rougeScores  // Ajout des scores ROUGE
        },
        nlpAnalysis: {
          keywords: nlpAnalysis.keywords,
          sentiment: nlpAnalysis.sentiment.sentiment,
          sentimentScore: nlpAnalysis.sentiment.score,
          topics: nlpAnalysis.topics,
          wordCount: nlpAnalysis.wordCount,
          sentenceCount: nlpAnalysis.sentenceCount
        }
      };
    });

    return scoredResponses;
  }

  /**
   * Calcule le score de pertinence avec l'algorithme BM25
   * BM25 (Best Matching 25) est l'algorithme de ranking utilisé par Elasticsearch
   * Référence: Robertson & Zaragoza (2009) "The Probabilistic Relevance Framework: BM25 and Beyond"
   * @private
   * @param {string} response - La réponse de l'IA
   * @param {string} prompt - Le prompt original
   * @returns {number} - Score de 0 à 100
   */
  calculateRelevanceScore(response, prompt) {
    try {
      // Prétraitement des textes
      const queryTokens = this.nlpService.preprocessText(prompt);
      const docTokens = this.nlpService.preprocessText(response);

      if (queryTokens.length === 0 || docTokens.length === 0) {
        return 0;
      }

      // Longueur moyenne des documents (estimation basée sur un corpus typique)
      const avgDocLength = 100;
      const docLength = docTokens.length;

      // Calculer la fréquence des termes dans le document
      const termFreq = new Map();
      docTokens.forEach(token => {
        termFreq.set(token, (termFreq.get(token) || 0) + 1);
      });

      // Calculer le score BM25
      let bm25Score = 0;
      queryTokens.forEach(queryTerm => {
        const tf = termFreq.get(queryTerm) || 0;

        if (tf > 0) {
          // IDF simplifié (assume que le terme est rare, IDF ≈ 1)
          // Dans un vrai système, on calculerait IDF sur tout le corpus
          const idf = 1;

          // Formule BM25
          const numerator = tf * (this.BM25_K1 + 1);
          const denominator = tf + this.BM25_K1 * (1 - this.BM25_B + this.BM25_B * (docLength / avgDocLength));

          bm25Score += idf * (numerator / denominator);
        }
      });

      // Normaliser le score BM25 entre 0 et 100
      // Le score max théorique est environ = nombre de termes de la query
      const maxScore = queryTokens.length * (this.BM25_K1 + 1);
      const normalizedScore = maxScore > 0 ? (bm25Score / maxScore) * 100 : 0;

      return Math.round(Math.min(100, Math.max(0, normalizedScore)));
    } catch (error) {
      console.error('Error calculating BM25 relevance score:', error);
      return 50;
    }
  }

  /**
   * Calcule les scores ROUGE (Recall-Oriented Understudy for Gisting Evaluation)
   * ROUGE est la métrique standard pour évaluer la qualité des résumés et réponses
   * Référence: Lin (2004) "ROUGE: A Package for Automatic Evaluation of Summaries"
   * @param {string} candidate - Texte candidat (réponse de l'IA)
   * @param {string} reference - Texte de référence (prompt ou autre réponse)
   * @returns {object} - Scores ROUGE-1, ROUGE-2, ROUGE-L
   */
  calculateRougeScores(candidate, reference) {
    try {
      const candidateTokens = this.nlpService.preprocessText(candidate);
      const referenceTokens = this.nlpService.preprocessText(reference);

      // ROUGE-1: unigrams
      const rouge1 = this.calculateRougeN(candidateTokens, referenceTokens, 1);

      // ROUGE-2: bigrams
      const rouge2 = this.calculateRougeN(candidateTokens, referenceTokens, 2);

      // ROUGE-L: Longest Common Subsequence
      const rougeL = this.calculateRougeL(candidateTokens, referenceTokens);

      return {
        rouge1: rouge1.fScore,
        rouge2: rouge2.fScore,
        rougeL: rougeL.fScore
      };
    } catch (error) {
      console.error('Error calculating ROUGE scores:', error);
      return { rouge1: 0, rouge2: 0, rougeL: 0 };
    }
  }

  /**
   * Calcule ROUGE-N (overlap de n-grams)
   * @private
   */
  calculateRougeN(candidateTokens, referenceTokens, n) {
    const candidateNgrams = this.getNgrams(candidateTokens, n);
    const referenceNgrams = this.getNgrams(referenceTokens, n);

    if (referenceNgrams.size === 0) {
      return { precision: 0, recall: 0, fScore: 0 };
    }

    // Compter les n-grams communs
    let overlap = 0;
    candidateNgrams.forEach((count, ngram) => {
      if (referenceNgrams.has(ngram)) {
        overlap += Math.min(count, referenceNgrams.get(ngram));
      }
    });

    // Calculer precision, recall et F1-score
    const candidateTotal = Array.from(candidateNgrams.values()).reduce((a, b) => a + b, 0);
    const referenceTotal = Array.from(referenceNgrams.values()).reduce((a, b) => a + b, 0);

    const precision = candidateTotal > 0 ? overlap / candidateTotal : 0;
    const recall = referenceTotal > 0 ? overlap / referenceTotal : 0;
    const fScore = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return { precision, recall, fScore };
  }

  /**
   * Calcule ROUGE-L (Longest Common Subsequence)
   * @private
   */
  calculateRougeL(candidateTokens, referenceTokens) {
    const lcsLength = this.longestCommonSubsequence(candidateTokens, referenceTokens);

    const precision = candidateTokens.length > 0 ? lcsLength / candidateTokens.length : 0;
    const recall = referenceTokens.length > 0 ? lcsLength / referenceTokens.length : 0;
    const fScore = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return { precision, recall, fScore };
  }

  /**
   * Génère les n-grams d'une liste de tokens
   * @private
   */
  getNgrams(tokens, n) {
    const ngrams = new Map();

    for (let i = 0; i <= tokens.length - n; i++) {
      const ngram = tokens.slice(i, i + n).join(' ');
      ngrams.set(ngram, (ngrams.get(ngram) || 0) + 1);
    }

    return ngrams;
  }

  /**
   * Calcule la longueur de la plus longue sous-séquence commune (LCS)
   * Algorithme de programmation dynamique classique
   * @private
   */
  longestCommonSubsequence(seq1, seq2) {
    const m = seq1.length;
    const n = seq2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (seq1[i - 1] === seq2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[m][n];
  }

  /**
   * Calcule la similarité moyenne avec les autres réponses
   * @private
   * @param {string} response - La réponse à évaluer
   * @param {string[]} otherResponses - Les autres réponses
   * @returns {number} - Score de 0 à 100
   */
  calculateAverageSimilarity(response, otherResponses) {
    if (otherResponses.length === 0) {
      return 100; // Si c'est la seule réponse, score max
    }

    try {
      const similarities = otherResponses.map(other =>
        this.nlpService.calculateSimilarity(response, other)
      );

      const avgSimilarity = similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length;

      return Math.round(avgSimilarity * 100);
    } catch (error) {
      console.error('Error calculating similarity score:', error);
      return 50;
    }
  }

  /**
   * Calcule le score de vitesse (normalisé inversé)
   * @private
   * @param {number} responseTime - Temps de réponse en ms
   * @param {number} maxResponseTime - Temps max parmi toutes les réponses
   * @returns {number} - Score de 0 à 100 (plus rapide = meilleur)
   */
  calculateSpeedScore(responseTime, maxResponseTime) {
    if (!responseTime || !maxResponseTime || maxResponseTime === 0) {
      return 50; // Score neutre si pas de données
    }

    try {
      // Score inversé: plus le temps est court, plus le score est élevé
      // Si responseTime = 0ms → score = 100
      // Si responseTime = maxResponseTime → score = 0
      const normalizedScore = 100 - ((responseTime / maxResponseTime) * 100);

      return Math.round(Math.max(0, Math.min(100, normalizedScore)));
    } catch (error) {
      console.error('Error calculating speed score:', error);
      return 50;
    }
  }

  /**
   * Calcule le score composite pondéré avec justification scientifique
   *
   * Pondérations basées sur:
   * - Recherche en Information Retrieval: la pertinence est le critère principal (Manning et al., 2008)
   * - IT for Green: importance de la souveraineté des données (RGPD, impact environnemental)
   * - Consensus entre modèles: indicateur de fiabilité (Ensemble methods, Dietterich, 2000)
   * - Efficacité computationnelle: considération Green IT
   *
   * Formule optimisée: 45% BM25 + 25% Souveraineté + 20% Similarité TF-IDF + 10% Vitesse
   *
   * @private
   * @param {object} scores - Objet contenant tous les scores
   * @returns {number} - Score composite de 0 à 100
   */
  calculateCompositeScore(scores) {
    try {
      const {
        relevance = 0,      // Score BM25
        sovereignty = 0,    // Score de souveraineté (EU favorisé)
        similarity = 0,     // Cosine similarity (TF-IDF)
        speed = 0          // Score de rapidité
      } = scores;

      // Pondération justifiée scientifiquement
      const compositeScore = (
        (relevance * 0.45) +      // 45% - Pertinence BM25 (critère principal en IR)
        (sovereignty * 0.25) +    // 25% - Souveraineté (RGPD + Green IT)
        (similarity * 0.20) +     // 20% - Consensus (fiabilité via ensemble)
        (speed * 0.10)            // 10% - Efficacité (Green computing)
      );

      return Math.round(Math.max(0, Math.min(100, compositeScore)));
    } catch (error) {
      console.error('Error calculating composite score:', error);
      return 0;
    }
  }

  /**
   * Calcule une matrice de similarité entre toutes les réponses
   * @param {object[]} responses - Tableau des réponses
   * @returns {number[][]} - Matrice de similarité
   */
  calculateSimilarityMatrix(responses) {
    const successfulResponses = responses.filter(r => r.status === 'success' && r.responseText);

    if (successfulResponses.length < 2) {
      return [];
    }

    const matrix = [];

    for (let i = 0; i < successfulResponses.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < successfulResponses.length; j++) {
        if (i === j) {
          matrix[i][j] = 100; // Similarité avec soi-même = 100%
        } else {
          const similarity = this.nlpService.calculateSimilarity(
            successfulResponses[i].responseText,
            successfulResponses[j].responseText
          );
          matrix[i][j] = Math.round(similarity * 100);
        }
      }
    }

    return matrix;
  }

  /**
   * Génère un résumé comparatif des réponses
   * @param {object[]} responses - Réponses avec scores
   * @returns {object} - Statistiques et insights
   */
  generateComparativeSummary(responses) {
    const successfulResponses = responses.filter(r => r.status === 'success');

    if (successfulResponses.length === 0) {
      return {
        totalResponses: responses.length,
        successfulResponses: 0,
        failedResponses: responses.length,
        averageRelevance: 0,
        averageSimilarity: 0,
        bestResponse: null,
        worstResponse: null,
        consensusLevel: 0,
        sovereigntyDistribution: {}
      };
    }

    // Calculer les moyennes
    const avgRelevance = successfulResponses.reduce((sum, r) =>
      sum + (r.scores?.relevance || 0), 0
    ) / successfulResponses.length;

    const avgSimilarity = successfulResponses.reduce((sum, r) =>
      sum + (r.scores?.similarity || 0), 0
    ) / successfulResponses.length;

    const avgSovereignty = successfulResponses.reduce((sum, r) =>
      sum + (r.scores?.sovereignty?.score || 0), 0
    ) / successfulResponses.length;

    const avgComposite = successfulResponses.reduce((sum, r) =>
      sum + (r.scores?.composite || 0), 0
    ) / successfulResponses.length;

    // Trouver la meilleure et pire réponse (basé sur le score composite)
    const sortedByComposite = [...successfulResponses].sort((a, b) =>
      (b.scores?.composite || 0) - (a.scores?.composite || 0)
    );

    // Distribution de souveraineté
    const sovereigntyDist = {};
    responses.forEach(r => {
      const location = r.sovereignty?.serverLocation || 'UNKNOWN';
      sovereigntyDist[location] = (sovereigntyDist[location] || 0) + 1;
    });

    return {
      totalResponses: responses.length,
      successfulResponses: successfulResponses.length,
      failedResponses: responses.length - successfulResponses.length,
      averageRelevance: Math.round(avgRelevance),
      averageSimilarity: Math.round(avgSimilarity),
      averageSovereignty: Math.round(avgSovereignty),
      averageComposite: Math.round(avgComposite),
      averageResponseTime: Math.round(
        responses.reduce((sum, r) => sum + r.responseTime, 0) / responses.length
      ),
      bestResponse: {
        model: sortedByComposite[0]?.model,
        compositeScore: sortedByComposite[0]?.scores?.composite,
        relevance: sortedByComposite[0]?.scores?.relevance,
        sovereignty: sortedByComposite[0]?.scores?.sovereignty?.score
      },
      worstResponse: {
        model: sortedByComposite[sortedByComposite.length - 1]?.model,
        compositeScore: sortedByComposite[sortedByComposite.length - 1]?.scores?.composite
      },
      consensusLevel: avgSimilarity, // Niveau de consensus entre les réponses
      sovereigntyDistribution: sovereigntyDist
    };
  }
}

export default ScoringService;
