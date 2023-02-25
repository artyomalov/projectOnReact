import { useSelector } from 'react-redux';
import HeaderLayoutUser from '../components/pages/HeaderLayoutUser';
export default function HeaderChecker({ children }) {
  const adminAuth = useSelector((state) => state.admin.isLogined);
  if (!adminAuth) {
    return <HeaderLayoutUser />;
  }
  return children;
}
