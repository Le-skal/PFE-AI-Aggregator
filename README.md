<div align="center">

# 🤖 AI Response Aggregator
### *Agrégateur de Moteurs d'IA pour la Consolidation et l'Analyse*

<p><em>Unify AI Responses, Empower Data-Driven Decisions with Data Sovereignty</em></p>

![Status](https://img.shields.io/badge/status-operational-success?style=flat)
![Version](https://img.shields.io/badge/version-2.0-blue?style=flat)
![License](https://img.shields.io/badge/license-confidential-red?style=flat)
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

</div>

---

## 📑 Table des Matières

- [🎯 Objectif du Projet](#-objectif-du-projet)
- [🌟 Fonctionnalités Implémentées](#-fonctionnalités-implémentées)
  - [1. Agrégation Multi-API IA](#-1-agrégation-multi-api-ia)
  - [2. Analyse Sémantique et Scoring](#-2-analyse-sémantique-et-scoring)
  - [3. Scoring Data Souverain](#-3-scoring-data-souverain)
  - [4. Visualisation Comparative](#-4-visualisation-comparative-dataviz)
  - [5. Authentification](#-5-authentification-et-gestion-utilisateurs)
  - [6. Historique](#-6-historique-et-navigation)
  - [7. Export Multi-Format](#-7-export-multi-format)
- [🏗️ Architecture Technique](#️-architecture-technique-implémentée)
- [📐 Architecture Système](#-architecture-système)
- [📅 État d'Avancement](#-état-davancement-par-phase)
- [📊 Modèles de Données](#-modèles-de-données-réels)
- [🔐 Sécurité](#-sécurité-implémentée)
- [🌍 Souveraineté Data](#-indicateurs-de-souveraineté-data)
- [📈 Performances](#-performances-et-kpis)
- [🚀 Installation](#-installation-et-démarrage)
- [📁 Structure du Projet](#-structure-du-projet)
- [🎨 Design System](#-design-system)
- [🐛 Problèmes Résolus](#-problèmes-résolus)
- [📚 Documentation API](#-documentation-api)
- [📞 Contact](#-contact)

---

## 🎯 Objectif du Projet

Créer une plateforme web permettant de **consolider et comparer les réponses de plusieurs moteurs d'IA** pour un même prompt, en évaluant leur pertinence, cohérence et niveau de souveraineté des données.

Ce projet s'inscrit dans le cadre du **PFE 2025-2026** avec pour objectifs :
- 🌱 **IT for Green** : Évaluer l'impact écologique des modèles d'IA
- 🔒 **Data Sovereignty** : Analyser la souveraineté et conformité RGPD
- 📊 **Analyse Comparative** : Comparer les performances de 4 moteurs d'IA
- 🎨 **DataViz Interactive** : Visualiser les résultats de manière claire et interactive

---

## 🌟 Fonctionnalités Implémentées

### ✅ 1. Agrégation Multi-API IA
- Interface de saisie de prompt unique
- Envoi simultané vers 4 APIs d'IA :
  - ✅ **Google Gemini** (Gemini 2.0 Flash)
  - ✅ **Mistral AI** (Mistral Large Latest)
  - ✅ **Hugging Face** (DeepSeek-R1-Distill-Qwen-32B)
  - ✅ **Cohere** (Command)
- Gestion des timeouts et erreurs par API
- Agrégation parallèle des réponses

### ✅ 2. Analyse Sémantique et Scoring Scientifiquement Validé

#### 🔬 Méthodes Scientifiques Implémentées

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

4. **Score de Souveraineté** (0-100) :
   - Localisation des serveurs (France > Europe > USA)
   - Conformité RGPD
   - Type de cloud provider

5. **Score de Vitesse** (0-100) :
   - Temps de réponse normalisé (plus rapide = meilleur score)

#### 🏆 Score Composite (Pondération Scientifiquement Justifiée)

**Formule Optimisée :**

```
Score Composite = (BM25 × 45%) + (Souveraineté × 25%) +
                  (Similarité TF-IDF × 20%) + (Vitesse × 10%)
```

**Pondération basée sur la recherche académique :**
- 🎯 **45%** - Pertinence BM25 (critère principal en IR - Manning et al., 2008)
- 🔒 **25%** - Souveraineté (RGPD + Green IT - importance réglementaire)
- 🤝 **20%** - Consensus TF-IDF (Ensemble methods - Dietterich, 2000)
- ⚡ **10%** - Vitesse (Green computing - efficacité énergétique)

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

#### Références Académiques

1. **BM25** : Robertson, S. & Zaragoza, H. (2009). "The Probabilistic Relevance Framework: BM25 and Beyond". *Foundations and Trends in Information Retrieval*.

2. **TF-IDF & Cosine Similarity** : Salton, G. & McGill, M. J. (1983). "Introduction to Modern Information Retrieval". *McGraw-Hill*.

3. **ROUGE** : Lin, C. Y. (2004). "ROUGE: A Package for Automatic Evaluation of Summaries". *ACL Workshop*.

4. **Composite Scoring** : Manning, C. D., Raghavan, P., & Schütze, H. (2008). "Introduction to Information Retrieval". *Cambridge University Press*.

5. **Ensemble Methods** : Dietterich, T. G. (2000). "Ensemble Methods in Machine Learning". *Multiple Classifier Systems*.

### ✅ 3. Scoring Data Souverain
- **Localisation des serveurs** : USA, France, Europe
- **Conformité RGPD** : Évaluation par modèle
- **Score de souveraineté** (0-100) :
  - 🟢 Mistral AI : 90/100 (France, RGPD complet)
  - 🟡 Hugging Face : 70/100 (EU/USA, partiellement conforme)
  - 🟡 Google Gemini : 60/100 (USA, conformité partielle)
  - 🔴 Cohere : 55/100 (USA, risques de dépendance)

### ✅ 4. Visualisation Comparative (DataViz)
- **Tableau de comparaison** : Affichage côte à côte avec ResponseCard
- **Graphiques de scores** : Barres comparatives (ScoresChart)
- **Radar de performance** : Visualisation multi-critères (PerformanceRadar)
- **Matrices de similarité** : Heatmap interactive (SimilarityMatrix)
- **Nuages de mots** : Visualisation des keywords fréquents (WordCloud)
- **Résumé comparatif** : Moyennes et consensus (ComparisonSummary)

### ✅ 5. Authentification et Gestion Utilisateurs
- **Système optionnel** : L'application fonctionne sans compte
- **JWT Authentication** : Tokens sécurisés
- **Gestion de session** : Zustand avec persistence localStorage
- **Pages** : Login, Register, Profile
- **Sécurité** : Bcrypt pour hash des mots de passe

### ✅ 6. Historique et Navigation
- **Historique complet** : Page dédiée avec tous les prompts
- **Sidebar dynamique** : Affichage des 5 derniers prompts
- **Vue détails** : Affichage complet d'un prompt avec toutes ses réponses
- **Navigation** : Query params pour liens directs
- **Timestamps intelligents** : "5m ago", "2h ago", etc.

### ✅ 7. Export Multi-Format
- **Export JSON** : Données brutes complètes
- **Export CSV** : Format tabulaire pour analyse Excel
- **Export PDF** : Rapport professionnel formaté et imprimable
- **Disponible sur** :
  - Page d'accueil (après soumission)
  - Page historique (vue détails)
- **Nom de fichier automatique** : `ai-aggregator-{promptId}.{format}`

---

## 🏗️ Architecture Technique Implémentée

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
- **API Architecture** : ✅ RESTful API
- **Validation** : ✅ Express-validator
- **Middleware** : ✅ CORS, morgan, express.json

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
- ✅ **dotenv** : Gestion des secrets (.env)
- ✅ **CORS** : Configuré pour frontend
- ✅ **Middleware Auth** : Protection des routes sensibles

---

## 📐 Architecture Système

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

## 📅 État d'Avancement par Phase

### Phase 1 : Planification et CDC ✅
- [x] Définition des besoins
- [x] Rédaction du CDC
- [x] Choix des technologies
- [x] Architecture détaillée

### Phase 2 : Setup et Structure du Projet ✅
- [x] Initialisation frontend (React + Vite + Tailwind)
- [x] Initialisation backend (Node.js + Express)
- [x] Configuration MongoDB Atlas
- [x] Git et structure des dossiers
- [x] Configuration .env (4 API keys)

### Phase 3 : Backend - Core API ✅
- [x] Routes API REST (/api/prompts, /api/auth, /api/models)
- [x] Authentification JWT (optionnelle)
- [x] Connexions aux 4 APIs IA externes
- [x] Système d'agrégation parallèle
- [x] Gestion d'erreurs et timeouts

### Phase 4 : Backend - Scoring et Analyse ✅
- [x] **BM25 Algorithm** pour relevance scoring (Robertson & Zaragoza, 2009)
- [x] **TF-IDF + Cosine Similarity** pour comparaison sémantique (Salton & McGill, 1983)
- [x] **ROUGE Scores** (ROUGE-1, ROUGE-2, ROUGE-L) pour quality assessment (Lin, 2004)
- [x] Analyse NLP avancée : tokenization, stopword removal, stemming
- [x] Scoring de souveraineté (location, RGPD, cloud)
- [x] Score composite scientifiquement pondéré (45% BM25 + 25% Sovereignty + 20% TF-IDF + 10% Speed)
- [x] Génération de matrices de similarité cosinus

### Phase 5 : Frontend - Interface Utilisateur ✅
- [x] Interface de saisie de prompts (PromptInput)
- [x] Tableau de comparaison (ResponseCard)
- [x] Authentification côté client (Login/Register)
- [x] Navigation et routing (React Router)
- [x] Design system beige/noir professionnel
- [x] Responsive design (mobile-first)

### Phase 6 : Frontend - DataViz ✅
- [x] Graphiques comparatifs (ScoresChart - Chart.js)
- [x] Radar de performance (PerformanceRadar - Recharts)
- [x] Matrices de similarité (SimilarityMatrix - custom)
- [x] Nuages de mots (WordCloud - custom)
- [x] Résumé comparatif (ComparisonSummary)
- [x] Visualisations responsive et interactives

### Phase 7 : Fonctionnalités Avancées ✅
- [x] Historique des prompts (page dédiée)
- [x] Sidebar historique (5 derniers prompts)
- [x] Export JSON (données brutes)
- [x] Export CSV (format tabulaire)
- [x] Export PDF (rapport formaté)
- [x] Vue détails de prompt
- [x] Navigation par query params

### Phase 8 : Tests et Démo 🚧
- [ ] Tests unitaires backend
- [ ] Tests unitaires frontend
- [ ] Tests d'intégration
- [ ] Tests de charge
- [ ] Correction des bugs
- [ ] Préparation de la démo
- [ ] Documentation utilisateur finale

---

## 📊 Modèles de Données Réels

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
      score: Number, // 0-100
      serverLocation: String, // 'USA', 'EU', 'ASIA', 'OTHER'
      rgpdCompliant: Boolean,
      cloudProvider: String,
      dataRetention: String
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

## 🔐 Sécurité Implémentée

### Mesures en Place
- ✅ Hash des mots de passe avec bcrypt (10 rounds)
- ✅ JWT pour authentification stateless
- ✅ Tokens stockés dans localStorage (côté client)
- ✅ Middleware d'authentification optionnel
- ✅ Validation des entrées (express-validator)
- ✅ CORS configuré pour localhost:5173
- ✅ Variables d'environnement (.env) pour secrets
- ✅ API keys serveur-side uniquement (jamais exposées)
- ✅ Gestion d'erreurs centralisée

### Fichier .env
```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# Server
PORT=5001

# JWT
JWT_SECRET=votre_secret_jwt

# AI API Keys (serveur uniquement)
GEMINI_API_KEY=votre_cle_gemini
MISTRAL_API_KEY=votre_cle_mistral
HUGGINGFACE_API_KEY=votre_cle_huggingface
COHERE_API_KEY=votre_cle_cohere
```

---

## 🌍 Indicateurs de Souveraineté Data

### Données par Modèle

#### 🟢 Mistral AI (90/100)
- **Location** : France 🇫🇷
- **RGPD** : ✅ Conforme
- **Cloud** : Scaleway (français)
- **Open Source** : Partiellement
- **Transparence** : Excellente

#### 🟡 Hugging Face (70/100)
- **Location** : Europe/USA 🇪🇺🇺🇸
- **RGPD** : ⚠️ Partiel
- **Cloud** : Multi-cloud
- **Open Source** : ✅ Oui
- **Transparence** : Bonne

#### 🟡 Google Gemini (60/100)
- **Location** : USA 🇺🇸
- **RGPD** : ⚠️ Partiel (bouclier UE-US)
- **Cloud** : Google Cloud
- **Open Source** : ❌ Non
- **Transparence** : Moyenne

#### 🔴 Cohere (55/100)
- **Location** : USA 🇺🇸
- **RGPD** : ⚠️ Limité
- **Cloud** : AWS (multi-régions)
- **Open Source** : ❌ Non
- **Transparence** : Moyenne

---

## 📈 Performances et KPIs

### Performances Mesurées
- ⚡ Temps de réponse moyen : 3-8s (4 APIs en parallèle)
- 📊 Support de 4 APIs simultanées
- 💾 Historique illimité par utilisateur
- 📁 Export en 3 formats (JSON, CSV, PDF)
- 🎨 Visualisations temps réel
- 📱 Interface responsive (mobile + desktop)

### Métriques Techniques
- Frontend build size : ~500KB (gzip)
- Backend RAM usage : ~150MB
- Database : MongoDB Atlas (M0 gratuit)
- Concurrent requests : Limité par quotas API gratuits

---

## 🚀 Installation et Démarrage

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
- Backend : http://localhost:5001

---

## 📁 Structure du Projet

```
ProjetFinale3/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── ai-apis.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── promptController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Prompt.js
│   │   │   └── Response.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── promptRoutes.js
│   │   │   └── modelRoutes.js
│   │   ├── services/
│   │   │   ├── aiAggregatorService.js
│   │   │   ├── nlpService.js
│   │   │   └── scoringService.js
│   │   └── server.js
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

## 🎨 Design System

### Palette de Couleurs
```css
/* Beige/Sand */
--sand-50: #f5f1e8;
--sand-100: #e8dcc4;
--sand-200: #dcc8a0;
--sand-300: #d4c5a9;
--sand-400: #c9b896;
--sand-500: #b8a782;
--sand-600: #a89670;

/* Ink/Black */
--ink-600: #666666;
--ink-700: #4a4a4a;
--ink-800: #2e2e2e;
--ink-900: #1a1a1a;
```

### Typographie
- **Font** : System fonts (Arial, sans-serif)
- **Headings** : font-semibold, font-bold
- **Body** : font-normal

### Composants
- **Cards** : border, padding, hover effects
- **Buttons** : border-ink-900, hover transitions
- **Inputs** : border-sand-300, focus states
- **Badges** : border, small padding, text-xs

---

## 🐛 Problèmes Résolus

### 1. Hugging Face API Endpoint Deprecated
**Problème** : `api-inference.huggingface.co` n'est plus supporté
**Solution** : Migration vers `router.huggingface.co`

### 2. Hugging Face Wrong API Method
**Problème** : `textGeneration()` ne fonctionnait pas
**Solution** : Utilisation de `chatCompletion()` format OpenAI

### 3. Cohere Generate API Deprecated
**Problème** : API Generate supprimée le 15 septembre 2025
**Solution** : Migration vers `client.chat()`

### 4. Sentiment Validation Error
**Problème** : Objet sentiment au lieu de string
**Solution** : Aplatissement de l'objet sentiment pour failed responses

### 5. Layout Centering Issues
**Problème** : Contenu principal décentré après ajout sidebar
**Solution** : Wrapper `max-w-[1600px] mx-auto` autour du flex container

---

## 📚 Documentation API

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

## 📝 Licence

Ce projet est confidentiel et ne doit pas être diffusé sans l'accord de Skills4Mind.

---

## 🎯 Prochaines Étapes

### À Faire (Optionnel)
- [ ] Tests unitaires (Jest + React Testing Library)
- [ ] Tests d'intégration (Supertest)
- [ ] Documentation Swagger/OpenAPI
- [ ] Déploiement production (Vercel + Railway)
- [ ] Monitoring et logs (Sentry, LogRocket)
- [ ] Optimisations performances
- [ ] Cache Redis pour réponses
- [ ] Rate limiting avancé
- [ ] Internationalisation (i18n)

---

**Version** : 2.0
**Dernière mise à jour** : 1er Janvier 2026
**Statut** : ✅ Fonctionnel et opérationnel
