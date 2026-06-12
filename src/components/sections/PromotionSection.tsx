"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, BadgePercent } from "lucide-react";

const promos = [
  {
    id: 1,
    title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
    cta: "Claim Now",
    bg: "/pp-1.png",
    gradient: "linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%)",
  },
  {
    id: 2,
    title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
    cta: "Claim Now",
    bg: "/pp-2.png",
    gradient: "linear-gradient(90deg, #060B4D 39.55%, rgba(6, 11, 77, 0) 50%)",
  },
  {
    id: 3,
    title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
    cta: "Claim Now",
    bg: "/pp-1.png",
    gradient: "linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%)",
  },
];

export default function PromotionSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_WIDTH = 560;
  const GAP = 12;
  const SCROLL_BY = CARD_WIDTH + GAP;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_BY, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_BY, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full flex-none">

      <div className="flex flex-row justify-between items-center w-full h-[30px] flex-none pr-[20px] md:pr-0">

        <div className="flex flex-row items-center gap-[12px] h-[30px]">
          <div className="relative w-[30px] h-[30px] flex-none">
            <BadgePercent className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} />
          </div>
          <span className="font-[family-name:var(--font-jost)] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white select-none">
            Promotions
          </span>
        </div>

        <div className="flex flex-row items-center gap-[8px]">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`flex items-center justify-center w-[30px] h-[30px] rounded-[4px] transition-all cursor-pointer ${
              canScrollLeft ? "bg-[#112F82] hover:bg-[#1463FF]" : "bg-[#112F82] opacity-40"
            }`}
            aria-label="Previous promotion"
          >
            <ChevronLeft size={16} color="white" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`flex items-center justify-center w-[30px] h-[30px] rounded-[4px] transition-all cursor-pointer ${
              canScrollRight ? "bg-[#112F82] hover:bg-[#1463FF]" : "bg-[#112F82] opacity-40"
            }`}
            aria-label="Next promotion"
          >
            <ChevronRight size={16} color="white" />
          </button>
        </div>

      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row items-center gap-3 w-full h-[220px] flex-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="relative w-[85vw] sm:w-[400px] md:w-[560px] h-[220px] rounded-[16px] flex-none overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${promo.bg}')` }}
            />

            <div
              className="absolute inset-0"
              style={{ background: promo.gradient }}
            />

            <div
              className="absolute w-[160px] h-[160px] rounded-full pointer-events-none"
              style={{
                left: "-75px",
                top: "-77.6px",
                background: "#1463FF",
                filter: "blur(50px)",
                opacity: 0.7,
              }}
            />

            <div className="relative z-[2] w-full h-full p-[24px] flex flex-col justify-center items-start pointer-events-none">
              <div className="flex flex-col items-start gap-[16px] w-[290px] h-[114px] flex-none pointer-events-auto">
                <h3
                  className="font-[family-name:var(--font-jost)] font-extrabold text-[24px] leading-[120%] tracking-[0.01em] text-white w-[290px] h-[58px] flex-none"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {promo.title}
                </h3>
                <button className="flex flex-row items-center justify-center px-[24px] py-[10px] gap-[10px] w-[110px] h-[40px] bg-[#FFC83D] hover:bg-[#FFD966] rounded-[8px] transition-colors cursor-pointer flex-none">
                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] w-[74px] h-[19px] flex items-center justify-center whitespace-nowrap flex-none">
                    {promo.cta}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
