import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoleData, InteractiveKeyword } from '../types/portfolio';
import { ArrowDown, Sparkles, Terminal, Info, ExternalLink, Cpu } from 'lucide-react';

interface HeroProps {
  role: RoleData;
  onExploreWork: () => void;
  onOpenLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  role,
  onExploreWork,
  onOpenLab,
}) => {
  const [activeKeyword, setActiveKeyword] = useState<InteractiveKeyword | null>(null);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle ambient gradient mesh behind hero */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${role.theme.accentHex} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Eyebrow & Status */}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-zinc-300">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: role.theme.accentHex }}
            />
            <span className="font-mono text-[11px] tracking-wide uppercase">
              {role.badge}
            </span>
          </div>

          <span className="text-zinc-600 hidden sm:inline">/</span>

          <span className="text-zinc-400 font-mono text-[12px]">
            {role.tagline}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                <span>{role.heroTitle} </span>
                <span
                  className="font-editorial italic font-normal transition-colors duration-500 block sm:inline"
                  style={{ color: role.theme.accentHex }}
                >
                  {role.heroItalic}
                </span>
              </h1>

              {/* Editorial lead paragraph with interactive keywords */}
              <div className="mt-8 text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl">
                <p>
                  Designing deterministic systems with focus on{' '}
                  {role.heroKeywords.map((kw, i) => (
                    <React.Fragment key={kw.word}>
                      <button
                        onMouseEnter={() => setActiveKeyword(kw)}
                        onMouseLeave={() => setActiveKeyword(null)}
                        onClick={() =>
                          setActiveKeyword(activeKeyword?.word === kw.word ? null : kw)
                        }
                        className="relative inline-block font-medium text-white transition-all underline decoration-dotted underline-offset-4 decoration-white/40 hover:decoration-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-0.5 group"
                      >
                        <span
                          className="transition-colors group-hover:text-white"
                          style={{
                            color:
                              activeKeyword?.word === kw.word
                                ? role.theme.accentHex
                                : undefined,
                          }}
                        >
                          {kw.word}
                        </span>

                        {/* Interactive floating keyword inspector popover */}
                        {activeKeyword?.word === kw.word && (
                          <motion.span
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 rounded-xl bg-zinc-900/95 border border-white/15 shadow-2xl backdrop-blur-xl text-left z-50 pointer-events-none block"
                          >
                            <span className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/10 pb-1.5 mb-1.5">
                              <span className="uppercase text-zinc-300">
                                {kw.category}
                              </span>
                              {kw.metric && (
                                <span
                                  className="font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white"
                                  style={{ color: role.theme.accentHex }}
                                >
                                  {kw.metric}
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-zinc-300 leading-normal block font-sans font-normal">
                              {kw.detail}
                            </span>
                          </motion.span>
                        )}
                      </button>
                      {i < role.heroKeywords.length - 1 ? ', ' : '.'}
                    </React.Fragment>
                  ))}
                </p>

                <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light">
                  {role.heroSubtitle}
                </p>
              </div>

              {/* Action Buttons & Quick Anchors */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreWork}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-zinc-950 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
                  style={{
                    backgroundColor: role.theme.accentHex,
                    boxShadow: `0 0 20px ${role.theme.accentHex}40`,
                  }}
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenLab}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
                >
                  <Cpu className="w-4 h-4 text-zinc-400" />
                  <span>Launch Live Simulator</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Claim-to-Proof Adjacent Quantitative Metrics */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {role.metrics.map((m) => (
            <div key={m.label} className="group">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                  {m.value}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: role.theme.accentHex }}
                />
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1 uppercase tracking-wider font-mono">
                {m.label}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                {m.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
