import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logout } from '@features/users/userSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLeave = () => {
    if (window.confirm('Are you sure you want to leave?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <>
      <div>Profile</div>
      <button onClick={handleLeave}>Exit</button>
    </>
  );
};

export default Profile;
