import { ListLink, StockLedger } from './UI';
import { findSensorExample, incoming, materialHistory, orderItems, qty } from './inventory';
import { day } from './model';
import './sensorSlip.css';

// A schematic of a reflective sensor, not a drawing of a specific vendor's part.
function SensorDrawing() {
  return (
    <svg className="sensor-sketch" viewBox="0 0 148 104" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="m28 34 43-18 36 18-43 19Z" fill="#567593"/>
        <path d="m28 34 36 19v40L28 74Z" fill="#293f59"/>
        <path d="m64 53 43-19v41L64 93Z" fill="#3e5c7b"/>
        <path d="m33 42 25 13v23L33 65Z" fill="#21384e"/>
        <ellipse cx="45" cy="60" rx="6" ry="9" transform="rotate(-27 45 60)" fill="#9ac9cf"/>
        <path d="m70 59 31-14m-31 19 31-14" opacity=".65"/>
        <ellipse cx="73" cy="77" rx="2.5" ry="3.4"/>
        <ellipse cx="97" cy="66" rx="2.5" ry="3.4"/>
        <path d="m91 80 7 4c10 6 19 1 21-7s6-13 16-14"/>
        <path d="m39 58-22-1m23 6-23 9" stroke="#a0d9dc" strokeDasharray="3 4"/>
      </g>
      <path d="M9 20v-7h7m113 76h7v-7" stroke="currentColor" opacity=".55"/>
    </svg>
  );
}

export default function SensorSlip({ data, materials }) {
  const material = materials.find(item => /포토\s*센서|광전\s*센서/.test(item.name));
  if (!material) return null;

  const example = findSensorExample(data, material.id);
  const ordered = data.requests
    .filter(request => request.status === 'ordered')
    .flatMap(orderItems)
    .filter(item => item.materialId === material.id)
    .reduce((sum, item) => sum + Number(item.quantity), 0);
  const outstanding = incoming(data, material.id);
  const lastIssue = materialHistory(data, material.id).find(event => event.type === '지급');

  return (
    <section className="sensor-slip" aria-labelledby="sensor-slip-title">
      {example && <ListLink id="home-sensor-example" className="sensor-slip-example" to={`/requests/${example.id}`}>
        <span>포토센서 5개의 품의부터 <span className="sensor-slip-case-end">현장 지급까지</span></span>
        <strong>대표 품의 보기</strong>
      </ListLink>}
      <div className="sensor-slip-plate">
        <div className="sensor-slip-identity">
          <span className="sensor-slip-label">자재 입출고 전표</span>
          <h2 id="sensor-slip-title">{material.name}</h2>
          <span className="sensor-slip-code">{material.code}</span>
        </div>
        <SensorDrawing/>
      </div>
      <div className="sensor-slip-body">
        <div className="sensor-slip-order">
          <span>누적 발주 <strong>{qty(ordered)}</strong></span>
          <span>미입고 <strong>{qty(outstanding)}</strong></span>
        </div>
        <StockLedger data={data} materialId={material.id}/>
        <div className="sensor-slip-foot">
          {lastIssue ? (
            <dl className="sensor-slip-issue">
              <div><dt>최근 지급일</dt><dd><time dateTime={lastIssue.date}>{day(lastIssue.date)}</time></dd></div>
              <div><dt>받은 부서</dt><dd>{lastIssue.department || '미기록'}</dd></div>
              <div><dt>기록번호</dt><dd className="sensor-slip-reference">{lastIssue.id}</dd></div>
            </dl>
          ) : <p>아직 지급 기록이 없습니다.</p>}
          <ListLink id="home-sensor-history" to={`/materials/${material.id}#movement-history`} aria-label={`${material.name} 입출고 이력 보기`}>이력 보기</ListLink>
        </div>
      </div>
    </section>
  );
}
