

import Image from 'next/image';
import { Trophy } from 'lucide-react';

const features = [
    {
        title: "FAST WITHDRAWALS",
        description: "Don't miss a beat! Enjoy fast withdrawals and celebrate your winnings in record time.",
        image: "/w-1.png",
        descClass: "h-[88px] font-medium leading-[140%]",
        ellipse9: { right: "-61px", top: "32px" },
        imgStyle: { width: "210.4px", height: "160.82px", left: "223.42px", top: "31px", transform: "rotate(10.6deg)" },
    },
    {
        title: "BIG WINNERS WELCOME",
        description: "Win big on 4000+ casino games,high betting limits & the best sports action.",
        image: "/demo.png",
        descClass: "h-[66px] font-medium leading-[140%]",
        ellipse9: { right: "-66px", top: "20px" },
        imgStyle: { width: "312.37px", height: "208.08px", left: "126.74px", top: "3px", transform: "rotate(12deg)" },
    },
    {
        title: "WEEKLY 10% CASHBACK",
        description: "Get 10% cashback from Samba Slots every Monday. No wagering. No worries.",
        image: "/w-3.png",
        descClass: "h-[88px] font-semibold leading-[22px]",
        ellipse9: { right: "-65px", top: "27px" },
        imgStyle: { width: "237.48px", height: "173.55px", left: "194px", top: "41.3px", transform: "rotate(-1.3deg)" },
    },
];

export default function WhyJoin() {
    return (
        <section className="flex h-[278px] w-[1136px] flex-none flex-col items-start gap-[28px]">

            {/* Header */}
            <div className="flex items-center justify-between w-[1136px] h-[30px] shrink-0">
                <div className="flex items-center h-[30px] gap-[12px] shrink-0">
                    <Trophy className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} />
                    <span className="font-['Jost'] text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">WHY JOIN MIGHTY LUCK?</span>
                </div>
            </div>

            {/* Cards row: w-[1136px] h-[220px] flex-row gap-[12px] */}
            <div className="flex h-[220px] w-[1136px] flex-none flex-row items-center gap-[12px]">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-[220px] w-[370px] flex-none overflow-hidden rounded-[12px]"
                    >
                        <div className="absolute left-0 top-0 flex h-[220px] w-[370px] flex-col items-start justify-center gap-[16px] rounded-[16px] bg-[#0C1F56] p-[24px] isolation-isolate">

                            <div
                                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                                style={{ width: "160px", height: "160px", left: "-85px", top: "-80px", filter: "blur(50px)", zIndex: 0 }}
                            />

                            <h3
                                className="relative w-[200px] flex-none font-jost text-[24px] font-extrabold leading-[26px] tracking-[0.01em] text-white uppercase"
                                style={{ zIndex: 1 }}
                            >
                                {item.title}
                            </h3>

                            <p
                                className={`relative w-[200px] flex-none font-manrope text-[16px] tracking-[0.02em] text-[#E8EDFB] ${item.descClass}`}
                                style={{ zIndex: 2 }}
                            >
                                {item.description}
                            </p>

                            <div
                                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                                style={{
                                    width: "200px", height: "200px",
                                    right: item.ellipse9.right, top: item.ellipse9.top,
                                    filter: "blur(50px)", zIndex: 3
                                }}
                            />

                            <div
                                className="pointer-events-none absolute"
                                style={{ ...item.imgStyle, zIndex: 10 }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}