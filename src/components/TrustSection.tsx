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
        <div className="trust-metric trust-metric-revenue">
          <div className="trust-revenue-value">
            <CountUp value={siteConfig.experience.clientRevenue} />
            <span className="trust-currency">BYN</span>
          </div>
          <p>выручки клиентов благодаря нашей работе</p>
        </div>
        <GoogleAdsCertificate />
      </div>
    </section>
  );
}
