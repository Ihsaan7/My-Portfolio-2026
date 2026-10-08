import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoleId } from '../types/portfolio';

interface WatermarkIllustrationsProps {
  activeHoverRole: RoleId | null;
  activeSelectedRole: RoleId;
}

export const WatermarkIllustrations: React.FC<WatermarkIllustrationsProps> = ({
  activeHoverRole,
  activeSelectedRole,
}) => {
  // Prefer currently hovered role, fallback to active role
  const roleToShow = activeHoverRole || activeSelectedRole;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none transition-opacity duration-700"
    >
      <AnimatePresence mode="wait">
        {/* BACKEND WATERMARK */}
        {roleToShow === 'backend' && (
          <motion.div
            key="backend-watermark"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12"
          >
            <svg
              className="w-full max-w-4xl h-72 sm:h-96 text-emerald-600/10 dark:text-emerald-400/[0.08]"
              viewBox="0 0 1000 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Database Cylinder left */}
              <g transform="translate(100, 160)">
                <ellipse cx="60" cy="30" rx="45" ry="18" />
                <path d="M15 30v70c0 10 20 18 45 18s45-8 45-18V30" />
                <path d="M15 65c0 10 20 18 45 18s45-8 45-18" />
                <text
                  x="60"
                  y="72"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-xs font-bold"
                >
                  SQL
                </text>
              </g>

              {/* Node Hexagon */}
              <g transform="translate(260, 220)">
                <polygon points="50,10 90,32 90,78 50,100 10,78 10,32" />
                <text
                  x="50"
                  y="60"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-xs font-semibold"
                >
                  Node
                </text>
              </g>

              {/* API Connection Lines & Brackets */}
              <g transform="translate(420, 190)">
                <path d="M20 50h80M100 50l-15-15M100 50l-15 15" />
                <text
                  x="60"
                  y="35"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  REST / JSON
                </text>
                <text
                  x="140"
                  y="65"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-3xl font-light"
                >
                  {'{ }'}
                </text>
              </g>

              {/* Docker Container Box */}
              <g transform="translate(630, 210)">
                <rect x="10" y="20" width="110" height="70" rx="8" />
                <line x1="10" y1="42" x2="120" y2="42" />
                <rect x="25" y="52" width="16" height="12" rx="2" />
                <rect x="48" y="52" width="16" height="12" rx="2" />
                <rect x="71" y="52" width="16" height="12" rx="2" />
                <text
                  x="65"
                  y="35"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[11px]"
                >
                  Docker Container
                </text>
              </g>

              {/* PostgreSQL Elephant / Relational Indicator */}
              <g transform="translate(790, 150)">
                <rect x="20" y="20" width="120" height="90" rx="10" />
                <line x1="20" y1="48" x2="140" y2="48" />
                <line x1="60" y1="48" x2="60" y2="110" />
                <line x1="20" y1="75" x2="140" y2="75" />
                <text
                  x="80"
                  y="38"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[11px] font-bold"
                >
                  PostgreSQL
                </text>
              </g>

              {/* Data Flow Grid Dots */}
              <circle cx="210" cy="190" r="4" fill="currentColor" />
              <circle cx="390" cy="240" r="4" fill="currentColor" />
              <circle cx="600" cy="245" r="4" fill="currentColor" />
              <path
                d="M210 190 Q 300 280, 390 240 T 600 245"
                strokeDasharray="4 4"
              />
            </svg>
          </motion.div>
        )}

        {/* IT SUPPORT / INFRASTRUCTURE WATERMARK */}
        {roleToShow === 'it-support' && (
          <motion.div
            key="it-support-watermark"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12"
          >
            <svg
              className="w-full max-w-4xl h-72 sm:h-96 text-sky-600/10 dark:text-sky-400/[0.08]"
              viewBox="0 0 1000 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Network Switch Rack */}
              <g transform="translate(100, 180)">
                <rect x="10" y="20" width="160" height="40" rx="4" />
                <rect x="10" y="70" width="160" height="40" rx="4" />
                {/* Port lights */}
                {[30, 48, 66, 84, 102, 120, 138].map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy="40"
                    r="3"
                    fill="currentColor"
                  />
                ))}
                {[30, 48, 66, 84, 102, 120, 138].map((x, i) => (
                  <circle
                    key={`b-${i}`}
                    cx={x}
                    cy="90"
                    r="3"
                    fill="currentColor"
                  />
                ))}
                <text
                  x="90"
                  y="12"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  Cisco CCNAv7 Rack
                </text>
              </g>

              {/* Wi-Fi Wave / Wireless */}
              <g transform="translate(320, 160)">
                <path d="M20 70 A 50 50 0 0 1 100 70" />
                <path d="M35 85 A 30 30 0 0 1 85 85" />
                <circle cx="60" cy="98" r="4" fill="currentColor" />
                <text
                  x="60"
                  y="45"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  Wi-Fi / VPN
                </text>
              </g>

              {/* RJ45 Connector */}
              <g transform="translate(480, 200)">
                <rect x="20" y="20" width="70" height="80" rx="6" />
                <path d="M35 100v18h40v-18" />
                <line x1="30" y1="35" x2="80" y2="35" />
                <line x1="30" y1="45" x2="80" y2="45" />
                <text
                  x="55"
                  y="70"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[11px] font-bold"
                >
                  TCP/IP
                </text>
              </g>

              {/* Network Router Node with 4 Cross Arrows */}
              <g transform="translate(640, 190)">
                <circle cx="55" cy="55" r="42" />
                <path d="M35 55h40M75 55l-8-8M75 55l-8 8" />
                <path d="M55 35v40M55 35l-8 8M55 35l8 8" />
                <text
                  x="55"
                  y="112"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  192.168.1.0/24
                </text>
              </g>

              {/* Troubleshooting / Wrench & Screen */}
              <g transform="translate(790, 170)">
                <rect x="10" y="20" width="120" height="80" rx="8" />
                <line x1="45" y1="100" x2="95" y2="100" />
                <line x1="70" y1="100" x2="70" y2="115" />
                <line x1="50" y1="115" x2="90" y2="115" />
                <text
                  x="70"
                  y="55"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px] font-bold"
                >
                  Hardware & OS
                </text>
                <text
                  x="70"
                  y="72"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[9px]"
                >
                  Troubleshooting
                </text>
              </g>
            </svg>
          </motion.div>
        )}

        {/* FRONTEND WATERMARK */}
        {roleToShow === 'frontend' && (
          <motion.div
            key="frontend-watermark"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12"
          >
            <svg
              className="w-full max-w-4xl h-72 sm:h-96 text-purple-600/10 dark:text-purple-400/[0.08]"
              viewBox="0 0 1000 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* React Atom Orbit */}
              <g transform="translate(130, 200)">
                <circle cx="50" cy="50" r="8" fill="currentColor" />
                <ellipse cx="50" cy="50" rx="42" ry="16" />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="42"
                  ry="16"
                  transform="rotate(60 50 50)"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="42"
                  ry="16"
                  transform="rotate(120 50 50)"
                />
                <text
                  x="50"
                  y="110"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  React 19
                </text>
              </g>

              {/* Bezier Vector Handle / Pen Tool (Like Rachel Johnson's site!) */}
              <g transform="translate(300, 180)">
                <path d="M20 90 Q 70 10, 130 80" />
                <circle cx="20" cy="90" r="4" fill="currentColor" />
                <circle cx="130" cy="80" r="4" fill="currentColor" />
                <circle cx="70" cy="10" r="4" />
                <line x1="20" y1="90" x2="70" y2="10" strokeDasharray="3 3" />
                <line x1="70" y1="10" x2="130" y2="80" strokeDasharray="3 3" />
                <text
                  x="75"
                  y="110"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  GSAP Motion
                </text>
              </g>

              {/* Tailwind Wave & CSS Badge */}
              <g transform="translate(490, 210)">
                <rect x="15" y="15" width="80" height="70" rx="10" />
                <text
                  x="55"
                  y="52"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-xs font-bold"
                >
                  CSS
                </text>
                <text
                  x="55"
                  y="70"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[9px]"
                >
                  Tailwind
                </text>
              </g>

              {/* Responsive Layout Artboards */}
              <g transform="translate(640, 170)">
                {/* Desktop frame */}
                <rect x="10" y="20" width="130" height="85" rx="6" />
                <line x1="10" y1="36" x2="140" y2="36" />
                {/* Mobile frame overlapping */}
                <rect
                  x="120"
                  y="45"
                  width="40"
                  height="75"
                  rx="6"
                  fill="white"
                  className="dark:fill-zinc-950"
                />
                <line x1="120" y1="58" x2="160" y2="58" />
                <text
                  x="75"
                  y="125"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  Responsive Layout
                </text>
              </g>

              {/* Code Tags `< / >` */}
              <g transform="translate(830, 200)">
                <text
                  x="50"
                  y="65"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-3xl font-light tracking-widest"
                >
                  {'</>'}
                </text>
                <text
                  x="50"
                  y="95"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  Component Dev
                </text>
              </g>
            </svg>
          </motion.div>
        )}

        {/* SECURITY WATERMARK */}
        {roleToShow === 'software-security' && (
          <motion.div
            key="security-watermark"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12"
          >
            <svg
              className="w-full max-w-4xl h-72 sm:h-96 text-amber-600/10 dark:text-amber-400/[0.08]"
              viewBox="0 0 1000 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Defense Shield */}
              <g transform="translate(120, 180)">
                <path d="M50 15 L90 30 V65 C90 95 50 115 50 115 C50 115 10 95 10 65 V30 Z" />
                {/* Keyhole */}
                <circle cx="50" cy="55" r="8" />
                <path d="M46 58 L44 76 H56 L54 58 Z" />
                <text
                  x="50"
                  y="135"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  Defense-in-Depth
                </text>
              </g>

              {/* Binary Matrix Stream */}
              <g transform="translate(290, 190)">
                <text
                  x="50"
                  y="30"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[11px] tracking-wider"
                >
                  01000011 00101011
                </text>
                <text
                  x="50"
                  y="50"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[11px] tracking-wider"
                >
                  01010011 01000101
                </text>
                <text
                  x="50"
                  y="70"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[11px] tracking-wider"
                >
                  01000011 01010101
                </text>
                <text
                  x="50"
                  y="100"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  C++ & Memory Safe
                </text>
              </g>

              {/* Padlock */}
              <g transform="translate(480, 200)">
                <rect x="25" y="45" width="60" height="50" rx="8" />
                <path d="M37 45V30 A 18 18 0 0 1 73 30 V45" />
                <circle cx="55" cy="70" r="4" fill="currentColor" />
                <text
                  x="55"
                  y="115"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  JWT & bcrypt
                </text>
              </g>

              {/* Terminal Bash Prompt */}
              <g transform="translate(630, 190)">
                <rect x="10" y="20" width="130" height="80" rx="8" />
                <line x1="10" y1="38" x2="140" y2="38" />
                <circle cx="22" cy="29" r="3" fill="currentColor" />
                <circle cx="32" cy="29" r="3" fill="currentColor" />
                <circle cx="42" cy="29" r="3" fill="currentColor" />
                <text
                  x="20"
                  y="58"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  $ sentry-cli logs
                </text>
                <text
                  x="20"
                  y="74"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  ✓ audit passed
                </text>
                <text
                  x="75"
                  y="120"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  GitHub Actions CI
                </text>
              </g>

              {/* Security Seal / Certificate */}
              <g transform="translate(820, 180)">
                <circle cx="50" cy="50" r="36" />
                <polygon points="50,22 58,40 78,40 62,52 68,70 50,58 32,70 38,52 22,40 42,40" />
                <text
                  x="50"
                  y="105"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  className="font-mono text-[10px]"
                >
                  Cyber Security Fnd
                </text>
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
