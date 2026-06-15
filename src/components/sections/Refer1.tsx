"use client";

import React, { useState, useRef } from 'react';
import { Users, DollarSign } from 'lucide-react';

export default function Refer1() {
  const [friends, setFriends] = useState(5);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxFriends = 50;
  
  // Calculation
  const earningsPerFriend = 50;
  const earnings = friends * earningsPerFriend;

  // Visual calculations
  const percentage = friends / maxFriends;

  const updateSlider = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let newX = clientX - rect.left;
    newX = Math.max(0, Math.min(newX, rect.width));
    const newPercentage = newX / rect.width;
    const newFriends = Math.round(newPercentage * maxFriends);
    setFriends(newFriends);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    trackRef.current.setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1 || !trackRef.current) return;
    updateSlider(e.clientX);
  };
  return (
    <div 
      className="flex flex-col items-center lg:items-start p-[24px_20px] lg:p-[32px_40px] gap-[20px] w-full h-auto lg:h-[533px] rounded-[16px] mx-auto flex-none overflow-hidden relative"
      style={{
        background: 'linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), url(/refer.png) center/cover, #2A0B3E'
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-[24px] w-full h-auto lg:h-[345px] flex-none z-10">
        
        {/* Left Text */}
        <div className="flex flex-col items-center lg:items-start gap-[4px] w-full lg:w-[457px] h-auto lg:h-[140px] flex-none text-center lg:text-left mt-[20px] lg:mt-0">
          <div className="w-full lg:w-[457px] h-auto font-['Jost'] font-medium text-[28px] sm:text-[32px] leading-[40px] text-white flex-none">
            Get <span className="text-[#FFC83D] font-bold">PAID</span> every time
          </div>
          <div className="w-full lg:w-[457px] h-auto font-['Jost'] font-extrabold text-[36px] sm:text-[48px] leading-[40px] sm:leading-[48px] text-white flex-none">
            YOUR FRIEND PLAYS!
          </div>
        </div>

        {/* Right Calculator Card */}
        <div className="flex flex-col items-center p-[20px] gap-[24px] w-full max-w-[430px] lg:w-[430px] h-auto lg:h-[345px] bg-[#091741] rounded-[16px] isolate relative flex-none">
          {/* Blue Glow effect */}
          <div className="absolute w-[173px] h-[173px] bg-[#1463FF] blur-[40px] top-[-118px] left-[50%] translate-x-[-50%] z-0 rounded-full"></div>
          
          <div className="w-full max-w-[300px] h-auto font-['Jost'] font-extrabold text-[20px] leading-[29px] text-center tracking-[0.01em] text-white z-10 flex-none">
            How much can you earn with Mighty Luck?
          </div>

          <div className="flex flex-col items-start gap-[16px] w-full z-10 flex-none">
            
            {/* Slider section */}
            <div className="flex flex-col items-start gap-[8px] w-full h-[64px] flex-none">
              <div className="w-full h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none">
                Invited Friends
              </div>
              <div 
                ref={trackRef}
                className="w-full h-[40px] relative isolate flex flex-col justify-center flex-none cursor-pointer touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
              >
                {/* Track */}
                <div className="absolute w-full h-[6px] bg-[#112F82] rounded-[100px] top-[17px] left-0 z-0 pointer-events-none"></div>
                {/* Fill */}
                <div 
                  className="absolute h-[6px] bg-[#1463FF] rounded-l-[100px] top-[17px] left-0 z-10 pointer-events-none transition-all duration-75"
                  style={{ width: `calc(${percentage} * (100% - 54px) + 27px)` }}
                ></div>
                {/* Thumb */}
                <div 
                  className="absolute flex flex-row justify-center items-center p-[4px_12px] gap-[4px] w-[54px] h-[30px] bg-[#1463FF] rounded-[100px] top-[5px] z-20 shadow-md pointer-events-none transition-all duration-75"
                  style={{ left: `calc(${percentage} * (100% - 54px))` }}
                >
                  <Users size={14} className="text-white" strokeWidth={2.5} />
                  <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white select-none">{friends}</span>
                </div>
              </div>
            </div>

            {/* Earnings display */}
            <div className="flex flex-col items-start gap-[12px] w-full h-[99px] flex-none">
              <div className="flex flex-row justify-center items-center p-[10px_16px] gap-[12px] w-full h-[60px] bg-[#112F82] rounded-[8px] flex-none">
                <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                  Your monthly earnings:
                </span>
                <span className="font-['Manrope'] font-bold text-[24px] leading-[33px] tracking-[0.02em] text-white">
                  ${earnings}
                </span>
              </div>
              <div className="w-full h-auto font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] flex-none text-center sm:text-left">
                * Calculations are based on average player activity and may vary in individual cases
              </div>
            </div>

            {/* Input Form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-[8px] w-full h-auto flex-none mt-[16px] sm:mt-0">
              <input 
                type="text" 
                placeholder="Enter email address" 
                className="flex flex-row items-center p-[10px_16px] w-full sm:flex-1 h-[40px] bg-[#112F82] rounded-[8px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#7795E8] outline-none border border-transparent focus:border-[#1463FF] transition-colors flex-none"
              />
              <button className="flex flex-row justify-center items-center p-[10px_30px] gap-[10px] w-full sm:w-[122px] h-[40px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors flex-none cursor-pointer">
                <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap">
                  Send Invite
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Card */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start p-[20px] lg:p-[20px_24px] gap-[10px] w-full h-auto bg-[#091741] rounded-[16px] flex-none z-10 overflow-x-auto custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-row items-center gap-[16px] xl:gap-[8px] w-full xl:w-[1008px] h-auto xl:h-[64px] flex-none">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center sm:items-start gap-[8px] w-full xl:w-[246px] h-[64px] flex-none">
            <div className="w-full xl:w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-center sm:text-left">
              Total Referrals
            </div>
            <div className="flex flex-row items-center justify-center sm:justify-start p-[10px_16px] gap-[12px] w-full xl:w-[246px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
              <div className="flex items-center justify-center sm:justify-start gap-[8px] w-full flex-none">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                  12
                </span>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center sm:items-start gap-[8px] w-full xl:w-[246px] h-[64px] flex-none">
            <div className="w-full xl:w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-center sm:text-left">
              Total Deposits
            </div>
            <div className="flex flex-row items-center justify-center sm:justify-start p-[10px_16px] gap-[12px] w-full xl:w-[246px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
              <div className="flex items-center justify-center sm:justify-start gap-[8px] w-full flex-none">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                  $5000.00
                </span>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center sm:items-start gap-[8px] w-full xl:w-[246px] h-[64px] flex-none">
            <div className="w-full xl:w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-center sm:text-left">
              Total Earnings
            </div>
            <div className="flex flex-row items-center justify-center sm:justify-start p-[10px_16px] gap-[12px] w-full xl:w-[246px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
              <div className="flex items-center justify-center sm:justify-start gap-[8px] w-full flex-none">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                  $500.00
                </span>
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center sm:items-start gap-[8px] w-full xl:w-[246px] h-[64px] flex-none">
            <div className="w-full xl:w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-center sm:text-left">
              Pending Income
            </div>
            <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-full xl:w-[246px] h-[40px] bg-[#112F82] rounded-[8px] justify-between flex-none">
              <div className="flex items-center justify-center sm:justify-start gap-[8px] flex-none">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                  $150.00
                </span>
              </div>
              <button className="flex flex-row justify-center items-center p-[10px_16px] gap-[8px] w-[66px] h-[24px] bg-[#1463FF] rounded-[6px] hover:bg-[#114CD6] transition-colors flex-none">
                <span className="font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-white">
                  Claim
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
