import { useClaimDailyRewards } from "@/api/user";
import React, { useState } from "react";

const dailyRewardsData = [
  { day: 1, reward: "100 coins" },
  { day: 2, reward: "200 coins" },
  { day: 3, reward: "300 coins" },
  { day: 4, reward: "400 coins" },
  { day: 5, reward: "500 coins" },
  { day: 6, reward: "600 coins" },
  { day: 7, reward: "700 coins" },
  { day: 8, reward: "800 coins" },
  { day: 9, reward: "900 coins" },
  { day: 10, reward: "1,000 coins" },
];

const DailyReward: React.FC<{
  day: number;
  reward: string;
  claimed: boolean;
}> = ({ day, reward, claimed }) => {
  return (
    <div
      className={`p-4 border border-gray-300 rounded-md ${
        claimed ? "bg-yellow-200" : ""
      }`}
    >
      <p className="font-bold">Day {day}</p>
      <p>{reward}</p>
    </div>
  );
};

const DailyRewards: React.FC = () => {
  const [claimedRewards, setClaimedRewards] = useState<boolean[]>(
    new Array(dailyRewardsData.length).fill(false)
  );

  const { mutate: claimDailyReward } = useClaimDailyRewards();

  const handleClaim = () => {
    // Logic to handle claiming rewards
    // claimDailyReward();
    setClaimedRewards(new Array(dailyRewardsData.length).fill(true));
  };

  return (
    <div className="flex bg-white py-5 flex-wrap justify-center gap-4">
      {dailyRewardsData.map((item, index) => (
        <DailyReward
          key={index}
          day={item.day}
          reward={item.reward}
          claimed={claimedRewards[index]}
        />
      ))}
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleClaim}
      >
        Claim
      </button>
    </div>
  );
};

export default DailyRewards;
