export type Attribute = 'Pyrus' | 'Aquos' | 'Ventus' | 'Haos' | 'Darkus' | 'Subterra';
export type Rarity = 'Common' | 'Rare' | 'Super Rare' | 'Legendary' | 'Ultimate';

export interface Bakugan {
  id: number;
  name: string;
  attribute: Attribute;
  gPower: number;
  season: number;
  partner: string;
  description: string;
  abilities: string[];
  emoji: string;
  type: string;
  rarity: Rarity;
}

export interface BakuganFilters {
  attribute: Attribute | 'All';
  rarity: Rarity | 'All';
  search: string;
  season: number | 'All';
}

export const ATTRIBUTE_COLORS: Record<Attribute, { bg: string; text: string; border: string; glow: string; hex: string }> = {
  Pyrus: {
    bg: 'bg-red-950/60',
    text: 'text-red-400',
    border: 'border-red-800/50',
    glow: 'glow-pyrus',
    hex: '#ef4444',
  },
  Aquos: {
    bg: 'bg-blue-950/60',
    text: 'text-blue-400',
    border: 'border-blue-800/50',
    glow: 'glow-aquos',
    hex: '#3b82f6',
  },
  Ventus: {
    bg: 'bg-green-950/60',
    text: 'text-green-400',
    border: 'border-green-800/50',
    glow: 'glow-ventus',
    hex: '#22c55e',
  },
  Haos: {
    bg: 'bg-yellow-950/60',
    text: 'text-yellow-400',
    border: 'border-yellow-800/50',
    glow: 'glow-haos',
    hex: '#eab308',
  },
  Darkus: {
    bg: 'bg-purple-950/60',
    text: 'text-purple-400',
    border: 'border-purple-800/50',
    glow: 'glow-darkus',
    hex: '#8b5cf6',
  },
  Subterra: {
    bg: 'bg-orange-950/60',
    text: 'text-orange-400',
    border: 'border-orange-800/50',
    glow: 'glow-subterra',
    hex: '#f97316',
  },
};

export const ATTRIBUTE_EMOJIS: Record<Attribute, string> = {
  Pyrus: '🔥',
  Aquos: '💧',
  Ventus: '🌪️',
  Haos: '⚡',
  Darkus: '🌑',
  Subterra: '🪨',
};

export const RARITY_COLORS: Record<Rarity, string> = {
  Common: 'text-gray-400',
  Rare: 'text-blue-400',
  'Super Rare': 'text-purple-400',
  Legendary: 'text-yellow-400',
  Ultimate: 'text-red-400',
};
