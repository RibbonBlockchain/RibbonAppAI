import React from "react";

const RatingCompleted = ({ rating }: { rating: number }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-[20px] ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default RatingCompleted;
