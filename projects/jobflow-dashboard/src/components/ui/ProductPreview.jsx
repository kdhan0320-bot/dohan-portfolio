import { CompanyMark } from './PageUI';
import { monthCells, WEEKDAYS } from '../../utils/calendar';
import { BOARD_COLUMNS } from '../../utils/applicationBoard';

/** Original product illustration, using fictional sample records rather than external artwork. */
export default function ProductPreview({ view = 'board' }) {
  return <div className={`product-window product-window-${view}`}>
    <div className="product-window-bar"><strong>나의 입사지원 관리</strong><span className="sample-stamp">2026.09.27 기준 · 샘플</span></div>
    {view === 'board' && <div className="product-board" role="img" aria-label="지원 전 모션브릿지, 서류 전형 라이트웨이브, 면접 블루핀랩으로 구분한 예시">
      {['지원 전', '서류 전형', '면접'].map((label, i) => <div className={`product-lane product-lane-${i}`} key={label} style={{ '--preview-color': BOARD_COLUMNS[i].color, '--preview-tint': BOARD_COLUMNS[i].tint }}>
        <div className="product-lane-label"><i />{label}<span>1</span></div>
        <div className="product-card"><CompanyMark name={['모션브릿지', '라이트웨이브', '블루핀랩'][i]} /><strong>{['모션브릿지', '라이트웨이브', '블루핀랩'][i]}</strong><p>{['웹 퍼블리셔', '웹 디자이너', 'UX/UI 디자이너'][i]}</p><span className="product-card-status">{['지원 예정', '서류 진행', '면접 예정'][i]}</span></div>
        {i === 0 && <div className="product-date-tag">9.29 마감 <strong>D−2</strong></div>}
      </div>)}
    </div>}
    {view === 'calendar' && <div className="product-calendar" role="img" aria-label="2026년 9월 달력에서 29일 모션브릿지 지원 마감 표시">
      <div><strong className="product-month">2026. 09</strong><div className="product-mini-week">{WEEKDAYS.map(d => <span key={d}>{d}</span>)}</div><div className="product-mini-days">{monthCells('2026-09').slice(0, 35).map(d => <span key={d} className={`${d.startsWith('2026-09') ? '' : 'outside'} ${d === '2026-09-29' ? 'marked' : ''}`}>{Number(d.slice(8))}</span>)}</div></div>
      <div className="product-date-card"><span>가장 가까운 마감</span><strong>29<small>화요일</small></strong><b>모션브릿지</b><p>이력서 준비하기</p></div>
    </div>}
    {view === 'checklist' && <div className="product-checklist" role="img" aria-label="이력서 점검 완료, 지원동기 작성과 면접 답변 연습이 남은 준비 체크 예시">
      <div className="product-check-title"><strong>하나씩, 준비 완료.</strong><span>1 / 3</span></div>
      {['이력서 최종 점검', '지원동기 작성', '면접 답변 연습'].map((task, i) => <div className={`product-task ${i === 0 ? 'complete' : ''}`} key={task}><span aria-hidden="true">{i === 0 ? '✓' : ''}</span><strong>{task}</strong><small>{i === 2 ? '면접' : '서류'}</small></div>)}
    </div>}
  </div>;
}
