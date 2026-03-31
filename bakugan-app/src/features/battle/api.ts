import { Bakugan } from '../catalog/types';
import { BattleResult, BattleRound } from './types';

// Attribute advantage chart (attacker -> defender -> multiplier)
const ATTRIBUTE_ADVANTAGES: Record<string, Record<string, number>> = {
  Pyrus: { Ventus: 1.25, Subterra: 0.85 },
  Aquos: { Pyrus: 1.25, Haos: 0.85 },
  Ventus: { Aquos: 1.25, Darkus: 0.85 },
  Haos: { Darkus: 1.25, Pyrus: 0.85 },
  Darkus: { Haos: 1.25, Aquos: 0.85 },
  Subterra: { Aquos: 1.25, Ventus: 0.85 },
};

const ROUND_DESCRIPTIONS = [
  'Bakugani saduras ar milzīgu spēku!',
  'Abas puses izmanto īpašas spējas!',
  'Cīņa sasniedz savu kulmināciju!',
];

export const simulateBattle = (b1: Bakugan, b2: Bakugan): BattleResult => {
  const rounds: BattleRound[] = [];
  let p1Total = 0;
  let p2Total = 0;

  // Calculate attribute advantages
  const p1AdvMult = ATTRIBUTE_ADVANTAGES[b1.attribute]?.[b2.attribute] ?? 1;
  const p2AdvMult = ATTRIBUTE_ADVANTAGES[b2.attribute]?.[b1.attribute] ?? 1;

  for (let i = 0; i < 3; i++) {
    const p1Base = b1.gPower * p1AdvMult;
    const p2Base = b2.gPower * p2AdvMult;

    // Add randomness (±20%)
    const p1Roll = Math.round(p1Base * (0.8 + Math.random() * 0.4));
    const p2Roll = Math.round(p2Base * (0.8 + Math.random() * 0.4));

    // Randomly use an ability for extra power
    const p1UsedAbility = Math.random() > 0.5 ? b1.abilities[Math.floor(Math.random() * b1.abilities.length)] : undefined;
    const p2UsedAbility = Math.random() > 0.5 ? b2.abilities[Math.floor(Math.random() * b2.abilities.length)] : undefined;

    const p1Final = p1UsedAbility ? Math.round(p1Roll * 1.15) : p1Roll;
    const p2Final = p2UsedAbility ? Math.round(p2Roll * 1.15) : p2Roll;

    p1Total += p1Final;
    p2Total += p2Final;

    rounds.push({
      roundNumber: i + 1,
      player1Power: p1Final,
      player2Power: p2Final,
      description: ROUND_DESCRIPTIONS[i],
      usedAbility: p1Final > p2Final ? p1UsedAbility : p2UsedAbility,
    });
  }

  const p1Wins = p1Total > p2Total;
  const winner = p1Wins ? b1 : b2;
  const loser = p1Wins ? b2 : b1;
  const winnerPower = p1Wins ? p1Total : p2Total;
  const loserPower = p1Wins ? p2Total : p1Total;
  const diff = Math.abs(p1Total - p2Total);

  let message = '';
  if (diff < 50) message = `Ārkārtīgi cieša cīņa! ${winner.name} uzvar ar minimālu pārsvaru!`;
  else if (diff < 150) message = `${winner.name} uzvar pārliecinoši!`;
  else message = `${winner.name} dominē cīņā ar milzīgu pārsvaru!`;

  return { winner, loser, winnerFinalPower: winnerPower, loserFinalPower: loserPower, rounds, message };
};
