import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'SELECT' ||
        target?.closest('button') ||
        target?.closest('a') ||
        target?.dataset.cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth lerp loop for the outer glow ring
    const loop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Outer Magnetic Glowing Ring */}
      <div
        className="fixed rounded-full transition-transform duration-100 ease-out border pointer-events-none"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '48px' : '26px',
          height: isHovered ? '48px' : '26px',
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.75 : 1})`,
          borderColor: isHovered ? 'rgba(163, 230, 53, 0.8)' : 'rgba(34, 197, 94, 0.4)',
          backgroundColor: isHovered ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
          boxShadow: isHovered
            ? '0 0 25px rgba(163, 230, 53, 0.4), inset 0 0 10px rgba(34, 197, 94, 0.2)'
            : '0 0 10px rgba(34, 197, 94, 0.15)',
        }}
      />

      {/* Inner Precision Crosshair / Dot */}
      <div
        className="fixed rounded-full pointer-events-none bg-kbj-lime"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(163, 230, 53, 0.9)',
        }}
      />
    </div>
  );
};
