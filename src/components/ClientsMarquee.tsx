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
                  {project.title}<svg className="client-marquee-mark" width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false"><path d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M5.4 26.6 26.6 5.4" stroke="currentColor" strokeWidth="2.5" /></svg>
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
