import React, { useState } from 'react';
import HeroContent from './HeroContent';
import InteractiveHouseCard from './InteractiveHouseCard';
import type { TabType } from '../types';

/** Keep graphic and panel selection local so it does not rerender the whole homepage. */
export default function HeroShowcase({ onCtaClick }: { onCtaClick: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('immobilie');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center mb-12 md:mb-16">
      <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex justify-start items-center">
        <HeroContent onCtaClick={onCtaClick} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="col-span-1 lg:col-span-6 xl:col-span-7">
        <InteractiveHouseCard activeTab={activeTab} onTabChange={setActiveTab} onCtaClick={onCtaClick} />
      </div>
    </div>
  );
}
