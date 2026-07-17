# COLDDEV

Клиентская система студии: публичный сайт, кабинет проекта и админка для управления клиентами, сайтами, рекламой, оплатами и дополнительными услугами.

## Что уже есть в MVP

- новый русскоязычный лендинг в стиле референса: белый фон, насыщенный синий, крупная типографика и карточки;
- `/login` — вход по ID проекта и коду доступа;
- `/dashboard` — несколько проектов клиента, прогресс, этапы, лента обновлений, сайт, реклама, счета, ЕРИП и предложения;
- `/demo` — демонстрационный кабинет для презентации клиенту;
- `/admin` — Google-вход и разделы клиентов, проектов, этапов, обновлений, рекламы, счетов, услуг, портфолио и кейсов;
- загрузка чека JPG/PNG/WEBP/PDF до 10 МБ;
- Apps Script backend в `apps-script/` для Google Sheets + Google Drive;
- статический экспорт для GitHub Pages с сохранением `public/CNAME` и существующего workflow.

До подключения Apps Script интерфейс работает на безопасных демонстрационных данных. Это позволяет проверить UX локально, не публикуя секреты и ID таблицы.

## Запуск

```bash
npm install
npm run dev
```

Production-проверка:

```bash
npm run lint
npm run build
```

Демонстрационный вход: `CD-0007` / `COLD-DEMO`.

## Подключение реального backend

Пошаговая инструкция находится в [`apps-script/README.md`](apps-script/README.md). После публикации Apps Script добавьте в GitHub Repository Variables:

- `NEXT_PUBLIC_APPS_SCRIPT_URL` — URL веб-приложения Apps Script;
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` — OAuth Web Client ID для Google Identity Services.

Workflow подставляет эти переменные в production-сборку автоматически. Если переменные не заданы, сайт остаётся в demo-режиме.

## Структура

```text
src/app/                 страницы Next.js (/, /login, /dashboard, /admin)
src/components/          общие UI-компоненты
src/data/mock-data.ts    демонстрационные данные
src/lib/api.ts           API-клиент и валидация чеков
src/types/               общие типы frontend/backend-контракта
apps-script/             Google Apps Script API и схема листов
```
