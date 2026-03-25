import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark google-sans-flex-regular">
      <Image
        src='/images/legal.jpg'
        alt="legal"
        width={500}
        height={500}
      />
    </div>
  );
}
