import React from 'react';

export default function Refer2() {
  return (
    <div className="flex flex-row items-center gap-[12px] w-[1136px] h-[136px] mx-auto flex-none">
      {/* Block 1 */}
      <div className="flex flex-col justify-center items-center p-[24px] gap-[8px] flex-1 h-[136px] bg-[#0C1F56] rounded-[16px]">
        <div className="font-['Jost'] font-extrabold text-[40px] leading-[58px] text-center tracking-[0.01em] text-white">
          $2.5 K
        </div>
        <div className="font-['Manrope'] font-semibold text-[16px] leading-[140%] text-center tracking-[0.02em] text-[#A5B8EF]">
          Claim By the Most Active Referrer
        </div>
      </div>

      {/* Block 2 */}
      <div className="flex flex-col justify-center items-center p-[24px] gap-[8px] flex-1 h-[136px] bg-[#0C1F56] rounded-[16px]">
        <div className="font-['Jost'] font-extrabold text-[40px] leading-[58px] text-center tracking-[0.01em] text-white">
          500+
        </div>
        <div className="font-['Manrope'] font-semibold text-[16px] leading-[140%] text-center tracking-[0.02em] text-[#A5B8EF]">
          Players are already earning with us
        </div>
      </div>

      {/* Block 3 */}
      <div className="flex flex-col justify-center items-center p-[24px] gap-[8px] flex-1 h-[136px] bg-[#0C1F56] rounded-[16px]">
        <div className="font-['Jost'] font-extrabold text-[40px] leading-[58px] text-center tracking-[0.01em] text-white">
          19,000
        </div>
        <div className="font-['Manrope'] font-semibold text-[16px] leading-[140%] text-center tracking-[0.02em] text-[#A5B8EF]">
          Free Spins received by friends
        </div>
      </div>
    </div>
  );
}
