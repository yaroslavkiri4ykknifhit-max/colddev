import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function GoogleAdsCertificate() {
  return (
    <aside className="certification" id="google-ads-certificate" aria-labelledby="google-ads-certificate-title">
      <Image
        className="certification-badge"
        src="/certificates/google-ads-search-badge.png"
        alt="Знак Google Ads Search Certified"
        width={112}
        height={112}
        sizes="(max-width: 700px) 72px, 112px"
      />
      <div className="certification-copy">
        <span className="certification-label">Сертификат Google Skillshop</span>
        <h3 id="google-ads-certificate-title">Google Ads Search</h3>
        <p>Ярослав Киричук · поисковая реклама</p>
      </div>
      <div className="certification-action">
        <a
          className="certification-link"
          href="https://skillshop.credential.net/6c2111d9-d037-44cd-8c4a-0b58b9592165"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Проверить сертификат Google Ads Search — в новой вкладке"
        >
          <span>Проверить сертификат</span><ArrowUpRight size={19} aria-hidden="true" />
        </a>
        <span className="certification-date">Действует до <time dateTime="2027-10-19">19 октября 2027</time></span>
      </div>
    </aside>
  );
}
