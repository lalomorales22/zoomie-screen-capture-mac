
import React, { useState, useRef, useEffect } from 'react';

interface DraggableWidgetProps {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ 
  children, 
  initialPosition = { x: 100, y: 100 },
  className = '' 
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={widgetRef}
      className={`${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      <div 
        className="draggable-handle w-full p-1 flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1 bg-gray-600/50 rounded-full" />
      </div>
      {children}
    </div>
  );
};

export default DraggableWidget;
