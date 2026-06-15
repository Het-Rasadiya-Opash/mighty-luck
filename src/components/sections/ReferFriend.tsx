import React from 'react';
import Refer1 from './Refer1';
import Refer2 from './Refer2';
import Refer3 from './Refer3';

export default function ReferFriend() {
  return (
    <div className="flex flex-col gap-[32px] w-full items-center pb-[60px]">
      <Refer1 />
      <Refer2 />
      <Refer3 />
      {/* Other sections will be added here later */}
    </div>
  );
}
