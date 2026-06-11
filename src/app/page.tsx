import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="flex gap-[24px] w-full">
        <Sidebar />
        <main className="flex-1">
          {/* Main content will go here */}
        </main>
      </div>
    </Container>
  );
}
