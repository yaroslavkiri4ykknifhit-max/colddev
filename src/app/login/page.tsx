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
          <span className="eyebrow"><LockKeyhole size={14} /> Вход для действующих клиентов</span>
          <h1>ВАШ ЗАКАЗ.<br />ВСЁ ПОД КОНТРОЛЕМ.</h1>
          <p>
            Кабинет доступен тем, кто уже оформил заказ в COLDDEV. Введите ID
            проекта и персональный код, которые мы прислали после старта работ.
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
        </div>
      </section>
      <aside className="auth-visual">
        <div className="auth-quote">
          <span>COLDDEV / ваш проект в ясной картине</span>
          <blockquote>ВЫ ВИДИТЕ<br />ВСЁ.</blockquote>
          <p>Сразу видно, что готово, что делаем сейчас, когда запуск и какие счета нужно оплатить.</p>
        </div>
      </aside>
    </main>
  );
}
