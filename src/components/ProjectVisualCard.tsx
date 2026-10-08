import React from 'react';
import { Project, RoleData } from '../types/portfolio';
import { ExternalLink, Globe } from 'lucide-react';

interface ProjectVisualCardProps {
  project: Project;
  role: RoleData;
  isHero?: boolean;
}

export const ProjectVisualCard: React.FC<ProjectVisualCardProps> = ({
  project,
  role,
  isHero = false,
}) => {
  const [hasError, setHasError] = React.useState(false);

  const displayUrl =
    project.id === 'book-vault-nestjs'
      ? 'https://nest-js-book-vault.vercel.app'
      : project.id === 'next-movie-app'
      ? 'https://netflixuiclone-eight.vercel.app'
      : project.demoUrl || project.githubUrl;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm transition-all duration-300">
      {/* Clean minimal window header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-zinc-100/90 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
          </span>
          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 ml-1.5 truncate max-w-[220px] sm:max-w-md">
            {displayUrl}
          </span>
        </div>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Project Image with Clean Vintage Effect Only */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-100 dark:bg-zinc-900/90 text-zinc-500 font-mono space-y-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: role.theme.accentHex }}
            />
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">
              {project.title}
            </span>
            <span className="text-[11px] text-zinc-400 max-w-sm">
              {project.subtitle}
            </span>
          </div>
        ) : (
          <>
            <img
              src={project.image}
              alt={project.imageFallbackAlt || project.title}
              onError={() => setHasError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top sepia-[0.14] contrast-[1.04] brightness-[0.98] saturate-[0.92] transition-transform duration-500 hover:scale-[1.01]"
            />
            {/* Subtle vintage warm tint layer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-amber-900/[0.03] mix-blend-color"
            />
          </>
        )}
      </div>
    </div>
  );
};
