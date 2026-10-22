import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { advertisingCases, advertisingCasesSource } from "@/lib/advertising-cases";
import styles from "./AdvertisingCaseSection.module.css";

export function AdvertisingCaseSection() {
  return (
    <section className={`section ${styles.section}`} id="advertising-cases" aria-labelledby="advertising-cases-title">
      <div className="shell">
        <div className={styles.heading}>
          <h2 id="advertising-cases-title">Кейсы<br /><em>по рекламе.</em></h2>
          <p>Google Ads <span aria-hidden="true">/</span> 4 проекта</p>
        </div>
        <div className={styles.grid}>
          {advertisingCases.map((item, index) => (
            <article className={styles.card} key={item.id} data-advertising-case={item.id} aria-labelledby={`ad-case-${item.id}`}>
              <div className={styles.cardTop}><span>Google Ads</span><span className={styles.index} aria-hidden="true">0{index + 1}</span></div>
              <h3 id={`ad-case-${item.id}`}>{item.title}</h3>
              <p className={styles.period}>{item.period ?? "Результаты кампании"}</p>
              <dl className={styles.highlights}>
                {item.highlights.map((metric) => (
                  <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                ))}
              </dl>
              <p className={styles.takeaway}>{item.takeaway}</p>
              <details className={styles.details}>
                <summary><span className={styles.closedLabel}>Смотреть разбор</span><span className={styles.openLabel}>Свернуть разбор</span><Plus aria-hidden="true" size={22} /></summary>
                <div className={styles.breakdown}>
                  {item.context && <div className={styles.textBlock}><h4>До запуска</h4><p>{item.context}</p></div>}
                  {item.goal && <div className={styles.textBlock}><h4>Задача</h4><p>{item.goal}</p></div>}
                  <div className={styles.textBlock}><h4>Что сделали</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
                  {item.keywords && <div className={styles.textBlock}><h4>Примеры запросов</h4><div className={styles.keywords}>{item.keywords.map((group) => <p key={group.title}><strong>{group.title}</strong>{group.examples}</p>)}</div></div>}
                  <div className={styles.textBlock}>
                    <h4>Результаты{item.period ? ` ${item.period.toLowerCase()}` : ""}</h4>
                    <dl className={styles.metrics}>{item.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
                  </div>
                  <div className={styles.gallery}>{item.images.map((screenshot) => {
                    const width = screenshot.width ?? 1363;
                    const height = screenshot.height ?? 936;
                    const crop = screenshot.crop ?? { x: 0, y: 0, width, height };
                    return (
                    <figure key={screenshot.src}>
                      <a className={styles.screenshot} style={{ aspectRatio: `${crop.width} / ${crop.height}` }} href={screenshot.src} target="_blank" rel="noreferrer" aria-label={`${screenshot.caption} — открыть в полном размере`}>
                        <Image src={screenshot.src} alt={screenshot.alt} width={width} height={height} sizes="(max-width: 700px) 90vw, 45vw" style={{ width: `${width / crop.width * 100}%`, transform: `translate(${-crop.x / width * 100}%, ${-crop.y / height * 100}%)` }} />
                      </a>
                      <figcaption>{screenshot.caption}<ArrowUpRight size={17} aria-hidden="true" /></figcaption>
                    </figure>
                  ); })}</div>
                </div>
              </details>
            </article>
          ))}
        </div>
        <div className={styles.footer}>
          <a className={styles.contact} href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Обсудить рекламу <ArrowUpRight size={22} aria-hidden="true" /></a>
          <a className={styles.source} href={advertisingCasesSource} target="_blank" rel="noreferrer">Оригинал разборов в Notion <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
