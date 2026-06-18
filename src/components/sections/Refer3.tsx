import React from 'react';
import { Coins, Zap, Infinity as InfinityIcon } from 'lucide-react';

export default function Refer3() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-[12px] w-full max-w-[1136px] mx-auto flex-none">
      
      {/* WHAT YOU GET - Left Card */}
      <div className="flex flex-col items-start p-[24px_20px] lg:p-[32px_24px] xl:p-[32px_40px] gap-[24px] w-full lg:flex-1 bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolate">
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
                Your earnings are not capped. Sky (and your friend's wallet is the limit!
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WHAT YOUR FRIEND GETS - Right Card */}
      <div className="flex flex-col items-start p-[24px_20px] lg:p-[32px_24px] xl:p-[32px_40px] gap-[24px] w-full lg:flex-1 bg-[#0C1F56] rounded-[16px] relative overflow-hidden isolate">
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
                You get a percentage of every deposit your friends complete
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
                Your earnings are not capped. Sky (and your friend's wallet is the limit!
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
