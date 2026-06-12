import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="w-full bg-[#091741] flex justify-center flex-1">
      <div className="w-full max-w-[1440px] overflow-hidden pb-[40px] pl-[24px] pr-[24px] pt-[24px]">
        {children}
      </div>
    </main>
  );
}