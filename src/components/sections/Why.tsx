'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const features = [
    {
        image: "/j-1.svg",
        alt: "Fast Withdrawals",
    },
    {
        image: "/j-2.svg",
        alt: "Big Winners Welcome",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-1.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-2.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-1.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-2.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-1.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-2.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-1.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-2.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-1.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-2.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-1.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-2.svg",
        alt: "Weekly 10% Cashback",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
];

export default function Why() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    };

    const scrollLeft = () => {
        const el = scrollRef.current;
        if (el) {
            const scrollBy = window.innerWidth < 768 ? 278 : 382; // card width + gap
            el.scrollBy({ left: -scrollBy, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        const el = scrollRef.current;
        if (el) {
            const scrollBy = window.innerWidth < 768 ? 278 : 382; // card width + gap
            el.scrollBy({ left: scrollBy, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            handleScroll();
        }
    }, []);

    return (
        <section className="flex flex-col items-start gap-5 md:gap-[28px] w-full">
            <div className="flex flex-row justify-between items-center w-full h-[23px] md:h-[30px]">
                <div className="flex flex-row items-center gap-[7.2px] md:gap-[12px] h-[23px] md:h-[30px]">
                    <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px] shrink-0">
                        <Image src="/100.svg" alt="Why Join" width={30} height={30} className="w-full h-full object-contain" />
                    </div>
                    <h2 className="font-['Jost'] text-[16px] md:text-[20px] font-extrabold leading-[23px] md:leading-[30px] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        WHY JOIN MIGHTY LUCK?
                    </h2>
                </div>

                <div className="hidden md:flex flex-row items-center gap-[12px]">
                    <button 
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className={`flex flex-col justify-center items-center w-[30px] h-[30px] rounded-[4px] rotate-180 transition-all ${canScrollLeft ? 'bg-[#112F82] hover:bg-[#1A3FA6] opacity-100' : 'bg-[#112F82] opacity-40 cursor-not-allowed'}`}
                    >
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button 
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className={`flex flex-col justify-center items-center w-[30px] h-[30px] rounded-[4px] transition-all ${canScrollRight ? 'bg-[#112F82] hover:bg-[#1A3FA6] opacity-100' : 'bg-[#112F82] opacity-40 cursor-not-allowed'}`}
                    >
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex flex-row gap-[8.63px] md:gap-[12px] w-full overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 md:pb-0"
            >
                {features.map((item, index) => (
                    <div
                        key={index}
                        className={`relative shrink-0 snap-start overflow-hidden group ${index === 0
                                ? 'w-[279px] h-[158px] rounded-[10px] md:w-[370px] md:h-[220px] md:rounded-[16px]'
                                : index === 1
                                    ? 'w-[266.19px] h-[158.27px] rounded-[10px] md:w-[370px] md:h-[220px] md:rounded-[16px]'
                                    : 'w-[266.19px] h-[158.27px] rounded-[11.51px] md:w-[370px] md:h-[220px] md:rounded-[16px]'
                            }`}
                    >
                        <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            className="object-fill"
                            sizes="(max-width: 768px) 100vw, 370px"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
