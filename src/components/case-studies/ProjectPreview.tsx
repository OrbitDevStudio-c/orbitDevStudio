import { ImageOff } from 'lucide-react';
import type { Project } from '../../data/projects';
import { getPrimaryImage } from '../../data/projects';

interface ProjectPreviewProps {
  project: Project;
  /** `card`: fixed 16:10 crop for grids. `hero`: natural aspect ratio of the image. */
  variant?: 'card' | 'hero';
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** Inside an aria-hidden illustration: render images with empty alt text. */
  decorative?: boolean;
}

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/**
 * macOS-style browser frame around the project's real screenshot (or its logo on white).
 * `.mockup-frame` keeps it dark in both themes, like the other project mockups on the site.
 * Projects without any image get an honest "screenshot pending" frame instead of a fake image.
 */
export default function ProjectPreview({ project, variant = 'card', priority = false, decorative = false }: ProjectPreviewProps) {
  const image = getPrimaryImage(project);
  const alt = decorative ? '' : image?.alt;
  const isLogo = !project.screenshot && !!project.logo;
  const isHero = variant === 'hero';

  const loadingProps = priority
    ? ({ loading: 'eager', fetchPriority: 'high' } as const)
    : ({ loading: 'lazy' } as const);

  return (
    <div className="mockup-frame relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-[0_10px_40px_rgba(0,0,0,0.3)] light:shadow-[0_10px_40px_rgba(15,23,42,0.12)]">
      <div className="h-9 bg-[#14203A]/80 flex items-center px-4 border-b border-white/5" aria-hidden="true">
        <div className="flex gap-1.5 mr-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <div className="bg-[#0B1220]/60 rounded-md px-3 py-1 text-[10px] text-[#94A3B8] font-medium truncate max-w-[240px] border border-white/5">
            {host(project.liveUrl)}
          </div>
        </div>
      </div>

      {image ? (
        isLogo ? (
          <div className={`flex items-center justify-center bg-white ${isHero ? 'aspect-[16/10] p-12 sm:p-16' : 'aspect-[16/10] p-8'}`}>
            <img
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              decoding="async"
              {...loadingProps}
              className="h-full w-full object-contain"
            />
          </div>
        ) : isHero ? (
          <img
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            decoding="async"
            {...loadingProps}
            className="block w-full h-auto"
          />
        ) : (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              decoding="async"
              {...loadingProps}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        )
      ) : (
        <div className="aspect-[16/10] flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_top,_rgba(22,119,255,0.12),_transparent_70%)] px-6 text-center">
          <ImageOff size={28} className="text-[#94A3B8]" aria-hidden="true" />
          <span className="text-sm font-semibold text-white">{project.title}</span>
          <span className="text-[11px] text-[#94A3B8]">Screenshot coming soon. Visit the live site to see it.</span>
        </div>
      )}
    </div>
  );
}
