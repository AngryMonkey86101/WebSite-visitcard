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
  pages/        /, /en/, 404
  styles/       global.css с токенами из design.md
public/         favicon и прочая статика
deploy/         пример конфига nginx для своего VPS
```

Русский — язык по умолчанию (`/`), английский — `/en/`. Новые тексты интерфейса добавляются
в `src/i18n/ru.ts`, а TypeScript не даст собрать сайт, пока их нет в `en.ts`.

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
