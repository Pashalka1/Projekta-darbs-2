import { useState } from 'react';
import { Bakugan, ATTRIBUTE_COLORS, ATTRIBUTE_EMOJIS } from '../catalog/types';
import { BattleState, BattleResult } from './types';
import { simulateBattle } from './api';
import BakuganCatalog from '../catalog/BakuganCatalog';

export default function BattleSimulator() {
  const [state, setState] = useState<BattleState>({
    phase: 'select',
    player1: null,
    player2: null,
    result: null,
    currentRound: 0,
  });
  const [animating, setAnimating] = useState(false);

  const selectedForBattle = [state.player1, state.player2].filter(Boolean) as Bakugan[];

  const handleSelectBakugan = (bakugan: Bakugan) => {
    if (state.player1?.id === bakugan.id || state.player2?.id === bakugan.id) {
      // Deselect
      if (state.player1?.id === bakugan.id) setState((s) => ({ ...s, player1: null }));
      else setState((s) => ({ ...s, player2: null }));
      return;
    }
    if (!state.player1) {
      setState((s) => ({ ...s, player1: bakugan }));
    } else if (!state.player2) {
      setState((s) => ({ ...s, player2: bakugan, phase: 'ready' }));
    }
  };

  const handleBattle = async () => {
    if (!state.player1 || !state.player2) return;
    setAnimating(true);
    setState((s) => ({ ...s, phase: 'fighting' }));

    await new Promise((r) => setTimeout(r, 2000));

    const result = simulateBattle(state.player1, state.player2);
    setState((s) => ({ ...s, phase: 'result', result }));
    setAnimating(false);
  };

  const handleReset = () => {
    setState({ phase: 'select', player1: null, player2: null, result: null, currentRound: 0 });
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="section-title mb-2">
          <span className="text-red-500">⚔️</span> Bakugan Cīņas Arēna
        </h1>
        <p className="text-gray-400 font-body">Izvēlies divus Bakuganus un uzsāc cīņu!</p>
      </div>

      {/* Fighter Selection Display */}
      <div className="grid grid-cols-3 gap-4 mb-8 items-center">
        <FighterSlot bakugan={state.player1} label="Cīnītājs 1" onClear={() => setState((s) => ({ ...s, player1: null, phase: 'select', result: null }))} />
        <div className="text-center">
          <div className="text-4xl font-black font-display text-gray-600">VS</div>
          {state.phase === 'fighting' && (
            <div className="mt-3 text-red-400 font-display font-bold animate-pulse text-sm">CĪNĀS...</div>
          )}
          {state.phase === 'ready' && (
            <button onClick={handleBattle} disabled={animating} className="btn-primary mt-3 text-sm px-4 py-2">
              🥊 Cīnīties!
            </button>
          )}
          {state.phase === 'result' && (
            <button onClick={handleReset} className="btn-secondary mt-3 text-sm px-4 py-2">
              🔄 Jauna cīņa
            </button>
          )}
        </div>
        <FighterSlot bakugan={state.player2} label="Cīnītājs 2" onClear={() => setState((s) => ({ ...s, player2: null, phase: state.player1 ? 'select' : 'select', result: null }))} />
      </div>

      {/* Fighting animation */}
      {state.phase === 'fighting' && (
        <div className="glass-card p-8 mb-8 text-center">
          <div className="flex justify-center items-center gap-8">
            <div className="text-6xl animate-bounce">{state.player1?.emoji}</div>
            <div className="text-3xl animate-spin">💥</div>
            <div className="text-6xl animate-bounce delay-150">{state.player2?.emoji}</div>
          </div>
          <p className="text-gray-400 font-display mt-4 animate-pulse">Cīņa notiek...</p>
        </div>
      )}

      {/* Battle Result */}
      {state.phase === 'result' && state.result && (
        <BattleResultPanel result={state.result} />
      )}

      {/* Catalog for selection */}
      {(state.phase === 'select' || state.phase === 'ready') && (
        <div className="mt-6">
          <h2 className="text-xl font-bold font-display mb-4 text-gray-300">
            {!state.player1 ? '👆 Izvēlies 1. cīnītāju' : !state.player2 ? '👆 Izvēlies 2. cīnītāju' : '✅ Abi cīnītāji izvēlēti!'}
          </h2>
          <BakuganCatalog
            battleMode
            onSelectForBattle={handleSelectBakugan}
            selectedForBattle={selectedForBattle}
          />
        </div>
      )}
    </div>
  );
}

// Sub-components
function FighterSlot({ bakugan, label, onClear }: { bakugan: Bakugan | null; label: string; onClear: () => void }) {
  if (!bakugan) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-32 border-dashed border-2 border-gray-700">
        <div className="text-3xl text-gray-700">?</div>
        <p className="text-gray-600 text-xs font-display mt-1">{label}</p>
      </div>
    );
  }

  const colors = ATTRIBUTE_COLORS[bakugan.attribute];

  return (
    <div className={`glass-card p-4 text-center border ${colors.border} ${colors.glow}`}>
      <p className="text-xs font-display text-gray-500 mb-2 uppercase tracking-wider">{label}</p>
      <div className="text-5xl mb-2 animate-float">{bakugan.emoji}</div>
      <p className="font-black font-display text-sm leading-tight">{bakugan.name}</p>
      <span className={`attribute-badge ${colors.bg} ${colors.text} border ${colors.border} mt-2 inline-flex`}>
        {ATTRIBUTE_EMOJIS[bakugan.attribute]} {bakugan.attribute}
      </span>
      <div className={`text-lg font-black font-display ${colors.text} mt-1`}>{bakugan.gPower} GP</div>
      <button onClick={onClear} className="text-xs text-gray-600 hover:text-red-400 mt-2 block w-full transition-colors">
        ✕ Noņemt
      </button>
    </div>
  );
}

function BattleResultPanel({ result }: { result: BattleResult }) {
  const winnerColors = ATTRIBUTE_COLORS[result.winner.attribute];
  const loserColors = ATTRIBUTE_COLORS[result.loser.attribute];

  return (
    <div className="space-y-4 mb-8">
      {/* Winner announcement */}
      <div className={`glass-card p-6 text-center border-2 ${winnerColors.border} ${winnerColors.glow}`}>
        <p className="text-gray-400 font-display text-sm uppercase tracking-widest mb-1">🏆 Uzvarētājs</p>
        <div className="text-6xl mb-2 animate-float">{result.winner.emoji}</div>
        <h2 className={`text-3xl font-black font-display ${winnerColors.text}`}>{result.winner.name}</h2>
        <p className="text-white font-body mt-2">{result.message}</p>
        <div className="flex justify-center gap-8 mt-4">
          <div className="text-center">
            <div className={`text-2xl font-black font-display ${winnerColors.text}`}>{result.winnerFinalPower}</div>
            <div className="text-xs text-gray-500 font-display uppercase">Kopējā jauda</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black font-display text-gray-500">{result.loserFinalPower}</div>
            <div className="text-xs text-gray-500 font-display uppercase">{result.loser.name}</div>
          </div>
        </div>
      </div>

      {/* Rounds breakdown */}
      <div className="glass-card p-5">
        <h3 className="font-bold font-display text-gray-300 mb-4 uppercase tracking-wider text-sm">Cīņas gaita</h3>
        <div className="space-y-3">
          {result.rounds.map((round) => {
            const p1Wins = round.player1Power > round.player2Power;
            return (
              <div key={round.roundNumber} className="bg-gray-800/50 rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold font-display text-gray-500 uppercase">
                    {round.roundNumber}. kārta
                  </span>
                  <span className="text-xs text-gray-600 font-body">{round.description}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex-1 text-right font-black font-display text-lg ${p1Wins ? winnerColors.text : loserColors.text}`}>
                    {round.player1Power}
                  </div>
                  <div className="text-gray-600 text-xs font-display">vs</div>
                  <div className={`flex-1 font-black font-display text-lg ${!p1Wins ? winnerColors.text : loserColors.text}`}>
                    {round.player2Power}
                  </div>
                </div>
                {round.usedAbility && (
                  <p className="text-xs text-yellow-500 mt-1 text-center font-body">
                    ⚡ Spēja izmantota: {round.usedAbility}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
