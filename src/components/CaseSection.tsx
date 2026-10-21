import { ArrowUpRight, BatteryFull, Signal, Wifi } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/cases";
import styles from "./CaseSection.module.css";
export function CaseSection({ archive = false }: { archive?: boolean }) {
  return <section className={`portfolio section${archive ? " portfolio-archive" : ""}`} id="portfolio" aria-labelledby="portfolio-title"><div className="shell">
    <div className="portfolio-heading">{archive ? <h1 id="portfolio-title">Работы говорят<br /><em>за нас.</em></h1> : <h2 id="portfolio-title">Нам доверяют<br /><em>свой бизнес.</em></h2>}</div>
    <div className={styles.grid}>{projects.map((project) => <article className={`${styles.card} ${styles[project.theme]}`} key={project.id} data-project={project.id}>
      <a className={styles.visual} href={project.url} target="_blank" rel="noreferrer" aria-label={`Открыть сайт ${project.title} — в новой вкладке`}>
        <span className={styles.label}>{project.label}</span>
        <div className={styles.desktop}>
          <div className={styles.browserBar} aria-hidden="true"><span className={styles.dots}><i /><i /><i /></span><span className={styles.address}>{project.domain}</span><ArrowUpRight /></div>
          <div className={`${styles.desktopScreen}${project.mobile ? "" : ` ${styles.originalCover}`}`}>
            <Image src={project.cover} alt={project.mobile ? `Сайт ${project.title} на компьютере` : `Обложка проекта ${project.title}`} width={1348} height={936} sizes="(max-width: 700px) 78vw, 38vw" />
            {!project.mobile && <strong className={styles.originalTitle}>PROD<span>SIMON</span></strong>}
          </div>
        </div>
        {project.mobile && <div className={styles.phone}>
          <span className={styles.phoneMute} aria-hidden="true" /><span className={styles.phoneVolume} aria-hidden="true" /><span className={styles.phonePower} aria-hidden="true" />
          <div className={styles.phoneScreen}>
            <div className={styles.phoneStatus} aria-hidden="true"><span>9:41</span><span className={styles.phoneIcons}><Signal /><Wifi /><BatteryFull /></span></div>
            <div className={styles.phoneViewport}><Image src={project.mobile} alt={`Мобильная версия сайта ${project.title} в макете iPhone`} width={390} height={project.mobileHeight ?? 844} sizes="(max-width: 700px) 27vw, 14vw" /></div>
            <span className={styles.phoneIsland} aria-hidden="true" /><span className={styles.phoneHome} aria-hidden="true" />
          </div>
        </div>}
        <span className={styles.open} aria-hidden="true"><ArrowUpRight /></span>
      </a>
      <div className={styles.caption}><h3><a href={project.url} target="_blank" rel="noreferrer">{project.title}</a></h3><p>{project.description}</p></div>
    </article>)}</div>
  </div></section>;
}
