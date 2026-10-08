import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, RoleData } from '../types/portfolio';
import { ProjectVisualCard } from './ProjectVisualCard';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  role: RoleData;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  role,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 z-10 text-zinc-900 dark:text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Unboxed Metadata header */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-2">
            <span className="font-semibold text-zinc-900 dark:text-white">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Case Study</span>
            {project.metricBadge && (
              <>
                <span aria-hidden="true">·</span>
                <span
                  className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold"
                >
                  {project.metricBadge.label}: {project.metricBadge.value}
                </span>
              </>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 font-light">
            {project.subtitle}
          </p>

          {/* Project Visual with Vintage Effect */}
          <div className="mb-6">
            <ProjectVisualCard project={project} role={role} isHero={true} />
          </div>

          {/* Overview text */}
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Implementation Overview
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans font-light">
              {project.fullDescription}
            </p>
          </div>

          {/* Architecture highlights & Key outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture Highlights</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                {project.architectureNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: role.theme.accentHex }}
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Key Outcomes</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                {project.keyOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: role.theme.accentHex }}
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
              Technologies Deployed
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: role.theme.accentHex }}
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors font-mono"
            >
              Close [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
