import { ArrowUpRight, Phone, Send } from "lucide-react";
import { OrbitScene } from "@/components/OrbitScene";
import { siteConfig } from "@/config/site";

export function OrbitContact() {
  return (
    <section className="contact-orbit" id="contact" aria-labelledby="contact-title">
      <div className="contact-orbit-panel">
        <OrbitScene />
        <div className="orbit-contact-content">
          <h2 id="contact-title">Есть дело?<br />Давайте обсудим.</h2>
          <a className="orbit-contact-button" href={siteConfig.contacts.orderUrl} target="_blank" rel="noopener noreferrer">Написать Ярославу<ArrowUpRight size={22} aria-hidden="true" /></a>
          <div className="orbit-contact-details">
            <a href={`tel:${siteConfig.contacts.phone}`}><Phone size={18} aria-hidden="true" />{siteConfig.contacts.phoneDisplay}</a>
            <a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noopener noreferrer"><Send size={18} aria-hidden="true" />@{siteConfig.contacts.telegramUsername}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
