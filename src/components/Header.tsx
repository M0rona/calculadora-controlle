import Image from "next/image";
import LogoHeader from "../../public/images/logos/LogoHeader.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex h-[4.5rem] items-center bg-white p-6">
      <Link href="/">
        <Image src={LogoHeader} alt="logo" />
      </Link>
    </header>
  );
};
