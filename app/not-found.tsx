import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="aponia-404">
      <div className="aponia-404-shell">
        <p className="aponia-404-rail">
          <b>Error 404</b> Route not resolved
        </p>
        <h1>Nothing is mounted at this path.</h1>
        <p className="aponia-404-copy">
          The page was moved, renamed, or never existed. The documentation
          index below lists every route the site currently serves.
        </p>
        <div className="aponia-404-actions">
          <Link href="/">Back to home</Link>
          <Link href="/docs">Documentation</Link>
          <a
            href="https://github.com/aponiajs/aponiajs/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report a broken link <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
