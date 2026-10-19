import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/cases";
export function CaseSection({ archive = false }: { archive?: boolean }) {
  return <section className={`portfolio section${archive ? " portfolio-archive" : ""}`} id="portfolio" aria-labelledby="portfolio-title"><div className="shell">
    <div className="portfolio-heading">{archive ? <h1 id="portfolio-title">Работы говорят<br /><em>за нас.</em></h1> : <h2 id="portfolio-title">Нам доверяют<br /><em>свой бизнес.</em></h2>}</div>
    <div className="project-grid">{projects.map((project) => <article className={`project-card project-${project.theme}`} key={project.id}>
      <a className="project-visual" href={project.url} target="_blank" rel="noreferrer" aria-label={`Открыть сайт ${project.title} — в новой вкладке`}><div className="project-preview"><div className="preview-bar"><span className="window-dots"><i /><i /><i /></span><span>{project.domain}</span><ArrowUpRight size={12} /></div><div className={`project-cover cover-${project.theme}`}><Image src={project.cover} alt={project.theme === "floor" ? "Главная страница сайта Крепкий пол" : `Визуал проекта ${project.title}`} width={1280} height={860} sizes="(max-width: 700px) 92vw, 45vw" />{project.theme !== "floor" && <div className="cover-type"><span>{project.domain}</span><strong>{project.theme === "nwo" ? <>New<br />Way Out<span>Обучение продажам.</span></> : project.theme === "simon" ? <>PROD<span>SIMON / Образование</span></> : project.theme === "bakatkin" ? <>BAKATKIN<br />PROD<span>Digital для fashion-брендов</span></> : project.theme === "climate" ? <>Климат<br />Минск<span>Комфорт начинается дома.</span></> : <>АксХоум<span>Мебель для вашей жизни.</span></>}</strong></div>}</div></div><span className="project-open"><ArrowUpRight size={26} /></span><span className="project-label">{project.label}</span></a>
      <div className="project-caption"><div><h3><a href={project.url} target="_blank" rel="noreferrer">{project.title}</a></h3><p>{project.description}</p></div></div>
    </article>)}</div>
  </div></section>;
}
