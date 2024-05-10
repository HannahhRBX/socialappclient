import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Authentification function to prevent users from accessing pages without being logged in
const Authenticate = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token === null) {
      navigate('/login');
    }
  }, [user, navigate]);
};

export default Authenticate;