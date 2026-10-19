import { CountUp } from "@/components/CountUp";
import { GoogleAdsCertificate } from "@/components/GoogleAdsCertificate";
import { siteConfig } from "@/config/site";

export function TrustSection() {
  return (
    <section className="trust-section" aria-label="Опыт и квалификация">
      <div className="shell trust-grid">
        <div className="trust-metric">
          <CountUp value={siteConfig.experience.years} />
          <p>года опыта</p>
        </div>
        <div className="trust-metric trust-metric-projects">
          <CountUp value={siteConfig.experience.projects} />
          <p>успешных проекта</p>
        </div>
        <GoogleAdsCertificate />
      </div>
    </section>
  );
}
