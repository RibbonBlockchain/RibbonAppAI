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
    <div className="flex flex-col">
      <Link
        href={`/linkages/all/${title}`}
        className="flex flex-row items-center gap-4"
      >
        <div className="relative min-w-fit flex flex-row">
          <Image
            width={20}
            height={20}
            alt="display"
            src={"/assets/big-star.svg"}
            className="w-[20px] h-[20px] absolute -right-2 -top-2"
          />
          <Image
            alt="alt"
            width={64}
            height={64}
            src={"/assets/image-ph.png"}
            className="rounded-full w-[64px] h-[64px]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-base font-semibold">{title}</p>
          <div className="mt-1 text-xs font-normal">
            {description}
            <p className="underline cursor-pointer text-[#DFCBFB]">
              View more details
            </p>
          </div>
        </div>
      </Link>

      <Image
        alt="hr"
        height={1}
        width={240}
        className="w-auto h-auto mt-4"
        src="/assets/horizontal-line.png"
      />
    </div>
  );
};

export default FeaturedLinkages;
