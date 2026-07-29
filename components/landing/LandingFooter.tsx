import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="mono-colophon">
      <Link href="#top" className="mono-colophon-top">
        <span aria-hidden="true">↑</span> Back to top
      </Link>

      <nav className="mono-colophon-links" aria-label="Footer">
        <Link href="/docs">Docs</Link>
        <Link href="/goal">Goal</Link>
        <a href="https://github.com/aponiajs/aponiajs">Source</a>
        <a href="https://github.com/aponiajs/aponiajs/issues">Issues</a>
        <a href="https://opensource.org/license/mit">MIT licence</a>
      </nav>

      <p className="mono-colophon-note">
        Alpha. Interfaces change between releases. Figures are archived runs,
        not guarantees.
      </p>
    </footer>
  );
}
