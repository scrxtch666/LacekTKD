import { useState } from 'react';

function Body({ children }) {


  return (
    <div className="bg-customGreen container xl: mx-auto">
     
      {children && (
        <div className="children-wrapper">
          {children}
        </div>
      )}
    </div>
  );
}

export default Body;
