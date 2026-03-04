import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';

function App() {
  return (
    <div className="min-h-screen bg-sand-50">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-ink-900 border-t border-ink-700 mt-16">
        <div className="container-custom py-6 flex flex-col items-center gap-3">
          <p className="text-center text-sm text-sand-400">
            PFE 2025-2026 · IT for Green & Data Sovereignty · DeepSkal
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Le-skal/Green-AI-Scanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sand-500 hover:text-sand-300 transition-colors"
            >
              GitHub
            </a>
            <span className="text-ink-600">·</span>
            <a
              href="https://green-ai-scanner-production.up.railway.app/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sand-500 hover:text-sand-300 transition-colors"
            >
              API Docs (Swagger)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
