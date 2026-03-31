@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply min-h-screen bg-gray-950 text-white font-body antialiased;
    background-image:
      radial-gradient(circle at top left, rgba(239, 68, 68, 0.12), transparent 28%),
      radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 24%),
      linear-gradient(180deg, #020617 0%, #030712 40%, #020617 100%);
    background-attachment: fixed;
  }

  * {
    @apply border-gray-800;
  }

  ::selection {
    @apply bg-red-500/30 text-white;
  }

  ::-webkit-scrollbar {
    @apply w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-900;
  }

  ::-webkit-scrollbar-thumb {
    @apply rounded-full bg-gray-700;
  }
}

@layer components {
  .app-shell {
    @apply relative isolate overflow-x-hidden;
  }

  .attribute-badge {
    @apply inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em];
  }

  .glow-pyrus {
    box-shadow: 0 0 40px rgba(239, 68, 68, 0.18);
  }

  .glow-aquos {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.18);
  }

  .glow-ventus {
    box-shadow: 0 0 40px rgba(34, 197, 94, 0.18);
  }

  .glow-haos {
    box-shadow: 0 0 40px rgba(234, 179, 8, 0.18);
  }

  .glow-darkus {
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.18);
  }

  .glow-subterra {
    box-shadow: 0 0 40px rgba(249, 115, 22, 0.18);
  }

  .glass-card {
    @apply rounded-3xl border border-white/10 bg-gray-900/70 backdrop-blur-xl shadow-2xl shadow-black/20;
  }

  .surface-card {
    @apply rounded-2xl border border-white/10 bg-black/20 shadow-lg shadow-black/10;
  }

  .card-hover {
    @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25;
  }

  .btn-primary {
    @apply rounded-2xl bg-red-600 px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg hover:shadow-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70;
  }

  .btn-secondary {
    @apply rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70;
  }

  .input-primary {
    @apply w-full rounded-2xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder:text-gray-500 transition-all duration-200 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30;
  }

  .section-title {
    @apply font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl;
  }
}
