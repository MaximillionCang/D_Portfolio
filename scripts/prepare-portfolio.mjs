import { readdir, mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import { removeOuterWhiteCanvas } from './image-canvas.mjs';

const source = path.resolve(process.argv[2] ?? 'Asset');
const ffmpeg = process.argv[3] ?? 'ffmpeg';
const imagesOutput = path.resolve('src/assets/portfolio');
await mkdir(imagesOutput, { recursive: true });
await mkdir('src/data', { recursive: true });
await mkdir('public/videos', { recursive: true });
async function scan(dir) { const found = []; for (const item of await readdir(dir, { withFileTypes: true })) { const file = path.join(dir, item.name); if (item.isDirectory()) found.push(...await scan(file)); else found.push(file); } return found; }
async function hashFile(file) { const hash = createHash('md5'); for await (const chunk of createReadStream(file)) hash.update(chunk); return hash.digest('hex'); }
async function exists(file) { try { await stat(file); return true; } catch { return false; } }
let previous = {};
try { previous = JSON.parse(await readFile('src/data/media-manifest.json', 'utf8')); } catch {}
const next = {};
const assets = (await scan(source)).filter(file => /\.(png|jpe?g)$/i.test(file) && /^(Graphic_Design|Social_Media_Content|Illustration|Photography)\//.test(path.relative(source, file).replaceAll('\\', '/'))).sort();
const imports = [];
const entries = [];
for (let index = 0; index < assets.length; index++) {
  const input = assets[index];
  const key = path.relative(source, input).replaceAll('\\', '/');
  const md5 = await hashFile(input);
  const name = key.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 110) + '-' + createHash('sha1').update(key).digest('hex').slice(0, 7);
  const imageFile = path.join(imagesOutput, name + '.webp');
  const thumbFile = path.join(imagesOutput, name + '-thumb.webp');
  if (previous[key]?.md5 !== md5 || !await exists(imageFile) || !await exists(thumbFile)) {
    let image = sharp(input, { limitInputPixels: false }).autoOrient();
    if (key.endsWith('a carnival in every pop/Untitled design.jpg')) image = await removeOuterWhiteCanvas(image);
    if (key.endsWith('mantra talks/by Darren Ryusa (9).png')) image = image.rotate(90);
    if (/\.png$/i.test(input) && !key.startsWith('Photography/')) image = image.trim({ threshold: 8 });
    if (key.endsWith('a carnival in every pop/Untitled design.jpg')) image = image.trim({ threshold: 8 });
    const full = await image.resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toBuffer();
    await writeFile(imageFile, full);
    await sharp(full).resize({ width: 720, height: 900, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(thumbFile);
  }
  const metadata = await sharp(imageFile).metadata();
  next[key] = { md5, width: metadata.width, height: metadata.height, image: name + '.webp' };
  imports.push(`import image${index} from '../assets/portfolio/${name}.webp';`, `import thumb${index} from '../assets/portfolio/${name}-thumb.webp';`);
  entries.push(`  ${JSON.stringify(key)}: { image: image${index}, thumbnail: thumb${index}, source: ${JSON.stringify(key)} }`);
  console.log(`Image ${index + 1}/${assets.length}: ${key}`);
}
await writeFile('src/data/media.ts', `import type { ImageMetadata } from 'astro';\n${imports.join('\n')}\n\nexport type PreparedMedia = { image: ImageMetadata; thumbnail: ImageMetadata; source: string };\nexport const media: Record<string, PreparedMedia> = {\n${entries.join(',\n')}\n};\n`);
const videos = [
  ['Graphic_Design/a carnival in every pop/IMG_6797.mov', 'carnival-film', 'landscape', 15.8],
  ['Graphic_Design/a carnival in every pop/034dfb51-785a-4833-9234-8378a219b863.MP4', 'carnival-character', 'portrait', 7.03],
  ['Social_Media_Content/sportlight/0427.mp4', 'sportlight-introduction', 'landscape', 34.97],
  ['Social_Media_Content/tutorising/export_1793028010057.mov', 'tutorising-promotion', 'portrait', 14.33],
  ['Social_Media_Content/tutorising/ScreenRecording_10-26-2026 23-22-00_1.mp4', 'tutorising-story-recording', 'portrait', 12.42],
  ['Social_Media_Content/tutorising/v0f025gc0000cb97lvrc77u5knkt70j0.mp4', 'tutorising-orientation', 'portrait', 34.83],
  ['Graphic_Design/mantra talks/reels/mantra-talks-reel-01.mp4', 'mantra-talks-reel-01', 'portrait', 10.26],
  ['Graphic_Design/mantra talks/reels/mantra-talks-reel-02.mp4', 'mantra-talks-reel-02', 'portrait', 12.17],
  ['Graphic_Design/mantra talks/reels/mantra-talks-reel-03.mp4', 'mantra-talks-reel-03', 'portrait', 46],
];
const videoImports = [];
const videoEntries = [];
for (let index = 0; index < videos.length; index++) {
  const [key, name, orientation, duration] = videos[index];
  const input = path.join(source, key);
  const md5 = await hashFile(input);
  const output = `public/videos/${name}.mp4`;
  const poster = path.join(imagesOutput, `${name}-poster.webp`);
  if (previous[key]?.md5 !== md5 || !await exists(output) || !await exists(poster)) {
    execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-i', input, '-vf', `scale='min(${orientation === 'landscape' ? 1280 : 720},iw)':-2`, '-r', '30', '-c:v', 'libx264', '-preset', 'fast', '-crf', '24', '-pix_fmt', 'yuv420p', '-threads', '2', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', output], { stdio: 'inherit' });
    execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-ss', '1', '-i', output, '-frames:v', '1', '-vf', 'scale=720:-2', '-quality', '82', poster], { stdio: 'inherit' });
  }
  next[key] = { md5, output, duration, orientation };
  videoImports.push(`import poster${index} from '../assets/portfolio/${name}-poster.webp';`);
  videoEntries.push(`  ${JSON.stringify(name)}: { src: '/videos/${name}.mp4', poster: poster${index}, duration: ${duration}, orientation: '${orientation}', source: ${JSON.stringify(key)} }`);
  console.log(`Video ${index + 1}/${videos.length}: ${key}`);
}
await writeFile('src/data/videos.ts', `import type { ImageMetadata } from 'astro';\n${videoImports.join('\n')}\nexport type PreparedVideo = { src: string; poster: ImageMetadata; duration: number; orientation: 'landscape' | 'portrait'; source: string };\nexport const videos: Record<string, PreparedVideo> = {\n${videoEntries.join(',\n')}\n};\n`);
await writeFile('src/data/media-manifest.json', JSON.stringify(next, null, 2));
console.log(`Prepared ${assets.length} images and ${videos.length} videos.`);
