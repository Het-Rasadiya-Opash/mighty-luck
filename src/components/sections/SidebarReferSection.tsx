"use client";

export default function SidebarReferSection() {
    return (
        <div className="flex flex-col gap-[8px] w-full flex-none">

            <div className="flex flex-row gap-[8px] w-full">
                <div className="flex-1 rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img
                        src="/raf.svg"
                        alt="Refer a Friend"
                        className="w-full h-auto block"
                    />
                </div>

                <div className="flex-1 rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img
                        src="/vt.svg"
                        alt="VIP Transfer"
                        className="w-full h-auto block"
                    />
                </div>
            </div>

            <div className="w-full rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <img
                    src="/wr.svg"
                    alt="Winter Rush"
                    className="w-full h-auto block"
                />
            </div>

        </div>
    );
}
