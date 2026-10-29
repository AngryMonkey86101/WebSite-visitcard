import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// Картинка для превью ссылок (Open Graph) 1200 × 630 в стиле сайта:
// чёрный фон, волна в углу, крупный заголовок. Собирается при билде.
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

interface OgOptions {
  /** Мелкая строка сверху: имя и роль. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  footer: string;
}

type Node = { type: string; props: Record<string, unknown> };

function h(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style, children } };
}

let fonts: Promise<{ name: string; data: Buffer; weight: 300 | 700 }[]> | undefined;

// Латиница и кириллица Inter лежат в разных файлах: подключаем их как два
// семейства и перечисляем оба в fontFamily, чтобы satori брал недостающие глифы из второго.

function loadFonts() {
  const dir = join(process.cwd(), 'node_modules/@fontsource/inter/files');
  const load = (subset: string, weight: 300 | 700) =>
    readFile(join(dir, `inter-${subset}-${weight}-normal.woff`)).then((data) => ({
      name: `Inter ${subset}`,
      data,
      weight,
    }));
  fonts ??= Promise.all([
    load('latin', 300),
    load('latin', 700),
    load('cyrillic', 300),
    load('cyrillic', 700),
  ]);
  return fonts;
}

export async function renderOg({ eyebrow, title, subtitle, tags = [], footer }: OgOptions) {
  const tree = h(
    'div',
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      backgroundColor: '#000000',
      backgroundImage:
        'radial-gradient(circle at 100% 0%, #0088f0 0%, #00479e 22%, #000141 42%, #000000 62%)',
      color: '#ffffff',
      fontFamily: '"Inter latin", "Inter cyrillic"',
    },
    [
      h(
        'div',
        { display: 'flex', fontSize: 26, fontWeight: 300, letterSpacing: 8, color: '#00c7fe' },
        eyebrow.toUpperCase(),
      ),
      h('div', { display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }, [
        h('div', { display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.05 }, title),
        subtitle
          ? h(
              'div',
              {
                display: 'flex',
                fontSize: 34,
                fontWeight: 300,
                lineHeight: 1.3,
                color: 'rgba(255,255,255,0.85)',
              },
              subtitle,
            )
          : null,
        tags.length > 0
          ? h(
              'div',
              { display: 'flex', gap: 14 },
              tags.map((tag) =>
                h(
                  'div',
                  {
                    display: 'flex',
                    padding: '6px 20px',
                    border: '2px solid rgba(0,199,254,0.6)',
                    borderRadius: 999,
                    fontSize: 24,
                    color: '#00c7fe',
                  },
                  tag,
                ),
              ),
            )
          : null,
      ]),
      h('div', { display: 'flex', fontSize: 26, fontWeight: 700, color: '#00c7fe' }, footer),
    ],
  );

  // satori ждёт ReactNode, но принимает и такие же простые объекты.
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await loadFonts(),
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
