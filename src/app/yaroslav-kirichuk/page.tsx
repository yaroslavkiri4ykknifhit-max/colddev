import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { breadcrumbs, pageMetadata, profileStructuredData } from "@/lib/seo";
import { services, servicePath } from "@/lib/services";
import styles from "./page.module.css";

const title = "Ярослав Киричук — предприниматель и основатель COLDDEV";
const baseMetadata = pageMetadata("Ярослав Киричук — предприниматель", siteConfig.founder.description, siteConfig.founder.path);
export const metadata: Metadata = {
  ...baseMetadata, title: { absolute: title },
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function FounderPage() {
  return <div className="site"><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader />
    <main id="main-content" className={styles.main}>
      <StructuredData data={profileStructuredData} /><StructuredData data={breadcrumbs(siteConfig.founder.name, siteConfig.founder.path)} />
      <div className="shell">
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">COLDDEV</Link><span aria-hidden="true">/</span><span aria-current="page">{siteConfig.founder.name}</span></nav>
        <section className={styles.hero} aria-labelledby="profile-title"><p className={styles.label}>Основатель студии</p><h1 id="profile-title">Ярослав<br /><em>Киричук.</em></h1><p className={styles.role}>Предприниматель и основатель COLDDEV.</p><p className={styles.intro}>Развиваю собственную студию веб-разработки и продвижения бизнеса. Создаю сайты, запускаю контекстную рекламу и автоматизирую процессы, чтобы бизнесу было проще привлекать клиентов и работать с обращениями.</p><div className={styles.links}><a className="button" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer"><span>Написать Ярославу</span><span className="button-icon"><ArrowUpRight size={22} aria-hidden="true" /></span></a><Link href="/cases/">Посмотреть работы<ArrowUpRight size={22} aria-hidden="true" /></Link></div></section>
        <section className={styles.studio} aria-labelledby="studio-title"><div><p className={styles.label}>Собственная студия</p><h2 id="studio-title">COLDDEV</h2></div><div><p>COLDDEV — моя студия веб-разработки. Работаем с предпринимателями и компаниями: от сайта для одной услуги до интернет-магазина, рекламной кампании и интеграции рабочих сервисов.</p><p>Нахожусь в Минске, Беларусь. Проекты ведём онлайн. Задачи, состав работы и этапы обсуждаем напрямую со мной.</p></div></section>
        <section className={styles.block} aria-labelledby="directions-title"><h2 id="directions-title">Чем занимаюсь</h2><div className={styles.directions}>{services.map((service) => <Link href={servicePath(service)} key={service.slug}><h3>{service.title}</h3><p>{service.shortDescription}</p><span>Подробнее<ArrowUpRight size={22} aria-hidden="true" /></span></Link>)}</div></section>
        <section className={styles.block} aria-labelledby="experience-title"><h2 id="experience-title">Опыт и квалификация</h2><div className={styles.experience}><div><strong>{siteConfig.experience.years}</strong><p>года опыта</p></div><div><strong>{siteConfig.experience.projects}</strong><p>успешных проекта</p></div><a href="https://skillshop.credential.net/6c2111d9-d037-44cd-8c4a-0b58b9592165" target="_blank" rel="noreferrer"><BadgeCheck size={35} aria-hidden="true" /><strong>Google Ads Search</strong><span>Сертификат Ярослава Киричука<ArrowUpRight size={19} aria-hidden="true" /></span></a></div></section>
        <section className={styles.contact} aria-labelledby="contact-title"><h2 id="contact-title">Связаться напрямую</h2><p>{siteConfig.founder.fullName} · Минск, Беларусь.</p><div><a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer">Telegram @{siteConfig.contacts.telegramUsername}<ArrowUpRight size={22} aria-hidden="true" /></a><a href={`tel:${siteConfig.contacts.phone}`}>{siteConfig.contacts.phoneDisplay}</a></div></section>
      </div>
    </main><SiteFooter />
  </div>;
}
