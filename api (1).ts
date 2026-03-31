import { useState } from 'react';
import { LoginCredentials } from './types';
import { loginUser } from './api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAppContext } from '../../context/AppContext';

export default function LoginForm() {
  const { login } = useAppContext();
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
        login(user);
      } else {
        setError('Nepareizs lietotājvārds vai parole. Mēģini: DanKuso / bakugan123');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Savienojuma kļūda.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    const demoCredentials = { username: 'DanKuso', password: 'bakugan123' };
    setCredentials(demoCredentials);
    setLoading(true);
    setError(null);

    try {
      const user = await loginUser(demoCredentials);
      if (user) login(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Savienojuma kļūda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-red-700/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-700/15 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <section className="hidden lg:block">
          <p className="mb-4 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.35em] text-red-200">
            Programmēšana II projekts
          </p>
          <div className="mb-5 flex items-center gap-5">
            <div className="text-8xl animate-float">🐉</div>
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tight">
                <span className="text-red-500">Baku</span>
                <span className="text-white">gan</span>
              </h1>
              <p className="mt-2 font-display text-xl uppercase tracking-[0.35em] text-gray-400">Universe</p>
            </div>
          </div>
          <p className="max-w-2xl text-xl text-gray-200">
            Tumšs, stilīgs un responsīvs interfeiss ar skaidru ievades formu, demo piekļuvi un uz spēļu tematiku balstītu vizuālo identitāti.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <FeaturePill title="Ātra piekļuve" text="Demo poga ļauj ieiet bez manuālas ievades." />
            <FeaturePill title="Kontrasts" text="Lieli teksti un fokusētas ievades zonas." />
            <FeaturePill title="Responsīvs" text="Skaidrs izkārtojums arī mazākiem ekrāniem." />
          </div>
        </section>

        <section className="glass-card mx-auto w-full max-w-lg p-6 sm:p-8">
          <div className="mb-8 text-center lg:hidden">
            <div className="text-7xl animate-float">🐉</div>
            <h1 className="mt-3 text-5xl font-black uppercase tracking-tight">
              <span className="text-red-500">Baku</span>
              <span className="text-white">gan</span>
            </h1>
            <p className="mt-2 text-gray-400">Universe — Roll out, Bakugan!</p>
          </div>

          <div className="mb-6 text-center lg:text-left">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-gray-500">Autorizācija</p>
            <h2 className="mt-2 text-3xl font-black text-white">Ieiet sistēmā</h2>
            <p className="mt-2 text-sm text-gray-400">Ievadi datus vai izmanto demo kontu, lai ātri apskatītu projektu.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-sm text-red-200">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block font-display text-xs uppercase tracking-[0.3em] text-gray-500">
                Lietotājvārds
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="input-primary"
                placeholder="Ievadi lietotājvārdu..."
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-display text-xs uppercase tracking-[0.3em] text-gray-500">
                Parole
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="input-primary"
                placeholder="Ievadi paroli..."
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary flex w-full items-center justify-center gap-2">
              {loading ? <LoadingSpinner size="sm" /> : '🎮 Ieiet'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500">vai</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button onClick={handleDemoLogin} disabled={loading} className="btn-secondary w-full">
            ⚡ Demo pieeja (Dan Kuso)
          </button>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">Testa lietotāji</p>
            <div className="mt-3 grid gap-2 text-sm text-gray-300 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">🎮 DanKuso / bakugan123</div>
              <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">🌪️ ShunKazami / ventus456</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeaturePill({ title, text }: { title: string; text: string }) {
  return (
    <div className="surface-card p-4">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">{title}</p>
      <p className="mt-2 text-sm text-gray-300">{text}</p>
    </div>
  );
}
