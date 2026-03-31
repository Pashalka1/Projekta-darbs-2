import { Bakugan } from '../catalog/types';

export interface BattleResult {
  winner: Bakugan;
  loser: Bakugan;
  winnerFinalPower: number;
  loserFinalPower: number;
  rounds: BattleRound[];
  message: string;
}

export interface BattleRound {
  roundNumber: number;
  player1Power: number;
  player2Power: number;
  description: string;
  usedAbility?: string;
}

export interface BattleState {
  phase: 'select' | 'ready' | 'fighting' | 'result';
  player1: Bakugan | null;
  player2: Bakugan | null;
  result: BattleResult | null;
  currentRound: number;
}
