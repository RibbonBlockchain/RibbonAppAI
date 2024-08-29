import React from "react";
import Link from "next/link";
import Image from "next/image";
import StarSvg from "@/public/assets/star";

const MyLinkagesCard = ({
  name,
  slug,
  image,
  author,
  description,
  featured,
}: {
  name: string;
  slug: string;
  image: string;
  author: string;
  description: string;
  featured?: boolean;
}) => {
  return (
    <div className="w-full flex flex-col bg-[#dac4fa14] text-white px-2 py-4 rounded-[10px]">
      <Link
        href={`/my-linkages/${slug}`}
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
            src={image || "/assets/sample-icon.png"}
            className="rounded-full w-[64px] h-[64px]"
          />
        </div>
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">{name}</p>
            {featured && (
              <p className="text-[11px] font-medium text-[#98A2B3]">
                Sponsored
              </p>
            )}
          </div>{" "}
          <p className="text-xs font-normal line-clamp-3">{description}</p>
          <div className="flex flex-row items-center justify-between text-xs">
            <div className="flex flex-row gap-2 items-center">
              <p>By {author}</p>
              <div className="flex flex-row gap-1 items-center">
                <StarSvg fill="#f2c80d" /> <p>(4.5)</p>
              </div>
            </div>
            <button className="underline cursor-pointer text-[#DFCBFB]">
              View more details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MyLinkagesCard;
