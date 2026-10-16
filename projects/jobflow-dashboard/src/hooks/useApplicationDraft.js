import { useEffect, useRef, useState } from 'react';
import { applicationDraftStore, applicationFormValues, sameApplicationValues } from '../utils/applicationDraftStore';

export default function useApplicationDraft({ scope, recordId, initial }) {
  const [baseline] = useState(() => applicationFormValues(initial));
  const [recovered] = useState(() => applicationDraftStore.read(scope, recordId));
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

  return { form, change, clear, dirty, restored };
}
