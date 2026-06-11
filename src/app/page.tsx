import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import HeroBanner from "@/components/sections/HeroBanner";
import HeroSection1 from "@/components/sections/HeroSection1";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="flex gap-[24px] w-full">
        <Sidebar />
        <main className="w-[1136px] h-[2644px] flex flex-col gap-[40px]">
          <HeroBanner />
          <HeroSection1 />
        </main>
      </div>
    </Container>
  );
}
