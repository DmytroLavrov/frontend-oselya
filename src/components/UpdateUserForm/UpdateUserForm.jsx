import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@features/users/userSlice';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import './UpdateUserForm.scss';

const UpdateUserForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [formData, setFormData] = useState({
    login: userData?.login || '',
    email: userData?.email || '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;

    if (!formData.login || formData.login.length < 3) {
      toast.error('Login must be at least 3 characters long');
      valid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please provide a valid email address');
      valid = false;
    }
    if (!formData.password || formData.password.length < 5) {
      toast.error('Password must be at least 5 characters long');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(updateUser({ id: userData._id, ...formData }))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully!');
      })
      .catch((error) => {
        toast.error(error || 'An error occurred');
      });
  };

  return (
    <>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="account-form__field">
          <label className="account-form__label" htmlFor="login">
            Login *
          </label>
          <input
            className="account-form__input"
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="New login"
            required
          />
        </div>

        <div className="account-form__field">
          <label className="account-form__label" htmlFor="email">
            Email *
          </label>
          <input
            className="account-form__input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="New email"
            required
          />
        </div>

        <div className="account-form__field">
          <label className="account-form__label" htmlFor="password">
            New Password *
          </label>
          <input
            className="account-form__input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New password"
            required
          />
        </div>

        <button className="account-form__btn-save button-primary" type="submit">
          Save changes
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default UpdateUserForm;
