import { useEffect, useState } from 'react';
import { fetchAllBakugan } from '../features/catalog/api';
import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS, Attribute } from '../features/catalog/types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  username: string;
}

const ATTRIBUTE_LIST: Attribute[] = ['Pyrus', 'Aquos','Ventus', 'Haos', 'Darkus', 'Subterra'];

export default function HomePage({ onNavigate, username }: HomePageProps) {
  const [stats, setStats] = useState({ total: 0, byAttribute: {} as Record<string, number> });
  const [featuredBakugan, setFeaturedBakugan] = useState<Bakugan | null>(null);

  useEffect(() => {
    fetchAllBakugan().then((data) => {
      const byAttribute: Record<string, number> = {};
      data.forEach((b) => {
        byAttribute[b.attribute] = (byAttribute[b.attribute] || 0) + 1;
      });
      setStats({ total: data.length, byAttribute });
      // Pick random featured
      setFeaturedBakugan(data[Math.floor(Math.random() * data.length)]);
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-red-950/30 to-gray-900 border border-gray-800 p-8 md:p-14 text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="text-7xl md:text-9xl mb-6 inline-block animate-float">🐉</div>
          <h1 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter mb-3">
            <span className="text-red-500">Baku</span>
            <span className="text-white">gan</span>
            <span className="text-gray-400 text-3xl md:text-4xl ml-3">Universe</span>
          </h1>
          <p className="text-gray-300 font-body text-lg md:text-xl max-w-xl mx-auto mb-2">
            Sveiks, <span className="text-red-400 font-bold">{username}</span>! Roll out, Bakugan!
          </p>
          <p className="text-gray-500 font-body mb-8">Izpēti Bakuganu pasauli, salīdzini spēkus un uzsāc cīņu!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('catalog')} className="btn-primary text-lg px-8 py-4">
              📖 Apskatīt Katalogu
            </button>
            <button onClick={() => onNavigate('battle')} className="btn-secondary text-lg px-8 py-4">
              ⚔️ Uzsākt Cīņu
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div>
        <h2 className="section-title mb-6 text-center">Statistika</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value={stats.total} label="Kopā Bakugani" emoji="🐉" />
          <StatCard value={3} label="Sezonas" emoji="📺" />
          <StatCard value={6} label="Atribūti" emoji="🌈" />
          <StatCard value={5} label="Retuma līmeņi" emoji="⭐" />
        </div>
      </div>

      {/* Attributes */}
      <div>
        <h2 className="section-title mb-6 text-center">Bakuganu Atribūti</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ATTRIBUTE_LIST.map((attr) => {
            const colors = ATTRIBUTE_COLORS[attr];
            return (
              <button
                key={attr}
                onClick={() => onNavigate('catalog')}
                className={`glass-card p-4 text-center card-hover border ${colors.border} group`}
              >
                <div className="text-3xl mb-2 group-hover:animate-float">{ATTRIBUTE_EMOJIS[attr]}</div>
                <div className={`font-black font-display text-sm ${colors.text}`}>{attr}</div>
                {stats.byAttribute[attr] !== undefined && (
                  <div className="text-xs text-gray-600 mt-1">{stats.byAttribute[attr]} Bakugani</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Bakugan */}
      {featuredBakugan && (
        <div>
          <h2 className="section-title mb-6 text-center">Šodienas Bakugans</h2>
          <div className={`glass-card p-8 border-2 ${ATTRIBUTE_COLORS[featuredBakugan.attribute].border} ${ATTRIBUTE_COLORS[featuredBakugan.attribute].glow} flex flex-col sm:flex-row items-center gap-6`}>
            <div
              className={`w-28 h-28 rounded-2xl ${ATTRIBUTE_COLORS[featuredBakugan.attribute].bg} border-2 ${ATTRIBUTE_COLORS[featuredBakugan.attribute].border} flex items-center justify-center text-6xl flex-shrink-0 animate-float`}
            >
              {featuredBakugan.emoji}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className={`attribute-badge ${ATTRIBUTE_COLORS[featuredBakugan.attribute].bg} ${ATTRIBUTE_COLORS[featuredBakugan.attribute].text} border ${ATTRIBUTE_COLORS[featuredBakugan.attribute].border} mb-2`}>
                {ATTRIBUTE_EMOJIS[featuredBakugan.attribute]} {featuredBakugan.attribute}
              </span>
              <h3 className="text-3xl font-black font-display mt-1">{featuredBakugan.name}</h3>
              <p className="text-gray-400 font-body mt-2 text-sm">{featuredBakugan.description}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                {featuredBakugan.abilities.map((ab) => (
                  <span key={ab} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg">⚡ {ab}</span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black font-display ${ATTRIBUTE_COLORS[featuredBakugan.attribute].text}`}>
                {featuredBakugan.gPower}
              </div>
              <div className="text-xs text-gray-500 font-display uppercase tracking-wider">G-Power</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ value, label, emoji }: { value: number; label: string; emoji: string }) {
  return (
    <div className="glass-card p-5 text-center">
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="text-3xl font-black font-display text-red-400">{value}</div>
      <div className="text-xs text-gray-500 font-display uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
