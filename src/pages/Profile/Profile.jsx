import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '@features/users/userSlice';
import { logout } from '@features/users/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const handleLeave = () => {
    if (window.confirm('Are you sure you want to leave?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!isAuth & !window.localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div>Profile</div>
      <button onClick={handleLeave}>Exit</button>
    </>
  );
};

export default Profile;
