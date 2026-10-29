import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

type Entry = CollectionEntry<'projects'>;

export interface Project {
  slug: string;
  /** Запись на нужном языке (или русская, если перевода нет) — для title, summary и текста. */
  entry: Entry;
  /** Есть ли перевод на запрошенный язык. */
  translated: boolean;
  order: number;
  featured: boolean;
  tags: string[];
  stack: string[];
  links: NonNullable<Entry['data']['links']>;
  cover?: Entry['data']['cover'];
  screenshots: NonNullable<Entry['data']['screenshots']>;
}

function split(id: string): [slug: string, locale: string] {
  const [slug, locale] = id.split('/');
  return [slug, locale];
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const entries = await getCollection('projects');
  const byLocale = new Map(entries.map((e) => [e.id, e]));

  const projects = entries
    .filter((e) => split(e.id)[1] === 'ru')
    .map((base): Project => {
      const [slug] = split(base.id);
      const localized = byLocale.get(`${slug}/${locale}`);
      if (!localized && import.meta.env.DEV === false) {
        console.warn(`[projects] Нет перевода «${slug}» на ${locale}, показываю русский текст.`);
      }
      const shared = base.data;
      return {
        slug,
        entry: localized ?? base,
        translated: Boolean(localized),
        order: shared.order ?? 999,
        featured: shared.featured ?? false,
        tags: shared.tags ?? [],
        stack: shared.stack ?? [],
        links: shared.links ?? {},
        cover: shared.cover,
        screenshots: shared.screenshots ?? [],
      };
    });

  return projects.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}
