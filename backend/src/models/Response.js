import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  promptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true,
    index: true
  },
  aiModel: {
    type: String,
    enum: ['gemini', 'mistral', 'huggingface', 'cohere'],
    required: true
  },
  responseText: {
    type: String,
    required: false, // Peut être vide en cas d'erreur
    default: ''
  },
  responseTime: {
    type: Number, // en millisecondes
    required: true
  },
  tokens: {
    input: { type: Number, default: 0 },
    output: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  // Scores d'évaluation (méthodes scientifiquement validées)
  scores: {
    // Score de pertinence BM25 (0-100)
    relevance: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    // Score de similarité TF-IDF cosine (0-100)
    similarity: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    // Score de vitesse normalisé (0-100)
    speed: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    // Score composite pondéré (0-100)
    composite: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    // Scores ROUGE pour évaluation de qualité
    rouge: {
      rouge1: {
        type: Number,
        min: 0,
        max: 1,
        default: null
      },
      rouge2: {
        type: Number,
        min: 0,
        max: 1,
        default: null
      },
      rougeL: {
        type: Number,
        min: 0,
        max: 1,
        default: null
      }
    },
    // Scoring de souveraineté des données
    sovereignty: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        required: false
      },
      serverLocation: {
        type: String,
        required: false,
        enum: ['USA', 'EU', 'ASIA', 'OTHER']
      },
      rgpdCompliant: {
        type: Boolean,
        required: false
      },
      cloudProvider: {
        type: String,
        required: false
      },
      dataRetention: {
        type: String,
        default: 'Unknown'
      }
    }
  },
  // Analyse NLP de la réponse
  nlpAnalysis: {
    keywords: [{
      word: String,
      count: Number,
      relevance: Number
    }],
    sentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral', 'mixed'],
      default: 'neutral'
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1,
      default: 0
    },
    topics: [String],
    wordCount: { type: Number, default: 0 },
    sentenceCount: { type: Number, default: 0 }
  },
  // Statut de la réponse
  status: {
    type: String,
    enum: ['success', 'failed', 'timeout'],
    default: 'success'
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index composé pour recherche efficace
responseSchema.index({ promptId: 1, aiModel: 1 });
responseSchema.index({ aiModel: 1, createdAt: -1 });

// Méthode virtuelle pour obtenir le score global
// Utilise maintenant le score composite calculé scientifiquement
responseSchema.virtual('overallScore').get(function() {
  // Retourne le score composite s'il existe, sinon calcule un score basique
  return this.scores?.composite || 0;
});

// S'assurer que les virtuels sont inclus dans JSON
responseSchema.set('toJSON', { virtuals: true });
responseSchema.set('toObject', { virtuals: true });

const Response = mongoose.model('Response', responseSchema);

export default Response;
