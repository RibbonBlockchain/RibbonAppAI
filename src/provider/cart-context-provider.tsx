"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  currency: string;
  imageUrl: string;
}

interface CartItem {
  item: Item;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCart: (item: Item, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateCart = (item: Item, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItem) {
        if (quantity === 0) {
          return prev.filter((cartItem) => cartItem.item.id !== item.id);
        } else {
          return prev.map((cartItem) =>
            cartItem.item.id === item.id ? { ...cartItem, quantity } : cartItem
          );
        }
      } else {
        return [...prev, { item, quantity }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
