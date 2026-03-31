interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: { username: string; avatar: string; wins: number } | null;
  onLogout: () => void;
}

export default function Navbar({ currentPage, onNavigate, user, onLogout }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Sākums', emoji: '🏠' },
    { id: 'catalog', label: 'Katalogs', emoji: '📖' },
    { id: 'battle', label: 'Cīņa', emoji: '⚔️' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:animate-spin-slow">🐉</span>
            <span className="text-xl font-black font-display tracking-tight">
              <span className="text-red-500">Baku</span>
              <span className="text-white">gan</span>
            </span>
          </button>

          {/* Nav links - desktop */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg font-display font-bold text-sm transition-all ${
                  currentPage === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.emoji} {item.label}
              </button>
            ))}
          </div>

          {/* User area */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5">
                <span className="text-lg">{user.avatar}</span>
                <div>
                  <p className="text-xs font-bold text-white font-display leading-none">{user.username}</p>
                  <p className="text-xs text-yellow-400 font-body">{user.wins} uzvaras</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-red-400 transition-colors text-sm font-display font-bold"
              >
                Iziet
              </button>
            </div>
          )}
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden pb-2 gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 py-2 rounded-lg font-display font-bold text-xs transition-all ${
                currentPage === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
