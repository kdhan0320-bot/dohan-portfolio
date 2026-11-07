import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useScrollNav';
import { playPaperUnfold } from './playPaperUnfold';
import './heroSection.css';

function FoldedSheet() {
  const canvas = useRef(null);
  const photo = useRef(null);
  const button = useRef(null);
  const cancel = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => () => cancel.current?.(), []);

  function openReceipt() {
    if (cancel.current) return;
    const receipt = document.getElementById('sample-receipt');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Browsing and keyboard focus never depend on canvas or an image download.
    if (reduced.matches || !photo.current?.naturalWidth || !receipt?.naturalWidth) {
      scrollToSection('receipt-feature');
      return;
    }
    const controller = new AbortController();
    const options = { signal: controller.signal, passive: true };
    let stopDrawing;
    function stop() {
      controller.abort();
      stopDrawing?.();
      cancel.current = null;
      setOpened(false);
    }
    function finish() {
      controller.abort();
      const source = canvas.current?.parentElement;
      const target = receipt.closest('.slip-board');
      if (!document.startViewTransition || !source || !target || reduced.matches) {
        cancel.current = null;
        scrollToSection('receipt-feature');
        return;
      }
      // Carry the flattened print to its real place on the page. A normal
      // smooth scroll above serves browsers without shared-element transitions.
      source.style.viewTransitionName = 'unfolded-slip';
      const transition = document.startViewTransition(() => {
        source.style.viewTransitionName = '';
        if (!target.isConnected) return;
        target.style.viewTransitionName = 'unfolded-slip';
        scrollToSection('receipt-feature', { instant: true });
      });
      cancel.current = () => transition.skipTransition();
      transition.finished.finally(() => {
        source.style.viewTransitionName = '';
        target.style.viewTransitionName = '';
        cancel.current = null;
        setOpened(false);
      });
    }
    cancel.current = stop;
    window.addEventListener('wheel', stop, options);
    window.addEventListener('touchmove', stop, options);
    window.addEventListener('keydown', e => {
      if (['Escape','Tab','PageDown','PageUp','Home','End','ArrowDown','ArrowUp'].includes(e.key)) stop();
    }, options);
    document.addEventListener('focusin', e => {
      if (e.target !== button.current) stop();
    }, options);
    reduced.addEventListener('change', () => { stop(); scrollToSection('receipt-feature'); }, options);
    setOpened(true);
    stopDrawing = playPaperUnfold(canvas.current, photo.current, receipt, finish);
  }

  useEffect(() => {
    if (!opened) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !cancel.current) setOpened(false);
    });
    observer.observe(button.current);
    return () => observer.disconnect();
  }, [opened]);

  return (
    <figure className="fold-art">
      <button ref={button} type="button" className="fold-cover" onClick={openReceipt}
        onFocus={() => { if (!cancel.current) setOpened(false); }}
        aria-label="표지 펼치기 · 품의선 전표 보기" aria-controls="receipt-feature">
        <span className="fold-frame" data-open={opened}>
          <img ref={photo} className="fold-image" src={`${import.meta.env.BASE_URL}folded-sheet.jpg`}
            width="1536" height="1024" alt="" />
          <canvas ref={canvas} className="fold-canvas" aria-hidden="true" />
        </span>
        <span className="fold-handle">
          표지 펼치기
        </span>
      </button>
    </figure>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="portfolio-hero" aria-labelledby="home-title">
      <div className="portfolio-shell fold-layout">
        <div className="fold-heading" data-hero-reveal>
          <p className="fold-role">웹·UI 디자인 <span>신입 지원</span></p>
          <h1 id="home-title">김도한</h1>
        </div>
        <FoldedSheet />
        <div className="fold-intro">
          <p className="fold-description">구매·총무와 생산 현장에서 익힌<br className="fold-break" /> 일의 순서를 화면으로 옮깁니다.</p>
          <div className="fold-actions">
            <button type="button" className="text-link fold-shortcut" onClick={() => scrollToSection('projects')}>대표 작업 바로 보기 <span aria-hidden="true">↓</span></button>
            <Link className="text-link" to="/about">소개 보기</Link>
          </div>
          <p className="fold-scope">Figma 직접 편집 · AI 협업 웹 제작</p>
        </div>
      </div>
    </section>
  );
}
