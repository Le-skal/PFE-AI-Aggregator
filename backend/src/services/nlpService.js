import natural from 'natural';
import compromise from 'compromise';
import { removeStopwords, eng } from 'stopword';

/**
 * Service d'analyse NLP (Natural Language Processing)
 * Utilise des méthodes scientifiquement validées:
 * - TF-IDF pour la vectorisation
 * - Cosine Similarity pour la comparaison sémantique
 * - BM25 pour le ranking (implémenté dans scoringService)
 */
class NLPService {
  constructor() {
    // Tokenizer pour compter les mots
    this.tokenizer = new natural.WordTokenizer();

    // Analyseur de sentiment
    this.sentimentAnalyzer = new natural.SentimentAnalyzer(
      'English',
      natural.PorterStemmer,
      'afinn'
    );

    // TF-IDF pour vectorisation
    this.TfIdf = natural.TfIdf;
    this.tfidf = new this.TfIdf();
  }

  /**
   * Analyse complète d'un texte
   * @param {string} text - Le texte à analyser
   * @returns {object} - Résultats de l'analyse
   */
  analyzeText(text) {
    if (!text || typeof text !== 'string') {
      return this.getEmptyAnalysis();
    }

    return {
      keywords: this.extractKeywords(text),
      sentiment: this.analyzeSentiment(text),
      topics: this.extractTopics(text),
      wordCount: this.countWords(text),
      sentenceCount: this.countSentences(text),
      readability: this.calculateReadability(text)
    };
  }

  /**
   * Extrait les mots-clés importants du texte
   * @private
   */
  extractKeywords(text, limit = 10) {
    try {
      // Tokenize et nettoyer
      const tokens = this.tokenizer.tokenize(text.toLowerCase());

      // Supprimer les stop words et mots courts
      const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how']);

      const filteredTokens = tokens.filter(token =>
        token.length > 3 &&
        !stopWords.has(token) &&
        /^[a-z]+$/.test(token)
      );

      // Compter les occurrences
      const frequency = {};
      filteredTokens.forEach(token => {
        frequency[token] = (frequency[token] || 0) + 1;
      });

      // Trier par fréquence et limiter
      const sortedKeywords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word, count]) => ({
          word,
          count,
          relevance: count / filteredTokens.length
        }));

      return sortedKeywords;
    } catch (error) {
      console.error('Error extracting keywords:', error);
      return [];
    }
  }

  /**
   * Analyse le sentiment du texte
   * @private
   */
  analyzeSentiment(text) {
    try {
      const tokens = this.tokenizer.tokenize(text.toLowerCase());
      const score = this.sentimentAnalyzer.getSentiment(tokens);

      let sentiment;
      if (score > 0.2) sentiment = 'positive';
      else if (score < -0.2) sentiment = 'negative';
      else sentiment = 'neutral';

      return {
        sentiment,
        score: Math.max(-1, Math.min(1, score)) // Normaliser entre -1 et 1
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return { sentiment: 'neutral', score: 0 };
    }
  }

  /**
   * Extrait les topics/thèmes du texte
   * @private
   */
  extractTopics(text) {
    try {
      const doc = compromise(text);

      // Extraire différents types d'entités
      const topics = new Set();

      // Noms propres (personnes, lieux, organisations)
      doc.people().forEach(person => topics.add(person.text()));
      doc.places().forEach(place => topics.add(place.text()));
      doc.organizations().forEach(org => topics.add(org.text()));

      // Sujets importants (noms communs fréquents)
      const nouns = doc.nouns().out('array');
      nouns.slice(0, 5).forEach(noun => topics.add(noun));

      return Array.from(topics).slice(0, 10);
    } catch (error) {
      console.error('Error extracting topics:', error);
      return [];
    }
  }

  /**
   * Compte le nombre de mots
   * @private
   */
  countWords(text) {
    const tokens = this.tokenizer.tokenize(text);
    return tokens ? tokens.length : 0;
  }

  /**
   * Compte le nombre de phrases
   * @private
   */
  countSentences(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.length;
  }

  /**
   * Calcule un score de lisibilité
   * @private
   */
  calculateReadability(text) {
    const wordCount = this.countWords(text);
    const sentenceCount = this.countSentences(text);

    if (sentenceCount === 0) return 0;

    // Formule simplifiée de Flesch Reading Ease
    const avgWordsPerSentence = wordCount / sentenceCount;
    const score = 100 - avgWordsPerSentence * 1.5;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Retourne une analyse vide
   * @private
   */
  getEmptyAnalysis() {
    return {
      keywords: [],
      sentiment: { sentiment: 'neutral', score: 0 },
      topics: [],
      wordCount: 0,
      sentenceCount: 0,
      readability: 0
    };
  }

  /**
   * Compare la similarité entre deux textes
   * Utilise Cosine Similarity avec TF-IDF (méthode scientifiquement validée)
   * Référence: Salton & McGill (1983), "Introduction to Modern Information Retrieval"
   * @param {string} text1
   * @param {string} text2
   * @returns {number} - Score de similarité (0-1)
   */
  calculateSimilarity(text1, text2) {
    try {
      // Créer une instance TF-IDF pour cette comparaison
      const tfidf = new this.TfIdf();
      tfidf.addDocument(text1);
      tfidf.addDocument(text2);

      // Obtenir tous les termes uniques
      const allTerms = new Set();
      tfidf.listTerms(0).forEach(item => allTerms.add(item.term));
      tfidf.listTerms(1).forEach(item => allTerms.add(item.term));

      // Créer les vecteurs TF-IDF
      const vector1 = [];
      const vector2 = [];

      allTerms.forEach(term => {
        vector1.push(tfidf.tfidf(term, 0));
        vector2.push(tfidf.tfidf(term, 1));
      });

      // Calculer la similarité cosinus
      return this.cosineSimilarity(vector1, vector2);
    } catch (error) {
      console.error('Error calculating similarity:', error);
      return 0;
    }
  }

  /**
   * Calcule la similarité cosinus entre deux vecteurs
   * Formule: cos(θ) = (A·B) / (||A|| × ||B||)
   * @private
   * @param {number[]} vectorA
   * @param {number[]} vectorB
   * @returns {number} - Similarité (0-1)
   */
  cosineSimilarity(vectorA, vectorB) {
    if (vectorA.length !== vectorB.length) return 0;
    if (vectorA.length === 0) return 0;

    // Produit scalaire A·B
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] * vectorA[i];
      normB += vectorB[i] * vectorB[i];
    }

    // Éviter division par zéro
    if (normA === 0 || normB === 0) return 0;

    // Similarité cosinus
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Calcule le vecteur TF-IDF pour un texte
   * Utile pour BM25 et autres métriques avancées
   * @param {string} text
   * @param {string[]} corpus - Corpus de documents pour IDF
   * @returns {Map<string, number>} - Map terme -> score TF-IDF
   */
  calculateTfIdfVector(text, corpus = []) {
    const tfidf = new this.TfIdf();

    // Ajouter le corpus
    corpus.forEach(doc => tfidf.addDocument(doc));
    tfidf.addDocument(text);

    const vector = new Map();
    const docIndex = corpus.length;

    tfidf.listTerms(docIndex).forEach(item => {
      vector.set(item.term, item.tfidf);
    });

    return vector;
  }

  /**
   * Prétraite un texte: tokenization, stopword removal, stemming
   * @param {string} text
   * @returns {string[]} - Tokens nettoyés
   */
  preprocessText(text) {
    try {
      // Tokenization
      let tokens = this.tokenizer.tokenize(text.toLowerCase());

      // Suppression des stopwords
      tokens = removeStopwords(tokens, eng);

      // Stemming (optionnel, améliore la précision)
      const stemmer = natural.PorterStemmer;
      tokens = tokens.map(token => stemmer.stem(token));

      // Filtrer tokens invalides (garder tokens >= 2 caractères pour acronymes)
      tokens = tokens.filter(token =>
        token.length >= 2 &&  // Changé de > 2 à >= 2 pour garder AI, ML, etc.
        /^[a-z0-9]+$/.test(token)  // Permet aussi les chiffres
      );

      return tokens;
    } catch (error) {
      console.error('Error preprocessing text:', error);
      return [];
    }
  }
}

export default NLPService;
