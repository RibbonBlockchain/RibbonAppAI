import React from "react";
import Link from "next/link";
import Image from "next/image";

const LinkagesCard = ({
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
      className="flex flex-col gap-2 min-w-[225px] py-2"
    >
      <Image
        src={image}
        alt="alt"
        width={214}
        height={98}
        className="w-auto h-auto bg-white rounded-[12px]"
      />
      <p className="text-base font-semibold">{title}</p>
      <p className="text-xs mb-2">{description}</p>
      <button className="w-full text-center py-2 bg-[#F6F1FE] rounded-[12px] text-xs font-medium text-[#290064]">
        View details
      </button>
    </Link>
  );
};

export default LinkagesCard;
