import IconRound from '#/public/assets/icon-round.png';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 py-12 md:px-6 md:py-16">
      <div className="container mx-auto max-w-lg text-center flex flex-col items-center gap-4">
        <Image
          className="rounded-full border h-16 w-16 md:h-32 md:w-32"
          src={IconRound}
          alt="Hogwarts.gg"
          height={128}
          width={128}
        />
        {children}
      </div>
    </div>
  );
}
