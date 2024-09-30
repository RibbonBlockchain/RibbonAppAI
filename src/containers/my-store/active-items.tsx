"use client";

import {
  useGetLinkageStoreItems,
  useDeleteLinkageStoreItem,
  useArchiveLinkageStoreItem,
} from "@/api/linkage";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Add, Edit2, Trash } from "iconsax-react";
import { SpinnerIcon } from "@/components/icons/spinner";
import React, { useEffect, useRef, useState } from "react";

const ActiveItems = () => {
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>(
    {}
  );

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setVisibleMenu({});
    }
  };

  useEffect(() => {
    if (visibleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const linkageId = localStorage.getItem("selectedLinkageId");

  const { data, isLoading, refetch } = useGetLinkageStoreItems({
    linkageId: Number(linkageId),
    params: { page: 1, perPage: 10, query: "" },
  });

  const activeItems =
    data?.data?.data.filter((item: any) => item.status === "ACTIVE") || [];

  const { mutate: archiveItem } = useArchiveLinkageStoreItem();
  const { mutate: deleteItem } = useDeleteLinkageStoreItem();

  const handleToggleMenu = (id: number) => {
    setVisibleMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleArchive = (id: number) => {
    archiveItem(
      { itemId: id, linkageId: Number(linkageId) },
      {
        onSuccess: () => {
          toast.success("Store item archived successfully"), refetch();
          setVisibleMenu({});
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteItem(
      { itemId: id, linkageId: Number(linkageId) },
      {
        onSuccess: () => {
          toast.success("Store item deleted"), refetch(), setVisibleMenu({});
        },
      }
    );
  };

  const handleEdit = (id: number) => {
    console.log(`Edit item with ID: ${id}`);
    setVisibleMenu({});
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Link
        href={"/my-linkages/store/add-item"}
        className="ml-1 max-w-fit flex flex-row gap-2 items-center text-base font-semibold"
      >
        <div className="p-1.5 rounded-[10px] border border-white">
          <Add size={20} />
        </div>
        Add new item
      </Link>

      <div>
        {activeItems.length === 0 ? (
          <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
            You do not have any active items in your store
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {isLoading && (
              <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
                <SpinnerIcon />
              </div>
            )}
            {activeItems.map((item: any) => (
              <div
                key={item.id}
                className="relative flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center gap-2">
                  <Image
                    width={68}
                    alt="image"
                    height={68}
                    src={item.images[0]}
                    className="bg-white rounded-md w-[68px] h-[68px]"
                    onClick={() => handleToggleMenu(item.id)}
                  />
                  <div className="flex flex-col items-start justify-between py-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs font-medium text-[#98A2B3] mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                      {item.currency} {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div
                  ref={modalRef}
                  className="relative self-center min-w-fit px-3"
                >
                  <Image
                    alt="icon"
                    width={24}
                    height={24}
                    src="/assets/option-icon.png"
                    className="cursor-pointer w-[24px] h-[24px]"
                    onClick={() => handleToggleMenu(item.id)}
                  />

                  {visibleMenu[item.id] && (
                    <div className="absolute right-0 z-30 min-w-[110px] flex flex-col py-1 bg-[#3f3952] rounded-[12px] border border-white text-white text-sm font-semibold">
                      <button
                        className="flex flex-row items-center gap-1.5 pl-2 py-2"
                        onClick={() => handleArchive(item.id)}
                      >
                        <Trash size={20} /> Archive
                      </button>
                      <Link
                        // href={`/my-linkages/store/${item.slug}`}
                        href={`/my-linkages/store/harmony-2`}
                        className="flex flex-row items-center gap-1.5 pl-2 py-2"
                        onClick={() => handleEdit(item.id)}
                      >
                        <Edit2 size={20} /> Edit
                      </Link>
                      <button
                        className="flex flex-row items-center gap-1.5 pl-2 py-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash size={20} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveItems;
