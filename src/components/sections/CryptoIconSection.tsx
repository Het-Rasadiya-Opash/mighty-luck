import React from 'react';
import Image from 'next/image';

const icons = ['c1.svg', 'c2.svg', 'c3.svg', 'c4.svg', 'c5.svg', 'c6.svg', 'c7.svg', 'c8.svg', 'c9.svg', 'c10.svg', 'c11.svg'];

export default function CryptoIconSection() {
    return (
        <section className="relative w-full border-b border-[#112F82] px-4 md:px-[40px] py-4 md:py-0 md:h-[100px] flex items-center justify-center overflow-hidden isolate">
            <div
                className="absolute w-[390px] h-[390px] bg-[#1463FF] pointer-events-none rounded-full"
                style={{
                    left: 'calc(50% - 195px)',
                    top: '77px',
                    filter: 'blur(50px)',
                    zIndex: 0
                }}
            />
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[28px] relative z-[1]">
                {icons.map((icon, i) => (
                    <div key={i} className="flex items-center justify-center transition-opacity cursor-pointer min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0">
                        <Image src={`/${icon}`} alt={`Crypto ${i + 1}`} width={19} height={19} className="w-auto h-[16px] md:h-[19px] shrink-0 object-contain" />
                    </div>
                ))}
            </div>
        </section>
    );
}
