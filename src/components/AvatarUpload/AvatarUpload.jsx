import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '@features/users/userSlice';

import userIcon from '@assets/icons/user-placeholder.svg';
import acceptIcon from '@assets/icons/check-icon.svg';
import cancelIcon from '@assets/icons/cancel-icon.svg';
import avatarEdit from '@assets/icons/avatar-edit.svg';

import './AvatarUpload.scss';

const AvatarUpload = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null); // Для попереднього перегляду
  const [isEditing, setIsEditing] = useState(false); // Відстежуємо стан редагування

  const handleAvatarChange = (e) => {
    const selectedAvatar = e.target.files[0];
    if (selectedAvatar) {
      const previewUrl = URL.createObjectURL(selectedAvatar);
      setAvatar(selectedAvatar);
      setPreview(previewUrl);
      setIsEditing(true); // Увімкнення режиму редагування
    }
  };

  const handleUploadAvatar = () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('image', avatar);
      formData.append('userId', userData._id);
      dispatch(updateAvatar({ formData, userId: userData._id }));
      resetState(); // Скидання після успішного завантаження
    }
  };

  const handleCancelPreview = () => {
    resetState(); // Скидання стану до початкового
  };

  const resetState = () => {
    setAvatar(null);
    setPreview(null);
    setIsEditing(false); // Вимкнення режиму редагування
  };

  return (
    <div className="profile__avatar avatar">
      <label htmlFor="avatarFile">
        <div className="avatar__wrapper">
          <div className="avatar__hover-image"></div>
          <img className="avatar__edit" src={avatarEdit} alt="avatar-edit" />
          <img
            src={preview || userData?.avatarUrl || userIcon}
            alt="avatar"
            className="avatar__image"
          />
        </div>
      </label>

      <input
        id="avatarFile"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="avatar__input"
      />

      {isEditing && (
        <div className="avatar__actions">
          {/* Кнопка завантаження аватара */}
          <button
            className="avatar__btn avatar__btn--accept"
            onClick={handleUploadAvatar}
          >
            <img src={acceptIcon} alt="upload-icon" />
          </button>

          {/* Кнопка скасування попереднього перегляду */}
          <button
            onClick={handleCancelPreview}
            className="avatar__btn avatar__btn--cancel"
          >
            <img src={cancelIcon} alt="cancel-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
