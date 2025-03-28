import React, { useState } from 'react';

// Custom icon components
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2"/>
    <path d="M10 8l6 4-6 4V8z" strokeWidth="2"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" strokeWidth="2"/>
  </svg>
);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-6 w-6" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div 
          key={day}
          className="h-6 w-6 flex items-center justify-center text-xs"
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="w-full h-64 card font-sans flex flex-col">
      {/* Header section - zmenšený padding a mezery */}
      <div className="flex items-start gap-2 mb-2">
        <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0" />
        <div>
          <div className="text-xs text-gray-600">Rick Astley</div>
          <div className="text-sm font-medium">Get Rickrolled</div>
        </div>
      </div>

      {/* Description section - kompaktnější */}
      

      {/* Calendar section */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div className="flex gap-4">
            <button onClick={handlePrevMonth} className="text-gray-600">
              <ChevronLeft />
            </button>
            <button onClick={handleNextMonth} className="text-gray-600">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0 flex-1">
          {weekDays.map(day => (
            <div key={day} className="h-6 flex items-center justify-center text-xs text-gray-500">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;