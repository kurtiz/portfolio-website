import {mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import sharp from 'sharp';
import {projects} from '../src/data/projects';
import {pageSEO, siteConfig} from '../src/lib/seo';

const outputDir = join(import.meta.dir, '..', 'public', 'og');
const blogDir = join(import.meta.dir, '..', 'content', 'blog');
const width = 1200;
const height = 630;

function escapeXml(value: string): string {
    return value.replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
    })[char]!);
}

function lines(value: string, maxChars: number, maxLines: number): string[] {
    const words = value.replace(/\s+/g, ' ').trim().split(' ');
    const result: string[] = [];
    let line = '';
    for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (next.length > maxChars && line) {
            result.push(line);
            line = word;
            if (result.length === maxLines) break;
        } else {
            line = next;
        }
    }
    if (line && result.length < maxLines) result.push(line);
    if (result.join(' ').length < value.replace(/\s+/g, ' ').trim().length) {
        result[result.length - 1] = `${result[result.length - 1].replace(/[\s.,;:!?-]+$/, '')}…`;
    }
    return result;
}

function cardSvg(label: string, title: string, description: string): string {
    const titleLines = lines(title, 34, 2);
    const descriptionLines = lines(description, 83, 3);
    const titleSize = titleLines.some(line => line.length > 27) ? 49 : 58;
    const titleText = titleLines.map((line, index) =>
        `<text x="100" y="${270 + index * (titleSize + 12)}" fill="#22252e" font-size="${titleSize}" font-weight="700">${escapeXml(line)}</text>`
    ).join('');
    const descriptionStart = 300 + titleLines.length * (titleSize + 12);
    const descriptionText = descriptionLines.map((line, index) =>
        `<text x="100" y="${descriptionStart + index * 31}" fill="#5d616a" font-size="22">${escapeXml(line)}</text>`
    ).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Arial, Helvetica, sans-serif">
        <defs><linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#f1eee7"/></linearGradient></defs>
        <rect width="1200" height="630" fill="url(#background)"/>
        <rect x="44" y="44" width="1112" height="542" rx="32" fill="#fffefa" stroke="#e5e1d9" stroke-width="2"/>
        <rect x="44" y="44" width="12" height="542" rx="6" fill="#e88d67"/>
        <circle cx="104" cy="117" r="26" fill="#e88d67"/>
        <text x="104" y="126" fill="#ffffff" font-size="21" font-weight="700" text-anchor="middle">AD</text>
        <text x="146" y="113" fill="#22252e" font-size="23" font-weight="700">Aaron Will Djaba</text>
        <text x="146" y="139" fill="#737781" font-size="16">iamaaronwilldjaba.me</text>
        <text x="100" y="201" fill="#c66c49" font-size="17" font-weight="700" letter-spacing="3">${escapeXml(label.toUpperCase())}</text>
        ${titleText}${descriptionText}
        <line x1="100" y1="529" x2="1100" y2="529" stroke="#e5e1d9" stroke-width="2"/>
        <text x="100" y="558" fill="#737781" font-size="17">Software engineering  ·  Security  ·  Open source</text>
    </svg>`;
}

async function writeCard(path: string, label: string, title: string, description: string): Promise<void> {
    const target = join(outputDir, path);
    await mkdir(join(target, '..'), {recursive: true});
    await sharp(Buffer.from(cardSvg(label, title, description))).png({compressionLevel: 9}).toFile(target);
}

function frontmatterValue(source: string, key: string): string | undefined {
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const value = frontmatter?.[1].match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim();
    if (!value) return undefined;
    try { return String(JSON.parse(value)); } catch { return value.replace(/^['"]|['"]$/g, ''); }
}

await rm(outputDir, {recursive: true, force: true});
await mkdir(outputDir, {recursive: true});
await writeCard('default.png', 'Portfolio', siteConfig.name, siteConfig.description);

for (const [key, page] of Object.entries(pageSEO)) {
    const slug = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    await writeCard(`pages/${slug}.png`, slug.replace(/-/g, ' '), page.title, page.description);
}

for (const project of projects) {
    await writeCard(`projects/${project.id}.png`, 'Project', project.title, project.description);
}

for (const filename of await readdir(blogDir)) {
    if (!filename.endsWith('.md')) continue;
    const source = await readFile(join(blogDir, filename), 'utf8');
    if (frontmatterValue(source, 'published') !== 'true') continue;
    const title = frontmatterValue(source, 'title');
    const description = frontmatterValue(source, 'excerpt');
    if (!title || !description) throw new Error(`Missing OG copy in ${filename}`);
    await writeCard(`blog/${filename.slice(0, -3)}.png`, 'Article', title, description);
}

await writeFile(join(outputDir, 'README.txt'), 'Generated by bun run og:generate. Do not edit these images directly.\n');
console.log('Generated Open Graph PNG cards');
