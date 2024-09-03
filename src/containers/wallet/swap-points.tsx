import Image from "next/image";
import React, { Fragment } from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";
import { SpinnerIcon } from "@/components/icons/spinner";
import { ArrowDown, ArrowDownUp, ArrowLeft } from "lucide-react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  setMaxAmount: () => void;
  pointInput: number;
  handlePointInput: (e: any) => void;
  isPending: any;
  pointsBalance: any;
  usdcBalance: any;
  USDvalue: any;
};

const SwapPointToUsdcToken: React.FC<Props> = (props) => {
  const router = useRouter();

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
              <Dialog.Panel className="w-[95%] max-w-[480px] h-full px-4 py-10  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-16">
                  <ArrowLeft stroke="#939393" onClick={props.closeModal} />
                  <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
                    Swap
                  </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                  <p className="text-xs text-[#626262]">
                    NOTE: You can only swap a minimum of 10000 ribbons
                  </p>

                  <div className="border rounded-[10px] p-4">
                    <div className="flex mb-4 flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="w-[35px] h-[35px] flex items-center ">
                          <Image
                            width={35}
                            height={35}
                            src={"/assets/ribbon.svg"}
                            alt="coin logo"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-base font-normal">RIBB</p>
                          <p className="text-xs text-[#626262]">
                            {props.pointsBalance} Ribbons
                          </p>
                        </div>
                      </div>
                      <ArrowDown stroke="#7C56FE" />
                    </div>

                    <hr />

                    <div className="flex mt-4 flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <input
                          type="number"
                          value={props.pointInput}
                          onChange={props.handlePointInput}
                          className="border-gray-200 border py-2 px-3 rounded-md w-[90%]"
                          placeholder="0"
                        />
                      </div>
                      <button
                        onClick={props.setMaxAmount}
                        className="font-bold"
                      >
                        Max
                      </button>{" "}
                      <p className="text-xs">From</p>
                    </div>
                  </div>

                  <ArrowDownUp stroke="#7C56FE" className="self-center flex" />

                  <div className="border rounded-[10px] p-4">
                    <div className="flex mb-4 flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="w-[35px] h-[35px] flex items-center ">
                          <Image
                            width={35}
                            height={35}
                            src={"/assets/usdc.png"}
                            alt="coin logo"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-base font-normal">USDC</p>
                          <p className="text-xs text-[#626262]">
                            {props.usdcBalance} USDC
                          </p>
                        </div>
                      </div>
                      <ArrowDown stroke="#7C56FE" />
                    </div>

                    <hr />

                    <div className="flex mt-4 flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p>{Number(props.pointInput) / 5000} USDC</p>
                        <p>$ {props.USDvalue}</p>
                      </div>
                      <p className="text-xs">To</p>
                    </div>
                  </div>
                </div>

                <div className="w-[60%] flex items-center justify-center mx-auto mt-2 p-4">
                  <Button
                    disabled={props.isPending}
                    onClick={props.handleClick}
                    className="rounded-md mt-16 mb-4"
                  >
                    {props.isPending ? <SpinnerIcon /> : "Swap"}
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

export default SwapPointToUsdcToken;
