import Image from "next/image";
import { Button } from "../ui/Button";

export default function HeroBanner() {
    return (
        <div className="relative h-[356px] w-[1136px] flex-none overflow-hidden rounded-[20px]">

            <Image
                src="/new-banner.jpg"
                alt="Hero Banner"
                fill
                className="object-cover"
            />

            <div className="absolute -left-[161px] -top-[102px] z-[1] h-[575px] w-[575px] rounded-full bg-[#06102B] blur-[75px]" />

            {/* <div className="absolute left-[198px] top-[224px] z-[1] h-[194px] w-[194px] rounded-full bg-[#103686] blur-[25px]" /> */}

            <div className="absolute left-[1041px] top-[271px] z-[1] h-[129px] w-[129px] rounded-full bg-[#010A25] blur-[25px]" />

            <div className="absolute left-[40px] top-[101px] z-10 flex h-[204px] w-[457px] flex-none flex-col items-start gap-[24px]">

                <div className="flex h-[140px] w-[457px] flex-none flex-col items-start gap-[4px] p-0">
                    <h2 className="h-[40px] w-[457px] flex-none font-['Jost'] text-[28px] font-medium leading-[40px] text-white">
                        Get <span className="font-bold text-[#FFBF1F]">LUCKY</span> with our exclusive
                    </h2>
                    <h1 className="h-[96px] w-[457px] flex-none whitespace-normal font-['Jost'] text-[48px] font-extrabold leading-[100%] text-white">
                        250% WELCOME BONUS!
                    </h1>
                </div>

                <button className="flex items-center justify-center gap-[10px] w-[110px] h-[40px] px-[24px] py-[10px] bg-[#FFBF1F] rounded-[8px]">
                    <span className="font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap" style={{ fontFamily: 'var(--font-manrope)' }}>
                        Join Now
                    </span>
                </button>

            </div>



        </div>
    );
}
