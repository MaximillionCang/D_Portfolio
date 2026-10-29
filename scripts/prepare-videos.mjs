import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve(process.argv[2] ?? 'Asset');
const ffmpeg = process.argv[3] ?? 'ffmpeg';
const project = path.join(source, 'Graphic_Design', 'a carnival in every pop');
await mkdir('src/assets', { recursive: true });
await mkdir('public', { recursive: true });

execFileSync(ffmpeg, [
  '-y', '-hide_banner', '-loglevel', 'error', '-i', path.join(project, 'IMG_6797.mov'),
  '-vf', 'scale=1280:-2', '-r', '30', '-c:v', 'libx264', '-preset', 'medium',
  '-crf', '25', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart',
  'public/carnival-brand-film.mp4',
], { stdio: 'inherit' });

for (const [input, time, output] of [
  ['IMG_6797.mov', '8', 'carnival-film-poster.webp'],
  ['034dfb51-785a-4833-9234-8378a219b863.MP4', '2', 'carnival-character-poster.webp'],
]) {
  execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-ss', time,
    '-i', path.join(project, input), '-frames:v', '1', '-vf', 'scale=1280:-2',
    '-quality', '82', path.join('src/assets', output)], { stdio: 'inherit' });
}
console.log('Prepared two video posters and the browser-compatible Carnival film.');
