import { readdir, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { removeOuterWhiteCanvas } from './image-canvas.mjs';

const source = path.resolve(process.argv[2] ?? 'Asset');
const output = path.resolve('src/assets');
const publicOutput = path.resolve('public');
await mkdir(output, { recursive: true });
await mkdir(publicOutput, { recursive: true });

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await filesIn(absolute));
    else found.push(absolute);
  }
  return found;
}

const all = await filesIn(source);
const normalized = (file) => file.toLowerCase().replaceAll('\\', '/');
function locate(folder, filename) {
  const candidates = all.filter((file) => {
    const value = normalized(file);
    return value.includes(folder.toLowerCase()) && path.basename(value) === filename.toLowerCase();
  });
  if (candidates.length !== 1) throw new Error(`Expected one file for ${folder}/${filename}, found ${candidates.length}`);
  return candidates[0];
}

const selections = [
  ['.', 'Photo_Profile.JPG', 'portrait.webp', 1200, false],
  ['.', '18.png', 'mascot.webp', 1100, true],
  ['.', '19.png', 'pin.webp', 600, true],
  ['.', '20.png', 'stickers.webp', 1000, true],
  ['.', 'image-removebg-preview (1).png', 'laptop-friend.webp', 550, true],
  ['walking tales/', 'png truck.png', 'walking-truck.webp', 2000, true],
  ['walking tales/', 'by Darren Ryusa.png', 'walking-bookmarks.webp', 1800, true],
  ['walking tales/', 'by Darren Ryusa (1).png', 'walking-keychain-pink.webp', 1400, true],
  ['walking tales/', 'by Darren Ryusa (2).png', 'walking-keychain-orange.webp', 1400, true],
  ['walking tales/', 'by Darren Ryusa (3).png', 'walking-keychain-blue.webp', 1400, true],
  ['walking tales/', 'logo 2.png', 'walking-logo.webp', 900, true],
  ['a carnival in every pop/', 'Untitled design.jpg', 'carnival-board.webp', 2000, true, 'white-canvas'],
  ['a carnival in every pop/', 'mascot 1.png', 'carnival-mascot.webp', 800, true],
  ['a carnival in every pop/', 'logo.png', 'carnival-logo.webp', 1000, true],
  ['mantra talks/', 'by Darren Ryusa (9).png', 'mantra-social.webp', 800, true, 'portrait'],
  ['mantra talks/', 'logo 3.png', 'mantra-logo.webp', 1000, true],
  ['mantra talks/', 'paper.png', 'mantra-poster.webp', 1400, true],
  ['real food/', 'logo 5.png', 'real-logo.webp', 1000, true],
  ['real food/', 'real food.png', 'real-poster.webp', 1800, true],
  ['real food/', 'Project Portfolio.png', 'real-brandbook.webp', 1800, true],
];

for (const [folder, filename, outputName, width, trim, treatment] of selections) {
  const input = locate(folder, filename);
  let image = sharp(input, { limitInputPixels: false });
  if (treatment === 'white-canvas') image = await removeOuterWhiteCanvas(image);
  if (treatment === 'portrait') image = image.rotate(90);
  if (trim) image = image.trim({ threshold: 8 });
  await image.resize({ width, withoutEnlargement: true }).webp({ quality: 83, effort: 6 }).toFile(path.join(output, outputName));
  console.log(outputName);
}

await sharp(locate('.', 'Pointer.png'))
  .trim({ threshold: 8 })
  .resize({ width: 32, height: 32, fit: 'contain', background: '#00000000' })
  .toColourspace('srgb')
  .png()
  .toFile(path.join(publicOutput, 'cursor-star.png'));

await copyFile(locate('a carnival in every pop/', '034dfb51-785a-4833-9234-8378a219b863.MP4'), path.join(publicOutput, 'carnival-motion.mp4'));
console.log('cursor-star.png and carnival-motion.mp4');
