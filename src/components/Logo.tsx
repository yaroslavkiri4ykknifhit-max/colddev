import Link from "next/link";
export function Logo() {
  return <Link className="brand" href="/" aria-label="COLDDEV — на главную"><svg className="brand-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M5.4 26.6 26.6 5.4" stroke="currentColor" strokeWidth="4" /></svg><span>colddev<span className="brand-period">.</span></span></Link>;
}
