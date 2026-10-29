import { localizedUrl, telegramUrl, useTranslations, type Locale } from '../i18n';

// Разметка schema.org: кто автор сайта и проектов.
export function personLd(locale: Locale, site: URL | undefined) {
  const t = useTranslations(locale);
  return {
    '@type': 'Person',
    name: t('hero.name'),
    jobTitle: t('hero.role'),
    url: new URL(localizedUrl(locale), site).href,
    sameAs: [telegramUrl],
  };
}
