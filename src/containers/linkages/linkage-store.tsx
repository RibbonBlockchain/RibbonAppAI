"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { Add, Minus, ShoppingCart } from "iconsax-react";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useCart } from "@/provider/cart-context-provider";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  currency: string;
  imageUrl: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "Cool Sneakers",
    description: "Stylish and comfortable sneakers for everyday wear.",
    price: 79.99,
    currency: "$",
    imageUrl: "",
    stock: 8,
  },
  {
    id: 2,
    name: "Classic Backpack",
    description: "A durable backpack for school or travel.",
    price: 49.99,
    currency: "$",
    imageUrl: "",
    stock: 8,
  },
  {
    id: 3,
    name: "Leather Wallet",
    description: "Premium leather wallet with multiple compartments.",
    price: 39.99,
    currency: "$",
    imageUrl: "",
    stock: 8,
  },
  {
    id: 4,
    name: "Smart Watch",
    description: "Stay connected with this feature-packed smart watch.",
    price: 199.99,
    currency: "$",
    imageUrl: "",
    stock: 8,
  },
];

const LinkageStore = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const isPending = false;

  const { cartItems, updateCart } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddItem = (item: Item) => {
    updateCart(
      item,
      (cartItems.find((cartItem) => cartItem.item.id === item.id)?.quantity ||
        0) + 1
    );
  };

  const handleRemoveItem = (item: Item) => {
    const currentQuantity =
      cartItems.find((cartItem) => cartItem.item.id === item.id)?.quantity || 0;
    if (currentQuantity > 0) {
      updateCart(item, currentQuantity - 1);
    }
  };

  const handleViewCart = () => {
    console.log(cartItems);
    router.push(`/linkages/explore/${slug}/chat/store/checkout`);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 sm:p-6 py-6 overflow-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-row items-center justify-between gap-2 mb-4"
          >
            <div className="flex flex-row items-center gap-2">
              <Image
                width={68}
                height={68}
                alt={item.name}
                src={item.imageUrl}
                className="bg-white rounded-md w-[68px] h-[68px]"
              />
              <div className="flex flex-col items-start justify-between py-1">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs font-medium text-[#98A2B3] mt-0.5 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                  {item.currency} {item.price}
                </p>
                <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                  Available stock - {item.stock}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-end gap-2.5 min-w-[95px]">
              {cartItems.find((cartItem) => cartItem.item.id === item.id)
                ?.quantity !== 0 ? (
                <div
                  className="border border-white p-[3px] rounded-[6px] cursor-pointer"
                  onClick={() => handleRemoveItem(item)}
                >
                  <Minus size={20} />
                </div>
              ) : (
                ""
              )}

              {cartItems.find((cartItem) => cartItem.item.id === item.id)
                ?.quantity || 0}
              <button
                className="border border-white p-[3px] rounded-[6px] cursor-pointer"
                onClick={() => handleAddItem(item)}
              >
                <Add size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <Button onClick={handleViewCart} disabled={false}>
          {isPending ? (
            <SpinnerIcon />
          ) : (
            <div className="flex flex-row gap-2 items-center justify-center">
              <ShoppingCart size={24} />
              View Cart ({totalItems} items)
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkageStore;
