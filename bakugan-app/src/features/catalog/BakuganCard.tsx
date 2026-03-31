import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS, RARITY_COLORS } from './types';

interface BakuganCardProps {
  bakugan: Bakugan;
  onClick: (bakugan: Bakugan) => void;
  isSelected?: boolean;
}

export default function BakuganCard({ bakugan, onClick, isSelected = false }: BakuganCardProps) {
  const colors = ATTRIBUTE_COLORS[bakugan.attribute];

  return (
    <div
      onClick={() => onClick(bakugan)}
      className={`
        relative glass-card p-5 cursor-pointer card-hover
        ${isSelected ? `ring-2 ring-${bakugan.attribute === 'Pyrus' ? 'red' : bakugan.attribute === 'Aquos' ? 'blue' : bakugan.attribute === 'Ventus' ? 'green' : bakugan.attribute === 'Haos' ? 'yellow' : bakugan.attribute === 'Darkus' ? 'purple' : 'orange'}-500 ${colors.glow}` : 'hover:border-gray-700'}
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full font-display">
          ✓ IZVĒLĒTS
        </div>
      )}

      {/* Emoji / Avatar area */}
      <div
        className={`w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center text-4xl mb-4 mx-auto`}
      >
        {bakugan.emoji}
      </div>

      {/* Name & Attribute */}
      <h3 className="text-lg font-black font-display text-center mb-2 leading-tight">
        {bakugan.name}
      </h3>

      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`attribute-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
          {ATTRIBUTE_EMOJIS[bakugan.attribute]} {bakugan.attribute}
        </span>
      </div>

      {/* G-Power bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 font-display uppercase tracking-wider">G-Power</span>
          <span className={`text-sm font-black font-display ${colors.text}`}>{bakugan.gPower}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((bakugan.gPower / 900) * 100, 100)}%`,
              backgroundColor: colors.hex,
            }}
          />
        </div>
      </div>

      {/* Type & Rarity */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 font-body">{bakugan.type}</span>
        <span className={`font-bold font-display ${RARITY_COLORS[bakugan.rarity]}`}>
          {bakugan.rarity}
        </span>
      </div>

      {/* Partner */}
      <div className="mt-2 pt-2 border-t border-gray-800">
        <span className="text-xs text-gray-500 font-body">
          👤 {bakugan.partner}
        </span>
      </div>
    </div>
  );
}
