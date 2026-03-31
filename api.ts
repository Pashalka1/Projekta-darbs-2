import { useAppContext } from '../context/AppContext';
import { Page } from '../shared/types/app';

export default function Navbar() {
  const { currentPage, navigate, user, logout } = useAppContext();

  const navItems: Array<{ id: Page; label: string; emoji: string; description: string }> = [
    { id: 'home', label: 'Sākums', emoji: '🏠', description: 'Pārskats un statistika' },
    { id: 'catalog', label: 'Katalogs', emoji: '📖', description: 'Visi Bakugani' },
    { id: 'battle', label: 'Cīņa', emoji: '⚔️', description: 'Simulators' },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-4 py-3">
          <button
            onClick={() => navigate('home')}
            className="group flex items-center gap-3 rounded-2xl px-2 py-1 text-left transition-transform hover:scale-[1.01]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/20 to-red-800/10 text-2xl shadow-lg shadow-red-950/30">
              <span className="group-hover:animate-spin-slow">🐉</span>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight">
                <span className="text-red-500">Baku</span>
                <span className="text-white">gan</span>
              </div>
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gray-500">Universe dashboard</p>
            </div>
          </button>

          <div className="order-3 flex w-full gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-1 sm:order-2 sm:w-auto sm:flex-1 sm:justify-center">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`min-w-fit rounded-xl px-4 py-2.5 text-left transition-all duration-200 ${
                    active
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="font-display text-sm font-bold">
                    {item.emoji} {item.label}
                  </div>
                  <div className={`hidden text-[11px] leading-none sm:block ${active ? 'text-red-100/90' : 'text-gray-500'}`}>
                    {item.description}
                  </div>
                </button>
              );
            })}
          </div>

          {user && (
            <div className="order-2 flex items-center gap-3 sm:order-3">
              <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 shadow-lg shadow-black/10 md:flex md:items-center md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-xl">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white leading-none">{user.username}</p>
                  <p className="mt-1 text-xs text-gray-400">🏆 {user.wins} uzvaras • 💥 {user.losses} zaudējumi</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-gray-300 transition hover:border-red-500/40 hover:text-red-300"
              >
                Iziet
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
