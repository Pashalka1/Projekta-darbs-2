import { useState } from 'react';
import LoginForm from './features/auth/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BakuganCatalog from './features/catalog/BakuganCatalog';
import BattleSimulator from './features/battle/BattleSimulator';

interface AuthUser {
  id: number;
  username: string;
  avatar: string;
  wins: number;
  losses: number;
}

type Page = 'home' | 'catalog' | 'battle';

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleLogin = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  // Show login screen if not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} username={user.username} />
        )}

        {currentPage === 'catalog' && (
          <div>
            <div className="mb-8">
              <h1 className="section-title mb-2">
                📖 Bakuganu Katalogs
              </h1>
              <p className="text-gray-400 font-body">
                Uzspied uz Bakugana, lai uzzinātu vairāk par tā spējām un vēsturi.
              </p>
            </div>
            <BakuganCatalog />
          </div>
        )}

        {currentPage === 'battle' && (
          <BattleSimulator />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 mt-16 py-6 text-center text-gray-700 font-body text-sm">
        <p>🐉 Bakugan Universe — Programmēšana II projekts</p>
        <p className="text-xs mt-1 text-gray-800">React + TypeScript + Tailwind CSS + Axios + json-server</p>
      </footer>
    </div>
  );
}
