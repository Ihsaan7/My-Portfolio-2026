import React, { useState } from 'react';
import { RoleId } from '../types/portfolio';
import { ROLES_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { RoleSwitcher } from './RoleSwitcher';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeRole: RoleId;
  onSelectRole: (role: RoleId) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onSelectRole,
  isDarkMode,
  onToggleTheme,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentRole = ROLES_DATA[activeRole];

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#stack' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Sandbox', href: '#lab' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-4xl rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md px-4 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-6 transition-all duration-300">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="#"
            className="group font-mono text-xs sm:text-sm tracking-tight text-zinc-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            <span className="font-bold">{PERSONAL_INFO.firstName}</span>{' '}
            <span className="font-light text-zinc-500 dark:text-zinc-400 hidden xs:inline">
              {PERSONAL_INFO.lastName}
            </span>
          </a>
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: currentRole.theme.accentHex }}
          />
        </div>

        {/* Center: Desktop Role Switcher (Unconstrained width so labels never squish) */}
        <div className="hidden md:flex items-center justify-center shrink-0">
          <RoleSwitcher activeRole={activeRole} onSelectRole={onSelectRole} />
        </div>

        {/* Right: Theme Toggle, Contact Button, Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle light or dark theme"
            className="p-1.5 sm:p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-700" />
            )}
          </button>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-full text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: currentRole.theme.accentHex }}
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed top-16 left-3 right-3 max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl p-4 shadow-xl space-y-4 md:hidden z-50">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block px-1">
              Select Persona
            </span>
            <RoleSwitcher
              activeRole={activeRole}
              onSelectRole={(role) => {
                onSelectRole(role);
                setMobileMenuOpen(false);
              }}
              compact
            />
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block px-1 mb-2">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-zinc-400">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5"
              style={{ backgroundColor: currentRole.theme.accentHex }}
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
