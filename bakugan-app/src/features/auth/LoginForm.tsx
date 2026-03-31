import { useState } from 'react';
import { LoginCredentials } from './types';
import { loginUser } from './api';
import LoadingSpinner from '../../components/LoadingSpinner';

interface LoginFormProps {
  onLogin: (user: { id: number; username: string; avatar: string; wins: number; losses: number }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await loginUser(credentials);
      if (user) {
        onLogin(user);
      } else {
        setError('Nepareizs lietotājvārds vai parole. Mēģini: DanKuso / bakugan123');
      }
    } catch {
      setError('Savienojuma kļūda. Pārliecinies, ka serveris darbojas (npm run dev).');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setCredentials({ username: 'DanKuso', password: 'bakugan123' });
    setLoading(true);
    setError(null);
    try {
      const user = await loginUser({ username: 'DanKuso', password: 'bakugan123' });
      if (user) onLogin(user);
    } catch {
      setError('Savienojuma kļūda. Pārliecinies, ka serveris darbojas (npm run dev).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo area */}
        <div className="text-center mb-10">
          <div className="text-8xl mb-4 animate-float inline-block">🐉</div>
          <h1 className="text-5xl font-black font-display uppercase tracking-tighter">
            <span className="text-red-500">Baku</span>
            <span className="text-white">gan</span>
          </h1>
          <p className="text-gray-400 font-body mt-2 text-lg">Universe — Roll out, Bakugan!</p>
        </div>

        {/* Login card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold font-display mb-6 text-center">Ieiet sistēmā</h2>

          {error && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 rounded-lg p-3 mb-5 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1 font-display uppercase tracking-wider">
                Lietotājvārds
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-body"
                placeholder="Ievadi lietotājvārdu..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1 font-display uppercase tracking-wider">
                Parole
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-body"
                placeholder="Ievadi paroli..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
            >
              {loading ? <LoadingSpinner size="sm" /> : '🎮 Ieiet'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-3 text-gray-500 text-sm">vai</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="btn-secondary w-full"
          >
            ⚡ Demo pieejas (Dan Kuso)
          </button>

          <div className="mt-6 bg-gray-800/50 rounded-lg p-3 text-xs text-gray-400 space-y-1">
            <p className="font-semibold text-gray-300">Testa lietotāji:</p>
            <p>🎮 DanKuso / bakugan123</p>
            <p>🌪️ ShunKazami / ventus456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
