import React from "react";
import { CircleUser, History, Home } from "lucide-react";

const items = [
  {
    id: 1,
    href: "#",
    text: "Home",
    icon: <Home />,
    iconFilled: <Home fill="#D9D9D9" />,
  },
  {
    id: 2,
    href: "#",
    text: "Activity",
    icon: <History />,
    iconFilled: <History fill="#D9D9D9" />,
  },
  {
    id: 3,
    href: "#",
    text: "Account",
    icon: <CircleUser />,
    iconFilled: <CircleUser fill="#D9D9D9" />,
  },
];

const FooterNav = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };
  return (
    <footer className="fixed bottom-0 w-full max-w-[500px] bg-[#FEFEFE] text-xs font-extrabold text-white">
      <div className="container mx-auto flex items-center justify-around p-4 sm:p-6 sm:py-5">
        {items.map((i) => (
          <a
            key={i.id}
            href={i.href}
            onClick={() => handleItemClick(i.id)}
            className={`flex flex-row gap-3 py-3 px-3 sm:px-5 rounded-full items-center ${
              selectedItem === i.id
                ? "bg-gradient-to-b from-[#334272] to-[#871785]"
                : ""
            }`}
          >
            {selectedItem === i.id ? <>{i.icon}</> : <>{i.iconFilled}</>}
            {selectedItem === i.id ? <>{i.text}</> : <></>}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default FooterNav;
