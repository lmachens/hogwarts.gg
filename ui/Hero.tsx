import Clouds from '#/public/assets/clouds.png';
import LogoTemplate from '#/public/assets/logo_template.png';
import Image from 'next/image';

export default function Hero({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <>
      <div className="relative px-6border-b border-gray-800 bg-[url('/assets/bg.png')] bg-cover bg-top">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="relative tracking-wide font-bold font-serif text-xl sm:text-2xl text-brand">
            <Image src={LogoTemplate} alt="" />
            <span className="absolute left-0 right-0" style={{ bottom: '15%' }}>
              {title}
            </span>
          </h1>
        </div>
        <Image
          src={Clouds}
          alt=""
          className="absolute bottom-0 left-0 right-0 w-full"
        />
      </div>
      {subtitle && (
        <h2 className="my-8 p-1 text-lg text-gray-300 text-center">
          {subtitle}
        </h2>
      )}
    </>
  );
}
