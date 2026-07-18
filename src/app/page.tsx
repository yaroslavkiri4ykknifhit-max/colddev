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
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

const services = [
  {
    id: "01",
    icon: MousePointerClick,
    title: "Сайт, который объясняет и продаёт",
    text: "За несколько секунд человек понимает, что вы предлагаете, почему вам можно доверять и куда нажать, чтобы купить.",
    accent: "Не «визитка». Рабочий инструмент продаж.",
  },
  {
    id: "02",
    icon: Target,
    title: "Яндекс Директ без слива бюджета",
    text: "Собираем горячий спрос, разделяем кампании и показываем цифры человеческим языком — без рекламной магии.",
    accent: "Вы видите расход, заявки и цену результата.",
  },
  {
    id: "03",
    icon: LayoutDashboard,
    title: "Вся работа — в личном кабинете",
    text: "Этапы, сроки, обновления, реклама, счета и файлы собраны в одном месте. Не нужно искать важное по перепискам.",
    accent: "Никаких «ну что там?». Ответ уже на экране.",
  },
];

const process = [
  ["01", "Разбираемся в бизнесе", "Смотрим продукт, клиентов, конкурентов и считаем, что действительно нужно сделать."],
  ["02", "Собираем систему", "Структура, тексты, дизайн, разработка, аналитика и реклама работают на одну цель."],
  ["03", "Показываем каждый шаг", "После заказа выдаём доступ в кабинет. Там всегда видны статус, сроки и результат."],
];

const cabinetItems = [
  ["Что делаем сейчас", "Текущий этап и комментарий без технического языка", Eye],
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
      "Кабинет получают клиенты COLDDEV после оформления заказа. Мы выдаём ID проекта и персональный код доступа — регистрироваться самостоятельно не нужно.",
  },
  {
    question: "Сколько занимает запуск сайта?",
    answer:
      "Лендинг обычно занимает 7–14 рабочих дней, корпоративный сайт — от 3 недель. Срок фиксируем до начала работ, а прогресс показываем в кабинете.",
  },
  {
    question: "Можно заказать только рекламу?",
    answer:
      "Да. Можно заказать сайт, Яндекс Директ или связку под ключ. Если текущий сайт не готов к рекламе, скажем об этом до запуска бюджета.",
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
                САЙТ ДОЛЖЕН
                <br />
                <em>ПРИВОДИТЬ</em>
                <br />
                КЛИЕНТОВ. ТОЧКА.
              </h1>
              <p>
                Вы платите не за кнопки и анимацию. Вы получаете понятную
                систему: человек увидел рекламу, понял предложение и оставил
                заявку.
              </p>
              <div className="neo-hero-actions">
                <a
                  className="button button-primary button-large"
                  href={siteConfig.contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Получить расчёт <ArrowUpRight size={18} />
                </a>
                <div className="client-entry-wrap">
                  <Link className="button neo-login-button button-large" href="/login">
                    Уже клиент? Войти <ArrowRight size={18} />
                  </Link>
                  <small>Кабинет доступен после оформления заказа</small>
                </div>
              </div>
              <div className="neo-human-note">
                <span>Я</span>
                <p><strong>Проект ведёт Ярослав лично.</strong> Без менеджеров, пересказов и передачи задачи по цепочке.</p>
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
                  <span className="scene-mark">C/</span>
                  <div><small>ПРОЕКТ CD-0007</small><strong>Сайт для Forma</strong></div>
                  <span className="scene-status">В работе</span>
                </div>
                <div className="scene-focus">
                  <span>Сейчас делаем</span>
                  <h3>Мобильную версию и финальную проверку</h3>
                  <p>От клиента ничего не требуется</p>
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
            <Link href="/demo">Посмотреть кабинет <ArrowUpRight /></Link>
          </div>
        </section>

        <section className="hard-line" aria-label="Главное преимущество COLDDEV">
          <div className="hard-line-track">
            <span>НИКАКИХ «НУ ЧТО ТАМ?»</span>
            <i>•</i>
            <span>ВЕСЬ ПРОЕКТ У ВАС ПЕРЕД ГЛАЗАМИ</span>
            <i>•</i>
            <span>НИКАКИХ «НУ ЧТО ТАМ?»</span>
          </div>
        </section>

        <section className="neo-section neo-value-section" id="services">
          <div className="shell">
            <div className="neo-heading">
              <span className="neo-kicker">За что вы платите</span>
              <h2>
                НЕ ЗА «КРАСИВО».<br />
                <em>ЗА ПОНЯТНЫЙ ПУТЬ ДО ЗАЯВКИ.</em>
              </h2>
              <p>
                Убираем всё, что мешает человеку принять решение. Оставляем
                смысл, доверие и действие.
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
              <span>Работаем на нормальной инфраструктуре</span>
              <strong>Без платного сервера на старте. Без привязки к конструктору.</strong>
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
                <Link href="/login">Перейти ко входу <ArrowRight /></Link>
              </div>
            </div>

            <div className="cabinet-showcase-grid">
              <div className="cabinet-screen">
                <div className="cabinet-screen-bar">
                  <span className="scene-mark">C/</span>
                  <div><small>ДОБРЫЙ ДЕНЬ, АЛЕКСЕЙ</small><strong>Ваш проект понятен с первого экрана</strong></div>
                  <span className="scene-status">В работе</span>
                </div>
                <div className="cabinet-screen-main">
                  <div className="cabinet-now">
                    <span>ЧТО ПРОИСХОДИТ СЕЙЧАС</span>
                    <h3>Собираем мобильную версию сайта</h3>
                    <p><Check /> От вас ничего не требуется</p>
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

            <div className="cabinet-demo-row">
              <p>Хотите увидеть кабинет глазами клиента?</p>
              <Link className="button button-white button-large" href="/demo">
                Открыть демо <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section>

        <section className="neo-section" id="process">
          <div className="shell">
            <div className="neo-heading neo-heading-compact">
              <span className="neo-kicker">Как проходит работа</span>
              <h2>ВЫ НЕ ДОЛЖНЫ<br />РАЗБИРАТЬСЯ В РАЗРАБОТКЕ.</h2>
              <p>Вам нужно понимать только три вещи: что делаем, когда закончим и какой результат получили.</p>
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

        <section className="neo-section cases-section" id="portfolio">
          <div className="shell">
            <div className="neo-heading cases-heading">
              <span className="neo-kicker">Кейсы и примеры</span>
              <h2>НЕ ОБЕЩАНИЯ.<br /><em>ПОКАЗЫВАЕМ РАБОТУ.</em></h2>
              <p>Здесь будут ваши реальные проекты из админки. Ни одного придуманного логотипа или чужой цифры.</p>
            </div>
            <div className="neo-cases-grid">
              <article className="neo-case neo-case-main">
                <div className="case-visual case-visual-site">
                  <span>САЙТ</span>
                  <div className="case-browser">
                    <div><i /><i /><i /></div>
                    <strong>ВАШ<br />ПРОЕКТ</strong>
                    <span>Место для первого реального кейса</span>
                  </div>
                </div>
                <div className="case-meta"><div><span>Кейс №01</span><h3>Сайт, который можно показать клиенту</h3></div><ArrowUpRight /></div>
              </article>
              <article className="neo-case">
                <div className="case-visual case-visual-ads">
                  <div className="case-chart"><i /><i /><i /><i /><i /></div>
                  <strong>РЕАЛЬНЫЕ<br />ЦИФРЫ</strong>
                  <span>Показы · клики · заявки · стоимость</span>
                </div>
                <div className="case-meta"><div><span>Кейс №02</span><h3>Результат рекламы без красивых сказок</h3></div><ArrowUpRight /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="neo-section neo-faq-section">
          <div className="shell neo-faq-grid">
            <div className="neo-heading">
              <span className="neo-kicker">Вопросы до заказа</span>
              <h2>КОРОТКО.<br />БЕЗ МЕЛКОГО ШРИФТА.</h2>
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
              <span className="neo-kicker neo-kicker-light">Давайте без долгих созвонов</span>
              <h2>ПОКА ВЫ ДУМАЕТЕ,<br />КЛИЕНТ УХОДИТ К ТОМУ,<br />У КОГО УЖЕ ПОНЯТНО.</h2>
              <p>Напишите, чем занимается ваш бизнес. В ответ получите понятный следующий шаг и ориентир по стоимости.</p>
              <a className="button button-white button-large" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer"><Send /> Написать @c0lddev</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
