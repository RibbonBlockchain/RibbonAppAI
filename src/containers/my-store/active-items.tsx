import React, { useEffect, useRef, useState } from "react";
import { Add, Edit2, Trash } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

const items: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const ActiveItems = () => {
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>(
    {}
  );
  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleClickOutside = (event: MouseEvent) => {
    const clickedOutside = Object.values(menuRefs.current).every((ref) => {
      return ref && !ref.contains(event.target as Node);
    });

    if (clickedOutside) {
      setVisibleMenu({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleMenu = (id: number) => {
    setVisibleMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (id: number) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleArchive = (id: number) => {
    console.log(`Archive item with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete item with ID: ${id}`);
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Link
        href={"/my-linkages/store/add-item"}
        className="ml-1 flex flex-row gap-2 items-center text-base font-semibold"
      >
        <div className="p-1.5 rounded-[10px] border border-white">
          <Add size={20} />
        </div>
        Add new item
      </Link>

      <div>
        {items.length === 0 ? (
          <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
            You do not have any item in your store
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items?.map((item: any) => (
              <div
                key={item.id}
                className="relative flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center gap-1">
                  <Image
                    width={68}
                    alt="image"
                    height={68}
                    src={item.image || ""}
                    className="bg-white rounded-md w-[68px] h-[68px]"
                    onClick={() => handleToggleMenu(item.id)}
                  />
                  <div className="flex flex-col items-start justify-between py-1">
                    <p className="text-sm font-semibold">
                      {item.name} Leather bag
                    </p>
                    <p className="text-xs font-medium text-[#98A2B3] mt-0.5 line-clamp-2">
                      {item.description} description description description
                      descripti description description description
                      descriptiondescription
                    </p>
                    <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                      {item.currency} {item.price} # 5000
                    </p>
                  </div>
                </div>

                <div className="relative self-center min-w-fit px-2">
                  <Image
                    alt="icon"
                    width={24}
                    height={24}
                    src="/assets/option-icon.png"
                    className="cursor-pointer"
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
                      <button
                        className="flex flex-row items-center gap-1.5 pl-2 py-2"
                        onClick={() => handleEdit(item.id)}
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
    </div>
  );
};

export default ActiveItems;
