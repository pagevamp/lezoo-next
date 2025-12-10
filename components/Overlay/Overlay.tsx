import React from 'react';

interface OverlayProps {
  className?: string;
}

export const Overlay: React.FC<OverlayProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none h-[100px] md:h-[200px] z-1 bg-gradient-to-b from-black to-transparent ${className}`}
    />
  );
};
