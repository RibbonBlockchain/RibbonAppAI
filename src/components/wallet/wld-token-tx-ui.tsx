import React, { Fragment } from "react";
import { ArrowDownUp, ArrowLeft, ArrowUp } from "lucide-react";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  wldBalance: string;
};

const WLDTokenTxUI: React.FC<Props> = (props) => {
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
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[95%] max-w-[480px] h-full px-4 py-10  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-16">
                  <div
                    onClick={props.closeModal}
                    className="w-fit p-2 cursor-pointer"
                  >
                    <ArrowLeft stroke="#939393" />
                  </div>{" "}
                  <div className="flex -mt-6 text-black  flex-row items-center justify-center text-base font-semibold">
                    World (WLD)
                  </div>
                </div>

                <div className="h-[400px] w-full p-8">
                  <div className="flex flex-col mt-10 gap-10 items-center justify-center mx-auto">
                    <p>{props.wldBalance} WLD</p>

                    <div className="flex flex-row items-center gap-6 text-xs font-light">
                      <div className="flex flex-col gap-1 items-center justify-center mx-auto">
                        <button
                          onClick={props.handleClick}
                          className="cursor-pointer px-3 py-3 w-fit items-center justify-center flex flex-col border border-[#D6CBFF] rounded-full"
                        >
                          <ArrowUp stroke="#7C56FE" height={16} width={16} />
                        </button>
                        Send
                      </div>

                      <div className="flex flex-col gap-1 items-center justify-center mx-auto">
                        <button className="cursor-pointer px-3 py-3 w-fit items-center justify-center flex flex-col border border-[#D6CBFF] rounded-full">
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

export default WLDTokenTxUI;
