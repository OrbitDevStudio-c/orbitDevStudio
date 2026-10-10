import { Info, Lightbulb, AlertTriangle } from 'lucide-react';
import type { CalloutTone, ContentBlock } from '../../data/blog';
import { slugify, toPlainText } from '../../data/blog';
import InlineText from './InlineText';
import GradientIcon from '../ui/GradientIcon';

const calloutStyles: Record<CalloutTone, { icon: typeof Info; wrap: string; iconClass: string; label: string; gradient?: boolean }> = {
  info: {
    icon: Info,
    wrap: 'border-accent/30 bg-accent/[0.06] light:border-blue-200 light:bg-blue-50/70',
    iconClass: '',
    label: 'Note',
    gradient: true,
  },
  tip: {
    icon: Lightbulb,
    wrap: 'border-emerald-400/25 bg-emerald-400/[0.05] light:border-emerald-200 light:bg-emerald-50/70',
    iconClass: 'text-emerald-300 bg-emerald-400/10 light:text-emerald-700 light:bg-emerald-100',
    label: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    wrap: 'border-amber-400/25 bg-amber-400/[0.05] light:border-amber-200 light:bg-amber-50/70',
    iconClass: 'text-amber-300 bg-amber-400/10 light:text-amber-700 light:bg-amber-100',
    label: 'Watch out',
  },
};

const bodyText = 'text-[17px] leading-8 text-[#C7D2E4] light:text-slate-600';

export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case 'p':
            return (
              <p key={key} className={`${bodyText} mb-6`}>
                <InlineText text={block.text} />
              </p>
            );

          case 'h2':
            return (
              <h2
                key={key}
                id={slugify(toPlainText(block.text))}
                className="scroll-mt-28 mt-14 mb-5 text-2xl md:text-[28px] leading-tight font-bold tracking-tight text-white light:text-slate-900"
              >
                <InlineText text={block.text} />
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={key}
                id={slugify(toPlainText(block.text))}
                className="scroll-mt-28 mt-10 mb-3 text-xl font-semibold tracking-tight text-white light:text-slate-900"
              >
                <InlineText text={block.text} />
              </h3>
            );

          case 'ul':
            return (
              <ul key={key} className="mb-8 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className={`${bodyText} relative pl-7`}>
                    <span
                      aria-hidden="true"
                      className="absolute left-1.5 top-[13px] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(22,119,255,0.6)] light:shadow-none"
                    />
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={key} className="mb-8 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className={`${bodyText} relative pl-11`}>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-[13px] font-bold leading-none text-accent light:border-blue-200 light:bg-blue-50"
                    >
                      {j + 1}
                    </span>
                    <InlineText text={item} />
                  </li>
                ))}
              </ol>
            );

          case 'quote':
            return (
              <figure key={key} className="my-10 border-l-2 border-accent pl-6">
                <blockquote className="text-xl md:text-[22px] leading-relaxed font-medium tracking-tight text-white light:text-slate-900">
                  <InlineText text={block.text} />
                </blockquote>
                {block.cite && (
                  <figcaption className="mt-3 text-sm text-slate-400">{block.cite}</figcaption>
                )}
              </figure>
            );

          case 'callout': {
            const tone = calloutStyles[block.tone ?? 'info'];
            const Icon = tone.icon;
            return (
              <aside
                key={key}
                className={`my-10 flex gap-4 rounded-2xl border p-5 sm:p-6 ${tone.wrap}`}
                aria-label={block.title ?? tone.label}
              >
                {tone.gradient ? (
                  <GradientIcon icon={Icon} size={18} boxClassName="h-9 w-9 rounded-xl" />
                ) : (
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone.iconClass}`}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                )}
                <div>
                  <p className="mb-1.5 text-[15px] font-bold text-white light:text-slate-900">
                    {block.title ?? tone.label}
                  </p>
                  <p className="text-[16px] leading-7 text-[#C7D2E4] light:text-slate-600">
                    <InlineText text={block.text} />
                  </p>
                </div>
              </aside>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
