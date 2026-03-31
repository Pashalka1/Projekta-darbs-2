import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS, RARITY_COLORS } from './types';

interface BakuganCardProps {
  bakugan: Bakugan;
  onClick: (bakugan: Bakugan) => void;
  isSelected?: boolean;
}

export default function BakuganCard({ bakugan, onClick, isSelected = false }: BakuganCardProps) {
  const colors = ATTRIBUTE_COLORS[bakugan.attribute];

  return (
    <button
      type="button"
      onClick={() => onClick(bakugan)}
      className={`glass-card card-hover group relative overflow-hidden p-5 text-left ${
        isSelected ? `ring-2 ${colors.ring} ${colors.glow}` : 'hover:border-white/20'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.soft} opacity-70`} />

      {isSelected && (
        <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-emerald-900/30">
          ✓ izvēlēts
        </div>
      )}

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className={`flex h-20 w-20 items-center justify-center rounded-3xl border ${colors.border} ${colors.bg} text-4xl transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1`}>
            {bakugan.emoji}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gray-300">
              S{bakugan.season}
            </span>
            <span className={`text-right text-xs font-bold uppercase tracking-[0.2em] ${RARITY_COLORS[bakugan.rarity]}`}>
              {bakugan.rarity}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-black leading-tight text-white">{bakugan.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{bakugan.type} • Partneris: {bakugan.partner}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`attribute-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
            {ATTRIBUTE_EMOJIS[bakugan.attribute]} {bakugan.attribute}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            ⚡ {bakugan.abilities.length} spējas
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-gray-500">G-Power</span>
            <span className={`text-lg font-black ${colors.text}`}>{bakugan.gPower}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-black/30">
            <div
              className="h-2.5 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min((bakugan.gPower / 900) * 100, 100)}%`,
                backgroundColor: colors.hex,
                boxShadow: `0 0 18px ${colors.hex}66`,
              }}
            />
          </div>
        </div>

        <p className="mt-4 min-h-[72px] text-sm leading-6 text-gray-300">{bakugan.description}</p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
          <span className="text-gray-500">Spied, lai atvērtu detaļas</span>
          <span className={`font-bold ${colors.text}`}>Skatīt vairāk →</span>
        </div>
      </div>
    </button>
  );
}
