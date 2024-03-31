import Image from "next/image";
import LogoHeader from "../../public/images/logos/LogoHeader.svg";

export const Header = () => {
  return (
    <header className="flex h-[4.5rem] items-center bg-white p-6">
      <Image src={LogoHeader} alt="logo" width={122} height={22.67} />
    </header>
  );
};
