import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Matches **bold** or [label](href). Kept deliberately tiny: no nesting beyond
// links inside bold, no HTML, and output is always React elements.
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

const linkClass =
  'font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

function parse(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;

  for (const m of text.matchAll(TOKEN)) {
    const index = m.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const key = `${keyPrefix}-${n++}`;

    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold text-white light:text-slate-900">
          {parse(m[1], key)}
        </strong>,
      );
    } else {
      const label = m[2];
      const href = m[3];
      if (href.startsWith('/') || href.startsWith('#')) {
        out.push(
          <Link key={key} to={href} className={linkClass}>
            {label}
          </Link>,
        );
      } else {
        out.push(
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>,
        );
      }
    }
    last = index + m[0].length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function InlineText({ text }: { text: string }) {
  return <>{parse(text, 'i')}</>;
}
