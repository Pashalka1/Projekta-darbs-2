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
      if (state.player1?.id === bakugan.id) setState((current) => ({ ...current, player1: null, phase: 'select', result: null }));
      else setState((current) => ({ ...current, player2: null, phase: state.player1 ? 'select' : 'select', result: null }));
      return;
    }

    if (!state.player1) {
      setState((current) => ({ ...current, player1: bakugan }));
    } else if (!state.player2) {
      setState((current) => ({ ...current, player2: bakugan, phase: 'ready' }));
    }
  };

  const handleBattle = async () => {
    if (!state.player1 || !state.player2) return;

    setAnimating(true);
    setState((current) => ({ ...current, phase: 'fighting' }));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = simulateBattle(state.player1, state.player2);
    setState((current) => ({ ...current, phase: 'result', result }));
    setAnimating(false);
  };

  const handleReset = () => {
    setState({ phase: 'select', player1: null, player2: null, result: null, currentRound: 0 });
  };

  return (
    <div className="space-y-8">
      <section className="glass-card relative overflow-hidden px-6 py-7 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-purple-500/10" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 font-display text-xs uppercase tracking-[0.35em] text-red-300">Battle simulator</p>
            <h1 className="section-title mb-2">⚔️ Bakugan Cīņas Arēna</h1>
            <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
              Izvēlies divus Bakuganus, salīdzini to spēku un palaid simulāciju ar vairākiem raundiem un gala rezultātu.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniInfo label="1. solis" value="Izvēlies cīnītāju" />
            <MiniInfo label="2. solis" value="Sāc cīņu" />
            <MiniInfo label="3. solis" value="Skaties rezultātu" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <FighterSlot
          bakugan={state.player1}
          label="Cīnītājs 1"
          onClear={() => setState((current) => ({ ...current, player1: null, phase: 'select', result: null }))}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl font-black text-gray-300 shadow-2xl shadow-black/20">
            VS
          </div>
          {state.phase === 'fighting' && (
            <div className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-display text-xs uppercase tracking-[0.3em] text-red-300 animate-pulse">
              Cīņa notiek...
            </div>
          )}
          {state.phase === 'ready' && (
            <button onClick={handleBattle} disabled={animating} className="btn-primary whitespace-nowrap">
              🥊 Cīnīties
            </button>
          )}
          {state.phase === 'result' && (
            <button onClick={handleReset} className="btn-secondary whitespace-nowrap">
              🔄 Jauna cīņa
            </button>
          )}
        </div>

        <FighterSlot
          bakugan={state.player2}
          label="Cīnītājs 2"
          onClear={() => setState((current) => ({ ...current, player2: null, phase: 'select', result: null }))}
        />
      </section>

      {state.phase === 'fighting' && (
        <div className="glass-card overflow-hidden px-6 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="text-7xl animate-bounce">{state.player1?.emoji}</div>
            <div className="text-5xl animate-spin">💥</div>
            <div className="text-7xl animate-bounce">{state.player2?.emoji}</div>
          </div>
          <p className="mt-5 text-sm uppercase tracking-[0.35em] text-gray-400">Notiek spēka aprēķins un raundu simulācija</p>
        </div>
      )}

      {state.phase === 'result' && state.result && <BattleResultPanel result={state.result} />}

      {(state.phase === 'select' || state.phase === 'ready') && (
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">
                {!state.player1 ? '👆 Izvēlies 1. cīnītāju' : !state.player2 ? '👆 Izvēlies 2. cīnītāju' : '✅ Abi cīnītāji izvēlēti'}
              </h2>
              <p className="mt-1 text-sm text-gray-400">Katalogs paliek vienuviet, tāpēc UX ir ātrs un nav nepieciešama papildu navigācija.</p>
            </div>
          </div>
          <BakuganCatalog
            battleMode
            onSelectForBattle={handleSelectBakugan}
            selectedForBattle={selectedForBattle}
          />
        </section>
      )}
    </div>
  );
}

function FighterSlot({ bakugan, label, onClear }: { bakugan: Bakugan | null; label: string; onClear: () => void }) {
  if (!bakugan) {
    return (
      <div className="glass-card flex min-h-[220px] flex-col items-center justify-center border border-dashed border-white/15 p-6 text-center">
        <div className="text-5xl text-gray-600">?</div>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.25em] text-gray-500">{label}</p>
        <p className="mt-2 max-w-xs text-sm text-gray-400">Izvēlies Bakuganu no kataloga zemāk, lai aizpildītu šo pozīciju.</p>
      </div>
    );
  }

  const colors = ATTRIBUTE_COLORS[bakugan.attribute];

  return (
    <div className={`glass-card relative overflow-hidden border ${colors.border} ${colors.glow} p-6`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.soft} opacity-80`} />
      <div className="relative z-10 text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-gray-500">{label}</p>
        <div className="mt-4 text-6xl animate-float">{bakugan.emoji}</div>
        <h3 className="mt-4 text-2xl font-black text-white">{bakugan.name}</h3>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className={`attribute-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
            {ATTRIBUTE_EMOJIS[bakugan.attribute]} {bakugan.attribute}
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-gray-300">S{bakugan.season}</span>
        </div>
        <div className={`mt-4 text-4xl font-black ${colors.text}`}>{bakugan.gPower} GP</div>
        <p className="mt-2 text-sm text-gray-300">Partneris: {bakugan.partner}</p>
        <button onClick={onClear} className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-red-500/30 hover:text-red-300">
          ✕ Noņemt
        </button>
      </div>
    </div>
  );
}

function BattleResultPanel({ result }: { result: BattleResult }) {
  const winnerColors = ATTRIBUTE_COLORS[result.winner.attribute];
  const loserColors = ATTRIBUTE_COLORS[result.loser.attribute];

  return (
    <div className="space-y-5">
      <div className={`glass-card relative overflow-hidden border-2 ${winnerColors.border} ${winnerColors.glow} p-6 sm:p-8`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${winnerColors.soft} opacity-80`} />
        <div className="relative z-10 text-center">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-gray-400">🏆 Uzvarētājs</p>
          <div className="mt-4 text-7xl animate-float">{result.winner.emoji}</div>
          <h2 className={`mt-3 text-3xl font-black ${winnerColors.text} sm:text-4xl`}>{result.winner.name}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white sm:text-base">{result.message}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ScoreCard label="Uzvarētāja jauda" value={result.winnerFinalPower} accent={winnerColors.text} />
            <ScoreCard label={`${result.loser.name} jauda`} value={result.loserFinalPower} accent={loserColors.text} />
          </div>
        </div>
      </div>

      <div className="glass-card p-5 sm:p-6">
        <h3 className="font-display text-sm uppercase tracking-[0.3em] text-gray-400">Cīņas gaita</h3>
        <div className="mt-4 space-y-3">
          {result.rounds.map((round) => {
            const player1Wins = round.player1Power > round.player2Power;
            return (
              <div key={round.roundNumber} className="surface-card p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-display text-xs uppercase tracking-[0.25em] text-gray-500">{round.roundNumber}. kārta</span>
                  <span className="text-sm text-gray-400">{round.description}</span>
                </div>
                <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
                  <div className={`rounded-2xl border border-white/10 px-4 py-3 text-center text-2xl font-black ${player1Wins ? winnerColors.text : 'text-gray-500'}`}>
                    {round.player1Power}
                  </div>
                  <div className="text-center font-display text-xs uppercase tracking-[0.3em] text-gray-500">VS</div>
                  <div className={`rounded-2xl border border-white/10 px-4 py-3 text-center text-2xl font-black ${!player1Wins ? winnerColors.text : 'text-gray-500'}`}>
                    {round.player2Power}
                  </div>
                </div>
                {round.usedAbility && (
                  <p className="mt-3 text-center text-sm text-yellow-400">⚡ Spēja izmantota: {round.usedAbility}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card px-4 py-3 text-center">
      <div className="font-display text-[11px] uppercase tracking-[0.3em] text-gray-500">{label}</div>
      <div className="mt-1 text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function ScoreCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="surface-card p-4 text-center">
      <div className="font-display text-xs uppercase tracking-[0.25em] text-gray-500">{label}</div>
      <div className={`mt-2 text-3xl font-black ${accent}`}>{value}</div>
    </div>
  );
}
