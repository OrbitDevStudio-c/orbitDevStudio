export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent focus:text-slate-950 focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
