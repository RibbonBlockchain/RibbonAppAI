"use client";

import Image from "next/image";
import Button from "@/components/button";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-full py-3 h-screen bg-gray-300">
      <p className="h-[60px]">Dashboard</p>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[370px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Image
                    width={120}
                    height={100}
                    alt="adobe-stock"
                    src="/images/adobe-stock.svg"
                    className="m-auto"
                  />

                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-center py-3"
                  >
                    Link your World ID to continue using Ribbon Protocol{" "}
                  </Dialog.Title>

                  <div onClick={closeModal} className="py-4">
                    <Button
                      textColor="text-white"
                      text="Link your World ID now"
                    />
                  </div>

                  <div className="flex flex-row gap-2 mt-4">
                    <Image
                      alt="info"
                      width={27}
                      height={27}
                      src="/images/info-logo.svg"
                    />
                    <p className="text-[#FF8C05] text-sm ">
                      You will earn A 5.00 for completing your phone number
                      verification
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Dashboard;
