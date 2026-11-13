import { useState } from 'react';
import './assignmentStory.css';

const media = `${import.meta.env.BASE_URL}detail/current/`;
export const SEOLBI_DESIGN_URL = 'https://www.figma.com/design/GInxTqHo6Y87DEe3vuhmMw?node-id=970-2192';
const prototypeUrl = 'https://www.figma.com/proto/GInxTqHo6Y87DEe3vuhmMw?node-id=968-1192&starting-point-node-id=968-1192&scaling=scale-down&content-scaling=fixed';
const scenes = [
  { id: 'request', label: '요청 확인', title: '처리에 필요한 정보를 먼저.', text: '담당자·완료 기한·선택 버튼을 사진 위에 모았습니다. 배정 대기 상태에서 할 일을 먼저 읽는 구성입니다.', alt: '배정 대기 요청. 미배정 담당자와 완료 기한 바로 아래 담당자 선택 버튼이 있고, 설비 사진과 증상은 그 다음에 표시됩니다.' },
  { id: 'selected', label: '담당자 선택', title: '선택과 배정 완료를 구분.', text: '접수 증상과 담당 직무를 함께 보여줍니다. 선택한 이름과 ‘아직 배정 전’ 안내를 실행 버튼 위에 남겼습니다.', alt: '담당자 선택. 박성민 기계 정비와 이수진 전기·센서 중 이수진이 선택돼 있으며, 아직 배정 전 안내와 이수진에게 배정 버튼이 표시됩니다.' },
  { id: 'saving', label: '저장 중', title: '진행 상태를 같은 자리에서.', text: '선택한 담당자는 그대로 두고 하단 실행 영역을 저장 중으로 바꿉니다. 처리 중임을 알리고 중복 실행을 막는 상태입니다.', alt: '이수진 선택을 유지한 담당자 선택 화면. 하단에 배정을 저장하고 있다는 안내와 저장 중 버튼이 표시됩니다.' },
  { id: 'failure', label: '실패·재시도', title: '실패해도 선택은 유지.', text: '실패 안내와 다시 시도를 같은 실행 영역에 둡니다. 담당자를 처음부터 다시 고르지 않고 저장을 재시도하는 흐름입니다.', alt: '저장 실패 화면. 이수진 선택을 유지하며 저장 실패 안내와 다시 시도 버튼이 표시됩니다.' },
  { id: 'success', label: '배정 완료', title: '배정 완료는 정비 완료와 다르게.', text: '배정한 이름을 확인하고, 처리 현황은 정비 보고 대기로 이어집니다. 하단의 요청 목록으로 버튼으로 복귀합니다.', alt: '배정 완료 화면. 이수진에게 배정했다는 안내, 정비 보고 대기 상태, 요청 목록으로 버튼이 표시됩니다.' },
  { id: 'list', label: '목록 반영', title: '돌아온 목록에서도 결과 확인.', text: '냉각수 펌프 카드에 이수진과 기한, 정비 대기 상태를 표시합니다. 요청 상세로 다시 들어갈 수 있습니다.', alt: '정비 요청 목록. 냉각수 펌프에 담당자 이수진, 기한 2026년 10월 7일, 정비 대기 상태가 표시됩니다.' },
];

// Native Figma exports are case-study evidence, not a working maintenance app.
export default function AssignmentStory() {
  const [active, setActive] = useState(0);
  const scene = scenes[active];
  return <section className="assignment-story" aria-labelledby="assignment-story-title">
    <div className="assignment-story__intro">
      <p className="case-eyebrow">모바일 배정 흐름</p>
      <h2 id="assignment-story-title">배정 대기 요청을<br /> 목록 반영까지.</h2>
      <p>확인, 선택, 저장 이후의 상태를 하나의 흐름으로 연결했습니다.</p>
    </div>
    <ol className="assignment-story__steps" aria-label="Figma 장면 선택">
      {scenes.map((item, i) => <li key={item.id}><button type="button" aria-pressed={active === i} aria-controls="assignment-scene" onClick={() => setActive(i)}><span>{String(i+1).padStart(2,'0')}</span>{item.label}</button></li>)}
    </ol>
    <label className="assignment-story__select">장면 선택
      <select value={active} onChange={event => setActive(Number(event.target.value))} aria-controls="assignment-scene">
        {scenes.map((item,i) => <option key={item.id} value={i}>{String(i+1).padStart(2,'0')} · {item.label}</option>)}
      </select>
    </label>
    <div className="assignment-story__note" aria-live="polite" aria-atomic="true"><h3>{scene.title}</h3><p>{scene.text}</p></div>
    <figure className="assignment-story__screen" id="assignment-scene">
      <picture key={scene.id}><source media="(max-width: 360px)" srcSet={`${media}seolbigyeol-b3-${scene.id}-320.png`} width="320" height="568" /><img src={`${media}seolbigyeol-b3-${scene.id}-390.png`} alt={scene.alt} width="390" height="844" /></picture>
      <figcaption><span>Figma 원본 화면 · 이미지 미리보기</span><a className="assignment-original--regular" href={`${media}seolbigyeol-b3-${scene.id}-390.png`} target="_blank" rel="noopener noreferrer" aria-label={`${scene.label} 원본 이미지 보기 (새 탭)`}>원본 보기</a><a className="assignment-original--small" href={`${media}seolbigyeol-b3-${scene.id}-320.png`} target="_blank" rel="noopener noreferrer" aria-label={`${scene.label} 320px 원본 이미지 보기 (새 탭)`}>원본 보기</a></figcaption>
    </figure>
    <nav className="assignment-story__pager" aria-label="이전·다음 장면">
      <p>{String(active + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')} · {scene.label}</p>
      <div>
        <button type="button" disabled={active === 0} aria-controls="assignment-scene" onClick={() => setActive(index => Math.max(0, index - 1))}>이전 장면</button>
        <button type="button" disabled={active === scenes.length - 1} aria-controls="assignment-scene" onClick={() => setActive(index => Math.min(scenes.length - 1, index + 1))}>다음 장면</button>
      </div>
    </nav>
    <div className="assignment-story__actions">
      <a className="case-action case-action--primary" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Figma에서 직접 눌러보기</a><a className="assignment-story__design" href={SEOLBI_DESIGN_URL} target="_blank" rel="noopener noreferrer">Figma 설계 요약 보기</a>
      <p>위 장면은 화면 비교용 이미지입니다. 실제 클릭·스크롤은 Figma 프로토타입에서 확인할 수 있습니다.</p>
    </div>
  </section>;
}
