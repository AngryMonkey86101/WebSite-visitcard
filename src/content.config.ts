import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Каждый проект — папка src/content/projects/<slug>/ с файлами ru.md и en.md.
// Общие поля (порядок, теги, ссылки, картинки) пишутся только в ru.md,
// в en.md — только переведённые title, summary и текст.
const projects = defineCollection({
  loader: glob({ pattern: '*/{ru,en}.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(200),
      order: z.number().int().optional(),
      featured: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      stack: z.array(z.string()).optional(),
      links: z
        .object({
          demo: z.url().optional(),
          telegram: z.url().optional(),
          download: z.url().optional(),
          repo: z.url().optional(),
        })
        .optional(),
      cover: image().optional(),
      screenshots: z.array(image()).optional(),
    }),
});

export const collections = { projects };
