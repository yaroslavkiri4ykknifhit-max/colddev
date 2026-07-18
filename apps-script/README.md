# COLDDEV API — Google Apps Script

Эта папка содержит backend MVP для Google Sheets и Google Drive. После публикации скрипт подключается к сайту через `NEXT_PUBLIC_APPS_SCRIPT_URL`.

## Подключение

1. Создайте пустую Google Таблицу под COLDDEV.
2. Откройте `Расширения → Apps Script` и замените содержимое редактора файла `Code.gs` кодом из этой папки.
3. В `Настройки проекта → Файлы` добавьте `appsscript.json` или перенесите его параметры вручную.
4. Запустите функцию `setupColddev` и подтвердите доступы к Sheets и Drive.
5. В листе `Settings` укажите `GOOGLE_CLIENT_ID` вашего OAuth Web Client ID. В `ADMIN_EMAILS` оставьте `yaroslav.paraonov@gmail.com` (несколько адресов разделяются запятой).
6. Установите `DEMO_MODE=false` — публичного демонстрационного входа в рабочей версии нет.
7. Заполните листы `Clients`, `Projects` и остальные данные. Для проекта создайте код через функцию `generateAccessCode`, а в `Projects.access_hash` сохраните выведенный hash.
8. Опубликуйте: `Deploy → New deployment → Web app`, execute as **Me**, access **Anyone**.
9. Скопируйте URL веб-приложения в GitHub Repository Variables как `NEXT_PUBLIC_APPS_SCRIPT_URL`.
10. Добавьте `NEXT_PUBLIC_GOOGLE_CLIENT_ID` в Repository Variables и укажите `https://colddev.pro` в Authorized JavaScript origins Google OAuth.

## Файлы и безопасность

- В таблице хранятся только метаданные и идентификаторы Drive-файлов.
- Чеки принимаются как JPG/PNG/WEBP/PDF до 10 МБ и складываются в `COLDDEV_STORAGE/<project-id>`.
- Клиентская сессия живёт 24 часа и проверяет проект на каждом запросе.
- Google ID token проверяется через `oauth2.googleapis.com/tokeninfo`; доступ разрешён только адресам из `Settings.ADMIN_EMAILS`.
- Не публикуйте Google Sheet и не вставляйте токены или ID таблицы в frontend.
