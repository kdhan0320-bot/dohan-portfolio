import { useWorkspace } from './Workspace';
import { Modal, WorkflowStatus, StockLedger } from './UI';
import { comparisonLines, incoming, qty, materialHistory } from './inventory';
import { money, amount } from './model';

export function ComparisonQuantities({ item, ordered }) {
  return <dl className="comparison-quantities"><div><dt>{ordered ? '발주' : '요청'}</dt><dd>{qty(item.quantity)}</dd></div>{ordered ? <><div><dt>입고</dt><dd>{qty(item.received)}</dd></div><div className="remaining"><dt>미입고</dt><dd>{qty(item.remaining)}</dd></div></> : <div><dt>발주</dt><dd className="not-ordered">등록 전</dd></div>}</dl>;
}

// Read-only lookup keeps the editor mounted; closing restores the triggering button.
export default function RecordPreview({ record, materialIds, onClose, mode = 'write' }) {
  const { data } = useWorkspace();
  const request = record.type === 'request' && data.requests.find(r => r.id === record.id);
  const material = record.type === 'material' && data.materials.find(m => m.id === record.id);
  const close = <div className="dialog-actions"><button type="button" className="button secondary" onClick={onClose}>{mode === 'review' ? '검토로 돌아가기' : '작성으로 돌아가기'}</button></div>;
  return <Modal title={request ? '진행 중인 구매 확인' : '보유·미입고 확인'} className="record-preview" focusClose onClose={onClose}>
    <p className="preview-context">{mode === 'review' ? '검토 중인 품의와 위치는 그대로 유지됩니다.' : '작성 중인 내용은 그대로 유지됩니다.'}</p>
    {request && <><div className="preview-heading"><span className="mono">{request.id} · {request.revision}차</span><h3>{request.title}</h3><WorkflowStatus data={data} request={request} quantity={false}/></div>
      <div className="preview-materials">{comparisonLines(data, request, materialIds).map(item => <section key={item.index}><h4>{item.name}</h4><p>{item.spec}</p><ComparisonQuantities item={item} ordered={request.status === 'ordered'}/></section>)}</div>
      <dl className="preview-facts"><div><dt>구매 업체</dt><dd>{request.supplier}</dd></div><div><dt>요청 부서</dt><dd>{request.department}</dd></div><div><dt>{request.status === 'ordered' ? '입고 예정일' : '희망 납기일'}</dt><dd>{request.order?.expectedDate || request.needBy}</dd></div><div><dt>요청서 전체 금액</dt><dd>{money(amount(request))}</dd></div><div className="full"><dt>구매 사유</dt><dd>{request.purpose}</dd></div></dl>
    </>}
    {material && <><div className="preview-heading"><span className="mono">{material.code}</span><h3>{material.name}</h3><p>{material.spec}</p></div><StockLedger data={data} materialId={material.id}/><p className="preview-incoming">발주 후 미입고 <strong>{qty(incoming(data, material.id))}</strong></p><h4 className="preview-history-title">최근 입고·지급</h4><ul className="preview-history">{materialHistory(data, material.id).slice(0, 3).map((h, i) => <li key={`${h.id}-${i}`}><span>{h.date} · {h.type}<small>{h.party}</small></span><strong>{h.quantity > 0 ? '+' : '−'}{qty(Math.abs(h.quantity))}</strong></li>)}</ul>{!materialHistory(data, material.id).length && <p className="muted">아직 기록이 없습니다.</p>}</>}
    {close}
  </Modal>;
}
