import Image from "next/image";
import Button from "../button";
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ArrowDownUp, ArrowLeft, X } from "lucide-react";
import { SpinnerIcon } from "../icons/spinner";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  pointBalance: string;
};

const PointsTokenTxUI: React.FC<Props> = (props) => {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-[screen] overflow-auto scroll-hidden items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[95%] max-w-[480px] h-full px-4 py-10 mt-10 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-16">
                  <div
                    onClick={props.closeModal}
                    className="w-fit p-2 cursor-pointer"
                  >
                    <ArrowLeft stroke="#939393" />
                  </div>
                  <div className="flex -mt-8 text-black  flex-col gap-2 items-center justify-center  text-base font-semibold">
                    <p> Ribbons (RIBB)</p>
                    <p className="text-center text-xs font-medium text-[#546881]">
                      Base | Base Sepolia
                    </p>
                  </div>
                </div>

                <div className="h-[400px] w-full p-8">
                  <div className="flex flex-col mt-10 gap-10 items-center justify-center mx-auto">
                    <div className="flex flex-col gap-1 text-center">
                      <div className="flex flex-row items-center gap-2 text-lg font-bold">
                        <Image
                          width={35}
                          height={35}
                          src={"/assets/ribbon.svg"}
                          alt="coin logo"
                          className="rounded-full"
                        />
                        RIBB
                      </div>
                      <p>{props.pointBalance} Ribbons</p>
                    </div>

                    <div className="flex flex-row items-center gap-6 text-xs font-light">
                      <div className="flex flex-col gap-1 items-center justify-center mx-auto">
                        <button
                          onClick={props.handleClick}
                          className="cursor-pointer px-3 py-3 w-fit items-center justify-center flex flex-col border border-[#D6CBFF] rounded-full"
                        >
                          <ArrowDownUp
                            stroke="#7C56FE"
                            height={16}
                            width={16}
                          />
                        </button>
                        Swap
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PointsTokenTxUI;
