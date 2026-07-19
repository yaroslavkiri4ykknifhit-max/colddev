import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Clock3,
  Eye,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  MousePointerClick,
  Send,
  ShieldCheck,
  Target,
  WalletCards,
} from "lucide-react";
import {
  SiGithubpages,
  SiGoogleanalytics,
  SiGooglesheets,
  SiNextdotjs,
  SiTelegram,
} from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CaseSection } from "@/components/CaseSection";
import { siteConfig } from "@/config/site";

const services = [
  {
    id: "01",
    icon: MousePointerClick,
    title: "Сайт, который объясняет и продаёт",
    text: "За несколько секунд человек понимает, что вы предлагаете, почему вам можно доверять и куда нажать, чтобы купить.",
    accent: "Понятный маршрут от первого экрана до заявки.",
  },
  {
    id: "02",
    icon: Target,
    title: "Яндекс Директ с понятной экономикой",
    text: "Собираем горячий спрос, разделяем кампании и показываем цифры человеческим языком.",
    accent: "В каждом отчёте видны расход, заявки и цена обращения.",
  },
  {
    id: "03",
    icon: LayoutDashboard,
    title: "Личный кабинет с полной картиной",
    text: "Этапы, сроки, обновления, реклама, счета и файлы собраны в одном месте.",
    accent: "Весь проект у вас перед глазами.",
  },
];

const process = [
  ["01", "Разбираемся в бизнесе", "Смотрим продукт, клиентов, конкурентов и считаем, что действительно нужно сделать."],
  ["02", "Собираем систему", "Структура, тексты, дизайн, разработка, аналитика и реклама работают на одну цель."],
  ["03", "Показываем каждый шаг", "После заказа выдаём доступ в кабинет. Там видны статус, сроки и результат."],
];

const cabinetItems = [
  ["Что делаем сейчас", "Текущий этап и комментарий простым языком", Eye],
  ["Когда будет готово", "Прогресс, завершённые шаги и плановая дата", Clock3],
  ["Что дала реклама", "Показы, клики, заявки, расходы и цена обращения", BarChart3],
  ["Что и когда оплачивать", "Счета, ЕРИП, чеки и понятные статусы платежей", WalletCards],
];

const platforms = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "GitHub Pages", icon: SiGithubpages },
  { name: "Google Sheets", icon: SiGooglesheets },
  { name: "Google Analytics", icon: SiGoogleanalytics },
  { name: "Telegram", icon: SiTelegram },
];

const faqs = [
  {
    question: "Кому доступен личный кабинет?",
    answer:
      "Кабинет получают клиенты COLDDEV после оформления заказа. Мы выдаём ID проекта и персональный код доступа — всё готово для входа.",
  },
  {
    question: "Сколько занимает запуск сайта?",
    answer:
      "Лендинг обычно занимает 7–14 рабочих дней, корпоративный сайт — от 3 недель. Срок фиксируем до начала работ, а прогресс показываем в кабинете.",
  },
  {
    question: "Можно заказать только рекламу?",
    answer:
      "Да. Можно заказать сайт, Яндекс Директ или связку под ключ. Перед стартом проверяем готовность площадки и согласуем план продвижения.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="new-landing">
        <section className="neo-hero">
          <div className="shell neo-hero-grid">
            <div className="neo-hero-copy">
              <span className="neo-kicker">
                <span /> Сайты и Яндекс Директ для бизнеса
              </span>
              <h1>
                ВЫ ВИДИТЕ
                <br />
                <em>ВСЁ.</em>
                <br />
                МЫ ДЕЛАЕМ ОСТАЛЬНОЕ.
              </h1>
              <p>
                Каждый этап, срок, счёт и результат — на одном экране. Мы
                проектируем сайты, запускаем рекламу и ведём работу до заявки.
              </p>
              <div className="neo-hero-actions">
                <div className="primary-cta-wrap">
                  <a
                    className="button button-primary button-large"
                    href={siteConfig.contacts.orderUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Получить расчёт <ArrowUpRight size={18} />
                  </a>
                  <small>Ответ в Telegram · план и ориентир по стоимости</small>
                </div>
                <div className="client-entry-wrap">
                  <Link className="button neo-login-button button-large" href="/login">
                    Уже клиент? Войти <ArrowRight size={18} />
                  </Link>
                  <small>Кабинет доступен после оформления заказа</small>
                </div>
              </div>
              <div className="neo-human-note">
                <span><Image src="/colddev-mark.png" width={56} height={56} alt="" /></span>
                <p><strong>Проект ведёт Ярослав лично.</strong> Один человек отвечает за задачу от первого сообщения до запуска.</p>
              </div>
            </div>

            <div className="neo-hero-scene" aria-label="Пример кабинета COLDDEV">
              <div className="liquid-orb orb-a" />
              <div className="liquid-orb orb-b" />
              <div className="glass-tile tile-progress">
                <span>Готовность проекта</span>
                <strong>68%</strong>
                <div><i /></div>
              </div>
              <div className="glass-tile tile-update">
                <span className="live-dot" />
                <div><small>Обновлено сегодня</small><strong>Главная страница готова</strong></div>
              </div>
              <div className="scene-dashboard">
                <div className="scene-dashboard-top">
                  <span className="scene-mark"><Image src="/colddev-mark.png" width={56} height={56} alt="" /></span>
                  <div><small>ПРОЕКТ CD-0007</small><strong>Сайт для Forma</strong></div>
                  <span className="scene-status">В работе</span>
                </div>
                <div className="scene-focus">
                  <span>Сейчас делаем</span>
                  <h3>Мобильную версию и финальную проверку</h3>
                  <p>Работа идёт по плану</p>
                </div>
                <div className="scene-row">
                  <div><small>Запуск</small><strong>14 августа</strong></div>
                  <div><small>Готово этапов</small><strong>3 из 6</strong></div>
                  <div><small>К оплате</small><strong>600 BYN</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div className="shell neo-control-bar">
            <div><Gauge /><span>ВИДНО</span><strong>что готово</strong></div>
            <div><Clock3 /><span>ПОНЯТНО</span><strong>когда запуск</strong></div>
            <div><ShieldCheck /><span>ПРОЗРАЧНО</span><strong>куда ушёл бюджет</strong></div>
            <Link href="/login">Войти в кабинет <ArrowUpRight /></Link>
          </div>
        </section>

        <section className="hard-line" aria-label="Главное преимущество COLDDEV">
          <div className="hard-line-track">
            <span>ВЫ ВИДИТЕ ВСЁ</span>
            <i>•</i>
            <span>НИКАКИХ НУ ЧТО ТАМ?</span>
            <i>•</i>
            <span>ВЫ ВИДИТЕ ВСЁ</span>
          </div>
        </section>

        <section className="neo-section neo-value-section" id="services">
          <div className="shell">
            <div className="neo-heading">
              <span className="neo-kicker">За что вы платите</span>
              <h2>
                ВЫ ВИДИТЕ ЦЕННОСТЬ.<br />
                <em>ПОНЯТНЫЙ ПУТЬ ДО ЗАЯВКИ.</em>
              </h2>
              <p>
                Каждый экран объясняет предложение, укрепляет доверие и ведёт
                человека к действию.
              </p>
            </div>
            <div className="neo-service-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="neo-service-card" key={service.id}>
                    <div className="neo-service-top">
                      <span>{service.id}</span>
                      <Icon />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <strong><Check /> {service.accent}</strong>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="platform-section">
          <div className="shell platform-inner">
            <div className="platform-copy">
              <span>Основа проекта</span>
              <strong>Сайт, кабинет, аналитика и реклама работают на проверенной инфраструктуре.</strong>
            </div>
            <div className="platform-logos">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return <div key={platform.name}><Icon /><span>{platform.name}</span></div>;
              })}
              <div className="yandex-logo"><b>Я</b><span>Яндекс Директ</span></div>
            </div>
          </div>
        </section>

        <section className="neo-section cabinet-showcase" id="cabinet">
          <div className="shell">
            <div className="cabinet-title-row">
              <div>
                <span className="neo-kicker neo-kicker-light">Личный кабинет COLDDEV</span>
                <h2>НИКАКИХ<br />«НУ ЧТО ТАМ?»</h2>
              </div>
              <div className="cabinet-access-note">
                <FileCheck2 />
                <p><strong>Только для клиентов</strong>Кабинет выдаётся после оформления заказа. Вход — по ID проекта и персональному коду.</p>
                <div className="cabinet-access-actions">
                  <Link href="/login">Перейти ко входу <ArrowRight /></Link>
                  <a href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Оформить заказ <ArrowUpRight /></a>
                </div>
              </div>
            </div>

            <div className="cabinet-showcase-grid">
              <div className="cabinet-screen">
                <div className="cabinet-screen-bar">
                  <span className="scene-mark"><Image src="/colddev-mark.png" width={56} height={56} alt="" /></span>
                  <div><small>ДОБРЫЙ ДЕНЬ, АЛЕКСЕЙ</small><strong>Ваш проект понятен с первого экрана</strong></div>
                  <span className="scene-status">В работе</span>
                </div>
                <div className="cabinet-screen-main">
                  <div className="cabinet-now">
                    <span>ЧТО ПРОИСХОДИТ СЕЙЧАС</span>
                    <h3>Собираем мобильную версию сайта</h3>
                    <p><Check /> Работа идёт по плану</p>
                  </div>
                  <div className="cabinet-big-progress">
                    <strong>68%</strong>
                    <span>готово</span>
                    <div><i /></div>
                  </div>
                </div>
                <div className="cabinet-screen-stats">
                  <div><span>Плановый запуск</span><strong>14 августа</strong></div>
                  <div><span>Следующий шаг</span><strong>Подключение домена</strong></div>
                  <div><span>Последнее обновление</span><strong>Сегодня, 16:40</strong></div>
                </div>
              </div>
              <div className="cabinet-feature-list">
                {cabinetItems.map(([title, text, Icon]) => (
                  <article key={String(title)}>
                    <span><Icon /></span>
                    <div><h3>{String(title)}</h3><p>{String(text)}</p></div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="neo-section" id="process">
          <div className="shell">
            <div className="neo-heading neo-heading-compact">
              <span className="neo-kicker">Как проходит работа</span>
              <h2>ВЫ ВИДИТЕ<br />КАЖДЫЙ ШАГ.</h2>
              <p>Вам всегда понятны три вещи: что делаем, когда закончим и какой результат получили.</p>
            </div>
            <div className="neo-process-list">
              {process.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ArrowUpRight />
                </article>
              ))}
            </div>
          </div>
        </section>

        <CaseSection />

        <section className="neo-section neo-faq-section">
          <div className="shell neo-faq-grid">
            <div className="neo-heading">
              <span className="neo-kicker">Вопросы до заказа</span>
              <h2>КОРОТКО.<br />ПОНЯТНЫМ ЯЗЫКОМ.</h2>
            </div>
            <div className="faq-list neo-faq-list">
              {faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{item.question}</span><span className="faq-plus">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="neo-section neo-final">
          <div className="shell">
            <div className="neo-final-card">
              <div className="liquid-ring" />
              <div className="final-brand-mark" aria-hidden="true"><Image src="/colddev-mark.png" width={420} height={420} alt="" /></div>
              <span className="neo-kicker neo-kicker-light">Обсудим следующий шаг</span>
              <h2>ВАШ БИЗНЕС РАСТЁТ.<br />САЙТ И РЕКЛАМА<br />РАБОТАЮТ НА РЕЗУЛЬТАТ.</h2>
              <p>Напишите, чем занимается ваш бизнес. В ответ получите понятный следующий шаг и ориентир по стоимости.</p>
              <a className="button button-white button-large" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer"><Send /> Написать @c0lddev</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
