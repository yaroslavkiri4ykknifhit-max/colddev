import { ArrowDown, ArrowUpRight, Check, Crosshair, Globe2, Send } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CaseSection } from "@/components/CaseSection";
import { HandScene } from "@/components/HandScene";
import { Experience } from "@/components/Experience";
import { siteConfig } from "@/config/site";
import { projects } from "@/lib/cases";

const steps = [
  ["01", "Сначала — ваш бизнес.", "Что продаёте, кому и в каком городе. Выбираем решение под вашу задачу."],
  ["02", "Потом — наша работа.", "Согласуем стоимость и сроки. Собираем сайт, подключаем аналитику, готовим рекламу."],
  ["03", "И вот — вы в эфире.", "Запускаем, проверяем обращения и объясняем, как всё работает. Остаёмся на связи."],
];
const faqs = [
  ["Сколько стоит мой проект?", "Лендинг — от 899 BYN, настройка Яндекс Директа — от 399 BYN. Стоимость связки с рекламой и Google Ads рассчитываем под задачу. Напишите о своём бизнесе — зафиксируем состав работы и цену до начала."],
  ["А если сайт уже есть?", "Можно заказать только рекламу. Сначала посмотрим, удобно ли оставить заявку и готов ли сайт к трафику. Если нужны доработки — обсудим их заранее."],
  ["Как быстро можно запуститься?", "Ориентир для лендинга — 7–14 рабочих дней. Точный срок зависит от объёма и готовности материалов. Согласуем его перед стартом."],
  ["Как будем общаться?", "Напрямую с Ярославом в Telegram. Обсудим задачу, согласуем этапы, покажем работу и передадим всё необходимое для дальнейшего использования."],
];
function ContactButton({ children = "Обсудить мой проект", light = false }: { children?: React.ReactNode; light?: boolean }) {
  return <a className={`button${light ? " button-light" : ""}`} href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer"><span>{children}</span><span className="button-icon"><ArrowUpRight size={21} /></span></a>;
}
export default function Home() {
  return <div className="site"><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader /><main id="main-content">
    <section className="hero scroll-scene" aria-labelledby="hero-title"><div className="hero-pin scroll-pin"><div className="shell hero-shell">
      <div className="hero-meta"><span><i className="status-dot" /> Независимая digital-студия</span><span>Сайты / Реклама / Рост</span></div>
      <div className="hero-grid"><div className="hero-copy"><span className="eyebrow">Хороший бизнес должны заметить</span><h1 id="hero-title">Ваш бизнес.<br /><em>На виду.</em><span className="hero-period" aria-hidden="true">*</span></h1><p>Делаем сайты и запускаем рекламу,<br className="desktop-break" /> чтобы к вам приходили клиенты.</p><ContactButton /><span className="hero-cta-note">Начнём с вашей задачи. В Telegram.</span></div>
      <div className="hero-media"><HandScene /></div></div>
      <div className="hero-bottom"><p><span className="person-initial">Я</span><span>Ярослав на связи.<br /><strong>От идеи до запуска.</strong></span></p><a href="#portfolio">Можно сразу к работам <span><ArrowDown size={18} /></span></a></div>
    </div></div></section>
    <div className="client-strip"><div className="shell"><span className="client-strip-label">В хорошем окружении</span><div className="client-logos">{projects.map((project) => <a href={project.url} target="_blank" rel="noreferrer" key={project.id}>{project.title}</a>)}</div></div></div>
    <CaseSection />
    <section className="services section" id="services" aria-labelledby="services-title"><div className="shell"><div className="section-caption"><span><i /> 02 / Что делаем</span><span>Всё работает на одну цель</span></div><div className="services-heading" data-reveal><h2 id="services-title">Не просто быть.<br /><em>Быть нужными.</em></h2><p>Сайт превращает интерес в доверие.<br />Реклама приводит тех, кому вы нужны.</p></div>
      <div className="service-list"><a className="service-row" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer" data-reveal><span className="service-number">/ 01</span><div className="service-main"><h3>Сайты для бизнеса <Globe2 /></h3><p>Лендинги, корпоративные сайты, магазины.</p><div className="service-tags"><span>Дизайн</span><span>Разработка</span><span>SEO-основа</span><span>Мобильная версия</span></div></div><span className="service-price"><small>от</small> 899 <small>BYN</small></span><span className="service-arrow"><ArrowUpRight /></span></a>
      <a className="service-row" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer" data-reveal><span className="service-number">/ 02</span><div className="service-main"><h3>Реклама в поиске <Crosshair /></h3><p>Яндекс Директ и Google Ads. От спроса до обращения.</p><div className="service-tags"><span>Поисковые запросы</span><span>Объявления</span><span>Аналитика</span><span>Цели</span></div></div><span className="service-price"><small>Директ от</small> 399 <small>BYN</small></span><span className="service-arrow"><ArrowUpRight /></span></a></div>
      <div className="service-footnote"><span>Рекламный бюджет оплачивается отдельно.<br />Стоимость Google Ads и сложных проектов — после обсуждения.</span><a href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Нужны сайт + реклама? Соберём вместе <ArrowUpRight size={19} /></a></div><div className="benefit-strip"><span><Check size={16} /> Стоимость до старта</span><span><Check size={16} /> Ваш сайт и доступы</span><span><Check size={16} /> На связи напрямую</span></div>
    </div></section>
    <section className="process section" id="process" aria-labelledby="process-title"><div className="shell"><div className="section-caption"><span><i /> 03 / Без лишних кругов</span><span>Напрямую. По делу.</span></div><div className="process-heading" data-reveal><h2 id="process-title">Меньше сложностей.<br /><em>Больше движения.</em></h2><span className="process-doodle" aria-hidden="true"><ArrowUpRight size={92} strokeWidth={1} /></span></div><div className="process-grid">{steps.map(([number, title, copy]) => <article key={number} data-reveal><div><span>{number}</span><ArrowUpRight size={22} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="shell contact-shell">
      <div className="contact-intro"><span className="eyebrow"><span className="status-dot" /> Теперь ваш ход</span><h2 id="contact-title">Есть дело?<br /><em>Давайте обсудим.</em></h2></div>
      <div className="contact-copy"><p>Расскажите о бизнесе.<br />Предложим, с чего начать.</p><ContactButton>Написать Ярославу</ContactButton><span className="contact-handle"><Send size={18} /> @c0lddev</span></div>
    </div></section>
    <section className="faq section" aria-labelledby="faq-title"><div className="shell faq-grid"><div><span className="eyebrow">04 / Кстати</span><h2 id="faq-title">Можно<br /><em>спросить.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details name="colddev-faq" key={question}><summary><span className="faq-number">0{index + 1}</span><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
  </main><SiteFooter /><Experience /></div>;
}
