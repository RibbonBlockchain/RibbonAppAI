"use client";

import {
  useGetLinkageStoreItems,
  useDeleteLinkageStoreItem,
  useUpdateLinkageStoreItem,
} from "@/api/linkage";
import Image from "next/image";
import toast from "react-hot-toast";
import { Undo2 } from "lucide-react";
import { Edit2, Trash } from "iconsax-react";
import { SpinnerIcon } from "@/components/icons/spinner";
import React, { useEffect, useRef, useState } from "react";
import EditItemModal from "./edit-item-modal";
import { TUpdateLinkageStoreItem } from "@/api/linkage/types";

const ArchivedItems = () => {
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<TUpdateLinkageStoreItem | null>(
    null
  );

  const linkageId = localStorage.getItem("selectedLinkageId");

  const { data, isLoading, refetch } = useGetLinkageStoreItems({
    linkageId: Number(linkageId),
    params: { page: 1, perPage: 10, query: "" },
  });

  const archivedItems =
    data?.data?.data.filter((item: any) => item.status === "ARCHIVED") || [];

  const { mutate: deleteItem } = useDeleteLinkageStoreItem();
  const { mutate: updateItem } = useUpdateLinkageStoreItem();

  useEffect(() => {
    refetch();
  }, [linkageId, refetch]);

  const handleToggleMenu = (id: number) => {
    setVisibleMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id: number) => {
    deleteItem(
      { itemId: id, linkageId: Number(linkageId) },
      {
        onSuccess: () => {
          toast.success("Store item deleted");
          refetch();
          setVisibleMenu({});
        },
      }
    );
  };

  const handleUnArchive = (id: number) => {
    toast.success(`Unarchive item with ID: ${id}`);
    setVisibleMenu({});
  };

  const handleEdit = (item: TUpdateLinkageStoreItem) => {
    setFormData(item);
    setIsModalOpen(true);
    setVisibleMenu({});
  };

  const handleSave = (updatedItem: TUpdateLinkageStoreItem) => {
    updateItem(
      {
        body: updatedItem,
        itemId: updatedItem.id,
        linkageId: Number(linkageId),
      },
      {
        onSuccess: () => {
          toast.success("Item updated successfully");
          setIsModalOpen(false);
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div>
        {archivedItems.length === 0 ? (
          <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
            You do not have any items in your archive
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {isLoading && (
              <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
                <SpinnerIcon />
              </div>
            )}
            {archivedItems.map((item: any) => (
              <div
                key={item.id}
                className="relative flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center gap-1">
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

                <div className="relative self-center min-w-fit px-2">
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
                        onClick={() => handleUnArchive(item.id)}
                      >
                        <Undo2 size={20} /> Unarchive
                      </button>
                      <button
                        className="flex flex-row items-center gap-1.5 pl-2 py-2"
                        onClick={() => handleEdit(item)} // Pass the entire item
                      >
                        <Edit2 size={20} /> Edit
                      </button>
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

      <EditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ArchivedItems;
