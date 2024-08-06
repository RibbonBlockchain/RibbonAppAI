import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Bank, Key, Profile } from "iconsax-react";
// import {
//   Key,
//   Bank,
//   FAQs,
//   Balance,
//   Profile,
//   Wallets,
//   Feedback,
//   ContactUs,
//   PrivacyPolicy,
//   TermsOfService,
// } from "../../../public/images";

export const ProfileDetails = [
  {
    href: "/account/personal-details",
    description: "Personal Details",
    logo: <Profile />,
  },
  {
    href: "/wallet",
    description: "Wallets",
    // logo: <Wallets />,
    logo: <Profile />,
  },
  {
    href: "/account/balance&points",
    description: "Balance & Points",
    // logo: <Balance />,
    logo: <Profile />,
  },
];

export const Settings = [
  {
    href: "/account/change-pin",
    description: "Change Pin",
    logo: <Key />,
  },
  {
    href: "#",
    description: "Link bank account",
    logo: <Bank />,
  },
];

export const Support = [
  {
    href: "https://discord.com/channels/834126035980255242/973481637369229332",
    description: "Contact Us",
    // logo: <ContactUs />,
    logo: <Profile />,
  },
  {
    href: "https://discord.com/channels/834126035980255242/973481740813353000",
    description: "Feedback",
    // logo: <Feedback />,
    logo: <Profile />,
  },
  {
    href: "https://medium.com/@RibbonProtocol/ribbon-app-faqs-a531e66e1216",
    description: "FAQs",
    // logo: <FAQs />,
    logo: <Profile />,
  },
  {
    href: "#",
    description: "Terms of Service",
    // logo: <TermsOfService />,
    logo: <Profile />,
  },
  {
    href: "#",
    description: "Privacy Policy",
    // logo: <PrivacyPolicy />,
    logo: <Profile />,
  },
];

export const RouteMenu = ({
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
        target="_blank"
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
