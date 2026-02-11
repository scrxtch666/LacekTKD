import React from 'react';

const UserProfile = ({ username, displayName, avatarUrl }) => {
  return (
    <div className="flex items-center gap-3 p-2 bg-transparent hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors w-fit">
      {/* Avatar s kruhovým výřezem a okrajem */}
      <div className="relative">
        <img
          src={avatarUrl || "https://via.placeholder.com/40"}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-700"
        />
      </div>

      {/* Textová část - flex-col vytvoří dva řádky pod sebou */}
      <div className="flex flex-col leading-tight">
        <span className="text-white font-bold text-sm tracking-wide">
          {username}
        </span>
        <span className="text-gray-400 text-xs">
          {displayName}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;