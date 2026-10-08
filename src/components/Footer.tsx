import React from 'react';
import { RoleData } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  role: RoleData;
}

export const Footer: React.FC<FooterProps> = ({ role }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: role.theme.accentHex }}
            />
            <span className="font-mono font-bold text-xs tracking-wider text-zinc-900 dark:text-white uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">
              2026 Islamabad, Pakistan
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors focus-visible:outline-none"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono gap-2">
          <div>
            {PERSONAL_INFO.name} · 2026 Islamabad, Pakistan · BS Software Engineering
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Main Focus: <strong className="text-zinc-900 dark:text-white font-semibold">Backend Engineering</strong> (NestJS · PostgreSQL · Node.js)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
