import React from 'react';
import { motion } from 'motion/react';
import { RoleId } from '../types/portfolio';
import { ROLES_DATA, ROLE_ORDER } from '../data/portfolioData';
import { Server, Network, Layout, ShieldAlert } from 'lucide-react';

interface RoleSwitcherProps {
  activeRole: RoleId;
  onSelectRole: (role: RoleId) => void;
  compact?: boolean;
}

const ROLE_ICONS: Record<RoleId, React.ReactNode> = {
  backend: <Server className="w-3.5 h-3.5 shrink-0" />,
  'it-support': <Network className="w-3.5 h-3.5 shrink-0" />,
  frontend: <Layout className="w-3.5 h-3.5 shrink-0" />,
  'software-security': <ShieldAlert className="w-3.5 h-3.5 shrink-0" />,
};

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  activeRole,
  onSelectRole,
  compact = false,
}) => {
  if (compact) {
    // 2x2 Grid for Mobile Drawer so labels have plenty of room and never clip
    return (
      <div
        role="tablist"
        aria-label="Professional role selection"
        className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full"
      >
        {ROLE_ORDER.map((roleId) => {
          const role = ROLES_DATA[roleId];
          const isActive = activeRole === roleId;

          return (
            <button
              key={roleId}
              role="tab"
              aria-selected={isActive}
              id={`compact-tab-${roleId}`}
              onClick={() => onSelectRole(roleId)}
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-200 focus-visible:outline-none whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-xs border border-zinc-200/80 dark:border-zinc-700'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-zinc-800/40'
              }`}
            >
              <span
                style={{
                  color: isActive ? role.theme.accentHex : undefined,
                }}
              >
                {ROLE_ICONS[roleId]}
              </span>
              <span>{role.shortLabel}</span>
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 ml-0.5"
                  style={{ backgroundColor: role.theme.accentHex }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Standard Pill Bar for Desktop & Tablet
  return (
    <div
      role="tablist"
      aria-label="Professional role selection"
      className="relative inline-flex items-center p-1 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-xs transition-all duration-300 shrink-0"
    >
      {ROLE_ORDER.map((roleId) => {
        const role = ROLES_DATA[roleId];
        const isActive = activeRole === roleId;

        return (
          <button
            key={roleId}
            role="tab"
            aria-selected={isActive}
            id={`tab-${roleId}`}
            onClick={() => onSelectRole(roleId)}
            className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 z-10 whitespace-nowrap focus-visible:outline-none shrink-0 ${
              isActive
                ? 'text-zinc-950 dark:text-white font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeRolePill"
                className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <span
              className="relative z-10 transition-colors duration-200"
              style={{
                color: isActive ? role.theme.accentHex : undefined,
              }}
            >
              {ROLE_ICONS[roleId]}
            </span>

            <span className="relative z-10 whitespace-nowrap">{role.shortLabel}</span>

            {isActive && (
              <span
                className="w-1.5 h-1.5 rounded-full relative z-10 hidden sm:inline-block shrink-0 ml-0.5"
                style={{ backgroundColor: role.theme.accentHex }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
