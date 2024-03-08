import Link from "next/link";
import { ChevronRight, Sun } from "lucide-react";
import { Balance, Bank, Key, Profile, Wallets } from "../../../public/images";

export const ProfileDetails = [
  {
    href: "#",
    description: "Personal Details",
    logo: <Profile />,
  },
  {
    href: "#",
    description: "Wallets",
    logo: <Wallets />,
  },
  {
    href: "#",
    description: "Balance & Points",
    logo: <Balance />,
  },
];

export const Settings = [
  {
    href: "#",
    description: "Change Pin",
    logo: <Key />,
  },
  {
    href: "#",
    description: "Link bank account",
    logo: <Bank />,
  },
  {
    href: "#",
    description: "Dark Mode",
    logo: <Sun />,
  },
];

const Menu = ({
  logo,
  href,
  description,
}: {
  href: string;
  description: string;
  logo: React.ReactNode;
}) => {
  return (
    <div>
      <Link
        href={href}
        className="flex flex-row items-center justify-between py-3 px-[6px] "
      >
        <div className="flex flex-row items-center justify-center gap-3">
          {logo}
          <p className="text-base font-medium">{description}</p>
        </div>
        <ChevronRight stroke="#6200EE" />
      </Link>
      <hr />
    </div>
  );
};

export default Menu;
