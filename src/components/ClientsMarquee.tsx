"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { projects } from "@/lib/cases";

export function ClientsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="client-marquee" role="region" aria-label="Компании, с которыми мы работали" data-paused={paused}>
      <div className="client-marquee-window">
        <div className="client-marquee-track">
          {[false, true].map((duplicate) => (
            <div className="client-marquee-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {projects.map((project) => (
                <a href={project.url} target="_blank" rel="noopener noreferrer" key={project.id} tabIndex={duplicate ? -1 : undefined}>
                  {project.title}<span aria-hidden="true">✳</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="marquee-toggle" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Продолжить движение ленты компаний" : "Приостановить ленту компаний"}>
        {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}
