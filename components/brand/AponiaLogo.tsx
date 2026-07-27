import Image from 'next/image';

interface AponiaLogoProps {
  context?: 'site' | 'docs';
}

export function AponiaLogo({ context = 'site' }: AponiaLogoProps) {
  return (
    <span className="aponia-brand">
      <Image
        src="/brand/aponiajs-mark.svg"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
        className="aponia-brand-mark"
      />
      <span className="aponia-brand-name">AponiaJS</span>
      {context === 'docs' ? (
        <span className="aponia-brand-context">Docs</span>
      ) : null}
    </span>
  );
}
