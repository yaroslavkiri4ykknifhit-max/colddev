import { ArrowDown, ArrowUpRight, BadgeCheck } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CaseSection } from "@/components/CaseSection";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { TrustSection } from "@/components/TrustSection";
import { HandScene } from "@/components/HandScene";
import { Experience } from "@/components/Experience";
import { OrbitContact } from "@/components/OrbitContact";
import { siteConfig } from "@/config/site";

const steps = [
  ["01", "Сначала — ваш бизнес.", "Что продаёте, кому и в каком городе. Выбираем решение под вашу задачу."],
  ["02", "Потом — наша работа.", "Согласуем стоимость и сроки. Собираем сайт, подключаем аналитику, готовим рекламу."],
  ["03", "И вот — вы в эфире.", "Запускаем, проверяем обращения и объясняем, как всё работает. Остаёмся на связи."],
];
const faqs = [
  ["Сколько стоит мой проект?", "Сайт — от 899 BYN, настройка Яндекс Директа — от 399 BYN. Google Ads и автоматизация — по расчёту. Состав работы и цену согласуем до начала. Рекламный бюджет оплачивается отдельно."],
  ["А если сайт уже есть?", "Можно заказать только рекламу. Сначала посмотрим, удобно ли оставить заявку и готов ли сайт к трафику. Если нужны доработки — обсудим их заранее."],
  ["Как быстро можно запуститься?", "Ориентир для лендинга — 7–14 рабочих дней. Точный срок зависит от объёма и готовности материалов. Согласуем его перед стартом."],
  ["Как будем общаться?", "Напрямую с Ярославом в Telegram или по телефону. Обсудим задачу, согласуем этапы, покажем работу и передадим всё необходимое для дальнейшего использования."],
];
const tariffs = [
  { title: "Разработка сайта", price: "899", currency: "BYN", from: true, detail: "Лендинги, сайты компаний, магазины." },
  { title: "Настройка рекламы", price: "399", currency: "BYN", from: true, detail: "Яндекс Директ. Google Ads — по расчёту." },
  { title: "Автоматизация бизнеса", price: "По расчёту", currency: "", from: false, detail: "Бизнес-процессы любой сложности." },
];

function ContactButton({ children = "Обсудить мой проект" }: { children?: React.ReactNode }) {
  return <a className="button" href={siteConfig.contacts.orderUrl} target="_blank" rel="noopener noreferrer"><span>{children}</span><span className="button-icon"><ArrowUpRight size={21} aria-hidden="true" /></span></a>;
}

export default function Home() {
  return (
    <div className="site">
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero scroll-scene" aria-labelledby="hero-title">
          <div className="hero-pin scroll-pin"><div className="shell hero-shell">
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 id="hero-title">Ваш бизнес.<br /><em>На виду.</em><span className="hero-period" aria-hidden="true">*</span></h1>
                <p>Делаем сайты и запускаем рекламу,<br className="desktop-break" /> чтобы к вам приходили клиенты.</p>
                <ContactButton />
              </div>
              <div className="hero-media"><HandScene /></div>
            </div>
            <div className="hero-bottom">
              <a className="hero-certificate-link" href="#google-ads-certificate"><BadgeCheck size={20} aria-hidden="true" />Сертификат Google Ads</a>
              <a href="#portfolio">Можно сразу к работам <span><ArrowDown size={18} aria-hidden="true" /></span></a>
            </div>
          </div></div>
        </section>
        <ClientsMarquee />
        <TrustSection />
        <CaseSection />
        <section className="services section" id="services" aria-labelledby="services-title">
          <div className="shell">
            <h2 id="services-title">Тарифы</h2>
            <div className="tariff-grid">
              {tariffs.map((tariff) => (
                <article className="tariff-card" key={tariff.title}>
                  <h3>{tariff.title}</h3>
                  <p className={`tariff-price${tariff.from ? "" : " tariff-price-custom"}`}>
                    {tariff.from && <small>от </small>}<strong>{tariff.price}</strong>{tariff.currency && <small> {tariff.currency}</small>}
                  </p>
                  <p className="tariff-detail">{tariff.detail}</p>
                  <a className="tariff-link" href={siteConfig.contacts.orderUrl} target="_blank" rel="noopener noreferrer" aria-label={`Обсудить: ${tariff.title}`}>Обсудить <ArrowUpRight size={22} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
            <p className="tariff-note">Рекламный бюджет оплачивается отдельно.</p>
          </div>
        </section>
        <section className="process section" id="process" aria-labelledby="process-title">
          <div className="shell">
            <div className="process-heading" data-reveal><h2 id="process-title">Меньше сложностей.<br /><em>Больше движения.</em></h2><span className="process-doodle" aria-hidden="true"><ArrowUpRight size={92} strokeWidth={1} /></span></div>
            <div className="process-grid">{steps.map(([number, title, copy]) => <article key={number} data-reveal><div><span>{number}</span><ArrowUpRight size={22} aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>
        <OrbitContact />
        <section className="faq section" aria-labelledby="faq-title">
          <div className="shell faq-grid">
            <div><h2 id="faq-title">Можно<br /><em>спросить.</em></h2></div>
            <div className="faq-list">{faqs.map(([question, answer], index) => <details name="colddev-faq" key={question}><summary><span className="faq-number">0{index + 1}</span><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Experience />
    </div>
  );
}
