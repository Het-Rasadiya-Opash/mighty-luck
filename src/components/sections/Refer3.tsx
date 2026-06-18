import React from 'react';
import { Coins, Zap, Infinity as InfinityIcon } from 'lucide-react';

export default function Refer3() {
  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-[12px] w-full max-w-[1136px] h-auto lg:h-[391px] mx-auto flex-none">
        {/* WHAT YOU GET - Left Card */}
        <div className="flex flex-col items-start p-[24px_20px] lg:p-[32px_40px] gap-[24px] w-full lg:w-[562px] h-auto lg:h-[391px] bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolate flex-none">
          {/* Green Glow */}
          <div className="absolute w-[182px] h-[182px] left-[-91px] top-[-91px] bg-[#57FF3D] blur-[60px] z-0 rounded-full"></div>
          
          <div className="w-full font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white z-10 flex-none">
            WHAT YOU GET
          </div>

          <div className="flex flex-col items-start gap-[20px] w-full z-10 flex-none">
            {/* Item 1 */}
            <div className="flex flex-row items-start gap-[16px] w-full flex-none">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Coins size={20} className="text-[#57FF3D]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1">
                <div className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white">
                  Lifetime earnings from each deposit
                </div>
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                  You get a percentage of every deposit your friends complete.
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-row items-start gap-[16px] w-full flex-none">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Zap size={20} className="text-[#57FF3D]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1">
                <div className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white">
                  Instant crediting
                </div>
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                  Your income is credited a few minutes after your friend's deposit is completed.
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-row items-start gap-[16px] w-full flex-none">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <InfinityIcon size={20} className="text-[#57FF3D]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1">
                <div className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white">
                  No limits for earnings
                </div>
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                  Your earnings are not capped. Sky (and your friend's wallet) is the limit!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT YOUR FRIEND GETS - Right Card */}
        <div className="flex flex-col items-start p-[24px_20px] lg:p-[32px_40px] gap-[24px] w-full lg:w-[562px] h-auto lg:h-[391px] bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolate flex-none">
          {/* Blue Glow */}
          <div className="absolute w-[182px] h-[182px] left-[-91px] top-[-91px] bg-[#1463FF] blur-[60px] z-0 rounded-full"></div>
          
          <div className="w-full font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white z-10 flex-none">
            WHAT YOUR FRIEND GETS
          </div>

          <div className="flex flex-col items-start gap-[20px] w-full z-10 flex-none">
            {/* Item 1 */}
            <div className="flex flex-row items-start gap-[16px] w-full flex-none">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Coins size={20} className="text-[#2365FF]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1">
                <div className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white">
                  Lifetime earnings from each deposit
                </div>
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                  You get a percentage of every deposit your friends complete.
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-row items-start gap-[16px] w-full flex-none">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Zap size={20} className="text-[#2365FF]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1">
                <div className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white">
                  Instant crediting
                </div>
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                  Your income is credited a few minutes after your friend's deposit is completed.
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-row items-start gap-[16px] w-full flex-none">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <InfinityIcon size={20} className="text-[#2365FF]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1">
                <div className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white">
                  No limits for earnings
                </div>
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                  Your earnings are not capped. Sky (and your friend's wallet) is the limit!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View (max-width: 1023px) */}
      <div className="flex lg:hidden flex-col items-start p-0 gap-[12px] w-[374px] h-[942px] flex-none self-stretch grow-0">
        {/* WHAT YOU GET - Left Card */}
        <div className="flex flex-col items-start p-[32px_40px] gap-[24px] isolate w-[374px] h-[465px] bg-[#0C1F56] rounded-[16px] relative overflow-hidden flex-none self-stretch grow-0">
          {/* Green Glow */}
          <div className="absolute w-[182px] h-[182px] left-[calc(50%-182px/2-187px)] top-[-87px] bg-[#57FF3D] blur-[60px] z-0 rounded-full" />
          
          <div className="w-[294px] h-[29px] font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white z-10 flex-none grow-0">
            WHAT YOU GET
          </div>

          <div className="flex flex-col items-start p-0 gap-[20px] w-[294px] h-[348px] z-10 flex-none">
            {/* Item 1 */}
            <div className="flex flex-row items-start p-0 gap-[16px] w-[294px] h-[98px] flex-none self-stretch grow-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Coins size={20} className="text-[#57FF3D]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start p-0 gap-[4px] w-[258px] h-[98px] flex-none grow-1">
                <div className="w-[258px] h-[44px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white flex-none self-stretch grow-0">
                  Lifetime earnings from each deposit
                </div>
                <div className="w-[258px] h-[50px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] flex-none self-stretch grow-0">
                  You get a percentage of every deposit your friends complete.
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-row items-start p-0 gap-[16px] w-[294px] h-[110px] flex-none self-stretch grow-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Zap size={20} className="text-[#57FF3D]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start p-0 gap-[4px] w-[258px] h-[110px] flex-none grow-1">
                <div className="w-[258px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white flex-none self-stretch grow-0">
                  Instant crediting
                </div>
                <div className="w-[258px] h-[84px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] flex-none self-stretch grow-0">
                  Your income is credited a few minutes after your friend's deposit is completed.
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-row items-start p-0 gap-[16px] w-[294px] h-[100px] flex-none self-stretch grow-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <InfinityIcon size={20} className="text-[#57FF3D]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start p-0 gap-[4px] w-[258px] h-[100px] flex-none grow-1">
                <div className="w-[258px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white flex-none self-stretch grow-0">
                  No limits for earnings
                </div>
                <div className="w-[258px] h-[74px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] flex-none self-stretch grow-0">
                  Your earnings are not capped. Sky (and your friend's wallet) is the limit!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT YOUR FRIEND GETS - Right Card */}
        <div className="flex flex-col items-start p-[32px_40px] gap-[24px] isolate w-[374px] h-[465px] bg-[#0C1F56] rounded-[16px] relative overflow-hidden flex-none self-stretch grow-0">
          {/* Blue Glow */}
          <div className="absolute w-[182px] h-[182px] left-[calc(50%-182px/2-187px)] top-[-87px] bg-[#1463FF] blur-[60px] z-0 rounded-full" />
          
          <div className="w-[294px] h-[29px] font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white z-10 flex-none grow-0">
            WHAT YOUR FRIEND GETS
          </div>

          <div className="flex flex-col items-start p-0 gap-[20px] w-[294px] h-[348px] z-10 flex-none">
            {/* Item 1 */}
            <div className="flex flex-row items-start p-0 gap-[16px] w-[294px] h-[98px] flex-none self-stretch grow-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Coins size={20} className="text-[#1463FF]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start p-0 gap-[4px] w-[258px] h-[98px] flex-none grow-1">
                <div className="w-[258px] h-[44px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white flex-none self-stretch grow-0">
                  Lifetime earnings from each deposit
                </div>
                <div className="w-[258px] h-[50px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] flex-none self-stretch grow-0">
                  You get a percentage of every deposit your friends complete.
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-row items-start p-0 gap-[16px] w-[294px] h-[110px] flex-none self-stretch grow-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <Zap size={20} className="text-[#1463FF]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start p-0 gap-[4px] w-[258px] h-[110px] flex-none grow-1">
                <div className="w-[258px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white flex-none self-stretch grow-0">
                  Instant crediting
                </div>
                <div className="w-[258px] h-[84px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] flex-none self-stretch grow-0">
                  Your income is credited a few minutes after your friend's deposit is completed.
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-row items-start p-0 gap-[16px] w-[294px] h-[100px] flex-none self-stretch grow-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[2px]">
                <InfinityIcon size={20} className="text-[#1463FF]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start p-0 gap-[4px] w-[258px] h-[100px] flex-none grow-1">
                <div className="w-[258px] h-[22px] font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.01em] text-white flex-none self-stretch grow-0">
                  No limits for earnings
                </div>
                <div className="w-[258px] h-[74px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] flex-none self-stretch grow-0">
                  Your earnings are not capped. Sky (and your friend's wallet) is the limit!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}