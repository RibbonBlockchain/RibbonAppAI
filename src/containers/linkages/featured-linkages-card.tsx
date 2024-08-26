import React from "react";
import Link from "next/link";
import Image from "next/image";

const FeaturedLinkages = ({
  image,
  name,
  author,
  description,
  slug,
}: {
  image: string;
  name: string;
  author: string;
  description: string;
  slug: string;
}) => {
  return (
    <div className="w-full flex flex-col bg-[#dac4fa14] text-white px-2 py-4 rounded-[10px]">
      <Link
        href={`/linkages/explore/${slug}`}
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
        <div className="w-full flex flex-col gap-1.5">
          <p className="text-base font-semibold">{name}</p>
          <p className="text-xs font-normal">{description}</p>
          <div className="flex flex-row items-center justify-between text-xs">
            <p>By {author}</p>
            <button className="underline cursor-pointer text-[#DFCBFB]">
              View more details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedLinkages;
