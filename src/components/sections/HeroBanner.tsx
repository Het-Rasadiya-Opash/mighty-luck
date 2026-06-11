import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className="relative w-[1136px] h-[356px] shrink-0">
            {/* Background Image Container */}
            <div className="absolute w-[1136px] h-[356px] left-0 top-0 rounded-[16px] overflow-hidden">
                {/* Note: hero-banner.jpg has a white background baked into it. 
            To get the pop-out crown/coins effect against the dark page, 
            you MUST upload a transparent PNG version of this asset! */}
                <Image
                    src="/hero-banner.png"
                    alt="Hero Background"
                    fill
                    className="object-cover object-bottom"
                    priority
                />
            </div>

            {/* Ambient glow behind text */}
            <div
                className="absolute bg-[#1F0C21]"
                style={{
                    width: '231px',
                    height: '231px',
                    left: '79px',
                    top: '45px',
                    filter: 'blur(40px)',
                    borderRadius: '50%'
                }}
            />

            {/* Content Block */}
            <div
                className="absolute flex flex-col items-start gap-[24px] z-10"
                style={{
                    width: '457px',
                    height: '204px',
                    left: '40px',
                    top: '101px' // calc(50% - 204px/2 + 25px) -> 178 - 102 + 25 = 101
                }}
            >
                <div className="flex flex-col items-start gap-[4px] w-[457px] h-[140px] shrink-0">
                    <h2 className="w-[457px] h-[40px] flex items-center text-white font-medium text-[28px] leading-[1] m-0 p-0" style={{ fontFamily: 'var(--font-jost)' }}>
                        <span>Get <span className="text-[#FFBF1F] font-extrabold">LUCKY</span> with our exclusive</span>
                    </h2>
                    <h1 className="w-[457px] h-[96px] text-white font-extrabold text-[48px] leading-[1] uppercase m-0 p-0" style={{ fontFamily: 'var(--font-jost)' }}>
                        250% WELCOME<br />BONUS!
                    </h1>
                </div>

                <button className="flex justify-center items-center px-[24px] py-[10px] gap-[10px] w-[110px] h-[40px] bg-[#FFBF1F] rounded-[8px]">
                    <span className="font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap" style={{ fontFamily: 'var(--font-manrope)' }}>
                        Join Now
                    </span>
                </button>
            </div>
        </div>
    );
}
