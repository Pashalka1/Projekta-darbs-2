import { useState, useEffect, useMemo } from 'react';
import { Bakugan, BakuganFilters, Attribute, ATTRIBUTE_EMOJIS } from './types';
import { fetchAllBakugan } from './api';
import BakuganCard from './BakuganCard';
import BakuganDetail from './BakuganDetail';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const ATTRIBUTES: Attribute[] = ['Pyrus', 'Aquos', 'Ventus', 'Haos', 'Darkus', 'Subterra'];
const RARITIES = ['Common', 'Rare', 'Super Rare', 'Legendary', 'Ultimate'] as const;
const SEASONS = [1, 2, 3] as const;

interface BakuganCatalogProps {
  onSelectForBattle?: (bakugan: Bakugan) => void;
  selectedForBattle?: Bakugan[];
  battleMode?: boolean;
}

export default function BakuganCatalog({ onSelectForBattle, selectedForBattle = [], battleMode = false }: BakuganCatalogProps) {
  const [bakuganList, setBakuganList] = useState<Bakugan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBakugan, setSelectedBakugan] = useState<Bakugan | null>(null);
  const [filters, setFilters] = useState<BakuganFilters>({
    attribute: 'All',
    rarity: 'All',
    search: '',
    season: 'All',
  });

  useEffect(() => {
    const loadBakugan = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllBakugan();
        setBakuganList(data);
      } catch (err) {
        setError('Nevarēja ielādēt Bakuganus. Pārliecinies, ka json-server darbojas uz porta 3001.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBakugan();
  }, []);

  const filteredBakugan = useMemo(() => {
    return bakuganList.filter((b) => {
      if (filters.attribute !== 'All' && b.attribute !== filters.attribute) return false;
      if (filters.rarity !== 'All' && b.rarity !== filters.rarity) return false;
      if (filters.season !== 'All' && b.season !== filters.season) return false;
      if (filters.search && !b.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [bakuganList, filters]);

  const handleCardClick = (bakugan: Bakugan) => {
    if (battleMode && onSelectForBattle) {
      onSelectForBattle(bakugan);
    } else {
      setSelectedBakugan(bakugan);
    }
  };

  const isSelectedForBattle = (bakugan: Bakugan) => selectedForBattle.some((b) => b.id === bakugan.id);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllBakugan();
      setBakuganList(data);
    } catch {
      setError('Nevarēja ielādēt Bakuganus. Pārliecinies, ka json-server darbojas uz porta 3001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Battle mode banner */}
      {battleMode && (
        <div className="bg-red-950/50 border border-red-800 rounded-xl p-4 mb-6 text-center">
          <p className="text-red-300 font-display font-bold">
            ⚔️ Cīņas režīms — Izvēlies savu Bakuganu cīņai!
            {selectedForBattle.length > 0 && (
              <span className="ml-2 text-white">({selectedForBattle.length}/2 izvēlēti)</span>
            )}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card p-5 mb-6 space-y-4">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Meklēt Bakuganu..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-body"
        />

        <div className="flex flex-wrap gap-3">
          {/* Attribute filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilters({ ...filters, attribute: 'All' })}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold font-display transition-all ${
                filters.attribute === 'All'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Visi
            </button>
            {ATTRIBUTES.map((attr) => (
              <button
                key={attr}
                onClick={() => setFilters({ ...filters, attribute: filters.attribute === attr ? 'All' : attr })}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold font-display transition-all ${
                  filters.attribute === attr
                    ? 'bg-gray-600 text-white scale-105'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {ATTRIBUTE_EMOJIS[attr]} {attr}
              </button>
            ))}
          </div>

          {/* Season filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilters({ ...filters, season: 'All' })}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold font-display transition-all ${
                filters.season === 'All' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Visas sezonas
            </button>
            {SEASONS.map((s) => (
              <button
                key={s}
                onClick={() => setFilters({ ...filters, season: filters.season === s ? 'All' : s })}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold font-display transition-all ${
                  filters.season === s ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                S{s}
              </button>
            ))}
          </div>

          {/* Rarity filter */}
          <select
            value={filters.rarity}
            onChange={(e) => setFilters({ ...filters, rarity: e.target.value as typeof filters.rarity })}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white font-display focus:outline-none focus:border-red-500"
          >
            <option value="All">Visas retumas</option>
            {RARITIES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <p className="text-gray-500 text-sm font-body">
          {loading ? 'Ielādē...' : `Atrasti ${filteredBakugan.length} Bakugani`}
        </p>
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4 font-display animate-pulse">Ielādē Bakuganus...</p>
        </div>
      )}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {filteredBakugan.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 font-display text-lg">Nav atrasts neviens Bakugans</p>
              <p className="text-gray-600 font-body text-sm mt-1">Mēģini mainīt filtrus</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBakugan.map((bakugan) => (
                <BakuganCard
                  key={bakugan.id}
                  bakugan={bakugan}
                  onClick={handleCardClick}
                  isSelected={isSelectedForBattle(bakugan)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedBakugan && !battleMode && (
        <BakuganDetail bakugan={selectedBakugan} onClose={() => setSelectedBakugan(null)} />
      )}
    </div>
  );
}
