import React from 'react';
import Refer1 from './Refer1';
import Refer2 from './Refer2';
import Refer3 from './Refer3';
import Refer4 from './Refer4';
import FAQs from './FAQs';

export default function ReferFriend() {
  return (
    <div className="flex flex-col gap-[30px] md:gap-[32px] w-[374px] md:w-full md:max-w-[1136px] h-[3352.81px] md:h-auto mx-auto items-start md:items-center p-0 md:pb-[60px] md:px-0">
      <Refer1 />
      <div className="hidden md:block w-full">
        <Refer2 />
      </div>
      <Refer3 />
      <Refer4 />
      <FAQs />
    </div>
  );
}