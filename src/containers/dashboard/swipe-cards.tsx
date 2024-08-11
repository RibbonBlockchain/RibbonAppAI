import clsx from 'clsx'; 
import React, { useState } from 'react';
import { useGetAuth } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { PointBalanceCard, WalletBalanceCard } from './cards';

const SwipeCards = () => {
    const router = useRouter();
  const [activeCard, setActiveCard] = useState('point');

  const { data: user } = useGetAuth({ enabled: true });

  const points = user?.wallet?.balance;

  // Swipe detection logic
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: any) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 50) { 
      if (diffX > 0) {setActiveCard('point');
      } else {
        setActiveCard('wallet');
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-row gap-2 w-full overflow-auto">
        {activeCard === 'point' && (
          <PointBalanceCard
          points={points.toFixed(2)}
          onclick={() => router.push("/wallet")}
          />
        )}
        {activeCard === 'wallet' && <WalletBalanceCard />}
      </div>

      <div className="flex flex-row gap-4 mt-3">
        <button
          className={clsx(
            'p-1 rounded-full transition ring-2 ring-white',
            activeCard === 'point' ? 'bg-white' : 'bg-inherit'
          )}
          onClick={() => setActiveCard('point')}
        ></button>

        <button
          className={clsx(
            'p-1 rounded-full transition ring-2 ring-white',
            activeCard === 'wallet' ? 'bg-white' : 'bg-inherit'
          )}
          onClick={() => setActiveCard('wallet')}
        ></button>
      </div>
    </div>
  );
};

export default SwipeCards;
