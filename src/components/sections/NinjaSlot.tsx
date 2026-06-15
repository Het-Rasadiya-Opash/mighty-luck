import React from 'react';
import { Maximize, Heart } from 'lucide-react';

export default function NinjaSlot() {
  return (
    <div className="w-[1136px] h-[100px] bg-[#0C1F56] rounded-[16px] px-[30px] flex flex-row items-center justify-between mx-auto flex-none overflow-hidden mt-4">
      
      {/* Left Frame */}
      <div className="flex flex-row items-center gap-[32px] w-[295px] h-[40px] flex-none">
        
        {/* BGAMING Logo */}
        <div className="w-[80px] h-[40px] flex items-center flex-none relative">
          <div 
            className="flex flex-row items-center font-sans font-bold uppercase text-white leading-none tracking-[0.15em] absolute"
            style={{ transform: 'scale(0.7)', transformOrigin: 'left center', fontSize: '13px' }}
          >
            <div className="bg-white text-black w-[16px] h-[16px] flex items-center justify-center font-black mr-[6px] tracking-normal">B</div>
            <div className="flex flex-row items-center gap-[5px]">
              <span>G</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>A</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>M</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>I</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>N</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>G</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-[33px] bg-white opacity-60 flex-none"></div>

        {/* Title */}
        <div className="flex flex-row justify-center items-center w-[151px] h-[29px] flex-none">
          <span className="font-['Jost'] font-bold text-[20px] leading-[29px] text-center text-white whitespace-nowrap">
            Ninja Crash Slot
          </span>
        </div>
      </div>

      {/* Right Frame */}
      <div className="flex flex-row items-center justify-end gap-[40px] w-[265px] h-[24px] flex-none">
        
        {/* Icons */}
        <div className="flex flex-row items-center gap-[24px] w-[64px] h-[20px] flex-none">
          <Maximize size={20} strokeWidth={2} className="text-white cursor-pointer hover:text-[#A5B8EF] transition-colors" />
          <Heart size={20} strokeWidth={2} className="text-white cursor-pointer hover:text-[#FFC83D] transition-colors" />
        </div>

        {/* Toggle Frame */}
        <div className="flex flex-row items-center gap-[8px] h-[24px] flex-none">
          <span className="font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] whitespace-nowrap flex-none">
            Fun Play
          </span>

          {/* Toggle Switch */}
          <div className="flex flex-row items-center justify-end w-[42px] h-[24px] bg-[#1463FF] rounded-[30px] p-[3px] cursor-pointer flex-none box-border">
            <div className="w-[18px] h-[18px] bg-white rounded-[30px] flex-none"></div>
          </div>

          <span className="font-['Manrope'] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white whitespace-nowrap flex-none">
            Real Play
          </span>
        </div>

      </div>

    </div>
  );
}
