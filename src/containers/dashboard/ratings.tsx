import { Star } from "lucide-react";
import React, { useState } from "react";

interface RatingProps {
  initialRating?: number;
  maxRating?: number;
  onChange?: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  initialRating = 0,
  maxRating = 5,
  onChange,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index < rating
              ? "bg-[#A81DA6] p-2 rounded-full"
              : "bg-gray-300 p-2 rounded-full"
          }`}
          onClick={() => handleRatingChange(index + 1)}
        >
          <Star />
        </span>
      ))}
    </div>
  );
};

export default Rating;
