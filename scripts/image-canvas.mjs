import sharp from 'sharp';

export async function removeOuterWhiteCanvas(image) {
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0;
  let tail = 0;

  function add(pixel) {
    if (visited[pixel]) return;
    visited[pixel] = 1;
    const offset = pixel * 4;
    const minimum = Math.min(data[offset], data[offset + 1], data[offset + 2]);
    const maximum = Math.max(data[offset], data[offset + 1], data[offset + 2]);
    if (data[offset + 3] === 0 || (minimum >= 244 && maximum - minimum < 14)) queue[tail++] = pixel;
  }

  for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1); }
  // Only the canvas connected to an edge is cleared; white inside the artwork stays intact.
  while (head < tail) {
    const pixel = queue[head++];
    data[pixel * 4 + 3] = 0;
    const x = pixel % width;
    if (x > 0) add(pixel - 1);
    if (x < width - 1) add(pixel + 1);
    if (pixel >= width) add(pixel - width);
    if (pixel < width * (height - 1)) add(pixel + width);
  }

  return sharp(data, { raw: { width, height, channels: 4 } });
}
