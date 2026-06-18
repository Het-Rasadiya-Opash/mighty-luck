import React from 'react';
import { FerrisWheel } from 'lucide-react'; 

export default function Refer4() {
  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden md:flex flex-col items-start gap-[32px] w-full max-w-[1136px] mx-auto flex-none">
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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[12px] w-full h-auto flex-none">
          {/* Card 1 */}
          <div className="w-full max-w-[370px] flex-1 rounded-[16px] flex-none overflow-hidden relative">
            <img src="/r1.png" alt="Step 1" className="w-full h-auto object-contain" />
          </div>

          {/* Card 2 */}
          <div className="w-full max-w-[370px] flex-1 rounded-[16px] flex-none overflow-hidden relative">
            <img src="/r2.png" alt="Step 2" className="w-full h-auto object-contain" />
          </div>

          {/* Card 3 */}
          <div className="w-full max-w-[370px] flex-1 rounded-[16px] flex-none overflow-hidden relative">
            <img src="/r3.png" alt="Step 3" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Mobile View (max-width: 767px) */}
      <div className="flex md:hidden flex-col items-start p-0 gap-[12px] w-[374px] h-[719px] flex-none self-stretch grow-0">
        {/* Header */}
        <div className="flex flex-row items-center p-0 gap-[8.44px] w-[374px] h-[23px] flex-none self-stretch grow-0">
          <div className="flex items-center justify-center w-[18px] h-[18px]">
            <FerrisWheel className="text-[#FFC83D]" size={18} />
          </div>
          <span className="font-['Jost'] font-extrabold text-[16px] leading-[23px] tracking-[0.01em] text-white uppercase">
            How Referral Program Works
          </span>
        </div>

        {/* Steps Body */}
        <div className="flex flex-col items-start p-0 gap-[12px] w-[374px] h-[684px] flex-none self-stretch grow-0">
          {/* Step 1 Card */}
          <div className="w-[374px] h-[220px] rounded-[16px] overflow-hidden relative flex-none">
            <img src="/r1.png" alt="Step 1" className="w-full h-full object-cover" />
          </div>

          {/* Step 2 Card */}
          <div className="w-[374px] h-[220px] rounded-[16px] overflow-hidden relative flex-none">
            <img src="/r2.png" alt="Step 2" className="w-full h-full object-cover" />
          </div>

          {/* Step 3 Card */}
          <div className="w-[374px] h-[220px] rounded-[16px] overflow-hidden relative flex-none">
            <img src="/r3.png" alt="Step 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}