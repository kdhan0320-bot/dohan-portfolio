/* Each pair marks one crease in folded-sheet.jpg. Adjacent faces share the same
 * edge throughout the unfolding, including the two narrow reverse folds. */
const creases = [
  [[779, 22], [1436, 203]],
  [[663, 310], [1318, 525]],
  [[495, 277], [1227, 525]],
  [[409, 550], [1089, 793]],
  [[196, 511], [966, 792]],
  [[60, 742], [849, 1023]],
];
const flatStops = [0, .27, .36, .63, .72, 1];
const clamp = n => Math.max(0, Math.min(1, n));
const mix = (a, b, t) => a + (b - a) * t;
const ease = n => n * n * (3 - 2 * n);

// Map a triangle of the photograph onto the corresponding moving paper face.
function drawTriangle(ctx, photo, source, target) {
  const [[x, y], [x1, y1], [x2, y2]] = source;
  const [[u, v], [u1, v1], [u2, v2]] = target;
  const sx = x1-x, sy = y1-y, tx = x2-x, ty = y2-y;
  const det = sx*ty - sy*tx;
  const a = ((u1-u)*ty - (u2-u)*sy)/det;
  const b = ((v1-v)*ty - (v2-v)*sy)/det;
  const c = (sx*(u2-u) - tx*(u1-u))/det;
  const d = (sx*(v2-v) - tx*(v1-v))/det;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(u, v); ctx.lineTo(u1, v1); ctx.lineTo(u2, v2); ctx.closePath();
  ctx.clip();
  ctx.transform(a,b,c,d,u-a*x-c*y,v-b*x-d*y);
  ctx.drawImage(photo, 0, 0, 1536, 1024);
  ctx.restore();
}

export function playPaperUnfold(canvas, photo, receipt, finish) {
  const ctx = canvas.getContext('2d');
  if (!ctx) { finish(); return () => {}; }
  const scale = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2);
  canvas.width = Math.round(canvas.clientWidth * scale);
  canvas.height = Math.round(canvas.clientHeight * scale);
  ctx.setTransform(canvas.width/1536, 0, 0, canvas.height/1024, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // Mask the stationary sheet out of the backdrop so the moving print never
  // leaves a second, ghosted copy in its original position.
  const backdrop = new Path2D();
  backdrop.rect(0, 0, 1536, 1024);
  const outline = [...creases.map(edge => edge[0]), ...creases.map(edge => edge[1]).reverse()];
  outline.forEach(([x,y], i) => i ? backdrop.lineTo(x,y) : backdrop.moveTo(x,y));
  backdrop.closePath();

  const width = 1268;
  const height = width * receipt.naturalHeight / receipt.naturalWidth;
  const left = (1536 - width) / 2, top = (1024 - height) / 2;
  const start = performance.now();
  let frame;
  function paint(now) {
    const time = (now - start) / 1000;
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#dfe3e0';
    ctx.fillRect(0, 0, 1536, 1024);
    ctx.globalAlpha = 1 - ease(clamp(time / .64));
    ctx.fillStyle = '#74848e';
    ctx.fillRect(0, 0, 1536, 1024);
    ctx.save();
    ctx.clip(backdrop, 'evenodd');
    ctx.drawImage(photo, 0, 0, 1536, 1024);
    ctx.restore();
    ctx.globalAlpha = 1;

    const edges = creases.map((edge, i) => {
      const t = ease(clamp((time - i * .026) / .65));
      return edge.map(([x,y], side) => [
        mix(x, left + side * width, t),
        mix(y, top + flatStops[i] * height, t),
      ]);
    });
    for (let i = 0; i < edges.length - 1; i++) {
      const [a,b] = creases[i], [d,c] = creases[i+1];
      const [A,B] = edges[i], [D,C] = edges[i+1];
      drawTriangle(ctx,photo,[a,b,c],[A,B,C]);
      drawTriangle(ctx,photo,[a,c,d],[A,C,D]);
    }
    // The photographed inventory slip is also the image at the landing point.
    ctx.globalAlpha = ease(clamp((time - .58) / .36));
    ctx.drawImage(receipt, left, top, width, height);
    ctx.globalAlpha = 1;
    if (time < 1.08) frame = requestAnimationFrame(paint);
    else finish();
  }
  paint(start);
  return () => cancelAnimationFrame(frame);
}
