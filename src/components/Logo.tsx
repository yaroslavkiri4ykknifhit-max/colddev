import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="COLDDEV — на главную">
      <span className="brand-mark" aria-hidden="true">
        <Image src="/colddev-mark.png" width={60} height={60} alt="" priority />
      </span>
      {!compact && <span className="brand-word">COLD<span>DEV</span></span>}
    </Link>
  );
}
