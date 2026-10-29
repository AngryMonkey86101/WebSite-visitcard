# WebSite-visitcard

Сайт-визитка Вадима Измайлова: проекты, навыки и контакты на русском и английском.

Стек: [Astro](https://astro.build) + TypeScript + Tailwind CSS. Дизайн и токены описаны в [design.md](design.md).

## Запуск локально

Нужен Node.js 22.

```sh
npm ci
npm run dev      # http://localhost:4321/WebSite-visitcard/
npm run build    # сборка в dist/
npm run preview  # просмотр собранного сайта
```

Проверки, которые запускает CI:

```sh
npm run format:check
npm run lint
npm run check
```

## Структура

```
src/
  components/   кнопки, шапка, футер, волны, главная страница
  i18n/         словари интерфейса ru.ts и en.ts
  layouts/      общий шаблон страницы (meta, hreflang, шрифты)
  content/      проекты: projects/<slug>/ru.md и en.md
  lib/          загрузка проектов с учётом языка
  pages/        /, /en/, /projects/<slug>/, /en/projects/<slug>/, 404
  styles/       global.css с токенами из design.md
public/         favicon и прочая статика
deploy/         пример конфига nginx для своего VPS
```

Русский — язык по умолчанию (`/`), английский — `/en/`. Новые тексты интерфейса добавляются
в `src/i18n/ru.ts`, а TypeScript не даст собрать сайт, пока их нет в `en.ts`.

## Как добавить проект

1. Создайте папку `src/content/projects/<slug>/` (slug — латиницей, станет адресом `/projects/<slug>/`).
2. В ней `ru.md` — все поля и текст на русском:

   ```md
   ---
   title: Название
   summary: Одно-два предложения для карточки (до 200 символов).
   order: 4                     # порядок на главной
   featured: true               # показать крупно в блоке «Проекты»; в карусели «Все проекты» есть все
   tags: [AI, WebSites]
   stack: [Python, FastAPI]
   links:
     demo: https://...          # кнопка «Открыть»
     telegram: https://t.me/... # кнопка «Открыть в Telegram»
     download: https://...      # кнопка «Скачать»
   cover: ./cover.png           # обложка 16:9, необязательно
   screenshots: [./screen-1.png, ./screen-2.png]
   ---

   ## Задача
   ...
   ```

3. Рядом `en.md` — только `title`, `summary` и текст по-английски. Если его нет, английская
   страница покажет русский текст с пометкой.
4. Картинки кладите в ту же папку. Пока `cover` и `screenshots` не заданы, вместо них рисуются заглушки.

Ссылка `links.repo` в схеме есть, но кнопка «Код» пока не показывается.

## Деплой

Workflow `.github/workflows/deploy.yml` собирает сайт на каждый push и pull request,
а при push в `main` выкладывает его.

**GitHub Pages (сейчас).** Один раз: Settings → Pages → Source = **GitHub Actions**.
Сайт будет доступен по адресу https://angrymonkey86101.github.io/WebSite-visitcard/.

**Свой VPS (потом).**

1. На сервере: nginx, папка `/var/www/site`, пользователь с SSH-ключом и правом записи в неё.
   Пример конфига — [deploy/nginx.conf](deploy/nginx.conf), HTTPS через `certbot --nginx`.
2. В репозитории, Settings → Secrets and variables → Actions:
   - секреты `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (приватный ключ);
   - переменные `DEPLOY_TARGET` = `vps`, `SITE_URL` = `https://ваш-домен`,
     при необходимости `VPS_PATH`.
3. Запустить workflow заново (Actions → Build and deploy → Run workflow).

Сайт соберётся с `base: '/'` и уедет на сервер через `rsync`. Вернуться на Pages —
удалить переменную `DEPLOY_TARGET` или поставить `pages`.
