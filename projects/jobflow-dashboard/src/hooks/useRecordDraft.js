import { useSyncExternalStore } from 'react';
import { useAuth } from '../context/AuthContext';
import { recordDraftStore } from '../utils/recordDraftStore';

export default function useRecordDraft(kind) {
  const { user, isGuest } = useAuth();
  const scope = isGuest ? 'sample' : user?.id ? `user:${user.id}` : null;
  useSyncExternalStore(recordDraftStore.subscribe, recordDraftStore.getRevision);
  return {
    pending: recordDraftStore.latest(scope, kind),
    read: recordId => recordDraftStore.read(scope, kind, recordId),
    write: (recordId, values, baseline) => recordDraftStore.write(scope, kind, recordId, values, baseline),
    clear: (recordId, values) => recordDraftStore.clear(scope, kind, recordId, values),
    save: (recordId, values, saveRecord) => recordDraftStore.save(scope, kind, recordId, values, saveRecord),
  };
}
