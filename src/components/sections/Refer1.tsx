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

  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const updateSlider = (clientX: number, isMobile: boolean) => {
    const activeRef = isMobile ? mobileTrackRef : trackRef;
    if (!activeRef.current) return;
    const rect = activeRef.current.getBoundingClientRect();
    let newX = clientX - rect.left;
    newX = Math.max(0, Math.min(newX, rect.width));
    const newPercentage = newX / rect.width;
    const newFriends = Math.round(newPercentage * maxFriends);
    setFriends(newFriends);
  };

  const handlePointerDown = (e: React.PointerEvent, isMobile: boolean) => {
    const activeRef = isMobile ? mobileTrackRef : trackRef;
    if (!activeRef.current) return;
    activeRef.current.setPointerCapture(e.pointerId);
    updateSlider(e.clientX, isMobile);
  };

  const handlePointerMove = (e: React.PointerEvent, isMobile: boolean) => {
    if (e.buttons !== 1) return;
    updateSlider(e.clientX, isMobile);
  };

  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div
        className="hidden xl:flex flex-col items-start p-[32px_40px] gap-[20px] w-full h-[533px] rounded-[16px] mx-auto flex-none overflow-hidden relative"
        style={{
          background: 'linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), url(/refer.png) center/cover, #2A0B3E'
        }}
      >
        {/* Top Section */}
        <div className="flex flex-row justify-between items-center gap-[24px] w-full h-[345px] flex-none z-10">
          {/* Left Text */}
          <div className="flex flex-col items-start gap-[4px] w-[457px] h-[140px] flex-none text-left">
            <div className="w-[457px] h-[40px] font-['Jost'] font-medium text-[28px] leading-[40px] text-white flex-none">
              Get <span className="text-[#FFC83D] font-bold">PAID</span> every time
            </div>
            <div className="w-[457px] h-[48px] font-['Jost'] font-extrabold text-[48px] leading-[48px] text-white flex-none">
              YOUR FRIEND PLAYS!
            </div>
          </div>

          {/* Right Calculator Card */}
          <div className="flex flex-col items-center p-[20px] gap-[24px] w-[430px] h-[345px] bg-[#091741] rounded-[16px] isolate relative flex-none">
            {/* Blue Glow effect */}
            <div className="absolute w-[173px] h-[173px] bg-[#1463FF] blur-[40px] top-[-118px] left-[50%] translate-x-[-50%] z-0 rounded-full"></div>

            <div className="w-[300px] font-['Jost'] font-extrabold text-[20px] leading-[29px] text-center tracking-[0.01em] text-white z-10 flex-none">
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
                  onPointerDown={(e) => handlePointerDown(e, false)}
                  onPointerMove={(e) => handlePointerMove(e, false)}
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
                <div className="w-full h-auto font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] flex-none text-left">
                  * Calculations are based on average player activity and may vary in individual cases
                </div>
              </div>

              {/* Input Form */}
              <div className="flex flex-row items-start gap-[8px] w-full h-auto flex-none">
                <input
                  type="text"
                  placeholder="Enter email address"
                  className="flex flex-row items-center p-[10px_16px] flex-1 h-[40px] bg-[#112F82] rounded-[8px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#7795E8] outline-none border border-transparent focus:border-[#1463FF] transition-colors flex-none"
                />
                <button className="flex flex-row justify-center items-center p-[10px_30px] gap-[10px] w-[122px] h-[40px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors flex-none cursor-pointer">
                  <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap">
                    Send Invite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Card */}
        <div className="flex flex-row items-start p-[20px_24px] gap-[10px] w-full h-auto bg-[#091741] rounded-[16px] flex-none z-10">
          <div className="flex flex-row items-center gap-[8px] w-[1008px] h-[64px] flex-none">
            {/* Stat 1 */}
            <div className="flex flex-col items-start gap-[8px] w-[246px] h-[64px] flex-none">
              <div className="w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-left">
                Total Referrals
              </div>
              <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[246px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
                <div className="flex items-center gap-[8px] w-full flex-none">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                    <Users size={12} strokeWidth={3} className="text-[#1A1404]" />
                  </div>
                  <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                    12
                  </span>
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-start gap-[8px] w-[246px] h-[64px] flex-none">
              <div className="w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-left">
                Total Deposits
              </div>
              <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[246px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
                <div className="flex items-center gap-[8px] w-full flex-none">
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
            <div className="flex flex-col items-start gap-[8px] w-[246px] h-[64px] flex-none">
              <div className="w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-left">
                Total Earnings
              </div>
              <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[246px] h-[40px] bg-[#112F82] rounded-[8px] flex-none">
                <div className="flex items-center gap-[8px] w-full flex-none">
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
            <div className="flex flex-col items-start gap-[8px] w-[246px] h-[64px] flex-none">
              <div className="w-[246px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none text-left">
                Pending Income
              </div>
              <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[246px] h-[40px] bg-[#112F82] rounded-[8px] justify-between flex-none">
                <div className="flex items-center gap-[8px] flex-none">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                    <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                  </div>
                  <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                    $150.00
                  </span>
                </div>
                <button className="flex justify-center items-center w-[66px] h-[24px] bg-[#1463FF] rounded-[6px] hover:bg-[#114CD6] transition-colors flex-none cursor-pointer">
                  <span className="font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-white">
                    Claim
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View (max-width: 1279px / xl breakpoint) */}
      <div className="flex xl:hidden flex-col items-start p-0 gap-[20px] w-[374px] h-[989px] flex-none self-stretch grow-0">
        {/* Banner Section */}
        <div className="flex flex-col items-start p-0 gap-[8px] w-[374px] h-[170px] flex-none self-stretch grow-0">
          <div className="w-[374px] h-[170px] rounded-[10px] flex-none self-stretch grow-0 overflow-hidden relative">
            {/* Background Image holding gift box */}
            <img
              src="/refer.svg"
              alt="Referral Banner"
              className="absolute w-[547.18px] h-[170.03px] left-[calc(50%-547.18px/2+71.59px)] top-[calc(50%-170.03px/2+0.02px)] object-cover pointer-events-none"
            />
            {/* Blurs */}
            <div className="absolute w-[62.14px] h-[62.14px] left-[501.42px] top-[130.53px] bg-[#010A25] blur-[12.0419px] pointer-events-none" />
            <div className="absolute w-[226px] h-[226px] left-[-74px] top-[-43px] bg-[#03123C] blur-[29.2631px] pointer-events-none" />

            {/* Title text overlay */}
            <div className="flex flex-col items-start p-0 gap-[16px] absolute w-[220.13px] h-[61.93px] left-[19.27px] top-[calc(50%-61.93px/2+0.74px)] pointer-events-none">
              <div className="flex flex-col items-start p-0 gap-[1.93px] w-[220.13px] h-[61.93px] flex-none self-stretch grow-0">
                <div className="w-[220.13px] h-[20px] font-['Jost'] font-medium text-[14px] leading-[20px] text-white flex-none self-stretch grow-0">
                  Get <span className="font-bold text-[#FFC83D]">PAID</span> every time
                </div>
                <div className="w-[220.13px] h-[40px] font-['Jost'] font-extrabold text-[20px] leading-[100%] text-white flex-none self-stretch grow-0">
                  YOUR FRIEND<br />PLAYS!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators Frame (Hidden) */}
        <div className="hidden flex-col items-center p-0 w-[374px] h-[6px] flex-none self-stretch grow-0">
          <div className="flex flex-row justify-center items-center p-0 gap-[8px] w-[40px] h-[6px] flex-none grow-0">
            <div className="w-[12px] h-[6px] bg-[#D2DCF7] rounded-[150px] flex-none grow-0" />
            <div className="w-[6px] h-[6px] bg-[#D2DCF7] rounded-[150px] flex-none grow-0" />
            <div className="w-[6px] h-[6px] bg-[#D2DCF7] rounded-[150px] flex-none grow-0" />
          </div>
        </div>

        {/* Calculator Section */}
        <div className="flex flex-col items-center p-[20px] gap-[24px] isolate w-[374px] h-[407px] bg-[#0C1F56] rounded-[16px] flex-none self-stretch grow-0 relative">
          {/* Blue Glow background */}
          <div className="absolute w-[173px] h-[173px] left-[calc(50%-173px/2-0.5px)] top-[-127px] bg-[#1463FF] blur-2xl rounded-full pointer-events-none z-0" />

          <div className="flex flex-col items-start p-0 gap-[12px] w-[334px] h-[367px] z-10 flex-none self-stretch grow-0">
            {/* Header Title */}
            <div className="flex flex-row justify-center items-start p-0 gap-[12px] w-[334px] h-[52px] flex-none self-stretch grow-0">
              <div className="w-[300px] h-[52px] font-['Jost'] font-extrabold text-[18px] leading-[26px] text-center tracking-[0.01em] text-white flex-none grow-0">
                How much can you earn with Mighty Luck?
              </div>
            </div>

            {/* Slider and form body */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-[334px] h-[303px] flex-none self-stretch grow-0">
              {/* Slider Input Row */}
              <div className="flex flex-col items-start p-0 gap-[8px] w-[334px] h-[64px] flex-none self-stretch grow-0">
                <div className="flex flex-row items-center p-0 gap-[8px] w-[334px] h-[16px] flex-none self-stretch grow-0">
                  <span className="w-[88px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none grow-0">
                    Invited Friends
                  </span>
                </div>
                <div
                  ref={mobileTrackRef}
                  className="w-full h-[40px] relative isolate flex flex-col justify-center flex-none cursor-pointer touch-none"
                  onPointerDown={(e) => handlePointerDown(e, true)}
                  onPointerMove={(e) => handlePointerMove(e, true)}
                >
                  {/* Track */}
                  <div className="absolute w-full h-[6px] bg-[#112F82] rounded-[100px] top-[17px] left-0 z-0 pointer-events-none" />
                  {/* Fill */}
                  <div
                    className="absolute h-[6px] bg-[#1463FF] rounded-l-[100px] top-[17px] left-0 z-10 pointer-events-none transition-all duration-75"
                    style={{ width: `calc(${percentage} * (100% - 54px) + 27px)` }}
                  />
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

              {/* Earnings output */}
              <div className="flex flex-col items-start p-0 gap-[12px] w-[334px] h-[99px] flex-none self-stretch grow-0">
                <div className="flex flex-row justify-center items-center p-[10px_16px] gap-[12px] w-[334px] h-[60px] bg-[#112F82] rounded-[8px] flex-none">
                  <span className="w-[164px] h-[19px] font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white flex-none grow-0">
                    Your monthly earnings:
                  </span>
                  <span className="w-[61px] h-[33px] font-['Manrope'] font-bold text-[24px] leading-[33px] tracking-[0.02em] text-white flex-none grow-0">
                    ${earnings}
                  </span>
                </div>
                <div className="w-[334px] h-[28px] font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] flex-none self-stretch grow-0">
                  * Calculations are based on average player activity and may vary in individual cases
                </div>
              </div>

              {/* Invite Form */}
              <div className="flex flex-col items-start p-0 gap-[8px] w-[334px] h-[108px] flex-none self-stretch grow-0">
                <input
                  type="text"
                  placeholder="Enter email address"
                  className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[334px] h-[50px] bg-[#112F82] rounded-[8px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#7795E8] outline-none border border-transparent focus:border-[#1463FF] transition-colors flex-none self-stretch grow-0"
                />
                <button className="flex flex-row justify-center items-center p-[10px_30px] gap-[10px] w-[334px] h-[50px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors flex-none self-stretch grow-0 cursor-pointer">
                  <span className="w-auto h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404] flex-none grow-0 text-center whitespace-nowrap">
                    Send Invite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="flex flex-col items-start p-[20px_24px] gap-[12px] w-[374px] h-[372px] bg-[#0C1F56] rounded-[16px] flex-none self-stretch grow-0">
          {/* Stat 1 */}
          <div className="flex flex-col items-start p-0 gap-[8px] w-[326px] h-[74px] flex-none self-stretch grow-0">
            <div className="flex flex-row items-center p-0 gap-[8px] w-[326px] h-[16px] flex-none self-stretch grow-0">
              <span className="w-[87px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none grow-0">
                Total Referrals
              </span>
            </div>
            <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[326px] h-[50px] bg-[#112F82] rounded-[8px] flex-none self-stretch grow-0">
              <div className="flex flex-row items-center p-0 gap-[8px] w-[294px] h-[22px] flex-none grow-1">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <Users size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="w-[17px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white flex-none grow-0">
                  12
                </span>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-start p-0 gap-[8px] w-[326px] h-[74px] flex-none self-stretch grow-0">
            <div className="flex flex-row items-center p-0 gap-[8px] w-[326px] h-[16px] flex-none self-stretch grow-0">
              <span className="w-[86px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none grow-0">
                Total Deposits
              </span>
            </div>
            <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[326px] h-[50px] bg-[#112F82] rounded-[8px] flex-none self-stretch grow-0">
              <div className="flex flex-row items-center p-0 gap-[8px] w-[294px] h-[22px] flex-none grow-1">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="w-[80px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white flex-none grow-0">
                  $5000.00
                </span>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-start p-0 gap-[8px] w-[326px] h-[74px] flex-none self-stretch grow-0">
            <div className="flex flex-row items-center p-0 gap-[8px] w-[326px] h-[16px] flex-none self-stretch grow-0">
              <span className="w-[85px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none grow-0">
                Total Earnings
              </span>
            </div>
            <div className="flex flex-row items-center p-[10px_16px] gap-[12px] w-[326px] h-[50px] bg-[#112F82] rounded-[8px] flex-none self-stretch grow-0">
              <div className="flex flex-row items-center p-0 gap-[8px] w-[294px] h-[22px] flex-none grow-1">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="w-[69px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white flex-none grow-0">
                  $500.00
                </span>
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-start p-0 gap-[8px] w-[326px] h-[74px] flex-none self-stretch grow-0">
            <div className="flex flex-row items-center p-0 gap-[8px] w-[326px] h-[16px] flex-none self-stretch grow-0">
              <span className="w-[95px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] flex-none grow-0">
                Pending Income
              </span>
            </div>
            <div className="flex flex-row items-center p-[10px_10px_10px_16px] gap-[12px] w-[326px] h-[50px] bg-[#112F82] rounded-[8px] flex-none self-stretch grow-0">
              <div className="flex flex-row items-center p-0 gap-[8px] w-[222px] h-[22px] flex-none grow-1">
                <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />
                </div>
                <span className="w-[65px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white flex-none grow-0">
                  $150.00
                </span>
              </div>
              <button className="flex flex-row justify-center items-center p-[10px_16px] gap-[8px] w-[66px] h-[30px] bg-[#1463FF] rounded-[6px] flex-none grow-0 cursor-pointer">
                <span className="w-[34px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-white flex-none grow-0">
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