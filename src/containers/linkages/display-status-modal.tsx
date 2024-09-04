import Image from "next/image";
import { ArrowLeft2 } from "iconsax-react";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface Image {
  url: string;
  caption?: string;
}

interface ImageModalProps {
  images: Image[];
  currentIndex: number;
  onClose: () => void;
}

const DisplayStatusModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  onClose,
}) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [index]);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
    resetTimer();
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
    resetTimer();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handlePrev();
    } else if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const resetTimer = () => {
    // Clear the existing timer and set a new one
    clearInterval(interval);
    interval = setInterval(() => {
      handleNext();
    }, 7000);
  };

  const { url, caption } = images[index];

  let interval: NodeJS.Timeout;

  return (
    <div className="fixed inset-0 bg-[#0B0228] text-white flex flex-col justify-between py-6 z-50">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={onClose}
        />
        <p className="text-[20px] font-bold">Status Updates</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <ArrowLeft
          onClick={handlePrev}
          className="absolute left-0 text-clack text-xl cursor-pointer z-50"
        />

        <div className="relative flex items-center self-center justify-center max-w-full max-h-full min-h-[400px] mx-6">
          <Image
            src={url}
            alt="Large View"
            width={800}
            height={600}
            className="max-w-full max-h-full"
          />
        </div>

        <ArrowRight
          onClick={handleNext}
          className="absolute right-0 text-clack text-xl cursor-pointer z-50"
        />
      </div>

      {caption && <p className="mt-20 text-white text-center">{caption}</p>}

      <div className="text-[#0B0228]">.</div>
      <div className="text-[#0B0228]">.</div>
    </div>
  );
};

export default DisplayStatusModal;
