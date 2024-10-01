"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { Add, ArrowLeft2, Minus } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useCart } from "@/provider/cart-context-provider";

const Checkout = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const isPending = false;

  const { cartItems, updateCart } = useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.item.price * cartItem.quantity;
  }, 0);

  const handleAddItem = (item: any) => {
    updateCart(
      item,
      (cartItems.find((cartItem) => cartItem.item.id === item.id)?.quantity ||
        0) + 1
    );
  };

  const handleRemoveItem = (item: any) => {
    const currentQuantity =
      cartItems.find((cartItem) => cartItem.item.id === item.id)?.quantity || 0;
    if (currentQuantity > 0) {
      updateCart(item, currentQuantity - 1);
    }
  };

  const handleDeleteItem = (item: any) => {
    updateCart(item, 0);
  };

  return (
    <main className="w-full flex flex-col h-screen text-white bg-[#0B0228] p-3 sm:p-6">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-lg font-semibold">Checkout</p>
      </div>

      <section className="flex-1 flex flex-col gap-6 mt-6 w-full overflow-auto">
        <div className="flex flex-row items-center justify-between">
          <p>Subtotal</p>
          <p>{subtotal.toFixed(2)} USDC</p>
        </div>

        <div className="w-full">
          <p>{cartItems.length} item(s)</p>

          <div className="w-full flex flex-col mb-10">
            {cartItems.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className="w-full relative flex flex-col gap-4 items-start py-6 border-b border-[#D6CBFF33]"
              >
                <div className="w-full flex flex-row items-center justify-between gap-1">
                  <div className="flex flex-row gap-1 items-center">
                    <Image
                      width={68}
                      alt="image"
                      height={68}
                      src={cartItem.item.images[0]}
                      className="bg-white rounded-md w-[68px] h-[68px]"
                    />
                    <p className="text-sm font-semibold line-clamp-2">
                      {cartItem.item.name}
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-between py-1">
                    <div className="flex flex-row gap-1">
                      <p className="text-base font-bold min-w-fit">
                        {cartItem.item.currency}
                      </p>
                      <p className="text-base font-bold min-w-fit">
                        {cartItem.item.price.toFixed(2)}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      Qty - {cartItem.quantity}
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-row items-center justify-between">
                  <div>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDeleteItem(cartItem.item)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-row items-center gap-2.5">
                    <button
                      className="border border-white p-[3px] rounded-[6px] cursor-pointer"
                      onClick={() => handleRemoveItem(cartItem.item)}
                    >
                      <Minus size={20} />
                    </button>

                    <span>{cartItem.quantity}</span>

                    <button
                      className="border border-white p-[3px] rounded-[6px] cursor-pointer"
                      onClick={() => handleAddItem(cartItem.item)}
                    >
                      <Add size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="p-4">
        <Button
          onClick={() =>
            router.push(`/linkages/explore/${slug}/chat/store/confirm-order`)
          }
          disabled={isPending}
        >
          {isPending ? (
            <SpinnerIcon />
          ) : (
            <div>Checkout ( ${subtotal.toFixed(2)} )</div>
          )}
        </Button>
      </div>
    </main>
  );
};

export default Checkout;
