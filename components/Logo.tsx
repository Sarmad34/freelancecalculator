import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100" height="100" rx="24" fill="#2563eb" />
    <path 
      d="M35 25H65V35H45V45H60V55H45V75H35V25Z" 
      fill="white" 
    />
    <rect x="55" y="65" width="10" height="10" rx="2" fill="white" fillOpacity="0.3" />
    <rect x="55" y="50" width="10" height="10" rx="2" fill="white" fillOpacity="0.3" />
  </svg>
);
