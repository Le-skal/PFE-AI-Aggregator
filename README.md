<div align="center">

# AI Response Aggregator
### *Agrégateur de Moteurs d'IA pour la Consolidation et l'Analyse*

<p><em>Unify AI Responses, Empower Data-Driven Decisions with Data Sovereignty</em></p>

![Status](https://img.shields.io/badge/status-operational-success?style=flat)
![Version](https://img.shields.io/badge/version-2.0-blue?style=flat)
![License](https://img.shields.io/badge/license-WTFPL-brightgreen?style=flat)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)

<p><em>Built with the tools and technologies:</em></p>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8-F04D35?style=flat&logo=mongoose&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4?style=flat&logo=axios&logoColor=white)

![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?style=flat&logo=chartdotjs&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.10-8884d8?style=flat)
![Zustand](https://img.shields.io/badge/Zustand-4-orange?style=flat)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-5-blue?style=flat)
![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?style=flat&logo=eslint&logoColor=white)

**AI APIs Integrated:**
![Google](https://img.shields.io/badge/Google-Gemini-4285F4?style=flat&logo=google&logoColor=white)
![Mistral](https://img.shields.io/badge/Mistral-AI-000000?style=flat)
![HuggingFace](https://img.shields.io/badge/Hugging-Face-FFD21E?style=flat&logo=huggingface&logoColor=black)
![Cohere](https://img.shields.io/badge/Cohere-Command-39A3ED?style=flat)

---

### 📊 Projet de Fin d'Études 2025-2026
**IT for Green & Data Sovereignty** | Skills4Mind | B3 Data & IA

**[🌐 Live Demo]([https://datakit.deepskal.com](https://green-ai.deepskal.com/)) · [📚 Maquettes Figma](https://www.figma.com/design/ErpgGc9MsR4MzDUZs28YrK/PFE?node-id=0-1&t=1zoBcZ5hSujxvZd5-1)**

</div>

---

## Table des Matières

- [Objectif du Projet](#objectif-du-projet)
- [Fonctionnalités Implémentées](#fonctionnalités-implémentées)
  - [1. Agrégation Multi-API IA](#1-agrégation-multi-api-ia)
  - [2. Analyse Sémantique et Scoring](#2-analyse-sémantique-et-scoring)
  - [3. Scoring Data Souverain](#3-scoring-data-souverain)
  - [4. Visualisation Comparative](#4-visualisation-comparative-dataviz)
  - [5. Authentification](#5-authentification-et-gestion-utilisateurs)
  - [6. Historique](#6-historique-et-navigation)
  - [7. Export Multi-Format](#7-export-multi-format)
- [Architecture Technique](#architecture-technique-implémentée)
- [Architecture Système](#architecture-système)
- [Modèles de Données](#modèles-de-données-réels)
- [Sécurité](#sécurité-implémentée)
- [Performances](#performances-et-kpis)
- [Installation](#installation-et-démarrage)
- [Structure du Projet](#structure-du-projet)
- [Documentation API](#documentation-api)
- [Contact](#contact)

---

## Objectif du Projet

Créer une plateforme web permettant de **consolider et comparer les réponses de plusieurs moteurs d'IA** pour un même prompt, en évaluant leur pertinence, cohérence et niveau de souveraineté des données.

Ce projet s'inscrit dans le cadre du **PFE 2025-2026** avec pour objectifs :
- **IT for Green** : Évaluer l'impact écologique des modèles d'IA
- **Data Sovereignty** : Analyser la souveraineté et conformité RGPD
- **Analyse Comparative** : Comparer les performances de 4 moteurs d'IA
- **DataViz Interactive** : Visualiser les résultats de manière claire et interactive

---

## Fonctionnalités Implémentées

### 1. Agrégation Multi-API IA
- Interface de saisie de prompt unique
- Envoi simultané vers 4 APIs d'IA :
  - **Google Gemini** (Gemini 2.0 Flash)
  - **Mistral AI** (Mistral Large Latest)
  - **Hugging Face** (Meta Llama 3.2 3B)
  - **Cohere** (Command)
- Gestion des timeouts et erreurs par API
- Agrégation parallèle des réponses

### 2. Analyse Sémantique et Scoring Scientifiquement Validé

#### Méthodes Scientifiques Implémentées

Ce projet utilise des algorithmes et métriques **scientifiquement validés** issus de la recherche académique en Information Retrieval (IR) et Natural Language Processing (NLP), au lieu de simples heuristiques arbitraires.

#### Système de Scoring Multi-Critères

**4 Scores Calculés par Réponse :**

1. **Score de Pertinence BM25** (0-100) :
   - **Algorithme** : BM25 (Best Matching 25)
   - **Référence** : Robertson & Zaragoza (2009) *"The Probabilistic Relevance Framework: BM25 and Beyond"*
   - **Description** : Algorithme de ranking probabiliste utilisé par Elasticsearch et les moteurs de recherche modernes
   - **Formule** :
     ```
     BM25(D,Q) = Σ IDF(qi) × (f(qi,D) × (k1 + 1)) / (f(qi,D) + k1 × (1 - b + b × |D|/avgdl))
     ```
   - **Paramètres** : k1=1.5 (saturation), b=0.75 (normalisation longueur)
   - **Avantages** :
     - Prend en compte la fréquence des termes (TF)
     - Normalise par la longueur du document
     - Applique un IDF pour réduire l'importance des termes communs

2. **Score de Similarité TF-IDF** (0-100) :
   - **Algorithme** : Cosine Similarity sur vecteurs TF-IDF
   - **Référence** : Salton & McGill (1983) *"Introduction to Modern Information Retrieval"*
   - **Description** : Mesure la similarité sémantique entre réponses en comparant leurs vecteurs TF-IDF
   - **Formule** :
     ```
     cos(θ) = (A·B) / (||A|| × ||B||)
     ```
   - **Avantages** :
     - Plus robuste que Jaccard (prend en compte la fréquence)
     - Capture la sémantique, pas juste la présence/absence
     - Standard en NLP pour comparaison de textes

3. **Scores ROUGE (Quality Assessment)** (0-1) :
   - **Algorithme** : ROUGE-1, ROUGE-2, ROUGE-L
   - **Référence** : Lin (2004) *"ROUGE: A Package for Automatic Evaluation of Summaries"*
   - **Description** : Métrique standard pour évaluer la qualité des résumés et réponses générées
   - **Métriques** :
     - **ROUGE-1** : Overlap d'unigrams (mots individuels)
     - **ROUGE-2** : Overlap de bigrams (paires de mots)
     - **ROUGE-L** : Plus longue sous-séquence commune (LCS)
   - **Avantages** :
     - Corrélation élevée avec l'évaluation humaine
     - Standard académique pour l'évaluation NLP
     - Capture à la fois le contenu et la structure

4. **Score de Souveraineté Dynamique** (0-100) :
   - **Calcul scientifique en 3 composantes** :
     - Hosting (50 pts max) : Localisation serveurs (France=50, EU=40, USA=20)
     - Company (30 pts max) : Nationalité entreprise (France=30, EU=25, USA=15)
     - License (20 pts max) : Type licence (Open Source=20, Open Weights=15, Proprietary=5)
   - **Cloud Act Risk** : Détection automatique si score < 50
   - **RGPD Analysis** : Statut de conformité détaillé
   - **Recommandations** : Suggestions de sécurité automatiques

5. **Green IT Impact Écologique** :
   - **Consommation énergétique** : kWh par 1000 tokens (Mistral=0.002, Gemini=0.005, Cohere=0.006)
   - **Impact carbone** : Grammes de CO2 calculés selon localisation serveurs
     - France: 50g CO2/kWh (nucléaire/renouvelable)
     - EU: 250g CO2/kWh (mix européen)
     - USA: 380g CO2/kWh (charbon/gaz dominant)
   - **Eco-Score** : Note A à E (comme Nutri-score) basée sur CO2/token
   - **Facteur temporel** : 1.2x entre 18h-22h (heures de pointe)
   - **Équivalences** : km voiture, charges smartphone, streaming vidéo, arbres/an
   - **Référence** : Green IT best practices + IEA 2024 carbon intensity data
   - **Status** : ✅ FONCTIONNEL (frontend affiche toutes les données)

6. **Score de Vitesse** (0-100) :
   - Temps de réponse normalisé (plus rapide = meilleur score)

#### Score Composite (Pondération Scientifiquement Justifiée)

**Formule Optimisée :**

```
Score Composite = (BM25 × 45%) + (Souveraineté × 25%) +
                  (Similarité TF-IDF × 20%) + (Vitesse × 10%)
```

**Pondération basée sur la recherche académique :**
- **45%** - Pertinence BM25 (critère principal en IR - Manning et al., 2008)
- **25%** - Souveraineté (RGPD + Green IT - importance réglementaire)
- **20%** - Consensus TF-IDF (Ensemble methods - Dietterich, 2000)
- **10%** - Vitesse (Green computing - efficacité énergétique)

**Justification des pondérations** :
- La recherche en Information Retrieval montre que la pertinence est le critère #1 (45%)
- Le contexte IT for Green justifie l'importance de la souveraineté (25%)
- Le consensus entre modèles est un indicateur de fiabilité (20%)
- L'efficacité computationnelle s'aligne avec Green IT (10%)

#### Analyse NLP Scientifique

**Preprocessing Avancé** :
- Tokenization (natural library)
- Stopword removal (liste étendue)
- Stemming (Porter Stemmer)
- Vectorisation TF-IDF

**Métriques Extraites** :
- Keywords extraction (TF-IDF ranking)
- Sentiment analysis (AFINN lexicon)
- Topic detection (POS tagging)
- Matrices de similarité cosinus
- ROUGE scores (qualité de génération)

### 3. Scoring Data Souverain
- **Localisation des serveurs** : USA, France, Europe
- **Conformité RGPD** : Évaluation dynamique par modèle
- **Score de souveraineté** (0-100) : calculé dynamiquement via 3 composantes (Hosting, Company, License)
- **Cloud Act Risk** : détection automatique
- **Recommandations RGPD** : suggestions de sécurité générées automatiquement

### 4. Visualisation Comparative (DataViz)
- **Tableau de comparaison** : Affichage côte à côte avec ResponseCard
- **Graphiques de scores** : Barres comparatives (ScoresChart)
- **Radar de performance** : Visualisation multi-critères (PerformanceRadar)
- **Matrices de similarité** : Heatmap interactive (SimilarityMatrix)
- **Nuages de mots** : Visualisation des keywords fréquents (WordCloud)
- **Résumé comparatif** : Moyennes et consensus (ComparisonSummary)

### 5. Authentification et Gestion Utilisateurs
- **Système optionnel** : L'application fonctionne sans compte
- **JWT Authentication** : Tokens sécurisés
- **Gestion de session** : Zustand avec persistence localStorage
- **Pages** : Login, Register, Profile
- **Sécurité** : Bcrypt pour hash des mots de passe

### 6. Historique et Navigation
- **Historique complet** : Page dédiée avec tous les prompts
- **Sidebar dynamique** : Affichage des 5 derniers prompts
- **Vue détails** : Affichage complet d'un prompt avec toutes ses réponses
- **Navigation** : Query params pour liens directs
- **Timestamps intelligents** : "5m ago", "2h ago", etc.

### 7. Export Multi-Format
- **Export JSON** : Données brutes complètes
- **Export CSV** : Format tabulaire pour analyse Excel
- **Export PDF** : Rapport professionnel formaté et imprimable
- **Disponible sur** :
  - Page d'accueil (après soumission)
  - Page historique (vue détails)
- **Nom de fichier automatique** : `ai-aggregator-{promptId}.{format}`

---

## Architecture Technique Implémentée

### Stack Technique Réelle

#### Frontend
- **Framework** : ✅ React.js 18 avec Vite
- **Styling** : ✅ Tailwind CSS (palette beige/noir)
- **State Management** : ✅ Zustand avec persistence
- **Requêtes API** : ✅ Axios avec intercepteurs JWT
- **Routing** : ✅ React Router DOM v6
- **Visualisation** :
  - ✅ Chart.js (graphiques barres)
  - ✅ Recharts (radar, composants)
  - ✅ Custom components (matrices, word cloud)

#### Backend
- **Framework** : ✅ Node.js avec Express.js
- **Langage** : ✅ JavaScript (ES6+)
- **API Architecture** : ✅ RESTful API + Swagger/OpenAPI 3.0
- **Validation** : ✅ Express-validator
- **Middleware** : ✅ CORS, morgan, express.json, rate limiting
- **Architecture** : ✅ SOLID Principles (Single Responsibility)

#### Base de Données
- **Database** : ✅ MongoDB Atlas (Cloud)
- **ORM** : ✅ Mongoose
- **Collections** :
  - Users (authentification)
  - Prompts (requêtes utilisateurs)
  - Responses (réponses des modèles)

#### Intelligence Artificielle
- **APIs IA Intégrées** :
  - ✅ Google Generative AI SDK (Gemini)
  - ✅ Mistral AI SDK
  - ✅ Hugging Face Inference API
  - ✅ Cohere SDK
- **Analyse NLP Scientifique** :
  - ✅ natural (TF-IDF vectorization, Porter Stemmer, AFINN sentiment)
  - ✅ stopword (stopwords removal avancé)
  - ✅ compromise (NER, POS tagging)
  - ✅ Algorithmes custom : BM25, ROUGE (ROUGE-1, ROUGE-2, ROUGE-L)
  - ✅ Cosine similarity sur vecteurs TF-IDF

#### Sécurité & Auth
- ✅ **JWT** : Authentification stateless
- ✅ **Bcrypt** : Hash des mots de passe (10 rounds)
- ✅ **Infisical** : Gestion centralisée des secrets (eu.infisical.com - serveurs EU, RGPD)
- ✅ **dotenv** : Fallback local (PORT, FRONTEND_URL uniquement)
- ✅ **CORS** : Configuré pour frontend
- ✅ **Middleware Auth** : Protection des routes sensibles

---

## Architecture Système

```
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite)                │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ PromptInput  │  │ ResponseCard │  │ ScoresChart  │   │
│  │              │  │              │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   WordCloud  │  │  Similarity  │  │PerformRadar  │   │
│  │              │  │   Matrix     │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   History    │  │HistorySide   │  │ExportService │   │
│  │     Page     │  │     bar      │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │ Axios HTTP/REST
                         │ JWT Token Interceptor
                         ▼
┌─────────────────────────────────────────────────────────┐
│             BACKEND (Node.js + Express)                 │
│                                                         │
│  Routes:                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ /api/prompts │  │  /api/auth   │  │ /api/models  │   │
│  │              │  │              │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
│  Services:                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │AI Aggregator │  │   Scoring    │  │     NLP      │   │
│  │   Service    │  │   Service    │  │   Service    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ Sovereignty  │  │     Auth     │                     │
│  │   Service    │  │  Controller  │                     │
│  └──────────────┘  └──────────────┘                     │
└────────────────────────┬────────────────────────────────┘
                         │ Mongoose ODM
                         ▼
┌─────────────────────────────────────────────────────────┐
│              DATABASE (MongoDB Atlas)                   │
│                                                         │
│  Collections:                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   prompts    │  │  responses   │  │    users     │   │
│  │              │  │              │  │              │   │
│  │  - _id       │  │  - _id       │  │  - _id       │   │
│  │  - userId    │  │  - promptId  │  │  - email     │   │
│  │  - promptText│  │  - aiModel   │  │  - password  │   │
│  │  - aiModels  │  │  - response  │  │  - name      │   │
│  │  - status    │  │  - scores    │  │  - createdAt │   │
│  │  - metadata  │  │  - nlp       │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  EXTERNAL AI APIs                       │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  Google  │ │ Mistral  │ │ Hugging  │ │ Cohere   │    │
│  │  Gemini  │ │    AI    │ │   Face   │ │          │    │
│  │   API    │ │   API    │ │   API    │ │   API    │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## Modèles de Données Réels

### Prompt Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (optionnel),
  promptText: String (required),
  aiModels: [String], // ['gemini', 'mistral', 'huggingface', 'cohere']
  status: String, // 'completed', 'failed', 'processing'
  metadata: {
    totalResponses: Number,
    successfulResponses: Number,
    processingTime: Number // en ms
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Response Schema
```javascript
{
  _id: ObjectId,
  promptId: ObjectId (ref: Prompt),
  aiModel: String, // 'gemini', 'mistral', 'huggingface', 'cohere'
  responseText: String,
  responseTime: Number, // en ms
  tokens: {
    input: Number,
    output: Number,
    total: Number
  },
  status: String, // 'success', 'failed'
  error: String (si échec),
  scores: {
    relevance: Number, // 0-100 (BM25 score)
    similarity: Number, // 0-100 (TF-IDF Cosine Similarity)
    speed: Number, // 0-100 (normalized speed score)
    composite: Number, // 0-100 (weighted composite score)
    rouge: {
      rouge1: Number, // 0-1 (unigram overlap)
      rouge2: Number, // 0-1 (bigram overlap)
      rougeL: Number  // 0-1 (longest common subsequence)
    },
    sovereignty: {
      score: Number, // 0-100 (total)
      breakdown: {
        hosting: { score, maxScore, location, percentage },
        company: { score, maxScore, nationality, percentage },
        license: { score, maxScore, type, percentage }
      },
      rgpd: { compliant, location, status, risk },
      cloudActRisk: Boolean,
      sovereigntyLevel: String, // 'Excellent', 'Good', 'Medium', 'Low', 'Critical'
      metadata: { cloudProvider, dataRetention, serverLocation, ... },
      recommendations: [{ type, priority, message, action }]
    }
  },
  nlpAnalysis: {
    keywords: [{
      word: String,
      count: Number,
      relevance: Number
    }],
    sentiment: String, // 'positive', 'negative', 'neutral'
    sentimentScore: Number, // -1 à 1
    topics: [String],
    wordCount: Number,
    sentenceCount: Number
  },
  greenIT: {
    tokens: { total, input, output },
    energy: { consumedKwh, perToken, timeFactor },
    carbon: { impactGrams, intensity, location },
    ecoScore: String, // 'A', 'B', 'C', 'D', 'E', 'N/A'
    equivalences: { carKm, smartphoneCharges, streamingMinutes, treesPerYear },
    timestamp: String
  },
  createdAt: Date
}
```

### User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed with bcrypt),
  name: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Sécurité Implémentée

### Mesures en Place
- ✅ Hash des mots de passe avec bcrypt (10 rounds)
- ✅ JWT pour authentification stateless
- ✅ Tokens stockés dans localStorage (côté client)
- ✅ Middleware d'authentification optionnel
- ✅ Validation des entrées (express-validator)
- ✅ CORS configuré pour localhost:5173
- ✅ **Infisical** : Secrets chiffrés centralisés (eu.infisical.com, hébergement EU)
- ✅ API keys serveur-side uniquement (jamais exposées au frontend)
- ✅ Gestion d'erreurs centralisée

### Gestion des Secrets — Infisical

Les secrets sensibles (API keys, MONGODB_URI, JWT_SECRET) sont stockés dans **Infisical** (instance EU) et chargés dynamiquement au démarrage du serveur. Seul un token Infisical est présent sur disque.

```env
# .env (seule variable locale nécessaire)
INFISICAL_TOKEN=st.xxxxxxxxxxxxxxxx

# Variables non-sensibles (conservées localement)
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Secrets stockés dans Infisical (eu.infisical.com) :**
- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `MISTRAL_API_KEY`
- `HUGGINGFACE_API_KEY`
- `COHERE_API_KEY`

**Avantages pour la souveraineté des données :**
- Instance hébergée en Europe (RGPD compliant)
- Secrets chiffrés au repos et en transit
- Audit logs de chaque accès
- Open source (github.com/Infisical/infisical)

---

## Performances et KPIs

### Performances Mesurées
- Temps de réponse moyen : 3-8s (4 APIs en parallèle)
- Support de 4 APIs simultanées
- Historique illimité par utilisateur
- Export en 3 formats (JSON, CSV, PDF)
- Visualisations temps réel
- Interface responsive (mobile + desktop)

### Métriques Techniques
- Frontend build size : ~500KB (gzip)
- Backend RAM usage : ~150MB
- Database : MongoDB Atlas (M0 gratuit)
- Concurrent requests : Limité par quotas API gratuits

---

## Installation et Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte MongoDB Atlas
- Clés API : Gemini, Mistral, Hugging Face, Cohere

### Backend
```bash
cd backend
npm install
# Configurer .env avec vos clés
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### URLs
- Frontend : http://localhost:5173
- Backend : http://localhost:5000

---

## Structure du Projet

```
ProjetFinale3/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── ai-apis.js
│   │   │   ├── swagger.js
│   │   │   └── index.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── promptController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Prompt.js
│   │   │   └── Response.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── prompts.js
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   │   ├── geminiService.js (NEW - SOLID)
│   │   │   │   ├── mistralService.js (NEW - SOLID)
│   │   │   │   ├── huggingfaceService.js (NEW - SOLID)
│   │   │   │   ├── cohereService.js (NEW - SOLID)
│   │   │   │   └── orchestratorService.js (NEW - SOLID)
│   │   │   ├── nlpService.js
│   │   │   └── scoringService.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx
│   │   │   ├── prompt/
│   │   │   │   └── PromptInput.jsx
│   │   │   ├── results/
│   │   │   │   ├── ResponseCard.jsx
│   │   │   │   └── ComparisonSummary.jsx
│   │   │   ├── visualization/
│   │   │   │   ├── ScoresChart.jsx
│   │   │   │   ├── PerformanceRadar.jsx
│   │   │   │   ├── SimilarityMatrix.jsx
│   │   │   │   └── WordCloud.jsx
│   │   │   └── history/
│   │   │       └── HistorySidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── exportService.js
│   │   ├── store/
│   │   │   └── authStore.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Documentation API

**Documentation interactive Swagger**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

L'API REST est entièrement documentée avec Swagger/OpenAPI. Vous pouvez tester tous les endpoints directement depuis l'interface Swagger.

### Endpoints Disponibles

#### Auth
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/profile` - Profil utilisateur (JWT requis)

#### Prompts
- `POST /api/prompts` - Créer un prompt
- `GET /api/prompts` - Liste des prompts (avec pagination)
- `GET /api/prompts/:id` - Détails d'un prompt

#### Models
- `GET /api/models` - Liste des modèles disponibles

---

## Architecture SOLID

Le projet respecte les principes SOLID (notamment Single Responsibility Principle):
- Chaque service AI a sa propre responsabilité (`geminiService.js`, `mistralService.js`, etc.)
- L'orchestrateur coordonne sans faire d'appels API directs
- Architecture modulaire facilitant l'ajout de nouveaux modèles
- Code maintenable et testable selon les standards de l'industrie

Référence: https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/

---

**Version** : 2.0
**Dernière mise à jour** : 26 Fevrier 2026
**Statut** : ✅ Fonctionnel et opérationnel
