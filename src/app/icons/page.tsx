import Image from "next/image";

export default function Icons() {
  const icons = [
    "Frame.svg", "Frame1.svg", "Frame2.svg", "Frame3.svg", "Frame4.svg",
    "image 19 (Traced).svg", "image 20 (Traced).svg", "image 21 (Traced).svg",
    "Vector.svg", "Vector1.svg", "Vector3.svg"
  ];
  return (
    <div className="flex flex-col gap-4 p-10 bg-[#0C1F56] text-white">
      {icons.map(icon => (
        <div key={icon} className="flex gap-4 items-center">
          <Image src={`/${icon}`} alt={icon} width={30} height={30} />
          <span>{icon}</span>
        </div>
      ))}
    </div>
  );
}
