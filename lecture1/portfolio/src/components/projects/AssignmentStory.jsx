import { useLayoutEffect, useRef, useState } from 'react';
import './assignmentStory.css';

const media = `${import.meta.env.BASE_URL}detail/current/`;
export const SEOLBI_DESIGN_URL = 'https://www.figma.com/design/GInxTqHo6Y87DEe3vuhmMw?node-id=970-2192';
const prototypeUrl = 'https://www.figma.com/proto/GInxTqHo6Y87DEe3vuhmMw?node-id=968-1192&starting-point-node-id=968-1192&scaling=scale-down&content-scaling=fixed';
const scenes = [
  { id: 'request', label: '요청 확인', title: '담당자·기한을 먼저 확인합니다.', text: '담당자·기한·선택 버튼을 사진보다 먼저 보여줍니다.', alt: '배정 대기 요청. 미배정 담당자와 완료 기한 바로 아래 담당자 선택 버튼이 있고, 설비 사진과 증상은 그 다음에 표시됩니다.' },
  { id: 'selected', label: '담당자 선택', title: '이수진 선택 · 아직 배정 전', text: '접수 증상과 직무를 확인하고, 선택한 이름을 실행 버튼에서 다시 확인합니다.', alt: '담당자 선택. 박성민 기계 정비와 이수진 전기·센서 중 이수진이 선택돼 있으며, 아직 배정 전 안내와 이수진에게 배정 버튼이 표시됩니다.' },
  { id: 'saving', label: '저장 중', title: '선택은 유지하고 저장 중입니다.', text: '저장 중에는 같은 실행 영역에 진행 상태를 표시합니다.', alt: '이수진 선택을 유지한 담당자 선택 화면. 하단에 배정을 저장하고 있다는 안내와 저장 중 버튼이 표시됩니다.' },
  { id: 'failure', label: '실패·재시도', title: '저장 실패 · 선택은 유지됩니다.', text: '담당자를 다시 고르지 않고 하단 버튼으로 저장을 재시도합니다.', alt: '저장 실패 화면. 이수진 선택을 유지하며 저장 실패 안내와 다시 시도 버튼이 표시됩니다.' },
  { id: 'success', label: '배정 완료', title: '배정 완료 · 정비 보고 대기', text: '배정과 정비 완료를 구분하고, 확인 후 요청 목록으로 돌아갑니다.', alt: '배정 완료 화면. 이수진에게 배정했다는 안내, 정비 보고 대기 상태, 요청 목록으로 버튼이 표시됩니다.' },
  { id: 'list', label: '목록 반영', title: '목록에 담당자와 기한이 반영됩니다.', text: '목록 카드에서 배정 결과와 정비 대기 상태를 확인합니다.', alt: '정비 요청 목록. 냉각수 펌프에 담당자 이수진, 기한 2026년 10월 7일, 정비 대기 상태가 표시됩니다.' },
];

const flows = {
  normal: { label: '정상 배정', scenes: scenes.filter(scene => scene.id !== 'failure') },
  recovery: {
    label: '실패·재시도',
    scenes: [
      scenes.find(scene => scene.id === 'failure'),
      { ...scenes.find(scene => scene.id === 'saving'), label: '재시도 중', title: '선택을 유지한 채 다시 저장합니다.', text: '실패 후 재시도하는 저장 중 상태입니다.' },
      scenes.find(scene => scene.id === 'success'),
      scenes.find(scene => scene.id === 'list'),
    ],
  },
};

// Native Figma exports are case-study evidence, not a working maintenance app.
export default function AssignmentStory() {
  const [position, setPosition] = useState({ flow: 'normal', index: 0 });
  const viewerRef = useRef(null);
  const flowButtonRefs = useRef({});
  const pictureRef = useRef(null);
  const pagerRef = useRef(null);
  const selectRef = useRef(null);
  const movePending = useRef(false);
  const flow = flows[position.flow];
  const active = position.index;
  const scene = flow.scenes[active];

  const changeScene = (index, flowId = position.flow) => {
    if (flowId === position.flow && index === active) return;
    movePending.current = true;
    setPosition({ flow: flowId, index });
  };

  useLayoutEffect(() => {
    if (!movePending.current) return;
    movePending.current = false;
    if (!window.matchMedia('(max-width: 760px)').matches) {
      // The end-of-flow button disappears after switching. Keep keyboard focus
      // on the newly selected flow instead of dropping it onto the page.
      if (document.activeElement === document.body) flowButtonRefs.current[position.flow]?.focus();
      return;
    }

    let cancelled = false;
    // Wait for the responsive source: a new 320px image can initially reserve
    // the 390px image's taller ratio. Align only after its own size is available.
    const frame = requestAnimationFrame(async () => {
      try { await pictureRef.current.querySelector('img').decode(); } catch { /* Keep navigation usable if an image cannot load. */ }
      if (cancelled) return;
      const picture = pictureRef.current.getBoundingClientRect();
      const controlsHeight = pagerRef.current.getBoundingClientRect().height;
      const topOffset = 72 + controlsHeight + 8;
      const available = Math.max(1, window.innerHeight - topOffset - 16);
      const showAction = ['selected', 'saving', 'failure', 'success'].includes(scene.id);
      const focusOffset = showAction ? Math.max(0, picture.height - available) : 0;
      if (!viewerRef.current.contains(document.activeElement) || document.activeElement?.disabled) {
        selectRef.current.focus({ preventScroll: true });
      }
      window.scrollTo({
        top: Math.max(0, picture.top + window.scrollY + focusOffset - topOffset),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [position, scene.id]);

  return <section className="assignment-story" aria-labelledby="assignment-story-title">
    <div className="assignment-story__intro">
      <p className="case-eyebrow">모바일 배정 흐름</p>
      <h2 id="assignment-story-title">배정 대기 요청을<br /> 목록 반영까지.</h2>
      <p>화면 이미지로 정상 배정과 실패·재시도를 살펴봅니다.</p>
    </div>
    <div className="assignment-story__flows" role="group" aria-label="배정 흐름 선택">
      {Object.entries(flows).map(([id, item]) => <button key={id} ref={element => { flowButtonRefs.current[id] = element; }} type="button" aria-pressed={position.flow === id} aria-controls="assignment-viewer" onClick={() => changeScene(0, id)}>{item.label}<span>{item.scenes.length}장면</span></button>)}
    </div>
    <ol className="assignment-story__steps" aria-label={`${flow.label} 장면 선택`}>
      {flow.scenes.map((item, i) => <li key={item.id}><button type="button" aria-pressed={active === i} aria-controls="assignment-scene" onClick={() => changeScene(i)}><span>{String(i+1).padStart(2,'0')}</span>{item.label}</button></li>)}
    </ol>
    <div className="assignment-story__viewer" id="assignment-viewer" ref={viewerRef}>
      <div className="assignment-story__controls" ref={pagerRef}>
      <nav className="assignment-story__pager" aria-label="이전·다음 장면">
        <button type="button" aria-label="이전 장면" disabled={active === 0} aria-controls="assignment-scene" onClick={() => changeScene(active - 1)}>이전</button>
        <select ref={selectRef} aria-label={`${flow.label} 장면 선택`} value={active} onChange={event => changeScene(Number(event.target.value))} aria-controls="assignment-scene">
          {flow.scenes.map((item,i) => <option key={item.id} value={i}>{String(i+1).padStart(2,'0')} / {String(flow.scenes.length).padStart(2,'0')} · {item.label}</option>)}
        </select>
        <button type="button" aria-label="다음 장면" disabled={active === flow.scenes.length - 1} aria-controls="assignment-scene" onClick={() => changeScene(active + 1)}>다음</button>
      </nav>
      <div className="assignment-story__note" aria-live="polite" aria-atomic="true"><p className="assignment-story__position">{flow.label} · {active + 1} / {flow.scenes.length} · {scene.label}</p><h3>{scene.title}</h3><p>{scene.text}</p></div>
      </div>
      <figure className="assignment-story__screen" id="assignment-scene">
        <figcaption><span>Figma 원본 · {flow.label}</span><a className="assignment-original--regular" href={`${media}seolbigyeol-b3-${scene.id}-390.png`} target="_blank" rel="noopener noreferrer" aria-label={`${scene.label} 원본 이미지 보기 (새 탭)`}>원본 보기</a><a className="assignment-original--small" href={`${media}seolbigyeol-b3-${scene.id}-320.png`} target="_blank" rel="noopener noreferrer" aria-label={`${scene.label} 320px 원본 이미지 보기 (새 탭)`}>원본 보기</a></figcaption>
        <picture ref={pictureRef} key={scene.id}><source media="(max-width: 360px)" srcSet={`${media}seolbigyeol-b3-${scene.id}-320.png`} width="320" height="568" /><img src={`${media}seolbigyeol-b3-${scene.id}-390.png`} alt={scene.alt} width="390" height="844" /></picture>
      </figure>
    </div>
    <div className="assignment-story__actions">
      {active === flow.scenes.length - 1 && <button className="assignment-story__flow-switch" type="button" aria-controls="assignment-viewer" onClick={() => changeScene(0, position.flow === 'normal' ? 'recovery' : 'normal')}>{position.flow === 'normal' ? '실패·재시도 흐름 보기' : '정상 배정으로 돌아가기'}</button>}
      <a className="case-action case-action--primary" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Figma에서 직접 눌러보기</a><a className="assignment-story__design" href={SEOLBI_DESIGN_URL} target="_blank" rel="noopener noreferrer">Figma 설계 요약 보기</a>
      <p>버튼 클릭·스크롤은 Figma 프로토타입에서 확인할 수 있습니다.</p>
    </div>
  </section>;
}
