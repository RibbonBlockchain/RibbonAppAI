import Image from "next/image";
import { ArrowLeft2, Trash } from "iconsax-react";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDeleteLinkageStatus } from "@/api/linkage";
import toast from "react-hot-toast";

interface Image {
  url: string;
  caption?: string;
  linkageLogo?: string;
  linkageName: string;
  updatedTime: string;
  linkageId: number;
  statusId: number;
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
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const deleteButtonRef = useRef<HTMLDivElement>(null);
  const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      handleNext();
    }, 7000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [index]);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteButton]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      deleteButtonRef.current &&
      !deleteButtonRef.current.contains(event.target as Node)
    ) {
      setShowDeleteButton(false);
    }
  };

  const {
    url,
    caption,
    linkageLogo,
    linkageName,
    updatedTime,
    linkageId,
    statusId,
  } = images[index];

  const { mutate } = useDeleteLinkageStatus();

  const handleDelete = () => {
    mutate(
      { linkageId, statusId },
      {
        onSuccess: () => {
          toast.success("Status deleted");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-[#0B0228] text-white flex flex-col justify-between py-6 z-50">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={onClose}
        />

        <div className="w-full mr-4 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={linkageLogo || "/assets/sample-logo.png"}
              alt="Linkage Logo"
              width={56}
              height={56}
              className="max-w-[56px] max-h-[56px] rounded-full"
            />
            <div className="flex flex-col text-white">
              <p className="text-sm font-bold">{linkageName}</p>
              <p className="text-xs font-normal">{updatedTime}</p>
            </div>
          </div>

          <div ref={deleteButtonRef} className="self-center pr-2">
            <Image
              alt="icon"
              width={24}
              height={24}
              src="/assets/option-icon.png"
              className="relative cursor-pointer"
              onClick={() => setShowDeleteButton((prev) => !prev)}
            />

            {showDeleteButton && (
              <div className="absolute right-6">
                <button
                  className="w-fit flex flex-row gap-1 items-center justify-center p-2 bg-[#3f3952] rounded-[12px] border border-white text-white text-sm font-semibold"
                  onClick={handleDelete}
                >
                  <Trash size={20} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div></div>

      <div className="flex flex-col items-center justify-center">
        <ArrowLeft
          onClick={handlePrev}
          className="absolute left-0 text-white text-xl cursor-pointer z-50"
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
          className="absolute right-0 text-white text-xl cursor-pointer z-50"
        />
      </div>

      {caption && <p className="mt-20 text-white text-center">{caption}</p>}

      <div className="text-[#0B0228]">.</div>
      <div className="text-[#0B0228]">.</div>
    </div>
  );
};

export default DisplayStatusModal;
