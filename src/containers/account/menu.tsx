import Link from "next/link";
import { BookOpen, ChevronRight, HelpCircle } from "lucide-react";
import {
  Bank,
  CallAdd,
  Cup,
  EmptyWallet,
  Key,
  Lock1,
  Profile,
  Shield,
  Star,
} from "iconsax-react";

export const ProfileDetails = [
  {
    href: "/profile/personal-details",
    description: "Personal Details",
    logo: <Profile />,
  },
  {
    href: "/linkages",
    description: "Linkages",
    logo: <Star fill="yellow" />,
  },
  {
    href: "/wallet",
    description: "Wallets",

    logo: <EmptyWallet />,
  },
  {
    href: "/profile/balance&points",
    description: "Balance & Points",
    logo: <Cup />,
  },
];

export const Settings = [
  {
    href: "/profile/change-pin",
    description: "Change Pin",
    logo: <Key />,
  },
  {
    href: "#",
    description: "Payment methods",
    logo: <Bank />,
  },
];

export const Support = [
  {
    href: "https://discord.com/channels/834126035980255242/973481637369229332",
    description: "Contact Us",
    logo: <CallAdd />,
  },
  {
    href: "https://discord.com/channels/834126035980255242/973481740813353000",
    description: "Feedback",
    logo: <BookOpen />,
  },
  {
    href: "https://medium.com/@RibbonProtocol/ribbon-app-faqs-a531e66e1216",
    description: "FAQs",
    logo: <HelpCircle />,
  },
  {
    href: "#",
    description: "Terms of Service",
    logo: <Shield />,
  },
  {
    href: "#",
    description: "Privacy Policy",
    logo: <Lock1 />,
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
        className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-gray-50"
      >
        <div className="flex flex-row items-center justify-center gap-3">
          {logo}
          <p className="text-base font-medium">{description}</p>
        </div>
        <ChevronRight stroke="#fff" />
      </Link>
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
        className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-gray-50"
      >
        <div className="flex flex-row items-center justify-center gap-3">
          {logo}
          <p className="text-base font-medium">{description}</p>
        </div>
        <ChevronRight stroke="#fff" />
      </Link>
    </div>
  );
};

export default Menu;
