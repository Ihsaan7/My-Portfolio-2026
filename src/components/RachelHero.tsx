import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RoleId } from '../types/portfolio';
import { ROLES_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { ArrowDown, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { WatermarkIllustrations } from './WatermarkIllustrations';

interface RachelHeroProps {
  activeRole: RoleId;
  onSelectRole: (role: RoleId) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onScrollToWork: () => void;
}

interface RoleNavItem {
  id: RoleId;
  baseText: string;
  suffix: string;
  subtag: string;
}

const ROLE_ITEMS: RoleNavItem[] = [
  {
    id: 'backend',
    baseText: 'BACKEND',
    suffix: '·ENGINEER',
    subtag: 'NestJS · Node.js · Express · PostgreSQL · MongoDB · Docker',
  },
  {
    id: 'it-support',
    baseText: 'DEVOPS',
    suffix: '·& INFRASTRUCTURE',
    subtag: 'GitHub Actions · Docker · WSL2 · Cisco CCNAv7 · Google IT Support',
  },
  {
    id: 'frontend',
    baseText: 'FRONTEND',
    suffix: '·DEVELOPER',
    subtag: 'Meta Certified · React.js · Next.js · Tailwind CSS · AnimeBom',
  },
  {
    id: 'software-security',
    baseText: 'SECURITY',
    suffix: '·RESEARCHER',
    subtag: 'Final Year Project (ML Attack Detection) · Arfa Karim ASTP Certified · C++',
  },
];

export const RachelHero: React.FC<RachelHeroProps> = ({
  activeRole,
  onSelectRole,
  isDarkMode,
  onToggleTheme,
  onScrollToWork,
}) => {
  const [hoveredRoleId, setHoveredRoleId] = useState<RoleId | null>(null);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = (id: RoleId) => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredRoleId(id);
  };

  const handleNavLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoveredRoleId(null);
    }, 120);
  };

  const activeRoleConfig = ROLES_DATA[activeRole];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-6 sm:pt-8 pb-10 overflow-hidden select-none">
      {/* Background Watermark Illustration that pops up on hover */}
      <WatermarkIllustrations
        activeHoverRole={hoveredRoleId}
        activeSelectedRole={activeRole}
      />

      {/* Top Header Row (Rachel Johnson exact 3-zone contract) */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-6xl mx-auto">
        {/* Top-left: IHSAAN ULLAH */}
        <div className="flex items-center gap-1.5">
          <a
            href="#"
            className="group text-base sm:text-xl font-mono tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
          >
            <span className="font-extrabold text-black dark:text-white">
              {PERSONAL_INFO.firstName}
            </span>{' '}
            <span className="font-light tracking-wide text-zinc-600 dark:text-zinc-400">
              {PERSONAL_INFO.lastName}
            </span>
          </a>
          <span
            className="w-1.5 h-1.5 rounded-full ml-1"
            style={{ backgroundColor: activeRoleConfig.theme.accentHex }}
          />
        </div>

        {/* Top-right: GitHub, LinkedIn, Mail, Light/Dark Theme Switch */}
        <div className="flex items-center gap-3 sm:gap-4 text-zinc-700 dark:text-zinc-300">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-black dark:hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.7]" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-black dark:hover:text-white transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.7]" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-1 hover:text-black dark:hover:text-white transition-colors"
            title="Send Email"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.7]" />
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle light or dark theme"
            className="p-1.5 sm:p-2 ml-1 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none"
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-700" />
            )}
          </button>
        </div>
      </header>

      {/* Center Stage: The Iconic Rachel Johnson Centered Vertical Stack */}
      <div className="relative z-20 my-auto py-6 sm:py-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
        {/* Nav container controls onMouseLeave so gap crossings NEVER trigger rapid flickering */}
        <nav
          aria-label="Select persona discipline"
          onMouseLeave={handleNavLeave}
          className="flex flex-col items-center gap-1 sm:gap-2.5 w-full py-2"
        >
          {ROLE_ITEMS.map((item) => {
            const isHovered = hoveredRoleId === item.id;
            const isSelected = activeRole === item.id;
            const roleConfig = ROLES_DATA[item.id];

            return (
              <div
                key={item.id}
                className="h-14 sm:h-18 md:h-20 flex items-center justify-center select-none"
              >
                <button
                  onClick={() => {
                    onSelectRole(item.id);
                    onScrollToWork();
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  className={`group relative h-full text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider transition-colors duration-200 flex items-center justify-center focus-visible:outline-none px-4 sm:px-6 rounded-xl whitespace-nowrap leading-none ${
                    isSelected
                      ? 'text-black dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 font-normal hover:text-black dark:hover:text-white'
                  }`}
                >
                  {/* Active indicator dot */}
                  {isSelected && (
                    <motion.span
                      layoutId="activeRoleDot"
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2.5 hidden sm:inline-block shrink-0"
                      style={{ backgroundColor: roleConfig.theme.accentHex }}
                    />
                  )}

                  {/* Base Word */}
                  <span className="tracking-widest shrink-0">{item.baseText}</span>

                  {/* Typing Suffix Animation on Hover (pointer-events-none & overflow-hidden prevent layout shift) */}
                  <span
                    className={`pointer-events-none font-mono transition-all duration-200 text-xs xs:text-sm sm:text-2xl md:text-3xl ml-1 font-light inline-flex items-center shrink-0 overflow-hidden whitespace-nowrap ${
                      isHovered || isSelected ? 'opacity-100 max-w-[320px]' : 'opacity-0 max-w-0'
                    }`}
                    style={{
                      color: isHovered || isSelected ? roleConfig.theme.accentHex : undefined,
                    }}
                  >
                    <span className="shrink-0">{item.suffix}</span>
                    {(isHovered || isSelected) && (
                      <span className="inline-block w-0.5 h-3.5 sm:h-6 ml-1 bg-current animate-pulse shrink-0" />
                    )}
                  </span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Selected Persona Subtext */}
        <div className="mt-6 sm:mt-8 max-w-md sm:max-w-xl text-center space-y-1.5 px-4 pointer-events-none">
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400">
            {activeRoleConfig.tagline}
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-light">
            Software Engineer · BS Software Engineering · Multi-Persona Portfolio
          </p>
        </div>
      </div>

      {/* Minimal scroll indicator (no duplicate footer) */}
      <div className="relative z-20 flex justify-center pb-2">
        <button
          onClick={onScrollToWork}
          className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Scroll to work"
        >
          <span>Explore selected work</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
