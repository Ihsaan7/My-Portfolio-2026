import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoleData, Credential, RoleId } from '../types/portfolio';
import { ROLES_DATA, ROLE_ORDER } from '../data/portfolioData';
import { ShieldCheck, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';

interface CredentialsSectionProps {
  role: RoleData;
  onSelectRole: (role: RoleId) => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  role,
  onSelectRole,
}) => {
  const [filterMode, setFilterMode] = useState<'current' | 'all'>('all');

  const allCredentials: Credential[] = ROLE_ORDER.flatMap(
    (roleId) => ROLES_DATA[roleId].credentials
  );

  const displayedCredentials =
    filterMode === 'current'
      ? role.credentials
      : allCredentials;

  return (
    <section id="credentials" className="py-20 border-t border-zinc-200 dark:border-zinc-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: role.theme.accentHex }}
              />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Certifications & Credentials
            </h2>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              All Certifications ({allCredentials.length})
            </button>
            <button
              onClick={() => setFilterMode('current')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterMode === 'current'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Active Persona ({role.credentials.length})
            </button>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCredentials.map((cred) => {
              const associatedRole = ROLES_DATA[cred.roleAssociated];
              const isCurrentPersona = cred.roleAssociated === role.id;

              return (
                <motion.div
                  key={cred.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCurrentPersona
                      ? 'bg-white dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-700 shadow-sm'
                      : 'bg-zinc-50/60 dark:bg-zinc-900/20 border-zinc-200 dark:border-zinc-800/80 opacity-90 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isCurrentPersona
                      ? associatedRole.theme.accentHex
                      : undefined,
                  }}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {cred.issuer}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{cred.date}</span>
                      </div>

                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${associatedRole.theme.accentHex}1a`,
                          color: associatedRole.theme.accentHex,
                        }}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>{cred.status}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2.5">
                      {cred.title}
                    </h3>

                    {/* What I Learned Bullets */}
                    <ul className="space-y-1.5 mb-4 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                      {cred.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: associatedRole.theme.accentHex }}
                          />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500">
                    <span>
                      {cred.verificationCode?.startsWith('http') ? (
                        <a
                          href={cred.verificationCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 text-zinc-700 dark:text-zinc-300"
                        >
                          <span>Verify Certificate</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        `ID: ${cred.verificationCode || 'VERIFIED'}`
                      )}
                    </span>

                    {cred.roleAssociated !== role.id ? (
                      <button
                        onClick={() => onSelectRole(cred.roleAssociated)}
                        className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-1 hover:underline font-sans"
                      >
                        <span>View {associatedRole.shortLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px] font-sans">
                        <CheckCircle className="w-3 h-3" />
                        <span>Active Alignment</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
