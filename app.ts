import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS, RARITY_COLORS } from './types';

interface BakuganDetailProps {
  bakugan: Bakugan;
  onClose: () => void;
}

export default function BakuganDetail({ bakugan, onClose }: BakuganDetailProps) {
  const colors = ATTRIBUTE_COLORS[bakugan.attribute];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`glass-card relative max-h-[90vh] w-full max-w-3xl overflow-hidden border-2 ${colors.border} ${colors.glow}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.soft} opacity-80`} />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xl text-gray-300 transition hover:text-white"
        >
          ×
        </button>

        <div className="relative z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-5">
              <div className={`flex h-24 w-24 items-center justify-center rounded-3xl border-2 ${colors.border} ${colors.bg} text-6xl shadow-2xl shadow-black/20`}>
                {bakugan.emoji}
              </div>
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className={`attribute-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {ATTRIBUTE_EMOJIS[bakugan.attribute]} {bakugan.attribute}
                  </span>
                  <span className={`attribute-badge border border-white/10 bg-black/20 ${RARITY_COLORS[bakugan.rarity]}`}>
                    {bakugan.rarity}
                  </span>
                </div>
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">{bakugan.name}</h2>
                <p className="mt-2 text-sm text-gray-300 sm:text-base">{bakugan.description}</p>
              </div>
            </div>
            <div className="surface-card min-w-[180px] px-5 py-4 text-center">
              <div className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">G-Power</div>
              <div className={`mt-2 text-4xl font-black ${colors.text}`}>{bakugan.gPower}</div>
              <div className="mt-2 text-sm text-gray-400">Stipruma procents: {Math.round((bakugan.gPower / 900) * 100)}%</div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <InfoBox label="Tips" value={bakugan.type} />
            <InfoBox label="Partneris" value={bakugan.partner} />
            <InfoBox label="Sezona" value={`S${bakugan.season}`} />
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">Jaudas indikators</span>
              <span className={`text-sm font-bold ${colors.text}`}>{bakugan.gPower}/900</span>
            </div>
            <div className="h-4 rounded-full bg-black/30 p-1">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min((bakugan.gPower / 900) * 100, 100)}%`,
                  backgroundColor: colors.hex,
                  boxShadow: `0 0 18px ${colors.hex}70`,
                }}
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gray-300">Ātrais kopsavilkums</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <li>• Atribūts: <span className="font-semibold text-white">{bakugan.attribute}</span></li>
                <li>• Retums: <span className="font-semibold text-white">{bakugan.rarity}</span></li>
                <li>• Tips: <span className="font-semibold text-white">{bakugan.type}</span></li>
                <li>• Partneris: <span className="font-semibold text-white">{bakugan.partner}</span></li>
              </ul>
            </div>

            <div className="surface-card p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gray-300">Spējas</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {bakugan.abilities.map((ability) => (
                  <span
                    key={ability}
                    className={`rounded-2xl border px-4 py-2 text-sm ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    ⚡ {ability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-4 text-center">
      <div className="font-display text-xs uppercase tracking-[0.25em] text-gray-500">{label}</div>
      <div className="mt-2 text-lg font-bold text-white">{value}</div>
    </div>
  );
}
