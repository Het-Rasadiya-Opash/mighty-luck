import React from 'react';
import {
  Bitcoin,
  Coins,
  CircleDollarSign,
  Wallet,
  Gem,
  Hexagon,
  Boxes,
  Circle,
  Activity,
  Triangle,
  Zap,
  Home,
  Cherry,
  Rocket,
  Gamepad2,
  Dices,
  Library
} from "lucide-react";

export default function HeroSection1() {
  return (
    <div className="relative flex justify-between items-center w-[1136px] h-[100px] px-[40px] bg-[#2A0B3E] rounded-[16px] shrink-0 overflow-hidden">
      
      {/* Background Blur */}
      <div className="absolute left-1/2 top-[60px] z-0 h-[534px] w-[534px] -translate-x-1/2 rounded-full bg-[#A92BF5] blur-[100px]" />

      {/* Left Text */}
      <div className="relative z-10 w-[263px] h-[29px] flex items-center justify-center">
        <h3 
          className="text-white font-extrabold text-[20px] leading-[1] text-center whitespace-nowrap m-0 p-0" 
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Want to play? Deposit Now
        </h3>
      </div>

      {/* Middle Icons Area */}
      <div className="relative z-10 flex items-center gap-[28px] w-[462px] h-[19px] justify-center overflow-hidden">
         <Bitcoin width={13.38} height={18.39} className="text-white shrink-0" />
        <Gem width={13.38} height={18.39} className="text-white shrink-0" />
        <CircleDollarSign width={13.38} height={18.39} className="text-white shrink-0" />
        <Triangle width={13.38} height={18.39} className="text-white shrink-0" />
        <Activity width={13.38} height={18.39} className="text-white shrink-0" />
        <Hexagon width={13.38} height={18.39} className="text-white shrink-0" />
        <Coins width={13.38} height={18.39} className="text-white shrink-0" />
        <Wallet width={13.38} height={18.39} className="text-white shrink-0" />
        <Circle width={13.38} height={18.39} className="text-white shrink-0" />
        <Boxes width={13.38} height={18.39} className="text-white shrink-0" />
        <Zap width={13.38} height={18.39} className="text-white shrink-0" />
      </div>

      {/* Right Button */}
      <button className="relative z-10 flex justify-center items-center px-[24px] py-[10px] gap-[10px] w-[136px] h-[40px] bg-[#FFC727] rounded-[8px]">
        <span 
          className="font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap" 
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          Deposit
        </span>
      </button>

    </div>
  );
}
