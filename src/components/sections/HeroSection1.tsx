import {
  Activity,
  Bitcoin,
  Boxes,
  Circle,
  CircleDollarSign,
  Coins,
  Gem,
  Hexagon,
  Triangle,
  Wallet,
  Zap
} from "lucide-react";

const cryptoIcons = [Bitcoin, Gem, CircleDollarSign, Triangle, Activity, Hexagon, Coins, Wallet, Circle, Boxes, Zap];

export default function HeroSection1() {
  return (
    <div className="relative flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-[40px] py-4 md:py-0 md:h-[100px] bg-[#0C1F56] rounded-[16px] shrink-0 overflow-hidden gap-4 sm:gap-3">

      <div className="absolute left-1/2 top-[60px] z-0 h-[534px] w-[534px] -translate-x-1/2 rounded-full bg-[#1463FF] blur-[100px]" />

      <div className="relative z-10 flex items-center justify-center">
        <h3
          className="text-[#FFFFFF] font-extrabold text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1] text-center whitespace-nowrap m-0 p-0"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Want to play? Deposit Now
        </h3>
      </div>

      <div className="relative z-10 flex items-center gap-3 md:gap-[28px] justify-center flex-wrap">
        {cryptoIcons.map((Icon, i) => (
          <Icon key={i} width={14} height={18} className="text-[#FFFFFF] shrink-0" />
        ))}
      </div>

      <button className="relative z-10 flex justify-center items-center px-4 md:px-[24px] py-[10px] gap-[10px] w-full sm:w-[136px] h-[40px] bg-[#FFC83D] rounded-[8px] min-h-[44px] shrink-0">
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
