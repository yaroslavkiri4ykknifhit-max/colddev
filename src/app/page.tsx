import {
  ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Bot, Check,
  Clock3, Eye, Layers3, LayoutDashboard, MousePointer2, Send,
  ShieldCheck, Target, WalletCards,
} from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CaseSection } from "@/components/CaseSection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { ColdMotion } from "@/components/ColdMotion";
import { siteConfig } from "@/config/site";

const prices = [
  ["Сайт для бизнеса", "899", "Структура / тексты / дизайн / разработка"],
  ["Настройка рекламы", "399", "Яндекс Директ / аналитика"],
  ["Telegram-боты и автоматизация", "1499", "Под вашу задачу и процессы"],
  ["Сопровождение", "299", "Поддержка и развитие проекта / в месяц"],
];
const process = [
  ["01", "Разбираемся\nв бизнесе", "Смотрим продукт, клиентов, конкурентов и определяем, что действительно нужно сделать."],
  ["02", "Собираем\nсистему", "Структура, тексты, дизайн, разработка, аналитика и реклама работают на одну цель."],
  ["03", "Показываем\nкаждый шаг", "После заказа выдаём доступ в кабинет. Там видны статус, сроки и результат."],
];
const cabinetItems = [
  { title: "Что делаем сейчас", text: "Текущий этап и комментарий простым языком", icon: Eye },
  { title: "Когда будет готово", text: "Прогресс, завершённые шаги и плановая дата", icon: Clock3 },
  { title: "Что дала реклама", text: "Показы, клики, заявки, расходы и цена обращения", icon: BarChart3 },
  { title: "Что и когда оплачивать", text: "Счета, ЕРИП, чеки и статусы платежей", icon: WalletCards },
];
const faqs = [
  ["Кому доступен личный кабинет?", "Кабинет получают клиенты COLDDEV после оформления заказа. Мы выдаём ID проекта и персональный код доступа — всё готово для входа."],
  ["Сколько занимает запуск сайта?", "Лендинг обычно занимает 7–14 рабочих дней, корпоративный сайт — от 3 недель. Срок фиксируем до начала работ, а прогресс показываем в кабинете."],
  ["Можно заказать только рекламу?", "Да. Можно заказать сайт, Яндекс Директ или связку под ключ. Перед стартом проверяем готовность площадки и согласуем план продвижения."],
];
function OrderLink({ children = "Получить расчёт" }: { children?: React.ReactNode }) {
  return <a className="cd-button" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer"><span>{children}</span><span className="cd-button-icon"><ArrowUpRight size={20} /></span></a>;
}
export default function Home() {
  return (
    <div className="cold-site">
      <a className="cd-skip" href="#main-content">Перейти к содержимому</a>
      <SiteHeader />
      <main id="main-content">
        <section className="cd-hero" aria-labelledby="hero-title">
          <div className="cd-shell">
            <div className="cd-wordmark" aria-hidden="true">colddev</div>
            <div className="cd-hero-meta"><span>DIGITAL-РЕШЕНИЯ ДЛЯ БИЗНЕСА</span><span>САЙТЫ / РЕКЛАМА / АВТОМАТИЗАЦИЯ</span></div>
            <div className="cd-hero-grid">
              <div className="cd-hero-copy">
                <h1 id="hero-title">Вы видите<br /><span className="cd-gradient">всё.</span></h1>
                <h2>Мы делаем остальное.</h2>
                <p>Проектируем сайты, запускаем рекламу и ведём работу до заявки. Каждый этап, срок и результат — у вас перед глазами.</p>
                <OrderLink />
                <small className="cd-cta-note">В Telegram / план и ориентир по стоимости</small>
              </div>
              <div className="cd-hero-art">
                <div className="cd-glass-ring" aria-hidden="true" />
                <div className="cd-art-label"><span className="cd-dot" /> Ваш проект. В ясной картине.</div>
                <div className="cd-hero-dashboard"><DashboardPreview compact /></div>
                <div className="cd-float cd-float-progress" aria-hidden="true"><span>Всё по плану</span><strong>68<span>%</span></strong><div className="cd-mini-progress"><i /></div></div>
                <div className="cd-float cd-float-update" aria-hidden="true"><span className="cd-check-circle"><Check size={20} /></span><div><small>Ещё один шаг</small><strong>Дизайн согласован</strong></div><ArrowUpRight size={18} /></div>
                <span className="cd-art-caption">Пример кабинета / данные условные</span>
              </div>
            </div>
            <div className="cd-hero-bottom">
              <div className="cd-person"><span className="cd-person-mark">Я</span><p><strong>Проект ведёт Ярослав лично.</strong><span>От первого сообщения до запуска.</span></p></div>
              <a href="#services" className="cd-scroll-link">Посмотреть, что внутри <span><ArrowDown size={18} /></span></a>
            </div>
            <div className="cd-trust-grid">
              <div><Eye size={21} /><span>Видно<strong>что готово</strong></span><span className="cd-trust-number">01</span></div>
              <div><Clock3 size={21} /><span>Понятно<strong>когда запуск</strong></span><span className="cd-trust-number">02</span></div>
              <div><ShieldCheck size={21} /><span>Прозрачно<strong>куда ушёл бюджет</strong></span><span className="cd-trust-number">03</span></div>
            </div>
          </div>
        </section>
        <section className="cd-section cd-services" id="services" aria-labelledby="services-title">
          <div className="cd-shell">
            <div className="cd-section-head cd-reveal"><div><span className="cd-eyebrow">01 / Что вы получаете</span><h2 id="services-title">От первого экрана<br />до <span className="cd-gradient">заявки.</span></h2></div><p>Каждый экран объясняет предложение, укрепляет доверие и ведёт человека к действию.</p></div>
            <div className="cd-services-grid">
              <article className="cd-service-card cd-service-web cd-reveal">
                <div className="cd-card-top"><span>01 / Разработка</span><span className="cd-round-icon"><MousePointer2 size={22} /></span></div>
                <div className="cd-web-art" aria-hidden="true"><div className="cd-mini-browser"><div className="cd-browser-top"><span className="cd-browser-controls"><i /><i /><i /></span><span>вашбизнес.by</span><ArrowUpRight size={12} /></div><div className="cd-mini-site"><span className="cd-mini-label">ВАШ БИЗНЕС / ОНЛАЙН</span><strong>Понятно.<br />С первого<br /><em>экрана.</em></strong><div className="cd-mini-site-cta">Оставить заявку <ArrowUpRight size={12} /></div><div className="cd-mini-sculpture"><Layers3 /></div></div><div className="cd-mini-site-bottom"><span>01 / Предложение</span><span>02 / Доверие</span><span>03 / Заявка</span></div></div><div className="cd-mini-phone"><span /><strong>Ваш<br />бизнес.</strong><div /><i><ArrowUpRight size={15} /></i></div></div>
                <div className="cd-service-copy"><h3>Сайт, который<br />объясняет и продаёт</h3><p>За несколько секунд человек понимает, что вы предлагаете, почему вам можно доверять и куда нажать, чтобы купить.</p><a href="#pricing">Сайт для бизнеса <ArrowUpRight size={18} /></a></div>
              </article>
              <article className="cd-service-card cd-service-ads cd-reveal">
                <div className="cd-card-top"><span>02 / Продвижение</span><span className="cd-round-icon"><Target size={22} /></span></div>
                <div className="cd-ads-art" aria-hidden="true"><span className="cd-search-pill"><span>Вашу услугу уже ищут</span><Target size={18} /></span><div className="cd-ad-path"><span>Поиск</span><ArrowRight size={15} /><span>Сайт</span><ArrowRight size={15} /><strong>Заявка</strong></div></div>
                <div className="cd-service-copy"><h3>Яндекс Директ<br />с понятной экономикой</h3><p>Собираем горячий спрос. В отчёте видны расход, заявки и цена обращения.</p></div>
              </article>
              <article className="cd-service-card cd-service-bots cd-reveal">
                <div className="cd-card-top"><span>03 / Автоматизация</span><span className="cd-round-icon"><Bot size={22} /></span></div>
                <div className="cd-bot-art" aria-hidden="true"><span><Send size={29} /></span><i /><span><Bot size={29} /></span><i /><span><Check size={29} /></span></div>
                <div className="cd-service-copy"><h3>Меньше ручной работы.<br />Больше времени на бизнес.</h3><p>Telegram-боты и автоматизация под вашу задачу и рабочие процессы.</p></div>
              </article>
            </div>
          </div>
        </section>
        <section className="cd-cabinet-section" id="cabinet" aria-labelledby="cabinet-title"><div className="cd-shell"><div className="cd-cabinet-panel">
          <div className="cd-section-head cd-reveal"><div><span className="cd-eyebrow">02 / Личный кабинет colddev</span><h2 id="cabinet-title">Никаких<br /><span>«ну что там?»</span></h2></div><p>Этапы, сроки, обновления, реклама, счета и файлы. Весь проект — в одном месте.</p></div>
          <div className="cd-cabinet-grid"><div className="cd-cabinet-demo cd-reveal"><DashboardPreview /><span className="cd-demo-caption">Попробуйте переключить вкладки / данные условные</span></div><div className="cd-cabinet-features">{cabinetItems.map(({ title, text, icon: Icon }) => <article className="cd-reveal" key={title}><span><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
          <div className="cd-cabinet-access"><span><LayoutDashboard size={19} /> Доступ после заказа / по ID проекта и персональному коду</span><Link href="/login">Войти в кабинет <ArrowUpRight size={18} /></Link></div>
        </div></div></section>
        <section className="cd-section" id="process" aria-labelledby="process-title"><div className="cd-shell"><div className="cd-section-head cd-reveal"><div><span className="cd-eyebrow">03 / Как работаем</span><h2 id="process-title">Вы видите<br /><span className="cd-gradient">каждый шаг.</span></h2></div><p>Что делаем, когда закончим и какой результат получили. Всё понятно в любой момент.</p></div><div className="cd-process-grid">{process.map(([number, title, text]) => <article className="cd-process-card cd-reveal" key={number}><div><span>{number}</span><ArrowUpRight size={24} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="cd-section cd-pricing" id="pricing" aria-labelledby="pricing-title"><div className="cd-shell cd-pricing-grid"><div className="cd-pricing-intro cd-reveal"><span className="cd-eyebrow">04 / Стоимость</span><h2 id="pricing-title">Понятно<br /><span className="cd-gradient">до старта.</span></h2><p>Точная стоимость зависит от задачи и объёма работы. После короткого обсуждения предложу решение, сроки и фиксированную цену.</p><OrderLink /><span className="cd-cta-note">Расчёт проекта — бесплатно</span></div><div className="cd-price-list">{prices.map(([title, amount, detail], index) => <a className="cd-price-row cd-reveal" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer" key={title}><span className="cd-price-index">0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p><strong><small>от</small> {amount} <small>BYN{index === 3 ? " / мес." : ""}</small></strong></div><span className="cd-price-arrow"><ArrowUpRight size={20} /></span></a>)}</div></div></section>
        <CaseSection />
        <section className="cd-section cd-faq" aria-labelledby="faq-title"><div className="cd-shell cd-faq-grid"><div className="cd-reveal"><span className="cd-eyebrow">06 / До начала работы</span><h2 id="faq-title">Хороший<br /><span className="cd-gradient">вопрос.</span></h2><p>Коротко. Понятным языком.</p></div><div className="cd-faq-list">{faqs.map(([question, answer], index) => <details className="cd-reveal" key={question} name="colddev-faq" open={index === 0}><summary><span className="cd-faq-number">0{index + 1}</span><span>{question}</span><span className="cd-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="cd-final" id="contact" aria-labelledby="contact-title"><div className="cd-shell"><div className="cd-final-panel cd-reveal"><div><span className="cd-eyebrow">Следующий шаг / Написать Ярославу</span><h2 id="contact-title">Начнём<br />с вашей <span className="cd-gradient">задачи.</span></h2></div><div className="cd-final-copy"><span className="cd-final-icon"><Send size={36} /></span><p>Расскажите, чем занимается ваш бизнес. В ответ получите понятный следующий шаг и ориентир по стоимости.</p><OrderLink>Написать @c0lddev</OrderLink><span className="cd-cta-note">Сайт / реклама / автоматизация</span></div></div></div></section>
      </main>
      <SiteFooter />
      <ColdMotion />
    </div>
  );
}
