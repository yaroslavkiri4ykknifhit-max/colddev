import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="COLDDEV — на главную">
      <span className="brand-mark" aria-hidden="true">
        C/
      </span>
      {!compact && <span className="brand-word">COLD<span>DEV</span></span>}
    </Link>
  );
}
