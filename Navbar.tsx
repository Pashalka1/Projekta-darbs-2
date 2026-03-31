import { useEffect, useState } from 'react';
import { fetchAllBakugan } from '../features/catalog/api';
import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS, Attribute } from '../features/catalog/types';
import { useAppContext } from '../context/AppContext';

const ATTRIBUTE_LIST: Attribute[] = ['Pyrus', 'Aquos', 'Ventus', 'Haos', 'Darkus', 'Subterra'];

export default function HomePage() {
  const { navigate, user } = useAppContext();
  const [stats, setStats] = useState({ total: 0, byAttribute: {} as Record<string, number> });
  const [featuredBakugan, setFeaturedBakugan] = useState<Bakugan | null>(null);

  useEffect(() => {
    fetchAllBakugan()
      .then((data) => {
        const byAttribute: Record<string, number> = {};
        data.forEach((bakugan) => {
          byAttribute[bakugan.attribute] = (byAttribute[bakugan.attribute] || 0) + 1;
        });
        setStats({ total: data.length, byAttribute });
        setFeaturedBakugan(data[Math.floor(Math.random() * data.length)] ?? null);
      })
      .catch(() => {
        setStats({ total: 0, byAttribute: {} });
        setFeaturedBakugan(null);
      });
  }, []);

  return (
    <div className="space-y-12">
      <section className="glass-card relative overflow-hidden px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        <div className="absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-red-600/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.35em] text-red-200">
              Bakugan komandcentrs
            </p>
            <div className="mb-5 flex items-center gap-4">
              <div className="text-6xl sm:text-7xl animate-float">🐉</div>
              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-red-500">Baku</span>
                <span className="text-white">gan</span>
                <span className="block text-lg font-bold uppercase tracking-[0.35em] text-gray-400 sm:text-xl">
                  Universe
                </span>
              </h1>
            </div>
            <p className="max-w-2xl text-lg text-gray-200 sm:text-xl">
              Sveiks, <span className="font-bold text-red-400">{user?.username ?? 'cīnītāj'}</span>! Šī ir tava vieta, kur pārskatīt Bakuganu kolekciju, analizēt stiprākos cīnītājus un palaist simulētu dueli.
            </p>
            <p className="mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
              Interfeiss ir veidots ar tumšo spēļu estētiku, skaidru hierarhiju un ātrām darbībām gan datoriem, gan mobilajām ierīcēm.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate('catalog')} className="btn-primary text-base sm:text-lg">
                📖 Apskatīt katalogu
              </button>
              <button onClick={() => navigate('battle')} className="btn-secondary text-base sm:text-lg">
                ⚔️ Uzsākt cīņu
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <QuickInfoCard title="Datu pārskats" value={`${stats.total || '...'} Bakugani`} description="Reāls katalogs no API ar filtriem un detalizāciju." />
            <QuickInfoCard title="Interaktivitāte" value="Katalogs + cīņa" description="Lietotājs var gan meklēt, gan salīdzināt cīnītājus." />
            <QuickInfoCard title="Dizaina fokuss" value="Responsīvs UI" description="Labi izskatās uz desktop, planšetes un telefona." />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">Statistika</h2>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">Svarīgākie skaitļi vienā skatā ar lielu kontrastu un skaidriem akcentiem.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard value={stats.total} label="Kopā Bakugani" emoji="🐉" accent="text-red-400" />
          <StatCard value={3} label="Sezonas" emoji="📺" accent="text-blue-400" />
          <StatCard value={6} label="Atribūti" emoji="🌈" accent="text-green-400" />
          <StatCard value={5} label="Retuma līmeņi" emoji="⭐" accent="text-yellow-400" />
        </div>
      </section>

      <section className="grid gap-12 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Bakuganu atribūti</h2>
              <p className="mt-2 text-sm text-gray-400 sm:text-base">Katrs atribūts ir izcelts ar savu krāsu un emocijzīmi, lai orientēties būtu vēl vieglāk.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3">
            {ATTRIBUTE_LIST.map((attribute) => {
              const colors = ATTRIBUTE_COLORS[attribute];
              return (
                <button
                  key={attribute}
                  onClick={() => navigate('catalog')}
                  className={`glass-card card-hover group relative overflow-hidden border ${colors.border} px-5 py-6 text-left`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.soft} opacity-70`} />
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                        {ATTRIBUTE_EMOJIS[attribute]}
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.25em] text-gray-300">
                        {stats.byAttribute[attribute] ?? 0}
                      </span>
                    </div>
                    <div className={`font-display text-lg font-black ${colors.text}`}>{attribute}</div>
                    <p className="mt-2 text-sm text-gray-400">Atvērt katalogu un apskatīt šī atribūta cīnītājus.</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {featuredBakugan && (
          <div>
            <div className="mb-6">
              <h2 className="section-title">Šodienas Bakugans</h2>
              <p className="mt-2 text-sm text-gray-400 sm:text-base">Izcelta karte, kas parāda, ka dizains nav tikai funkcionāls, bet arī vizuāli interesants.</p>
            </div>
            <div className={`glass-card relative overflow-hidden border-2 ${ATTRIBUTE_COLORS[featuredBakugan.attribute].border} ${ATTRIBUTE_COLORS[featuredBakugan.attribute].glow} p-6 sm:p-8`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${ATTRIBUTE_COLORS[featuredBakugan.attribute].soft} opacity-80`} />
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className={`attribute-badge ${ATTRIBUTE_COLORS[featuredBakugan.attribute].bg} ${ATTRIBUTE_COLORS[featuredBakugan.attribute].text} border ${ATTRIBUTE_COLORS[featuredBakugan.attribute].border}`}>
                    {ATTRIBUTE_EMOJIS[featuredBakugan.attribute]} {featuredBakugan.attribute}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-display uppercase tracking-[0.25em] text-gray-300">
                    S{featuredBakugan.season}
                  </span>
                </div>

                <div className="mb-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <div className={`flex h-24 w-24 items-center justify-center rounded-3xl border-2 ${ATTRIBUTE_COLORS[featuredBakugan.attribute].border} ${ATTRIBUTE_COLORS[featuredBakugan.attribute].bg} text-6xl animate-float`}>
                    {featuredBakugan.emoji}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black leading-tight">{featuredBakugan.name}</h3>
                    <p className="mt-2 max-w-xl text-sm text-gray-300 sm:text-base">{featuredBakugan.description}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="surface-card p-4">
                    <div className="font-display text-xs uppercase tracking-[0.25em] text-gray-500">Jauda</div>
                    <div className={`mt-1 text-3xl font-black ${ATTRIBUTE_COLORS[featuredBakugan.attribute].text}`}>{featuredBakugan.gPower} GP</div>
                    <p className="mt-2 text-sm text-gray-400">Partneris: <span className="font-bold text-white">{featuredBakugan.partner}</span></p>
                  </div>
                  <div className="surface-card p-4">
                    <div className="font-display text-xs uppercase tracking-[0.25em] text-gray-500">Spējas</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {featuredBakugan.abilities.map((ability) => (
                        <span key={ability} className="rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-200">
                          ⚡ {ability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ value, label, emoji, accent }: { value: number; label: string; emoji: string; accent: string }) {
  return (
    <div className="glass-card card-hover px-5 py-6 text-left">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-3xl">{emoji}</div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-display uppercase tracking-[0.25em] text-gray-400">
          Stat
        </div>
      </div>
      <div className={`text-4xl font-black font-display ${accent}`}>{value}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">{label}</div>
    </div>
  );
}

function QuickInfoCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="surface-card px-5 py-5">
      <p className="font-display text-[11px] uppercase tracking-[0.3em] text-gray-500">{title}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  );
}
