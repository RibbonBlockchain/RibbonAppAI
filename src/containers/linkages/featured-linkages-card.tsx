import React from "react";
import Link from "next/link";
import Image from "next/image";

const FeaturedLinkages = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={`/linkages/all/${title}`}
      className="flex flex-row items-center gap-4"
    >
      <Image
        src={"/assets/image-ph.svg"}
        alt="alt"
        width={64}
        height={64}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-base font-semibold">{title}</p>
        <p className="mt-1 text-xs font-normal">
          {description}{" "}
          <a className="underline cursor-pointer text-[#DFCBFB]">
            View more details
          </a>
        </p>
      </div>
    </Link>
  );
};

export default FeaturedLinkages;
