"use client";

import { ArrowLeft, ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { colddevApi } from "@/lib/api";

export default function LoginPage() {
  const [projectId, setProjectId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await colddevApi.login(projectId, accessCode);
      sessionStorage.setItem("colddev.clientSession", JSON.stringify(session));
      window.location.href = "/dashboard";
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось войти");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-side">
        <Logo />
        <Link className="auth-back" href="/">
          <ArrowLeft size={15} /> Вернуться на сайт
        </Link>
        <div className="auth-content">
          <span className="eyebrow"><LockKeyhole size={14} /> Кабинет клиента</span>
          <h1>ВАШ ПРОЕКТ.<br />ВСЕГДА РЯДОМ.</h1>
          <p>
            Введите данные, которые вы получили после старта работы. Один вход
            открывает все проекты вашей компании.
          </p>
          <form className="auth-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="project-id">ID проекта</label>
              <input
                id="project-id"
                autoComplete="username"
                placeholder="Например, CD-0007"
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="access-code">Код доступа</label>
              <input
                id="access-code"
                type="password"
                autoComplete="current-password"
                placeholder="••••-••••-••••"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                required
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="button button-primary button-large" disabled={loading}>
              {loading ? <LoaderCircle className="spin" size={19} /> : <>Войти в кабинет <ArrowRight size={19} /></>}
            </button>
          </form>
          {colddevApi.isDemoMode && (
            <div className="demo-access">
              <strong>Демонстрационный доступ</strong><br />
              ID: CD-0007 · Код: COLD-DEMO
            </div>
          )}
        </div>
      </section>
      <aside className="auth-visual">
        <div className="auth-quote">
          <span>COLDDEV / клиентская система</span>
          <blockquote>НИКАКИХ<br />«НУ ЧТО ТАМ?»</blockquote>
          <p>Прогресс, этапы, рекламные отчёты и оплаты собраны в одном месте.</p>
        </div>
      </aside>
    </main>
  );
}

