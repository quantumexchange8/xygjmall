import React from 'react';
import userImage from '../assets/user-profile-image.jpg';

const ProfileIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        className="w-36 h-36 rounded-full object-cover border-1 border-black"
        src={userImage}
        alt="User profile"
      />
    </div>
  );
};

export default ProfileIcon;
