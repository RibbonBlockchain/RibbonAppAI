import {
  Gift,
  Wifi,
  Global,
  Driving,
  Monitor,
  Electricity,
  DocumentText,
  ShoppingCart,
} from "iconsax-react";

export const serviceList = [
  { href: "/dashboard/store/data-purchase", icon: <Wifi />, name: "Data" },
  { href: "/dashboard/store/airtime", icon: <DocumentText />, name: "Airtime" },
  {
    href: "/dashboard/store/electricity",
    icon: <Electricity />,
    name: "Electricity",
  },
  {
    href: "/dashboard/store/entertainment",
    icon: <Monitor />,
    name: "Entertainment",
  },
  { href: "/dashboard/store/betting", icon: <Global />, name: "Betting" },
  {
    href: "/dashboard/store/shopping",
    icon: <ShoppingCart />,
    name: "Shopping",
  },
  {
    href: "/dashboard/store/transports",
    icon: <Driving />,
    name: "Transports",
  },
  { href: "/dashboard/store/voucher", icon: <Gift />, name: "Voucher" },
];
