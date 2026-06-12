import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[356px] flex-none overflow-hidden rounded-[16px] md:rounded-[20px]">

            <Image
                src="/new-banner.jpg"
                alt="Hero Banner"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1136px"
                priority
            />

            <div className="absolute -left-[80px] sm:-left-[120px] lg:-left-[161px] -top-[60px] sm:-top-[80px] lg:-top-[102px] z-[1] h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[575px] lg:w-[575px] rounded-full bg-[#06102B] blur-[75px]" />
            <div className="absolute right-0 bottom-0 z-[1] h-[80px] w-[80px] lg:h-[129px] lg:w-[129px] rounded-full bg-[#010A25] blur-[25px]" />

            <div className="absolute left-[16px] sm:left-[28px] md:left-[40px] top-[20px] sm:top-[40px] md:top-[60px] lg:top-[101px] z-10 flex flex-col items-start gap-3 md:gap-[24px] max-w-[85%] sm:max-w-[60%] lg:max-w-[457px]">

                <div className="flex flex-col items-start gap-[4px]">
                    <h2 className="font-['Jost'] text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-medium leading-tight text-white">
                        Get <span className="font-bold text-[#FFBF1F]">LUCKY</span> with our exclusive
                    </h2>
                    <h1 className="font-['Jost'] text-[22px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[100%] text-white">
                        250% WELCOME BONUS!
                    </h1>
                </div>

                <button className="flex items-center justify-center gap-[10px] min-h-[36px] lg:h-[40px] px-4 lg:px-[24px] py-2 lg:py-[10px] bg-[#FFBF1F] rounded-[8px]">
                    <span className="font-bold text-[13px] lg:text-[14px] leading-tight tracking-[0.02em] text-[#1A1404] whitespace-nowrap" style={{ fontFamily: 'var(--font-manrope)' }}>
                        Join Now
                    </span>
                </button>

            </div>
        </div>
    );
}
