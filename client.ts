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
    return bakuganList.filter((bakugan) => {
      if (filters.attribute !== 'All' && bakugan.attribute !== filters.attribute) return false;
      if (filters.rarity !== 'All' && bakugan.rarity !== filters.rarity) return false;
      if (filters.season !== 'All' && bakugan.season !== filters.season) return false;
      if (filters.search && !bakugan.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
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

  const isSelectedForBattle = (bakugan: Bakugan) => selectedForBattle.some((selected) => selected.id === bakugan.id);

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

  const resetFilters = () => {
    setFilters({ attribute: 'All', rarity: 'All', search: '', season: 'All' });
  };

  return (
    <div>
      {battleMode && (
        <div className="glass-card mb-6 overflow-hidden border border-red-500/30 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.35em] text-red-300">Cīņas režīms</p>
              <p className="mt-2 text-sm text-gray-200 sm:text-base">
                Izvēlies divus dažādus Bakuganus cīņai. Izvēlētos cīnītājus vari atzīmēt un nomainīt jebkurā brīdī.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center">
              <div className="font-display text-[11px] uppercase tracking-[0.3em] text-gray-500">Progress</div>
              <div className="mt-1 text-xl font-black text-white">{selectedForBattle.length}/2</div>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card mb-6 p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="w-full xl:max-w-xl">
            <label className="mb-2 block font-display text-xs uppercase tracking-[0.3em] text-gray-500">Meklēšana</label>
            <input
              type="text"
              placeholder="Meklēt Bakuganu pēc nosaukuma..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-primary"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-auto">
            <div className="surface-card px-4 py-3 text-center">
              <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gray-500">Redzami</div>
              <div className="mt-1 text-2xl font-black text-white">{loading ? '...' : filteredBakugan.length}</div>
            </div>
            <div className="surface-card px-4 py-3 text-center">
              <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gray-500">Kopā</div>
              <div className="mt-1 text-2xl font-black text-white">{loading ? '...' : bakuganList.length}</div>
            </div>
            <button onClick={resetFilters} className="btn-secondary whitespace-nowrap">
              ♻️ Notīrīt filtrus
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.7fr]">
          <div>
            <label className="mb-2 block font-display text-xs uppercase tracking-[0.3em] text-gray-500">Atribūts</label>
            <div className="flex flex-wrap gap-2">
              <FilterChip label="Visi" active={filters.attribute === 'All'} onClick={() => setFilters({ ...filters, attribute: 'All' })} />
              {ATTRIBUTES.map((attribute) => (
                <FilterChip
                  key={attribute}
                  label={`${ATTRIBUTE_EMOJIS[attribute]} ${attribute}`}
                  active={filters.attribute === attribute}
                  onClick={() => setFilters({ ...filters, attribute: filters.attribute === attribute ? 'All' : attribute })}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-display text-xs uppercase tracking-[0.3em] text-gray-500">Sezona</label>
            <div className="flex flex-wrap gap-2">
              <FilterChip label="Visas" active={filters.season === 'All'} onClick={() => setFilters({ ...filters, season: 'All' })} />
              {SEASONS.map((season) => (
                <FilterChip
                  key={season}
                  label={`S${season}`}
                  active={filters.season === season}
                  onClick={() => setFilters({ ...filters, season: filters.season === season ? 'All' : season })}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-display text-xs uppercase tracking-[0.3em] text-gray-500">Retums</label>
            <select
              value={filters.rarity}
              onChange={(e) => setFilters({ ...filters, rarity: e.target.value as typeof filters.rarity })}
              className="input-primary h-[52px]"
            >
              <option value="All">Visi līmeņi</option>
              {RARITIES.map((rarity) => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="glass-card flex flex-col items-center justify-center py-20">
          <LoadingSpinner size="lg" />
          <p className="mt-4 font-display text-sm uppercase tracking-[0.3em] text-gray-400">Ielādē Bakuganus...</p>
        </div>
      )}

      {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <>
          {filteredBakugan.length === 0 ? (
            <div className="glass-card px-6 py-16 text-center">
              <div className="text-6xl">🔍</div>
              <h3 className="mt-4 text-2xl font-black text-white">Nav atrasts neviens Bakugans</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-400 sm:text-base">
                Pamēģini mainīt filtru kombināciju vai notīri filtrus, lai atgrieztos pie pilnā saraksta.
              </p>
              <button onClick={resetFilters} className="btn-primary mt-6">
                Parādīt visus Bakuganus
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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

      {selectedBakugan && !battleMode && (
        <BakuganDetail bakugan={selectedBakugan} onClose={() => setSelectedBakugan(null)} />
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-sm font-bold transition-all ${
        active
          ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
          : 'border border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
