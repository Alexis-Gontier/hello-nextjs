import Title from "@/components/title/Title";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Title>
        Mon super titre
      </Title>
      <Image
        src="/images/taverne.webp"
        alt="une taverne"
        width={500}
        height={500}
        className="mx-auto my-8 w-[500px] h-[500px]"
      />
    </>
  );
}
