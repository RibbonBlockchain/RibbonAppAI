import Image from "next/image";
import React, { Fragment } from "react";
import Button from "@/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";
import { SpinnerIcon } from "@/components/icons/spinner";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  setMaxAmount: () => void;
  pointInput: string;
  handlePointInput: (e: any) => void;
  isPending: any;
  pointsBalance: any;
};

const ClaimPointsModal: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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

        <div className="fixed inset-0 h-[screen] overflow-y-auto">
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
              <Dialog.Panel className="w-[95%] max-w-[380px] h-full px-4 py-8 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-16">
                  <ArrowLeft stroke="#939393" onClick={props.closeModal} />
                  <div className="flex -mt-6 text-black  flex-row items-center justify-center text-base font-semibold">
                    Claim virtual ribbon
                  </div>
                </div>

                <div className="flex flex-col gap-8 w-full">
                  <div>
                    <p className="text-xs text-[#626262] font-semibold">
                      Virtual balance
                    </p>
                    <p className="flex flex-row gap-2 mt-1 items-center text-black text-base font-bold">
                      <Image
                        src="/assets/coin.png"
                        alt="coin"
                        height={32}
                        width={32}
                        className="w-[32px] h-[32px]"
                      />
                      {props.pointsBalance} ribbon
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-xs font-semibold">
                        Input amount (ribbon)
                      </p>
                      <button
                        onClick={props.setMaxAmount}
                        className="text-xs font-bold text-[#7C56FE]"
                      >
                        Max
                      </button>
                    </div>

                    <input
                      type="number"
                      placeholder="0"
                      value={props.pointInput}
                      onChange={props.handlePointInput}
                      className="border-gray-200 border py-3 px-3 rounded-md w-full font-medium"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center justify-center mx-auto mt-2 p-4">
                  <Button
                    disabled={props.isPending}
                    onClick={props.handleClick}
                    className="rounded-md mt-10 mb-4"
                  >
                    {props.isPending ? <SpinnerIcon /> : "Claim"}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ClaimPointsModal;
