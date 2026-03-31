import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS, RARITY_COLORS } from './types';

interface BakuganDetailProps {
  bakugan: Bakugan;
  onClose: () => void;
}

export default function BakuganDetail({ bakugan, onClose }: BakuganDetailProps) {
  const colors = ATTRIBUTE_COLORS[bakugan.attribute];

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`glass-card max-w-lg w-full p-8 relative ${colors.glow} border-2 ${colors.border}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-2xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          <div
            className={`w-24 h-24 rounded-2xl ${colors.bg} border-2 ${colors.border} flex items-center justify-center text-5xl flex-shrink-0 animate-float`}
          >
            {bakugan.emoji}
          </div>
          <div>
            <h2 className="text-3xl font-black font-display leading-tight">{bakugan.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`attribute-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
                {ATTRIBUTE_EMOJIS[bakugan.attribute]} {bakugan.attribute}
              </span>
              <span className={`attribute-badge bg-gray-800 border border-gray-700 ${RARITY_COLORS[bakugan.rarity]}`}>
                {bakugan.rarity}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-800/60 rounded-xl p-3 text-center">
            <div className={`text-2xl font-black font-display ${colors.text}`}>{bakugan.gPower}</div>
            <div className="text-xs text-gray-500 font-display uppercase tracking-wider">G-Power</div>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-3 text-center">
            <div className="text-2xl font-black font-display text-white">{bakugan.season}</div>
            <div className="text-xs text-gray-500 font-display uppercase tracking-wider">Sezona</div>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-3 text-center">
            <div className="text-lg font-black font-display text-white">{bakugan.type}</div>
            <div className="text-xs text-gray-500 font-display uppercase tracking-wider">Tips</div>
          </div>
        </div>

        {/* G-Power bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-gray-400 font-display uppercase tracking-wider">G-Power Rādītājs</span>
            <span className={`text-sm font-bold ${colors.text}`}>{Math.round((bakugan.gPower / 900) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min((bakugan.gPower / 900) * 100, 100)}%`,
                backgroundColor: colors.hex,
                boxShadow: `0 0 10px ${colors.hex}60`,
              }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 font-body text-sm leading-relaxed mb-6">{bakugan.description}</p>

        {/* Partner */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-gray-500 font-display">Partneris:</span>
          <span className="font-bold text-white">{bakugan.partner}</span>
        </div>

        {/* Abilities */}
        <div>
          <h4 className="text-sm font-bold text-gray-400 font-display uppercase tracking-wider mb-3">Spējas</h4>
          <div className="flex flex-wrap gap-2">
            {bakugan.abilities.map((ability, idx) => (
              <span
                key={idx}
                className={`text-sm px-3 py-1.5 rounded-lg ${colors.bg} ${colors.text} border ${colors.border} font-body`}
              >
                ⚡ {ability}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
