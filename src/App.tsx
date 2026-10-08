/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RoleId } from './types/portfolio';
import { ROLES_DATA } from './data/portfolioData';
import { RachelHero } from './components/RachelHero';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TechMatrix } from './components/TechMatrix';
import { CredentialsSection } from './components/CredentialsSection';
import { InteractiveLab } from './components/InteractiveLab';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RoleSwitcher } from './components/RoleSwitcher';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeRole, setActiveRole] = useState<RoleId>('backend');
  // Default is LIGHT THEME as requested
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  const currentRole = ROLES_DATA[activeRole];

  // Sync class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  // Track scroll position to show sticky floating island navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener: 1=Backend, 2=IT Support, 3=Frontend, 4=Security, T=Theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === '1') setActiveRole('backend');
      if (e.key === '2') setActiveRole('it-support');
      if (e.key === '3') setActiveRole('frontend');
      if (e.key === '4') setActiveRole('software-security');
      if (e.key.toLowerCase() === 't') setIsDarkMode((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      {/* 1. Iconic Rachel Johnson Minimalist Landing Screen */}
      <RachelHero
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        onScrollToWork={() => handleScrollToSection('work')}
      />

      {/* 2. Floating Centered Island Navbar (Smoothly fades in when scrolled past landing) */}
      <AnimatePresence>
        {scrolledPastHero && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
          >
            <Navbar
              activeRole={activeRole}
              onSelectRole={setActiveRole}
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode((prev) => !prev)}
              onOpenContact={() => handleScrollToSection('contact')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Detailed Portfolio Sections */}
      <main className="relative z-10">
        {/* Selected Projects / Work (Role Filtered) */}
        <ProjectsSection role={currentRole} />

        {/* Real Experience & Education (NADRA Data Operations + Contract + Virtual University) */}
        <ExperienceSection role={currentRole} />

        {/* Technical Skills Matrix */}
        <TechMatrix role={currentRole} />

        {/* Certifications & Qualifications (Scrimba, CCNAv7, Google IT Support, Meta Frontend, Arfa Karim ASTP Cyber Security) */}
        <CredentialsSection
          role={currentRole}
          onSelectRole={setActiveRole}
        />

        {/* Interactive Domain Simulator Sandbox */}
        <InteractiveLab role={currentRole} />

        {/* Direct Contact with Ihsaan's actual phone, email, and location */}
        <ContactSection role={currentRole} />
      </main>

      {/* Footer */}
      <Footer role={currentRole} />
    </div>
  );
}
