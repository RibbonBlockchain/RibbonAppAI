import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Key,
  Bank,
  FAQs,
  Balance,
  Profile,
  Wallets,
  Feedback,
  ContactUs,
  PrivacyPolicy,
  TermsOfService,
} from "../../../public/images";

export const ProfileDetails = [
  {
    href: "/account/personal-details",
    description: "Personal Details",
    logo: <Profile />,
  },
  {
    href: "/wallet",
    description: "Wallets",
    logo: <Wallets />,
  },
  {
    href: "/account/balance&points",
    description: "Balance & Points",
    logo: <Balance />,
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
    logo: <ContactUs />,
  },
  {
    href: "https://discord.com/channels/834126035980255242/973481740813353000",
    description: "Feedback",
    logo: <Feedback />,
  },
  {
    href: "https://medium.com/@RibbonProtocol/ribbon-app-faqs-a531e66e1216",
    description: "FAQs",
    logo: <FAQs />,
  },
  {
    href: "#",
    description: "Terms of Service",
    logo: <TermsOfService />,
  },
  {
    href: "#",
    description: "Privacy Policy",
    logo: <PrivacyPolicy />,
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
