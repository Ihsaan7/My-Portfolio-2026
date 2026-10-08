import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoleData, Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { ProjectVisualCard } from './ProjectVisualCard';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  role: RoleData;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ role }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProject = role.projects.find((p) => p.featured) || role.projects[0];
  const secondaryProjects = role.projects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section id="work" className="py-20 border-t border-zinc-200 dark:border-zinc-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: role.theme.accentHex }}
            />
            <span>Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Projects & Case Studies
          </h2>
        </div>

        {/* Dynamic Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Featured Hero Project Card (col-span-2) */}
            {featuredProject && (
              <div className="lg:col-span-2 group rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                <div className="p-6 sm:p-8">
                  {/* Clean Highlighted Kicker */}
                  {featuredProject.metricBadge && (
                    <div className="mb-3">
                      <span className="inline-block px-2.5 py-1 rounded bg-zinc-200/90 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold text-xs">
                        {featuredProject.metricBadge.label}: {featuredProject.metricBadge.value}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                    {featuredProject.title}
                  </h3>

                  <p
                    className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: featuredProject.description }}
                  />

                  {/* Project Visual with Vintage Effect */}
                  <div className="mb-6">
                    <ProjectVisualCard project={featuredProject} role={role} isHero={true} />
                  </div>
                </div>

                {/* Footer with Tech Tags & Quick Links */}
                <div className="px-6 sm:px-8 py-4 border-t border-zinc-200 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={featuredProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: role.theme.accentHex }}
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Project Cards */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {secondaryProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all p-6 flex flex-col justify-between flex-1 group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-2">
                      <span className="text-zinc-900 dark:text-white font-medium">
                        {project.category}
                      </span>
                      {project.metricBadge && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            {project.metricBadge.value}
                          </span>
                        </>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                      {project.title}
                    </h4>

                    <p
                      className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1 group-hover:underline"
                    >
                      <span>Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      {project.demoUrl && project.demoUrl !== project.githubUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        role={role}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
