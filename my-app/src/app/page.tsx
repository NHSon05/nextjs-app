import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark google-sans-flex-regular">
      <Button className="font-bold text-3xl">Hello World</Button>
      <p className="google-sans-flex-regular font-bold text-5xl">
        Nội dung dùng Google Sans Flex
      </p>
    </div>
  );
}
