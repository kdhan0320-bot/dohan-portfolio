import { useEffect, useRef, useState } from 'react';

// The lines gather and separate into ordered paths: a visual identity for
// turning the user's purchasing / shop-floor sequences into readable screens.
export default function FlowGraphic() {
  const canvas = useRef(null);
  const phase = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setPaused(query.matches);
    query.addEventListener('change', change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(canvas.current);
    return () => { query.removeEventListener('change', change); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    setReady(true);
    let frame, last = 0, width = 1, height = 1;
    let hidden = document.hidden;
    const position = { x: pointer.current.x, y: pointer.current.y };
    const styles = getComputedStyle(el);
    const lineColors = [styles.getPropertyValue('--flow-primary').trim(), styles.getPropertyValue('--flow-secondary').trim()];
    function draw() {
      ctx.clearRect(0, 0, width, height);
      const t = phase.current;
      const progress = paused && t === 0 ? 1 : Math.min(1, t / 1.5);
      const settle = 1 - Math.pow(1 - progress, 3);
      const center = height * .5;
      position.x += (pointer.current.x - position.x) * .045;
      position.y += (pointer.current.y - position.y) * .045;
      for (let i = 0; i < 38; i++) {
        const rank = i / 37;
        const row = height * (.11 + rank * .78);
        const drift = Math.sin(i * .54 + t * .85) * height * .20;
        const left = row + (1 - settle) * Math.sin(i * 2.4) * height * .3;
        const bend = (Math.sin(t * .7) * .09 + position.y * .12) * height;
        const knot = center + (rank - .5) * height * (.22 + .1 * Math.sin(t * .5));
        const spine = width * (.51 + Math.sin(t * .3) * .035 + position.x * .025);
        ctx.beginPath();
        ctx.moveTo(-10, left);
        ctx.bezierCurveTo(width * .23, row + drift, spine - width * .17, knot + bend, spine, knot);
        ctx.bezierCurveTo(spine + width * .18, knot - bend, width * .79, height - row + drift * .3, width + 10, height - row);
        ctx.strokeStyle = lineColors[i < 18 ? 0 : 1];
        ctx.globalAlpha = .42 + rank * .28;
        ctx.lineWidth = width < 600 ? .85 : 1.15;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    function resize() {
      const bounds = el.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function tick(now) {
      if (last) phase.current += Math.min((now - last) / 1000, .05);
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); last = 0;
      if (!paused && visible && !hidden) frame = requestAnimationFrame(tick);
    }
    function visibility() { hidden = document.hidden; sync(); }
    const observer = new ResizeObserver(resize);
    observer.observe(el); resize(); sync();
    document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [paused, visible]);

  function move(event) {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: (event.clientX - rect.left) / rect.width * 2 - 1, y: (event.clientY - rect.top) / rect.height * 2 - 1 };
  }

  return <figure className="flow-graphic" data-motion={paused ? 'paused' : 'playing'} onPointerMove={move} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
    <div className="flow-surface" data-ready={ready}>
      <svg className="flow-fallback" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20C300 20 300 160 500 90S700 20 1000 160M0 50C300 50 300 130 500 90S700 50 1000 130M0 160C300 160 300 20 500 90S700 160 1000 20" fill="none" stroke="currentColor" /></svg>
      <canvas ref={canvas} aria-hidden="true" />
    </div>
    <figcaption><span>서로 다른 정보가, 하나의 흐름으로.</span><button type="button" onClick={() => setPaused(value => !value)}>{paused ? '움직임 재생' : '움직임 멈추기'}</button></figcaption>
  </figure>;
}
