import { Navigate } from 'react-router-dom';

// Keep existing registration links valid while opening the same company dialog.
export default function ApplicationFormPage() {
  return <Navigate to="/?new=1" replace />;
}
