"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { projects, type ProjectCategory } from "@/lib/cases";
const filters: ("Все работы" | ProjectCategory)[] = ["Все работы", "Услуги", "Магазины", "Бренды"];
export function CaseSection({ archive = false }: { archive?: boolean }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Все работы");
  const visible = filter === "Все работы" ? projects : projects.filter((project) => project.category === filter);
  return <section className={`portfolio section${archive ? " portfolio-archive" : ""}`} id="portfolio" aria-labelledby="portfolio-title"><div className="shell">
    <div className="section-caption"><span><i /> 01 / Нам доверяют</span><span>Смотрите, что получилось</span></div>
    <div className="portfolio-heading">{archive ? <h1 id="portfolio-title">Работы говорят<br /><em>за нас.</em></h1> : <h2 id="portfolio-title">Нам доверяют<br /><em>свой бизнес.</em></h2>}<div className="project-count"><span>06<span>↗</span></span><p>проектов в портфолио.<br />Каждый можно открыть.</p></div></div>
    <div className="portfolio-filters" role="group" aria-label="Фильтр проектов по направлению">{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}<sup>{String(item === "Все работы" ? projects.length : projects.filter((p) => p.category === item).length).padStart(2, "0")}</sup></button>)}</div>
    <p className="sr-only" aria-live="polite">Показано проектов: {visible.length}</p>
    <div className="project-grid">{visible.map((project) => <article className={`project-card project-${project.theme}`} key={project.id}>
      <a className="project-visual" href={project.url} target="_blank" rel="noreferrer" aria-label={`Открыть сайт ${project.title} — в новой вкладке`}><div className="project-preview"><div className="preview-bar"><span className="window-dots"><i /><i /><i /></span><span>{project.domain}</span><ArrowUpRight size={12} /></div><div className={`project-cover cover-${project.theme}`}><Image src={project.cover} alt={project.theme === "floor" ? "Главная страница сайта Крепкий пол" : `Визуал проекта ${project.title}`} width={1280} height={860} sizes="(max-width: 700px) 92vw, 45vw" />{project.theme !== "floor" && <div className="cover-type"><span>{project.domain}</span><strong>{project.theme === "nwo" ? <>New<br />Way Out<span>Обучение продажам.</span></> : project.theme === "simon" ? <>PROD<span>SIMON / Образование</span></> : project.theme === "bakatkin" ? <>BAKATKIN<br />PROD<span>Digital для fashion-брендов</span></> : project.theme === "climate" ? <>Климат<br />Минск<span>Комфорт начинается дома.</span></> : <>АксХоум<span>Мебель для вашей жизни.</span></>}</strong></div>}</div></div><span className="project-open"><ArrowUpRight size={26} /></span><span className="project-label">{project.label}</span></a>
      <div className="project-caption"><div><h3><a href={project.url} target="_blank" rel="noreferrer">{project.title}</a></h3><p>{project.description}</p></div><span>{project.category}</span></div>
    </article>)}</div><p className="portfolio-note"><span className="status-dot" /> Реальные проекты. Прямые ссылки. Можно посмотреть в деле.</p>
  </div></section>;
}
