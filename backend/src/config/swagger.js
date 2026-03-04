import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Response Aggregator API',
      version: '2.0.0',
      description: 'API REST pour l\'agrégation et l\'analyse comparative de réponses IA multi-modèles avec scoring scientifique (BM25, TF-IDF, ROUGE) et évaluation de souveraineté des données.',
      contact: {
        name: 'PFE 2025-2026',
        email: 'contact@DeepSkal.com'
      },
      license: {
        name: 'Confidential',
        url: 'https://DeepSkal.com'
      }
    },
    servers: [
      {
        url: 'https://green-ai-scanner-production.up.railway.app',
        description: 'Serveur de production (Railway)'
      },
      {
        url: 'http://localhost:5000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtenu via /api/auth/login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID MongoDB',
              example: '507f1f77bcf86cd799439011'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email unique de l\'utilisateur',
              example: 'user@example.com'
            },
            name: {
              type: 'string',
              description: 'Nom complet',
              example: 'John Doe'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Prompt: {
          type: 'object',
          required: ['promptText', 'aiModels'],
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            userId: {
              type: 'string',
              description: 'ID de l\'utilisateur (optionnel)',
              example: '507f1f77bcf86cd799439011'
            },
            promptText: {
              type: 'string',
              description: 'Texte du prompt',
              example: 'Explain quantum computing in simple terms'
            },
            aiModels: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['gemini', 'mistral', 'huggingface', 'cohere']
              },
              description: 'Liste des modèles IA à interroger',
              example: ['gemini', 'mistral']
            },
            status: {
              type: 'string',
              enum: ['completed', 'failed', 'processing'],
              example: 'completed'
            },
            metadata: {
              type: 'object',
              properties: {
                totalResponses: {
                  type: 'number',
                  example: 4
                },
                successfulResponses: {
                  type: 'number',
                  example: 3
                },
                processingTime: {
                  type: 'number',
                  description: 'Temps de traitement en ms',
                  example: 5234
                }
              }
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Response: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            promptId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            aiModel: {
              type: 'string',
              enum: ['gemini', 'mistral', 'huggingface', 'cohere'],
              example: 'gemini'
            },
            responseText: {
              type: 'string',
              example: 'Quantum computing is a revolutionary approach...'
            },
            responseTime: {
              type: 'number',
              description: 'Temps de réponse en ms',
              example: 1234
            },
            status: {
              type: 'string',
              enum: ['success', 'failed'],
              example: 'success'
            },
            scores: {
              type: 'object',
              properties: {
                relevance: {
                  type: 'number',
                  description: 'Score BM25 (0-100)',
                  example: 85.5
                },
                similarity: {
                  type: 'number',
                  description: 'Score TF-IDF Cosine Similarity (0-100)',
                  example: 72.3
                },
                speed: {
                  type: 'number',
                  description: 'Score de vitesse normalisé (0-100)',
                  example: 90.0
                },
                composite: {
                  type: 'number',
                  description: 'Score composite pondéré (0-100)',
                  example: 78.4
                },
                rouge: {
                  type: 'object',
                  properties: {
                    rouge1: { type: 'number', example: 0.65 },
                    rouge2: { type: 'number', example: 0.42 },
                    rougeL: { type: 'number', example: 0.58 }
                  }
                },
                sovereignty: {
                  type: 'object',
                  properties: {
                    score: {
                      type: 'number',
                      example: 90
                    },
                    serverLocation: {
                      type: 'string',
                      example: 'EU'
                    },
                    rgpdCompliant: {
                      type: 'boolean',
                      example: true
                    }
                  }
                }
              }
            },
            nlpAnalysis: {
              type: 'object',
              properties: {
                keywords: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      word: { type: 'string', example: 'quantum' },
                      count: { type: 'number', example: 5 },
                      relevance: { type: 'number', example: 0.92 }
                    }
                  }
                },
                sentiment: {
                  type: 'string',
                  enum: ['positive', 'negative', 'neutral'],
                  example: 'neutral'
                },
                sentimentScore: {
                  type: 'number',
                  description: 'Score -1 à 1',
                  example: 0.05
                }
              }
            }
          }
        },
        AIModel: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'gemini'
            },
            name: {
              type: 'string',
              example: 'Google Gemini'
            },
            description: {
              type: 'string',
              example: 'Google Gemini 2.0 Flash - Multimodal AI model'
            },
            sovereignty: {
              type: 'object',
              properties: {
                score: { type: 'number', example: 60 },
                serverLocation: { type: 'string', example: 'USA' },
                rgpdCompliant: { type: 'boolean', example: false }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Invalid request'
            },
            message: {
              type: 'string',
              example: 'Detailed error message'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Gestion de l\'authentification JWT (optionnel)'
      },
      {
        name: 'Prompts',
        description: 'Création et gestion des prompts avec agrégation multi-modèles IA'
      },
      {
        name: 'Models',
        description: 'Informations sur les modèles IA disponibles'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
