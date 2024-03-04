import React from "react";
import { CircleUser, History, Home } from "lucide-react";

const items = [
  {
    href: "#",
    text: "Home",
    value: "home",
    icon: <Home />,
    iconFilled: <Home fill="#D9D9D9" />,
  },
  {
    href: "#",
    text: "Activity",
    value: "activity",
    icon: <History />,
    iconFilled: <History fill="#D9D9D9" />,
  },
  {
    href: "#",
    text: "Account",
    value: "account",
    icon: <CircleUser />,
    iconFilled: <CircleUser fill="#D9D9D9" />,
  },
];

const FooterNav = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  return (
    <footer className="fixed bottom-0 w-full max-w-[500px] bg-[#FEFEFE] text-xs font-extrabold text-white">
      <div className="container mx-auto grid grid-cols-3 items-center justify-around p-4 sm:p-6 sm:py-5">
        {items.map((i) => (
          <a
            key={i.value}
            href={i.href}
            onClick={() => setActiveItem(i.value)}
            className={`flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center justify-center ${
              activeItem === i.value
                ? "bg-gradient-to-b from-[#334272] to-[#871785]"
                : ""
            }`}
          >
            {activeItem === i.value ? <>{i.icon}</> : <>{i.iconFilled}</>}
            {activeItem === i.value ? <>{i.text}</> : <></>}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default FooterNav;
