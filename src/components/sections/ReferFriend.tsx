import React from 'react';
import Refer1 from './Refer1';
import Refer2 from './Refer2';
import Refer3 from './Refer3';
import Refer4 from './Refer4';
import FAQs from './FAQs';

export default function ReferFriend() {
  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[1136px] mx-auto items-center pb-[60px] px-4 sm:px-6 lg:px-0">
      <Refer1 />
      <Refer2 />
      <Refer3 />
      <Refer4 />
      <FAQs />
      {/* Other sections will be added here later */}
    </div>
  );
}
