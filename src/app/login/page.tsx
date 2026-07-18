"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { colddevApi } from "@/lib/api";

export default function LoginPage() {
  const [projectId, setProjectId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

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

  const formatProjectId = (value: string) => value.toUpperCase().replace(/\s+/g, "").slice(0, 16);
  const formatAccessCode = (value: string) => {
    const characters = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
    return characters.match(/.{1,4}/g)?.join("-") ?? "";
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
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="Например, CD-0007"
                value={projectId}
                onChange={(event) => setProjectId(formatProjectId(event.target.value))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="access-code">Код доступа</label>
              <div className="password-input-wrap">
                <input
                  id="access-code"
                  type={showCode ? "text" : "password"}
                  autoComplete="current-password"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="••••-••••-••••"
                  value={accessCode}
                  onChange={(event) => setAccessCode(formatAccessCode(event.target.value))}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showCode ? "Скрыть код" : "Показать код"}
                  onClick={() => setShowCode((value) => !value)}
                >
                  {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <div className="auth-error" role="alert">{error}</div>}
            <button className="button button-primary button-large" disabled={loading}>
              {loading ? <LoaderCircle className="spin" size={19} /> : <>Войти в кабинет <ArrowRight size={19} /></>}
            </button>
          </form>
          <div className="auth-order-section">
            <span>Ещё нет проекта в COLDDEV?</span>
            <a className="auth-order-card" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">
              <span className="auth-order-icon"><Rocket size={21} /></span>
              <span className="auth-order-copy">
                <strong>Оформить заказ</strong>
                <small>Расскажите о задаче — получите следующий шаг и ориентир по стоимости</small>
              </span>
              <ArrowUpRight className="auth-order-arrow" size={20} />
            </a>
            <a className="auth-support-link" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer">
              Нужны данные для входа? Написать Ярославу <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
      <aside className="auth-visual">
        <div className="auth-visual-logo" aria-hidden="true">
          <Image src="/colddev-mark.png" width={900} height={900} alt="" priority />
        </div>
        <div className="auth-quote">
          <span>COLDDEV / ваш проект в ясной картине</span>
          <blockquote>ВЫ ВИДИТЕ<br />ВСЁ.</blockquote>
          <p>Сразу видно, что готово, что делаем сейчас, когда запуск и какие счета нужно оплатить.</p>
        </div>
      </aside>
    </main>
  );
}
