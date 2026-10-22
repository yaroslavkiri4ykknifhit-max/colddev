import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./FounderSection.module.css";

export function FounderSection() {
  return <section className={styles.section} id="founder" aria-labelledby="founder-title"><div className={`shell ${styles.inner}`}>
    <div className={styles.monogram} aria-hidden="true">ЯК<span>colddev.</span></div>
    <div className={styles.copy}><p className={styles.role}>{siteConfig.founder.role}</p><h2 id="founder-title">{siteConfig.founder.name}</h2><p>Развиваю собственную студию веб-разработки. Вместе с COLDDEV создаю сайты, запускаю рекламу и автоматизирую процессы бизнеса.</p><Link href={siteConfig.founder.path}>Об основателе <ArrowUpRight size={22} aria-hidden="true" /></Link></div>
  </div></section>;
}
