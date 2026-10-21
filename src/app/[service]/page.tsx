import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { services, servicePath } from "@/lib/services";
import { breadcrumbs, pageMetadata, serviceStructuredData } from "@/lib/seo";
import styles from "./page.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((service) => ({ service: service.slug })); }
type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata(service.title, service.description, servicePath(service));
}

export default async function ServicePage({ params }: Props) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return <div className="site">
    <a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader />
    <main id="main-content" className={styles.main}>
      <StructuredData data={breadcrumbs(service.title, servicePath(service))} />
      <StructuredData data={serviceStructuredData(service)} />
      <div className="shell">
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">COLDDEV</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
        <section className={styles.hero} aria-labelledby="service-title">
          <p className={styles.eyebrow}>COLDDEV / направления</p><h1 id="service-title">{service.title}</h1><p className={styles.tagline}>{service.heading}</p>
          <p className={styles.intro}>{service.intro}</p>
          <a className="button" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer"><span>Обсудить задачу</span><span className="button-icon"><ArrowUpRight size={22} aria-hidden="true" /></span></a>
        </section>
        <section className={styles.audience} aria-labelledby="audience-title"><h2 id="audience-title">Когда это нужно</h2><p>{service.audience}</p></section>
        <section className={styles.block} aria-labelledby="includes-title"><h2 id="includes-title">Что можем сделать</h2><div className={styles.cards}>{service.includes.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
        <section className={styles.block} aria-labelledby="steps-title"><h2 id="steps-title">Как работаем</h2><ol className={styles.steps}>{service.steps.map((step, i) => <li key={step.title}><span aria-hidden="true">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
        <section className={styles.result} aria-labelledby="result-title"><div><h2 id="result-title">Что вы получаете</h2><p>{service.deliverable}</p></div><aside><p>{service.proof.text}</p><Link href={service.proof.href}>{service.proof.label}<ArrowUpRight size={22} aria-hidden="true" /></Link></aside></section>
        <section className={styles.block} aria-labelledby="questions-title"><h2 id="questions-title">Вопросы по направлению</h2><div className={styles.questions}>{service.questions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
        <section className={styles.related} aria-labelledby="related-title"><h2 id="related-title">Другие направления</h2><div>{services.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={servicePath(item)}>{item.title}<ArrowUpRight size={23} aria-hidden="true" /></Link>)}</div></section>
        <div className={styles.bottom}><Link href="/"><ArrowLeft size={19} aria-hidden="true" />На главную</Link><a className="button" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer"><span>Написать Ярославу</span><span className="button-icon"><ArrowUpRight size={22} aria-hidden="true" /></span></a></div>
      </div>
    </main><SiteFooter />
  </div>;
}
