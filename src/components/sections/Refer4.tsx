import React from 'react';
import { FerrisWheel } from 'lucide-react'; 

export default function Refer4() {
  return (
    <div className="flex flex-col items-start gap-[32px] w-[1136px] mx-auto flex-none">
      
      {/* Header */}
      <div className="flex flex-row items-center gap-[12px] flex-none">
        <div className="flex items-center justify-center w-[30px] h-[30px]">
          <FerrisWheel className="text-[#FFC83D]" size={22.5} />
        </div>
        <div className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white uppercase">
          How Referral Program Works
        </div>
      </div>

      {/* Cards Row */}
      <div className="flex flex-row items-start gap-[12px] w-[1136px] h-[220px] flex-none">
        
        {/* Card 1 */}
        <div 
          className="w-[370px] h-[220px] rounded-[16px] flex-none overflow-hidden relative"
          style={{
            background: 'url(/r1.png) center/cover no-repeat'
          }}
        />

        {/* Card 2 */}
        <div 
          className="w-[370px] h-[220px] rounded-[16px] flex-none overflow-hidden relative"
          style={{
            background: 'url(/r2.png) center/cover no-repeat'
          }}
        />

        {/* Card 3 */}
        <div 
          className="w-[370px] h-[220px] rounded-[16px] flex-none overflow-hidden relative"
          style={{
            background: 'url(/r3.png) center/cover no-repeat'
          }}
        />

      </div>

    </div>
  );
}
