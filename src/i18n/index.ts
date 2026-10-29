import { getRelativeLocaleUrl } from 'astro:i18n';
import { en } from './en';
import { ru } from './ru';

export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

const dictionaries = { ru, en } as const;
export type TranslationKey = keyof typeof ru;

export function useTranslations(locale: Locale) {
  return (key: TranslationKey): string => dictionaries[locale][key];
}

export const telegramUrl = 'https://t.me/angrymonkey86';

/** Ссылка на страницу `path` (без языкового префикса) на нужном языке, с учётом base. */
export function localizedUrl(locale: Locale, path = ''): string {
  return getRelativeLocaleUrl(locale, path.replace(/^\/+/, ''));
}

/**
 * Путь текущей страницы без base и языкового префикса,
 * чтобы переключатель языка вёл на ту же страницу.
 */
export function pathWithoutLocale(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  let path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  path = path.replace(/^\/+/, '');
  const [first, ...rest] = path.split('/');
  if (locales.includes(first as Locale)) path = rest.join('/');
  return path;
}

/** Ссылка на файл из public/ с учётом base. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
