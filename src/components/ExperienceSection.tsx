import React from 'react';
import { RoleData } from '../types/portfolio';
import { WORK_EXPERIENCE, PERSONAL_INFO } from '../data/portfolioData';
import { Building2, Calendar, MapPin, GraduationCap, CheckCircle2 } from 'lucide-react';

interface ExperienceSectionProps {
  role: RoleData;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ role }) => {
  return (
    <section id="experience" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: role.theme.accentHex }}
            />
            <span>Professional Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Experience & Education
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {WORK_EXPERIENCE.map((exp) => (
            <div
              key={exp.role}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: role.theme.accentHex }} />
                  <span>Managed <strong>citizen data operations</strong> and application records in enterprise database systems.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: role.theme.accentHex }} />
                  <span>Handled <strong>biometric verification</strong>, identity document checks, and protocol compliance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: role.theme.accentHex }} />
                  <span>Consistently achieved daily <strong>zero-pendency targets</strong> with high accuracy.</span>
                </li>
              </ul>
            </div>
          ))}

          {/* Education Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-zinc-500" />
                  <span>{PERSONAL_INFO.education.degree}</span>
                </h3>
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {PERSONAL_INFO.education.institution}
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-500">
                {PERSONAL_INFO.education.period}
              </div>
            </div>

            {/* Coursework Tags */}
            <div className="mt-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Core Coursework & Foundations:
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <strong>C++ Object-Oriented Programming</strong> & Data Structures
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <strong>Relational Databases (SQL)</strong> & Normalization
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <strong>Software Architecture</strong> & Systems Design
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <strong>Computer Networks</strong> & Protocols
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <strong>Operating Systems</strong>
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Final Year Project: <strong>ML-Based Cyber Attack Detection</strong> (GNS3 & Random Forest)</span>
              <span>VU ID: {PERSONAL_INFO.education.vuId}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
