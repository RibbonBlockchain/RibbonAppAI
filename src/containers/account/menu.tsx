import {
  Cup,
  Key,
  Bank,
  Star,
  Lock1,
  Shield,
  CallAdd,
  EmptyWallet,
  WalletMoney,
  ShoppingCart,
} from "iconsax-react";
import Link from "next/link";
import { BookOpen, ChevronRight, HelpCircle } from "lucide-react";

export const ProfileDetails = [
  // {
  //   href: "/profile/personal-details",
  //   description: "Personal Details",
  //   logo: <Profile />,
  // },
  // {
  //   href: "/profile/organization-details",
  //   description: "Organization Details",
  //   logo: <Profile />,
  // },
  {
    href: "/my-linkages",
    description: "Manage Linkages",
    logo: <Star fill="yellow" />,
  },
  {
    href: "/orders",
    description: "Orders",
    logo: <ShoppingCart />,
  },
  {
    href: "/wallet",
    description: "Wallet",
    logo: <EmptyWallet />,
  },
  {
    href: "/profile",
    description: "Loan history",
    logo: <WalletMoney />,
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
        className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-[#C3B1FF4D]"
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
        className="flex flex-row items-center justify-between py-3 px-[6px] border-b border-[#C3B1FF4D]"
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
