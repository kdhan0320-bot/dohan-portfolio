import { useEffect, useRef, useState } from 'react';
import { useWorkspace } from './Workspace';
import { Modal, FormError } from './UI';

const emptyVendor = () => ({ name: '', contact: '', phone: '', email: '', note: '' });
function Field({ label, children, optional }) {
  return <label className="field"><span>{label}{optional && <small className="optional">선택</small>}</span>{children}</label>;
}
function VendorFields({ form, set }) {
  return <div className="form-grid">
    <div className="full"><Field label="업체명"><input maxLength="100" value={form.name} onChange={e => set('name', e.target.value)} required placeholder="가상 업체명"/></Field></div>
    <Field label="담당자" optional><input maxLength="60" value={form.contact} onChange={e => set('contact', e.target.value)}/></Field>
    <Field label="전화" optional><input type="tel" maxLength="30" value={form.phone} onChange={e => set('phone', e.target.value)}/></Field>
    <div className="full"><Field label="이메일" optional><input type="email" maxLength="120" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@example.com"/></Field></div>
    <div className="full"><Field label="취급 자재·메모" optional><textarea rows="2" maxLength="300" value={form.note} onChange={e => set('note', e.target.value)}/></Field></div>
  </div>;
}
export function VendorForm({ vendor, onClose, onSaved }) {
  const { putVendor, setNotice } = useWorkspace();
  const [form, setForm] = useState(vendor || emptyVendor()), [error, setError] = useState('');
  const set = (key, value) => { setForm(old => ({ ...old, [key]: value })); setError(''); };
  const submit = e => {
    e.preventDefault();
    try {
      const saved = putVendor(form, vendor?.id);
      onSaved?.(saved);
      setNotice(vendor ? '업체 정보를 수정했습니다. 이전 문서의 업체명은 보존됩니다.' : onSaved ? '업체를 등록하고 작성 중인 품의에 선택했습니다.' : '업체를 등록했습니다. 자재와 구매 품의에서 선택할 수 있습니다.');
      onClose();
    } catch (err) { setError(err.message); }
  };
  return <Modal title={vendor ? '업체 정보 수정' : '새 업체 등록'} onClose={onClose}>
    <form noValidate onSubmit={submit}><VendorFields form={form} set={set}/><FormError>{error}</FormError>
      <div className="dialog-actions"><button type="button" className="button secondary" onClick={onClose}>취소</button><button className="button primary" type="submit">{vendor ? '수정 저장' : onSaved ? '등록 후 선택' : '업체 등록'}</button></div>
    </form>
  </Modal>;
}
export function MaterialForm({ material, defaultVendorId = '', onClose, onSaved }) {
  const { vendors, putMaterial, putVendor, setNotice } = useWorkspace();
  const [form, setForm] = useState(material || { code: '', name: '', spec: '', vendorId: defaultVendorId, price: '' });
  const [vendorMode, setVendorMode] = useState(false), [vendorDraft, setVendorDraft] = useState(emptyVendor), [error, setError] = useState('');
  const formRef = useRef(null), vendorTrigger = useRef(null), previousMode = useRef(false);
  useEffect(() => {
    if (vendorMode) formRef.current?.querySelector('input')?.focus();
    else if (previousMode.current) vendorTrigger.current?.focus();
    previousMode.current = vendorMode;
  }, [vendorMode]);
  const set = (key, value) => { setForm(old => ({ ...old, [key]: value })); setError(''); };
  const returnToMaterial = () => { setError(''); setVendorMode(false); };
  const close = vendorMode ? returnToMaterial : onClose;
  const submit = e => {
    e.preventDefault();
    try {
      if (vendorMode) {
        const saved = putVendor(vendorDraft);
        setForm(old => ({ ...old, vendorId: saved.id }));
        setVendorDraft(emptyVendor()); returnToMaterial();
        setNotice('새 업체를 기본 업체로 선택했습니다. 자재 작성을 이어가세요.');
      } else {
        const saved = putMaterial(form, material?.id);
        onSaved?.(saved, vendors.find(v => v.id === saved.vendorId));
        setNotice(material ? '자재 정보를 수정했습니다. 이전 문서는 변경하지 않습니다.' : onSaved ? '자재를 등록하고 작성 중인 품의에 선택했습니다.' : '자재를 등록했습니다. 입고 전 보유 수량은 0 EA입니다.');
        onClose();
      }
    } catch (err) { setError(err.message); }
  };
  return <Modal title={vendorMode ? '새 업체 등록' : material ? '자재 정보 수정' : '새 자재 등록'} onClose={close}>
    {vendorMode && <p className="dialog-context">등록 후 작성 중인 자재로 돌아갑니다.</p>}
    <form noValidate onSubmit={submit} ref={formRef}>
      {vendorMode ? <VendorFields form={vendorDraft} set={(key, value) => { setVendorDraft(old => ({ ...old, [key]: value })); setError(''); }}/> : <>
        <div className="form-grid">
          <Field label="자재코드"><input maxLength="24" readOnly={Boolean(material)} placeholder="예: SEN-PH-02" value={form.code} onChange={e => set('code', e.target.value)} required/></Field>
          <Field label="자재명"><input maxLength="100" placeholder="예: 포토센서" value={form.name} onChange={e => set('name', e.target.value)} required/></Field>
          <div className="full"><Field label="규격"><input maxLength="150" placeholder="형식·검출 방식·전압 등" value={form.spec} onChange={e => set('spec', e.target.value)} required/></Field></div>
          <Field label="기본 업체"><select value={form.vendorId} onChange={e => set('vendorId', e.target.value)} required><option value="">업체 선택</option>{vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select></Field>
          <Field label="기준 단가 (원)"><input type="number" inputMode="numeric" min="1" value={form.price} onChange={e => set('price', e.target.value)} required/></Field>
        </div>
        <button type="button" ref={vendorTrigger} className="text-button catalog-register" onClick={() => { setError(''); setVendorMode(true); }}>새 업체 등록</button>
        <p className="muted form-footnote">단위 EA · 보관 장소 1곳 · 단가는 부가세 포함</p>
      </>}
      <FormError>{error}</FormError>
      <div className="dialog-actions"><button type="button" className="button secondary" onClick={close}>{vendorMode ? '자재 작성으로' : '취소'}</button><button className="button primary" type="submit">{vendorMode ? '등록 후 자재로' : material ? '수정 저장' : onSaved ? '등록 후 선택' : '자재 등록'}</button></div>
    </form>
  </Modal>;
}
