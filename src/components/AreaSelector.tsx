
import { useEffect, useState, useRef, MouseEvent } from 'react';

interface AreaSelectorProps {
  onAreaSelected: (area: { x: number; y: number; width: number; height: number }) => void;
  onCancel: () => void;
  isActive: boolean;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ onAreaSelected, onCancel, isActive }) => {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentPoint, setCurrentPoint] = useState<{ x: number; y: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      resetSelection();
    }
  }, [isActive]);

  const resetSelection = () => {
    setStartPoint(null);
    setCurrentPoint(null);
    setIsSelecting(false);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!isActive) return;
    
    setStartPoint({ x: e.clientX, y: e.clientY });
    setCurrentPoint({ x: e.clientX, y: e.clientY });
    setIsSelecting(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSelecting || !isActive) return;
    setCurrentPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!isSelecting || !startPoint || !currentPoint || !isActive) return;

    const x = Math.min(startPoint.x, currentPoint.x);
    const y = Math.min(startPoint.y, currentPoint.y);
    const width = Math.abs(currentPoint.x - startPoint.x);
    const height = Math.abs(currentPoint.y - startPoint.y);

    if (width > 10 && height > 10) {
      onAreaSelected({ x, y, width, height });
    } else {
      onCancel();
    }

    resetSelection();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isActive) {
      onCancel();
      resetSelection();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  const selectionStyle = () => {
    if (!startPoint || !currentPoint) return {};

    const x = Math.min(startPoint.x, currentPoint.x);
    const y = Math.min(startPoint.y, currentPoint.y);
    const width = Math.abs(currentPoint.x - startPoint.x);
    const height = Math.abs(currentPoint.y - startPoint.y);

    return {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`
    };
  };

  if (!isActive) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/30 cursor-crosshair z-50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
        <p className="text-lg font-medium bg-recorder-accent/80 px-4 py-2 rounded-lg">
          Click and drag to select area
        </p>
      </div>
      {startPoint && currentPoint && (
        <div className="area-selection" style={selectionStyle()} />
      )}
    </div>
  );
};

export default AreaSelector;
