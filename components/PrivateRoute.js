import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.userInfo);
  const isAuthorized = user && (!role || user.role === role);

  useEffect(() => {
    console.log('User info:', user); 
    if (!user) {
      console.log('User not logged in, redirecting to login');
      router.replace('/login');
    } else if (role && user.role !== role) {
      console.log('User role mismatch, redirecting to home');
      router.replace('/');
    }
  }, [user, role, router]);

  
  if (!isAuthorized) {
    return null; 
  }

  return children;
};

export default PrivateRoute;
