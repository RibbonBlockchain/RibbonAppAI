import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface SlippageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSlippageChange: (slippage: number) => void;
}

const SlippageModal: React.FC<SlippageModalProps> = ({
  isOpen,
  onClose,
  onSlippageChange,
}) => {
  const [slippage, setSlippage] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);

  const sliderButtonRef = useRef<HTMLDivElement | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - (sliderButtonRef.current?.offsetLeft || 0)); // Get initial position
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderContainerRef.current || !sliderButtonRef.current)
      return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    // Calculate the new position
    let newX = clientX - startX;
    const containerWidth = sliderContainerRef.current.offsetWidth;
    const buttonWidth = sliderButtonRef.current.offsetWidth;

    // Constrain the new position within the slider
    if (newX < 0) newX = 0;
    if (newX > containerWidth - buttonWidth)
      newX = containerWidth - buttonWidth;

    setCurrentX(newX);

    // Calculate slippage value based on the button's position
    const newSlippage = Math.round(
      (newX / (containerWidth - buttonWidth)) * 100
    );
    setSlippage(newSlippage);
    onSlippageChange(newSlippage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => handleMouseMove(e);
    const handleTouchEnd = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <>
      <main className="fixed inset-0 bg-opacity-70 bg-black flex items-center justify-center z-50 px-2">
        <div className=" flex flex-col w-full max-w-[420px] bg-white text-black bg-opacity-75 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <div className="w-full flex self-end justify-end">
            <X
              width={24}
              height={24}
              onClick={onClose}
              className="text-black mb-4 rounded-lg cursor-pointer"
            />
          </div>

          <div
            ref={sliderContainerRef}
            className="relative w-full h-6 bg-gray-200 rounded-full mb-5"
          >
            <div
              ref={sliderButtonRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown} // Added touch event handler
              className="absolute w-6 h-6 bg-green-500 rounded-full cursor-pointer top-1/2 transform -translate-y-1/2"
              style={{ left: `${currentX}px` }}
            />
          </div>

          <div className="mt-1">
            <strong>Slippage: </strong>
            {slippage}%
          </div>
        </div>
      </main>
    </>
  );
};

export default SlippageModal;
