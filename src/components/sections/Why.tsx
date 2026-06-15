import Image from 'next/image';

const features = [
    {
        image: "/why-1.png",
        alt: "Fast Withdrawals",
    },
    {
        image: "/why-2.png",
        alt: "Big Winners Welcome",
    },
    {
        image: "/why-3.png",
        alt: "Weekly 10% Cashback",
    },
];

export default function Why() {
    return (
        <section className="flex flex-col items-start gap-5 md:gap-[28px] w-full">
            <div className="flex items-center h-[30px] gap-[12px]">
                <Image src="/100.svg" alt="Why Join" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />
                <span className="font-['Jost'] text-[16px] md:text-[18px] lg:text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                    WHY JOIN MIGHTY LUCK?
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-[12px] w-full">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-full aspect-[370/220] shrink-0 rounded-[12px] md:rounded-[16px] overflow-hidden group"
                    >
                        <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
