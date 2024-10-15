import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type Props = {
  href: string;
  className?: ClassValue;
  children: React.ReactNode;
};

const LinkButton: React.FC<Props> = ({ href, children, className = "" }) => {
  return (
    <Link
      href={href}
      className={cn(
        "w-full text-sm font-semibold text-center px-4 py-3 rounded-xl border-solid transition-colors duration-100 focus-visible:duration-0 bg-gray-100 text-white hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
