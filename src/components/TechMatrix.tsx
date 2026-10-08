import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoleData, SkillItem } from '../types/portfolio';
import { ChevronRight } from 'lucide-react';

interface TechMatrixProps {
  role: RoleData;
}

export const TechMatrix: React.FC<TechMatrixProps> = ({ role }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  return (
    <section id="stack" className="py-20 border-t border-zinc-200 dark:border-zinc-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: role.theme.accentHex }}
              />
              <span>Targeted Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Technical Matrix
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-light">
            Core competencies and toolsets aligned with the{' '}
            <span className="text-zinc-900 dark:text-white font-medium">{role.label}</span> focus.
          </p>
        </div>

        {/* Dynamic Skill Matrix Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {role.skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xs font-semibold tracking-wide text-zinc-800 dark:text-zinc-200 uppercase font-mono">
                      {category.title}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      0{catIndex + 1}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;

                      return (
                        <button
                          key={skill.name}
                          onClick={() =>
                            setSelectedSkill(isSelected ? null : skill)
                          }
                          className={`w-full text-left p-3 rounded-xl transition-all duration-200 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                            isSelected
                              ? 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-sm'
                              : 'bg-white/60 dark:bg-zinc-950/40 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-1.5">
                              {skill.name}
                              {skill.highlighted && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: role.theme.accentHex }}
                                  title="Core Specialization"
                                />
                              )}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                              {skill.experience}
                            </span>
                          </div>

                          {/* Proficiency gauge bar */}
                          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden mb-1.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: role.theme.accentHex }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                            <span>{skill.category}</span>
                            <span>{skill.proficiency}%</span>
                          </div>

                          {/* Collapsible context details on click */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans"
                            >
                              <div className="text-[10px] font-mono text-zinc-400 uppercase mb-0.5">
                                Context:
                              </div>
                              {skill.context}
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
