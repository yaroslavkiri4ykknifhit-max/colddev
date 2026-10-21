import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, servicePath } from "@/lib/services";
import styles from "./ServiceDirections.module.css";

export function ServiceDirections() {
  return <section className={`services section ${styles.section}`} id="services" aria-labelledby="services-title"><div className="shell">
    <h2 id="services-title">Направления</h2>
    <div className={styles.grid}>{services.map((service, index) => <Link className={styles.card} href={servicePath(service)} key={service.slug}>
      <span className={styles.number} aria-hidden="true">0{index + 1}</span>
      <h3>{service.title}</h3><p>{service.shortDescription}</p>
      <span className={styles.link}>Подробнее о направлении <ArrowUpRight size={23} aria-hidden="true" /></span>
    </Link>)}</div>
  </div></section>;
}
