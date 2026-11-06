import { useEffect, useRef, useState } from 'react';
import { applicationDraftStore, applicationFormValues, sameApplicationValues } from '../utils/applicationDraftStore';

export default function useApplicationDraft({ scope, recordId, initial }) {
  const [baseline, setBaseline] = useState(() => applicationFormValues(initial));
  const [recovered, setRecovered] = useState(() => applicationDraftStore.read(scope, recordId));
  const [form, setForm] = useState(() => recovered || baseline);
  const formRef = useRef(form);
  const dirty = !sameApplicationValues(form, baseline);
  const restored = Boolean(recovered && !sameApplicationValues(recovered, baseline));

  useEffect(() => {
    if (!dirty) return;
    const protectUnload = event => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', protectUnload);
    return () => window.removeEventListener('beforeunload', protectUnload);
  }, [dirty]);

  function change(field, value) {
    const next = { ...formRef.current, [field]: value };
    // Write before React renders so an immediate Back action cannot lose input.
    applicationDraftStore.write(scope, recordId, next, baseline);
    formRef.current = next;
    setForm(next);
  }

  function clear() {
    applicationDraftStore.clear(scope, recordId, formRef.current);
  }

  function reset() {
    clear();
    formRef.current = baseline;
    setForm(baseline);
    setRecovered(null);
  }

  // A quick status save must update the editor baseline without saving or
  // discarding any other restored fields (for example an unfinished memo).
  function acceptSavedFields(fields) {
    const nextBaseline = applicationFormValues({ ...baseline, ...fields });
    // A browser Back/reopen can create a newer draft while the request runs.
    // Rebase that draft instead of writing this older panel's captured inputs.
    const latest = applicationDraftStore.read(scope, recordId);
    const next = applicationFormValues(latest || nextBaseline);
    for (const [field, value] of Object.entries(fields)) {
      if (!latest || latest[field] === formRef.current[field]) next[field] = value;
    }
    if (sameApplicationValues(next, nextBaseline)) applicationDraftStore.clear(scope, recordId, latest || formRef.current);
    else applicationDraftStore.write(scope, recordId, next, nextBaseline);
    formRef.current = next;
    setBaseline(nextBaseline);
    setForm(next);
    setRecovered(sameApplicationValues(next, nextBaseline) ? null : next);
  }

  return { form, change, clear, reset, acceptSavedFields, dirty, restored };
}
