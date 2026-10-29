import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, useTranslations, type Locale } from '../../i18n';
import { getProjects } from '../../lib/projects';
import { renderOg } from '../../lib/og';

// /og/ru.png, /og/en.png — главная; /og/ru/projects/<slug>.png — страницы проектов.
interface Props {
  locale: Locale;
  title: string;
  subtitle: string;
  tags?: string[];
}

export const getStaticPaths = (async () => {
  const paths = [];
  for (const locale of locales) {
    const t = useTranslations(locale);
    paths.push({
      params: { path: locale },
      props: { locale, title: t('hero.name'), subtitle: t('hero.lead') },
    });
    for (const project of await getProjects(locale)) {
      paths.push({
        params: { path: `${locale}/projects/${project.slug}` },
        props: {
          locale,
          title: project.entry.data.title,
          subtitle: project.entry.data.summary,
          tags: project.tags,
        },
      });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const t = useTranslations(props.locale);
  const png = await renderOg({
    eyebrow: `${t('hero.name')} · ${t('hero.role')}`,
    title: props.title,
    subtitle: props.subtitle,
    tags: props.tags,
    footer: 't.me/angrymonkey86',
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
