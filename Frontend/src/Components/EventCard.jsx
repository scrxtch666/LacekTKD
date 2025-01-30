import React from 'react';
import mainImage from '../assets/Showcase/main.jpg';

const EventCard = () => {
  return (
    <div className="max-w-sm overflow-hidden bg-pink-50 rounded-2xl shadow-xl">
      <div className="relative">
        <img 
          src={mainImage}
          alt="Sports competition"
          className="w-full h-52 object-cover"
        />
        
        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
          <div className="px-4 py-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              BRATISLAVA OPEN
            </h2>
          </div>
        </div>
      </div>
      
      {/* Date Container */}
      <div className="px-4 py-2">
        <div className="flex items-center">
          <span className="text-emerald-600 text-sm font-medium">
            07.08.2017
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;