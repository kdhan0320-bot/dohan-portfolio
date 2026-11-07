import { useAuth } from '../context/authState';
import { DEMO_TODAY } from '../constants';
export function useToday() {
  const {
    isGuest
  } = useAuth();
  const now = new Date();
  return isGuest ? DEMO_TODAY : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
