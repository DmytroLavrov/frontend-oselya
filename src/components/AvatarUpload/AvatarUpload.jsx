import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '@features/users/userSlice';

import userIcon from '@assets/icons/profile/user-placeholder.svg';
import acceptIcon from '@assets/icons/actions/check-icon.svg';
import cancelIcon from '@assets/icons/actions/cancel-icon.svg';
import avatarEdit from '@assets/icons/profile/avatar-edit.svg';

import './AvatarUpload.scss';

const AvatarUpload = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAvatarChange = (e) => {
    const selectedAvatar = e.target.files[0];
    if (selectedAvatar) {
      const previewUrl = URL.createObjectURL(selectedAvatar);
      setAvatar(selectedAvatar);
      setPreview(previewUrl);
      setIsEditing(true);
    }
  };

  const handleUploadAvatar = () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('image', avatar);
      formData.append('userId', userData._id);
      dispatch(updateAvatar({ formData, userId: userData._id }));
      resetState();
    }
  };

  const handleCancelPreview = () => {
    resetState();
  };

  const resetState = () => {
    setAvatar(null);
    setPreview(null);
    setIsEditing(false);
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
          <button
            className="avatar__btn avatar__btn--accept"
            onClick={handleUploadAvatar}
          >
            <img src={acceptIcon} alt="upload-icon" />
          </button>

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
