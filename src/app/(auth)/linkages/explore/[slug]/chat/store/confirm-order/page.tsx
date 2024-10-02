"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { Add, ArrowLeft2, Icon, InfoCircle, Minus, Copy } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useCart } from "@/provider/cart-context-provider";
import { Plus, Upload, X } from "lucide-react";
import PaymentOrderSuccessful from "@/containers/linkages/payment-successful-modal";
import { copyToClipboard } from "@/lib/utils";
import toast from "react-hot-toast";

interface Address {
  id: number;
  name: string;
  address: string;
}

interface PickupStation {
  id: number;
  name: string;
  address: string;
}

const ConfirmOrder: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { cartItems } = useCart();

  const [openQRCodeModal, setOpenQRCodeModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Toluwase Adebayo",
      address: "No 25, Ribbon Street, three way junction, Ikeja, Lagos",
    },
  ]);
  const [pickupStations] = useState<PickupStation[]>([
    {
      id: 1,
      name: "Station A",
      address: "Location A",
    },
    {
      id: 2,
      name: "Station B",
      address: "Location B",
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(1);
  const [selectedPickupStationId, setSelectedPickupStationId] = useState<
    number | null
  >(null);
  const [deliveryMethod, setDeliveryMethod] = useState<string>("homeDelivery");
  const [newAddress, setNewAddress] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePayment = () => {
    setOpenSuccessModal(true);
  };

  const isPending = false;

  const subtotal = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.item.price * cartItem.quantity;
  }, 0);

  const deliveryFee = 5;
  const totalFee = subtotal + deliveryFee;

  const handleAddAddress = () => {
    if (newAddress.trim() && newName.trim()) {
      setAddresses([
        ...addresses,
        { id: Date.now(), name: newName, address: newAddress },
      ]);
      setNewAddress("");
      setNewName("");
      setIsModalOpen(false);
    }
  };

  const handleEditAddress = (id: number) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setNewName(addressToEdit.name);
      setNewAddress(addressToEdit.address);
      setEditingAddressId(id);
      setIsModalOpen(true);
    }
  };

  const handleSaveAddress = () => {
    if (editingAddressId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddressId
            ? { ...addr, name: newName, address: newAddress }
            : addr
        )
      );
      setEditingAddressId(null);
    } else {
      handleAddAddress();
      setNewAddress("");
      setNewName("");
      setIsModalOpen(false);
    }
  };

  const handleRemoveAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleDeliveryMethodChange = (method: string) => {
    setDeliveryMethod(method);
    if (method === "pickup") {
      setSelectedPickupStationId(null); // Reset selection if switching methods
    }
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
        <p className="text-lg font-semibold">Confirm Order</p>
      </div>

      <section className="flex-1 flex flex-col gap-4 mt-6 w-full overflow-auto">
        <p className="text-base font-semibold mb-2">Order Summary</p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-row items-center justify-between">
            <p className="font-normal text-[#F6F1FE]">
              {cartItems.length} items
            </p>
            <p className="font-semibold">{subtotal.toFixed(2)} usdc</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="font-normal text-[#F6F1FE]">Delivery fees</p>
            <p className="font-semibold">{deliveryFee.toFixed(2)} usdc</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="font-normal text-[#F6F1FE]">Total</p>
            <p className="font-semibold text-base">
              {totalFee.toFixed(2)} usdc
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <p className="text-base font-semibold">Delivery method</p>
          <div className="flex flex-col items-start gap-4 justify-between text-[15px] font-medium">
            <div
              onClick={() => handleDeliveryMethodChange("pickup")}
              className="w-full flex flex-row items-center justify-between"
            >
              <button className="flex flex-row gap-1 items-center">
                Pick up station
                <p className="py-[1px] px-1.5 bg-[#C3B1FF4D] rounded-full">
                  $2.00
                </p>
              </button>
              <div
                className={`w-5 h-5 rounded-full border-2 ml-2 ${
                  deliveryMethod === "pickup"
                    ? "bg-white border-white"
                    : "border-white"
                }`}
              />
            </div>
            <div
              onClick={() => handleDeliveryMethodChange("homeDelivery")}
              className="w-full flex flex-row items-center justify-between"
            >
              <button className="flex flex-row gap-1 items-center">
                Home delivery{" "}
                <p className="py-[1px] px-1.5 bg-[#C3B1FF4D] rounded-full">
                  $5.00
                </p>
              </button>
              <div
                className={`w-5 h-5 rounded-full border-2 ml-2 ${
                  deliveryMethod === "homeDelivery"
                    ? "bg-white border-white"
                    : "border-white"
                }`}
              />
            </div>
          </div>
        </div>

        {deliveryMethod === "pickup" && (
          <div className="flex flex-col gap-2 mt-8">
            <p className="text-base font-semibold">
              Pick up station (Select a pick up station)
            </p>
            <p className="text-sm font-medium">
              Pick up station near your location
            </p>
            {pickupStations.map((station) => (
              <div
                key={station.id}
                className={`flex flex-row items-start justify-between gap-1.5 border border-[#FFFFFF36] rounded-[12px] mt-4 p-4 ${
                  selectedPickupStationId === station.id ? "" : ""
                }`}
                onClick={() => setSelectedPickupStationId(station.id)}
              >
                <div className="flex flex-row gap-2">
                  <div
                    className={`min-w-[20px] w-5 h-5 rounded-full border-2 ml-2 mt-1 ${
                      selectedPickupStationId === station.id
                        ? "bg-white border-white"
                        : "border-white"
                    }`}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-[15px] font-medium">{station.name}</p>
                    <p className="text-[13px] font-normal text-[#E5E7EB]">
                      {station.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {deliveryMethod === "homeDelivery" && (
          <div className="flex flex-col gap-2 mt-8">
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-semibold">Home delivery</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex flex-row items-center justify-end gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
              >
                <div className="p-[3px] rounded-full border border-[#FFFFFF36]">
                  <Plus size={14} />
                </div>
                Add
              </button>
            </div>

            {addresses.map((address) => (
              <div
                key={address.id}
                className={`flex flex-row items-start justify-between gap-1.5 border border-[#FFFFFF36] rounded-[12px] p-4 ${
                  selectedAddressId === address.id ? "" : ""
                }`}
                onClick={() => setSelectedAddressId(address.id)}
              >
                <div className="flex flex-row gap-2">
                  <div
                    className={`min-w-[20px] w-5 h-5 rounded-full border-2 ml-2 mt-1 ${
                      selectedAddressId === address.id
                        ? "bg-white border-white"
                        : "border-white"
                    }`}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-[15px] font-medium">{address.name}</p>
                    <p className="text-[13px] font-normal text-[#E5E7EB]">
                      {address.address}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end self-end ml-4 text-sm font-medium">
                  <button onClick={() => handleEditAddress(address.id)}>
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveAddress(address.id);
                    }}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          onClick={() => setOpenQRCodeModal(true)}
          className="text-base font-bold mt-4"
        >
          Generate payment QR code
          <p className="text-xs font-normal text-[#E5E7EB]">
            You can share this QR code with someone to pay for you
          </p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="flex flex-col gap-2 min-w-[300px] bg-[#3f3952] bg-opacity-75 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Add New Address</h2>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
                className="p-2 border border-gray-300 rounded-md mb-2 w-full bg-inherit"
              />
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter address"
                className="p-2 border border-gray-300 rounded-md mb-4 w-full bg-inherit"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewAddress("");
                    setNewName("");
                  }}
                  className="text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-3 p-4">
        <Button onClick={handlePayment} disabled={isPending}>
          {isPending ? <SpinnerIcon /> : "Confirm and Pay"}
        </Button>
        <div className="flex flex-row gap-1 items-center justify-center text-[#F5C193] text-xs font-bold">
          <InfoCircle size={16} />
          <p>{totalFee.toFixed(2)} will be charged from your USDC wallet</p>
        </div>
      </div>

      {openSuccessModal && (
        <PaymentOrderSuccessful
          isOpen={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
        />
      )}

      {openQRCodeModal && (
        <div className="fixed inset-x-0 bottom-0 bg-[#3f3952] backdrop h-3/5 rounded-t-lg shadow-lg p-4 mx-1 transition-transform transform translate-y-0">
          <div className="flex flex-col h-full py-4">
            <div className="flex flex-row items-center justify-between">
              <div />
              <h2 className="text-lg font-semibold">Payment Request</h2>
              <X onClick={() => setOpenQRCodeModal(false)} />
            </div>

            <div className="mt-4 w-full rounded-md flex flex-col gap-2 items-center justify-center text-center">
              <div>
                <p className="text-[13px] font-medium mb-1"> Amount</p>
                <p className="text-sm font-bold">$130.00</p>
              </div>
              <div className="w-[225px] h-[225px] bg-white rounded-2xl my-1"></div>
              <div>
                <div className="flex flex-row items-center gap-2 text-sm font-normal mb-1">
                  0x2f09vkljjioppp33nmhnjuffbd8a
                  <Copy
                    size="18"
                    color="#F6F1FE"
                    variant="Bold"
                    className="cursor-pointer"
                    onClick={() => {
                      copyToClipboard("0x2f09vkljjioppp33nmhnjuffbd8a", () =>
                        toast.success(`Wallet address copied`)
                      );
                    }}
                  />
                </div>
                <p className="text-sm font-bold">Scan to Pay</p>
              </div>
            </div>

            {/* <div className="flex-grow" /> */}

            <button className="my-8 w-full flex flex-row gap-2 items-center justify-center rounded-[8px] py-3 font-bold text-sm bg-white text-[#290064]">
              Share QR Code <Upload size={20} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ConfirmOrder;
