import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

// Configuration
import { loadSecrets } from './config/secrets.js';
import { connectDB, initAllAIClients } from './config/index.js';
import swaggerSpec from './config/swagger.js';

// Routes
import authRoutes from './routes/auth.js';
import promptRoutes from './routes/prompts.js';

// Middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Railway/Vercel reverse proxy
app.set('trust proxy', 1);

// Middleware de sécurité et parsing
app.use(helmet()); // Sécurité
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev')); // Logs
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Rate limiting général
app.use('/api', generalLimiter);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'AI Aggregator API Documentation'
}));

// Route de bienvenue
app.get('/', (req, res) => {
  res.json({
    message: 'API Agrégateur IA - Backend',
    version: '2.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      prompts: '/api/prompts',
      health: '/health',
      documentation: '/api-docs'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  const dbStatus = app.locals.dbConnected ? 'connected' : 'disconnected';
  const aiClientsCount = Object.keys(app.locals.aiClients || {}).length;

  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    aiClients: aiClientsCount
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);

// Middleware de gestion d'erreurs (doit être après les routes)
app.use(notFound);
app.use(errorHandler);

// Fonction de démarrage
const startServer = async () => {
  try {
    console.log('\nStarting AI Aggregator API Server...\n');

    // Load secrets from Infisical (must be first, before DB and AI clients)
    await loadSecrets();

    // Connecter à MongoDB
    console.log('Connecting to MongoDB...');
    await connectDB();
    app.locals.dbConnected = true;

    // Initialiser les clients AI
    console.log('Initializing AI clients...');
    const aiClients = initAllAIClients();
    app.locals.aiClients = aiClients;

    if (Object.keys(aiClients).length === 0) {
      console.warn('\nWARNING: No AI clients initialized!');
      console.warn('Please configure API keys in Infisical or .env file\n');
    }

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`\nServer is running!`);
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`AI Clients: ${Object.keys(aiClients).length} active\n`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Démarrer le serveur
startServer();

export default app;

