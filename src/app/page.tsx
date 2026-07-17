import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Code2,
  Gauge,
  LayoutDashboard,
  Megaphone,
  MousePointer2,
  MoveUpRight,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

const services = [
  {
    number: "01",
    title: "Сайты",
    text: "Лендинги и корпоративные сайты, которые объясняют ценность и ведут к заявке.",
    tags: ["Структура", "Дизайн", "Разработка"],
    icon: Code2,
  },
  {
    number: "02",
    title: "Яндекс Директ",
    text: "Собираем спрос, запускаем кампании и показываем понятные результаты без лишних таблиц.",
    tags: ["Семантика", "Запуск", "Оптимизация"],
    icon: Megaphone,
  },
  {
    number: "03",
    title: "Сайт + реклама",
    text: "Единая система под ключ: от первого экрана до первой измеримой заявки.",
    tags: ["Под ключ", "Аналитика", "Поддержка"],
    icon: Zap,
  },
  {
    number: "04",
    title: "Развитие",
    text: "Доработки, Telegram-боты и ежемесячное сопровождение после запуска.",
    tags: ["Боты", "Автоматизация", "Рост"],
    icon: Sparkles,
  },
];

const process = [
  ["01", "АНАЛИЗИРУЕМ", "Погружаемся в бизнес, спрос и конкурентов."],
  ["02", "ПРОЕКТИРУЕМ", "Собираем структуру и маршрут клиента к заявке."],
  ["03", "ЗАПУСКАЕМ", "Разрабатываем сайт, рекламу и аналитику."],
  ["04", "УЛУЧШАЕМ", "Смотрим на цифры и развиваем результат."],
];

const faqs = [
  {
    question: "Сколько занимает запуск сайта?",
    answer:
      "Обычно лендинг занимает 7–14 рабочих дней, корпоративный сайт — от 3 недель. Точный срок фиксируем после короткого обсуждения задачи.",
  },
  {
    question: "Как я буду видеть ход работы?",
    answer:
      "После старта вы получите ID и код доступа. В кабинете видны прогресс, этапы, обновления, рекламные показатели и оплаты.",
  },
  {
    question: "Можно начать только с рекламы?",
    answer:
      "Да. Сайт, Яндекс Директ и сопровождение можно заказать отдельно или объединить в один проект.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-section">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span className="status-dot" /> Разработка и реклама для бизнеса
              </div>
              <h1>
                САЙТЫ,
                <br />
                КОТОРЫЕ ВЕДУТ
                <br />
                <span>К ЗАЯВКЕ.</span>
              </h1>
              <p className="hero-lead">
                Проектируем, запускаем и развиваем цифровые продукты. Весь ход
                работы — в прозрачном клиентском кабинете.
              </p>
              <div className="hero-buttons">
                <a
                  className="button button-primary button-large"
                  href={siteConfig.contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Обсудить проект <ArrowUpRight size={19} />
                </a>
                <Link className="button button-ghost button-large" href="/demo">
                  Смотреть демо <ArrowRight size={19} />
                </Link>
              </div>
              <div className="hero-trust">
                <div className="avatar-stack" aria-hidden="true">
                  <span>С</span><span>Р</span><span>Д</span>
                </div>
                <p><strong>Всё в одном месте</strong><br />сайт, реклама, этапы и оплаты</p>
              </div>
            </div>

            <div className="hero-visual" aria-label="Пример клиентского кабинета">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="floating-chip chip-one"><Gauge size={16} /> 68% готово</div>
              <div className="floating-chip chip-two"><Check size={16} /> 3 этапа завершено</div>
              <div className="dashboard-preview">
                <div className="preview-top">
                  <span className="preview-logo">C</span>
                  <div><span>COLDDEV / CD-0007</span><strong>Кабинет проекта</strong></div>
                  <span className="preview-menu">•••</span>
                </div>
                <div className="preview-hero">
                  <span className="pill pill-light">В работе</span>
                  <h3>Сайт для<br />студии Forma</h3>
                  <div className="preview-progress"><span style={{ width: "68%" }} /></div>
                  <div className="preview-progress-label"><span>Готовность</span><strong>68%</strong></div>
                </div>
                <div className="preview-stats">
                  <div><span>Дедлайн</span><strong>14 августа</strong></div>
                  <div><span>Следующий этап</span><strong>Адаптив</strong></div>
                </div>
                <div className="preview-task"><span><Check size={15} /></span><div><small>Последнее обновление</small><strong>Собрали главную страницу</strong></div></div>
              </div>
              <MousePointer2 className="preview-cursor" size={42} fill="white" />
            </div>
          </div>
          <div className="shell hero-bottomline">
            <span>СТРУКТУРА</span><span>ДИЗАЙН</span><span>РАЗРАБОТКА</span><span>РЕКЛАМА</span>
            <ArrowDownRight />
          </div>
        </section>

        <section className="section" id="process">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">Как работаем</span><h2>ПОНЯТНЫЙ ПРОЦЕСС.<br />ИЗМЕРИМЫЙ РЕЗУЛЬТАТ.</h2></div>
              <p>Не пропадаем после оплаты. Фиксируем этапы, сроки и показываем движение проекта в личном кабинете.</p>
            </div>
            <div className="process-grid">
              {process.map(([number, title, text]) => (
                <article className="process-card" key={number}>
                  <span className="process-number">{number}</span>
                  <MoveUpRight className="process-icon" />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Что делаем</span>
              <h2>СОБИРАЕМ СИСТЕМУ,<br />А НЕ ПРОСТО СТРАНИЦУ.</h2>
            </div>
            <div className="services-list">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-row" key={service.number}>
                    <span className="service-number">{service.number}</span>
                    <span className="service-icon"><Icon /></span>
                    <div className="service-copy"><h3>{service.title}</h3><p>{service.text}</p></div>
                    <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a href={siteConfig.contacts.telegramUrl} aria-label={`Обсудить: ${service.title}`} target="_blank" rel="noreferrer"><ArrowUpRight /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section portfolio-section" id="portfolio">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">Портфолио и кейсы</span><h2>РАБОТА, КОТОРУЮ<br />МОЖНО ПОКАЗАТЬ.</h2></div>
              <p>Раздел уже готов к управлению из админки. Проекты и показатели появятся здесь после публикации.</p>
            </div>
            <div className="portfolio-grid">
              <article className="portfolio-card portfolio-card-main">
                <div className="project-art project-art-one"><span className="art-label">МЕСТО ДЛЯ<br />ВАШЕГО КЕЙСА</span><span className="art-circle" /></div>
                <div className="portfolio-meta"><div><span>Сайты</span><h3>Корпоративные проекты</h3></div><ArrowUpRight /></div>
              </article>
              <article className="portfolio-card">
                <div className="project-art project-art-two"><BarChart3 size={88} /><span>+31%</span></div>
                <div className="portfolio-meta"><div><span>Реклама</span><h3>Показатели в цифрах</h3></div><ArrowUpRight /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section cabinet-section" id="cabinet">
          <div className="shell cabinet-grid">
            <div className="cabinet-copy">
              <span className="eyebrow eyebrow-invert">Клиентский кабинет</span>
              <h2>РАБОТА<br />БЕЗ ТУМАНА.</h2>
              <p>Один экран вместо десятков сообщений. Вы всегда знаете, что готово, что происходит сейчас и что будет дальше.</p>
              <ul>
                <li><Check /> Прогресс и этапы проекта</li>
                <li><Check /> Отчёты по Яндекс Директу</li>
                <li><Check /> Счета и история оплат</li>
                <li><Check /> Все важные ссылки и обновления</li>
              </ul>
              <Link className="button button-white button-large" href="/demo">Открыть демо-кабинет <ArrowRight /></Link>
            </div>
            <div className="cabinet-cards">
              <div className="mini-card mini-card-wide"><span>ГОТОВНОСТЬ ПРОЕКТА</span><strong>68%</strong><div className="mini-progress"><i /></div></div>
              <div className="mini-card"><LayoutDashboard /><span>Текущий этап</span><strong>Разработка</strong></div>
              <div className="mini-card"><CircleDollarSign /><span>Ближайший счёт</span><strong>600 BYN</strong></div>
              <div className="mini-card mini-card-update"><span className="pulse" /><div><span>Новое обновление</span><strong>Главная страница готова</strong></div></div>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-grid">
            <div className="section-heading"><span className="eyebrow">Коротко о главном</span><h2>ВОПРОСЫ<br />И ОТВЕТЫ.</h2></div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{item.question}</span><span className="faq-plus">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="shell">
            <div className="cta-card">
              <div className="cta-orbit" />
              <span className="eyebrow eyebrow-invert">Есть задача?</span>
              <h2>ДАВАЙТЕ СДЕЛАЕМ<br />ЕЁ ПОНЯТНО.</h2>
              <p>Напишите в Telegram — обсудим цель, сроки и предложим следующий шаг.</p>
              <a className="button button-white button-large" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer"><Send size={19} /> Написать @c0lddev</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
